import type { FinancialPlan, SchemeRoutingResult } from "@/lib/types";
import { create } from "zustand";

interface ResultsState {
  financialPlan: FinancialPlan | null;
  schemeRouting: SchemeRoutingResult | null;
  setFinancialPlan: (plan: FinancialPlan) => void;
  setSchemeRouting: (result: SchemeRoutingResult) => void;
}

/**
 * Session-only store of the user's last computed finance/scheme results.
 * Lets Ask UdyamAI ground EMI/scheme answers in the same verified figures
 * shown on the Finance and Schemes pages, without ever recalculating them.
 */
export const useResultsStore = create<ResultsState>((set) => ({
  financialPlan: null,
  schemeRouting: null,
  setFinancialPlan: (plan) => set({ financialPlan: plan }),
  setSchemeRouting: (result) => set({ schemeRouting: result }),
}));
