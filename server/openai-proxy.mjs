import http from "node:http";

// Render (and most PaaS) inject PORT; keep OPENAI_PROXY_PORT for local dev.
const port = Number(process.env.PORT ?? process.env.OPENAI_PROXY_PORT ?? 8787);
const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
const apiKeys = [1, 2, 3, 4, 5]
  .map((index) => process.env[`OPENAI_API_KEY_${index}`])
  .filter(Boolean);

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

function sendJson(response, status, body, requestOrigin) {
  response.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": resolveOrigin(requestOrigin),
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

async function callOpenAI(messages) {
  let lastError;
  for (const apiKey of apiKeys) {
    try {
      const result = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model, messages, temperature: 0.2 }),
      });
      if (result.ok) return await result.json();
      lastError = new Error(`OpenAI request failed with ${result.status}`);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError ?? new Error("No OpenAI API keys configured");
}

const server = http.createServer(async (request, response) => {
  const origin = request.headers.origin;

  if (request.method === "OPTIONS") {
    sendJson(response, 204, {}, origin);
    return;
  }

  if (request.method === "GET" && request.url === "/health") {
    sendJson(response, 200, { status: "ok" }, origin);
    return;
  }

  if (request.method !== "POST" || request.url !== "/api/chat") {
    sendJson(response, 404, { error: "Not found" }, origin);
    return;
  }

  if (apiKeys.length === 0) {
    sendJson(response, 503, { error: "AI service is not configured" }, origin);
    return;
  }

  try {
    const payload = JSON.parse(await readBody(request));
    if (!Array.isArray(payload.messages) || payload.messages.length === 0) {
      sendJson(
        response,
        400,
        { error: "messages must be a non-empty array" },
        origin,
      );
      return;
    }
    const result = await callOpenAI(payload.messages);
    sendJson(response, 200, result, origin);
  } catch {
    sendJson(
      response,
      502,
      { error: "AI service is temporarily unavailable" },
      origin,
    );
  }
});

server.listen(port, () => {
  console.log(`OpenAI proxy listening on port ${port}`);
});
