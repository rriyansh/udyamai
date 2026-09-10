import type { AnalysisInput, HyperLocalAnalysis, Radius } from "@/lib/types";
import { create } from "zustand";

export const ANALYSIS_STAGES = [
  "Location",
  "Market",
  "Competitors",
  "Demand",
  "Pricing",
  "SWOT",
  "Risk",
  "Finance",
  "Schemes",
  "Report",
] as const;

export type AnalysisStage = (typeof ANALYSIS_STAGES)[number];

interface AnalysisState {
  current: HyperLocalAnalysis | null;
  input: AnalysisInput | null;
  radius: Radius;
  running: boolean;
  stage: number;
  source: "backend" | "demo" | null;
  setRadius: (radius: Radius) => void;
  setInput: (input: AnalysisInput) => void;
  start: () => void;
  advanceStage: () => void;
  complete: (analysis: HyperLocalAnalysis, source: "backend" | "demo") => void;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisState>()((set) => ({
  current: null,
  input: null,
  radius: "5km",
  running: false,
  stage: 0,
  source: null,
  setRadius: (radius) => set({ radius }),
  setInput: (input) => set({ input }),
  start: () => set({ running: true, stage: 0, current: null, source: null }),
  advanceStage: () =>
    set((state) => ({
      stage: Math.min(state.stage + 1, ANALYSIS_STAGES.length),
    })),
  complete: (analysis, source) =>
    set({
      current: analysis,
      running: false,
      stage: ANALYSIS_STAGES.length,
      source,
    }),
  reset: () =>
    set({
      current: null,
      running: false,
      stage: 0,
      source: null,
    }),
}));
