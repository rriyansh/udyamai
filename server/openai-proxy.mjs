import http from "node:http";

const port = Number(process.env.OPENAI_PROXY_PORT ?? 8787);
const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
const apiKeys = [1, 2, 3, 4, 5]
  .map((index) => process.env[`OPENAI_API_KEY_${index}`])
  .filter(Boolean);

function sendJson(response, status, body) {
  response.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": process.env.OPENAI_PROXY_ORIGIN ?? "http://localhost:5173",
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
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  if (request.method !== "POST" || request.url !== "/api/chat") {
    sendJson(response, 404, { error: "Not found" });
    return;
  }

  if (apiKeys.length === 0) {
    sendJson(response, 503, { error: "AI service is not configured" });
    return;
  }

  try {
    const payload = JSON.parse(await readBody(request));
    if (!Array.isArray(payload.messages) || payload.messages.length === 0) {
      sendJson(response, 400, { error: "messages must be a non-empty array" });
      return;
    }
    const result = await callOpenAI(payload.messages);
    sendJson(response, 200, result);
  } catch {
    sendJson(response, 502, { error: "AI service is temporarily unavailable" });
  }
});

server.listen(port, () => {
  console.log(`OpenAI proxy listening on http://localhost:${port}/api/chat`);
});
