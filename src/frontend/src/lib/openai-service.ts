import type { ChatMessage, ChatPersonaId, HyperLocalAnalysis } from "@/lib/types";

interface OpenAiResponse {
  choices?: Array<{ message?: { content?: string } }>;
}

const chatUrl =
  (import.meta.env.VITE_OPENAI_PROXY_URL as string | undefined) ??
  (import.meta.env.DEV ? "http://localhost:8787/api/chat" : undefined);

/** Derives the streaming endpoint from the configured chat endpoint. */
function resolveStreamUrl(): string | undefined {
  const explicit = import.meta.env.VITE_OPENAI_STREAM_URL as string | undefined;
  if (explicit) return explicit;
  if (!chatUrl) return undefined;
  return chatUrl.endsWith("/chat")
    ? `${chatUrl.slice(0, -"/chat".length)}/chat/stream`
    : `${chatUrl}/stream`;
}

const streamUrl = resolveStreamUrl();

export interface ChatContext {
  analysis: HyperLocalAnalysis;
  /** The user's own last-computed finance/scheme results, if any. */
  financeContext?: unknown;
  /** Which Ask UdyamAI role (persona) should answer. */
  persona?: ChatPersonaId;
}

/**
 * Builds the client-side context messages. The persona instructions live on
 * the proxy (see server/openai-proxy.mjs) so the client cannot rewrite the
 * assistant's guardrails — here we only pass the user's own verified data.
 */
function buildContextMessages(context: ChatContext) {
  const messages = [
    {
      role: "system",
      content: `Verified market analysis context:\n${JSON.stringify(context.analysis)}`,
    },
  ];
  if (context.financeContext) {
    messages.push({
      role: "system",
      content: `Verified finance/scheme context:\n${JSON.stringify(context.financeContext)}`,
    });
  }
  return messages;
}

function buildBody(message: string, history: ChatMessage[], context: ChatContext) {
  return {
    persona: context.persona,
    messages: buildContextMessages(context),
    history: history.map((item) => ({
      role: item.role,
      content: item.content,
    })),
    message,
  };
}

/**
 * Non-streaming call to the server-side proxy. API keys must stay on that
 * server; this browser client intentionally does not accept or send one.
 */
export async function askOpenAI(
  message: string,
  history: ChatMessage[],
  context: ChatContext,
): Promise<string | null> {
  if (!chatUrl) return null;

  const response = await fetch(chatUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildBody(message, history, context)),
    signal: AbortSignal.timeout(20000),
  });

  if (!response.ok) return null;
  const data = (await response.json()) as OpenAiResponse;
  return data.choices?.[0]?.message?.content?.trim() || null;
}

/**
 * Real-time streaming call. Streams tokens to `onToken` as they arrive and
 * resolves with the full reply. Returns null (so callers can fall back) when
 * the proxy is not configured or streaming is unavailable.
 */
export async function askOpenAIStream(
  message: string,
  history: ChatMessage[],
  context: ChatContext,
  onToken: (token: string) => void,
  signal?: AbortSignal,
): Promise<string | null> {
  if (!streamUrl) return null;

  let response: Response;
  try {
    response = await fetch(streamUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildBody(message, history, context)),
      signal,
    });
  } catch {
    return null;
  }

  if (!response.ok || !response.body) return null;

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let reply = "";

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
        if (data === "[DONE]") continue;
        try {
          const chunk = JSON.parse(data) as { token?: string };
          if (chunk.token) {
            reply += chunk.token;
            onToken(chunk.token);
          }
        } catch {
          // ignore malformed chunks
        }
      }
    }
  } catch {
    // aborted or connection dropped mid-stream; return whatever arrived
  }

  return reply.trim() || null;
}
