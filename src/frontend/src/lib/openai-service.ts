import type { ChatMessage, HyperLocalAnalysis } from "@/lib/types";

interface OpenAiResponse {
  choices?: Array<{ message?: { content?: string } }>;
}

const proxyUrl =
  (import.meta.env.VITE_OPENAI_PROXY_URL as string | undefined) ??
  (import.meta.env.DEV ? "http://localhost:8787/api/chat" : undefined);

/**
 * Calls a server-side OpenAI-compatible proxy. API keys must stay on that
 * server; this browser client intentionally does not accept or send one.
 */
export async function askOpenAI(
  message: string,
  history: ChatMessage[],
  analysis: HyperLocalAnalysis,
): Promise<string | null> {
  if (!proxyUrl) return null;

  const response = await fetch(proxyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content:
            "You explain verified UdyamAI analysis results. Never invent or recalculate EMI, prices, competitors, scheme eligibility, or financial projections. Say when data is estimated or unavailable.",
        },
        {
          role: "system",
          content: `Verified analysis context:\n${JSON.stringify(analysis)}`,
        },
        ...history.map((item) => ({ role: item.role, content: item.content })),
        { role: "user", content: message },
      ],
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) return null;
  const data = (await response.json()) as OpenAiResponse;
  return data.choices?.[0]?.message?.content?.trim() || null;
}
