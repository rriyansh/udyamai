import { useFinanceApi } from "@/lib/api-client";
import type {
  FinanceInput,
  GovernmentScheme,
  SchemeRoutingInput,
  SchemeRule,
} from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

/**
 * React Query hooks for the Phase 3 financial planning and government
 * scheme backend methods. Each hook wraps the finance API client, which
 * falls back to the deterministic client-side engine when the backend is
 * unavailable. The returned `source` field tells callers whether the data
 * came from the real backend or the computed fallback.
 */

export function useFinancialPlan(input: FinanceInput, rule: SchemeRule) {
  const api = useFinanceApi();
  return useQuery({
    queryKey: ["financialPlan", input, rule],
    queryFn: async () => {
      const result = await api.computeFinancialPlan(input, rule);
      return result;
    },
    enabled: !!api.backendAvailable,
  });
}

export function useFinancing(input: FinanceInput, rule: SchemeRule) {
  const api = useFinanceApi();
  return useQuery({
    queryKey: ["financing", input, rule],
    queryFn: async () => {
      const result = await api.computeFinancing(input, rule);
      return result;
    },
    enabled: !!api.backendAvailable,
  });
}

export function useRouteSchemes(input: SchemeRoutingInput) {
  const api = useFinanceApi();
  return useQuery({
    queryKey: ["routeSchemes", input],
    queryFn: async () => {
      const result = await api.routeSchemes(input);
      return result;
    },
    enabled: !!api.backendAvailable,
  });
}

export function useSchemes() {
  const api = useFinanceApi();
  return useQuery({
    queryKey: ["schemes"],
    queryFn: async () => {
      const result = await api.listSchemes();
      return result;
    },
    enabled: !!api.backendAvailable,
  });
}

export function useScheme(id: number) {
  const api = useFinanceApi();
  return useQuery({
    queryKey: ["scheme", id],
    queryFn: async () => {
      const result = await api.getScheme(id);
      return result;
    },
    enabled: !!api.backendAvailable && id > 0,
  });
}

export type { GovernmentScheme };
