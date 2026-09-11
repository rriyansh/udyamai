import http from "node:http";

// Render (and most PaaS) inject PORT; keep OPENAI_PROXY_PORT for local dev.
const port = Number(process.env.PORT ?? process.env.OPENAI_PROXY_PORT ?? 8787);
const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
const apiKeys = [1, 2, 3, 4, 5]
  .map((index) => process.env[`OPENAI_API_KEY_${index}`])
  .filter(Boolean);
const googleMapsKey = process.env.GOOGLE_MAPS_SERVER_KEY ?? "";

// Comma-separated list of allowed frontend origins (add your deployed domain).
const allowedOrigins = (process.env.OPENAI_PROXY_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

function resolveOrigin(requestOrigin) {
  if (allowedOrigins.includes("*")) return "*";
  if (requestOrigin && allowedOrigins.includes(requestOrigin)) return requestOrigin;
  return allowedOrigins[0];
}

/**
 * Server-authoritative personas. These MUST stay aligned with the ids in
 * src/frontend/src/lib/chat-roles.ts. Keeping the prompt text on the server
 * means a client can request a role but cannot rewrite its guardrails.
 */
const PERSONAS = {
  saathi:
    "You are UdyamAI Saathi, the friendly all-round guide inside the UdyamAI business decision platform for rural entrepreneurs.",
  market:
    "You are the UdyamAI Market Advisor. You specialise in hyper-local market strategy for rural India: local demand, competitor density, distribution channels, pricing against regional purchasing power, seasonality, and underserved zones within a 5-10 km radius.",
  finance:
    "You are the UdyamAI Finance Advisor. You specialise in explaining a rural micro-enterprise's project cost, margin/beneficiary contribution, concessional loan amount, EMI and repayment schedule, moratorium, operating costs, working-capital needs and break-even. Explain each term in plain language.",
  schemes:
    "You are the UdyamAI Scheme Guide. You specialise in government concessional-credit and margin-money schemes for micro-enterprises and marginalised beneficiaries. You explain which scheme fits a given project cost, the loan/contribution split, interest, tenure, moratorium, eligibility and the documents required. Always tell the user to verify final eligibility with the official source.",
  mentor:
    "You are the UdyamAI Business Mentor, a patient on-ground coach for first-time rural entrepreneurs. You turn the user's own report into concrete, ordered next steps, warn about common mistakes, and keep the plan realistic for someone with limited capital and little business experience.",
};

const GROUNDING =
  "You explain the user's own verified UdyamAI analysis. Never invent or recalculate EMI, interest rates, prices, competitor counts, scheme eligibility, or financial projections. Only reason from the context provided; if something is not in that context, say it is not available in this analysis yet. Reply in the same language the user writes in (English, Hindi, or Hinglish), in short, plain, spoken-style sentences that a rural or semi-urban first-time entrepreneur can follow.";

export const ROLE_LABELS = [
  { id: "saathi", label: "UdyamAI Saathi" },
  { id: "market", label: "Market Advisor" },
  { id: "finance", label: "Finance Advisor" },
  { id: "schemes", label: "Scheme Guide" },
  { id: "mentor", label: "Business Mentor" },
];

function buildMessages(payload) {
  const persona = PERSONAS[payload.persona] ?? PERSONAS.saathi;
  const history = Array.isArray(payload.history) ? payload.history : [];
  const contextMessages = Array.isArray(payload.messages)
    ? payload.messages.filter((m) => m && m.role === "system")
    : [];

  const messages = [{ role: "system", content: `${persona} ${GROUNDING}` }];
  for (const message of contextMessages) {
    messages.push({ role: "system", content: String(message.content ?? "") });
  }
  for (const message of history) {
    const role = message.role === "assistant" ? "assistant" : "user";
    messages.push({ role, content: String(message.content ?? "") });
  }
  if (typeof payload.message === "string" && payload.message.trim()) {
    messages.push({ role: "user", content: payload.message });
  }
  return messages;
}

function sendJson(response, status, body, requestOrigin) {
  response.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": resolveOrigin(requestOrigin),
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) reject(new Error("Request is too large"));
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

async function callOpenAI(messages, options = {}) {
  let lastError;
  for (const apiKey of apiKeys) {
    try {
      const result = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.2,
          ...(options.stream ? { stream: true } : {}),
        }),
      });
      if (result.ok) {
        return options.stream ? result : await result.json();
      }
      lastError = new Error(`OpenAI request failed with ${result.status}`);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError ?? new Error("No OpenAI API keys configured");
}

async function streamChat(request, response, payload, origin) {
  const messages = buildMessages(payload);
  let upstream;
  try {
    upstream = await callOpenAI(messages, { stream: true });
  } catch {
    sendJson(response, 502, { error: "AI service is temporarily unavailable" }, origin);
    return;
  }

  response.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": resolveOrigin(origin),
  });

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const data = trimmed.slice(5).trim();
        if (data === "[DONE]") {
          response.write("data: [DONE]\n\n");
          continue;
        }
        try {
          const chunk = JSON.parse(data);
          const token = chunk.choices?.[0]?.delta?.content;
          if (token) {
            response.write(`data: ${JSON.stringify({ token })}\n\n`);
          }
        } catch {
          // ignore malformed upstream chunks
        }
      }
    }
  } catch {
    // client disconnected or upstream errored mid-stream; close cleanly
  } finally {
    response.end();
  }
}

async function placesNearby(response, payload, origin) {
  if (!googleMapsKey) {
    sendJson(response, 503, { error: "Maps service is not configured" }, origin);
    return;
  }
  const { lat, lng, radiusMeters, keyword } = payload;
  if (typeof lat !== "number" || typeof lng !== "number") {
    sendJson(response, 400, { error: "lat and lng are required" }, origin);
    return;
  }
  const radius = Math.min(Math.max(Number(radiusMeters) || 5000, 100), 50000);
  const url = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");
  url.searchParams.set("query", String(keyword ?? ""));
  url.searchParams.set("location", `${lat},${lng}`);
  url.searchParams.set("radius", String(radius));
  url.searchParams.set("key", googleMapsKey);

  try {
    const result = await fetch(url);
    if (!result.ok) {
      sendJson(response, 502, { error: "Maps provider error" }, origin);
      return;
    }
    const data = await result.json();
    const results = Array.isArray(data.results)
      ? data.results.slice(0, 20).map((place) => ({
          id: place.place_id ?? place.name,
          name: place.name ?? "",
          lat: place.geometry?.location?.lat ?? lat,
          lng: place.geometry?.location?.lng ?? lng,
          address: place.formatted_address ?? place.vicinity ?? "",
          rating: place.rating ?? null,
          userRatingsTotal: place.user_ratings_total ?? 0,
          priceLevel: place.price_level ?? null,
        }))
      : [];
    sendJson(response, 200, { results }, origin);
  } catch {
    sendJson(response, 502, { error: "Maps service is temporarily unavailable" }, origin);
  }
}

/** Resolve browser coordinates on the server so the Maps key stays private. */
async function reverseLocation(response, payload, origin) {
  if (!googleMapsKey) {
    sendJson(response, 503, { error: "Maps service is not configured" }, origin);
    return;
  }
  const { lat, lng } = payload;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    sendJson(response, 400, { error: "lat and lng are required" }, origin);
    return;
  }

  const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
  url.searchParams.set("latlng", `${lat},${lng}`);
  url.searchParams.set("key", googleMapsKey);
  try {
    const result = await fetch(url);
    const data = result.ok ? await result.json() : null;
    const components = data?.results?.[0]?.address_components;
    if (!Array.isArray(components)) {
      sendJson(response, 404, { error: "Address could not be resolved" }, origin);
      return;
    }
    const find = (type) =>
      components.find((component) => component.types?.includes(type))?.long_name;
    sendJson(
      response,
      200,
      {
        address: {
          village: find("locality") ?? find("sublocality") ?? find("postal_town") ?? "",
          block: find("administrative_area_level_3") ?? "",
          district: find("administrative_area_level_2") ?? "",
          state: find("administrative_area_level_1") ?? "",
        },
      },
      origin,
    );
  } catch {
    sendJson(response, 502, { error: "Maps service is temporarily unavailable" }, origin);
  }
}

/**
 * Free, observed nearby-business lookup using OpenStreetMap's Overpass API.
 * It reports mapped businesses only; it deliberately does not claim that a
 * listing count measures customer demand.
 */
async function observedNearbyBusinesses(response, payload, origin) {
  const { lat, lng, radiusMeters, keyword } = payload;
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    sendJson(response, 400, { error: "lat and lng are required" }, origin);
    return;
  }
  const radius = Math.min(Math.max(Number(radiusMeters) || 5000, 500), 10000);
  const term = String(keyword ?? "").replace(/[^\p{L}\p{N}\s&-]/gu, "").trim().slice(0, 80);
  if (!term) {
    sendJson(response, 400, { error: "business keyword is required" }, origin);
    return;
  }
  const pattern = term.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&").replace(/[-\s]+/g, "[- ]+");
  const query = `[out:json][timeout:15];nwr["name"~"${pattern}",i](around:${radius},${lat},${lng});out center 25;`;
  try {
    const result = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ data: query }),
    });
    const data = result.ok ? await result.json() : null;
    const results = Array.isArray(data?.elements)
      ? data.elements
          .map((place) => ({
            id: String(place.id),
            name: place.tags?.name ?? term,
            lat: place.lat ?? place.center?.lat,
            lng: place.lon ?? place.center?.lon,
          }))
          .filter((place) => Number.isFinite(place.lat) && Number.isFinite(place.lng))
      : [];
    sendJson(response, 200, { results, source: "OpenStreetMap" }, origin);
  } catch {
    sendJson(response, 502, { error: "Nearby business data is unavailable" }, origin);
  }
}

const server = http.createServer(async (request, response) => {
  const origin = request.headers.origin;

  if (request.method === "OPTIONS") {
    sendJson(response, 204, {}, origin);
    return;
  }

  if (request.method === "GET" && request.url === "/health") {
    sendJson(
      response,
      200,
      {
        status: "ok",
        chat: apiKeys.length > 0,
        streaming: apiKeys.length > 0,
        maps: googleMapsKey.length > 0,
      },
      origin,
    );
    return;
  }

  if (request.method === "GET" && request.url === "/api/roles") {
    sendJson(response, 200, { roles: ROLE_LABELS }, origin);
    return;
  }

  if (request.method !== "POST") {
    sendJson(response, 404, { error: "Not found" }, origin);
    return;
  }

  let payload;
  try {
    payload = JSON.parse(await readBody(request));
  } catch {
    sendJson(response, 400, { error: "Invalid JSON body" }, origin);
    return;
  }

  if (request.url === "/api/places/nearby") {
    await placesNearby(response, payload, origin);
    return;
  }

  if (request.url === "/api/location/reverse") {
    await reverseLocation(response, payload, origin);
    return;
  }

  if (request.url === "/api/market/nearby") {
    await observedNearbyBusinesses(response, payload, origin);
    return;
  }

  if (request.url === "/api/chat/stream") {
    if (apiKeys.length === 0) {
      sendJson(response, 503, { error: "AI service is not configured" }, origin);
      return;
    }
    await streamChat(request, response, payload, origin);
    return;
  }

  if (request.url === "/api/chat") {
    if (apiKeys.length === 0) {
      sendJson(response, 503, { error: "AI service is not configured" }, origin);
      return;
    }
    try {
      const messages = buildMessages(payload);
      const result = await callOpenAI(messages);
      sendJson(response, 200, result, origin);
    } catch {
      sendJson(response, 502, { error: "AI service is temporarily unavailable" }, origin);
    }
    return;
  }

  sendJson(response, 404, { error: "Not found" }, origin);
});

server.listen(port, () => {
  console.log(`OpenAI proxy listening on port ${port}`);
});
