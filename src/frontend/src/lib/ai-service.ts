import { useAnalysisApi } from "@/lib/api-client";
import type { ChatMessage, ChatRequest, HyperLocalAnalysis } from "@/lib/types";

/**
 * AI service — wraps the backend chat endpoint.
 * ------------------------------------------------------------------
 * The assistant is strictly an explanation/recommendation layer. It
 * never invents loan amounts, scheme eligibility, competitor numbers,
 * financial calculations, or factual market values. When the backend is
 * unavailable it returns a clearly-labelled demo reply grounded in the
 * user's own analysis data.
 *
 * `askStream` delivers tokens in real time through `onToken`; it falls
 * back to the same non-streaming path when the proxy is unavailable.
 */

export interface AskResult {
  reply: string;
  source: "backend" | "openai" | "stream" | "demo";
}

export function useAiService() {
  const { chat, backendAvailable } = useAnalysisApi();

  async function ask(
    request: ChatRequest,
    analysis: HyperLocalAnalysis | null,
  ): Promise<AskResult> {
    return chat(request, analysis);
  }

  async function askStream(
    request: ChatRequest,
    analysis: HyperLocalAnalysis | null,
    onToken: (token: string) => void,
  ): Promise<AskResult> {
    return chat(request, analysis, onToken);
  }

  return { ask, askStream, backendAvailable };
}

export type { ChatMessage };
