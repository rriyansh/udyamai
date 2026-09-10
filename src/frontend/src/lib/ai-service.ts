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
 */

export interface AskResult {
  reply: string;
  source: "backend" | "demo";
}

export function useAiService() {
  const { chat, backendAvailable } = useAnalysisApi();

  async function ask(
    request: ChatRequest,
    analysis: HyperLocalAnalysis | null,
  ): Promise<AskResult> {
    return chat(request, analysis);
  }

  return { ask, backendAvailable };
}

export type { ChatMessage };
