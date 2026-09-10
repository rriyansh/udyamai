import { G as create } from "./index-CeuI7PIL.js";
const ANALYSIS_STAGES = [
  "Location",
  "Market",
  "Competitors",
  "Demand",
  "Pricing",
  "SWOT",
  "Risk",
  "Finance",
  "Schemes",
  "Report"
];
const useAnalysisStore = create()((set) => ({
  current: null,
  input: null,
  radius: "5km",
  running: false,
  stage: 0,
  source: null,
  setRadius: (radius) => set({ radius }),
  setInput: (input) => set({ input }),
  start: () => set({ running: true, stage: 0, current: null, source: null }),
  advanceStage: () => set((state) => ({
    stage: Math.min(state.stage + 1, ANALYSIS_STAGES.length)
  })),
  complete: (analysis, source) => set({
    current: analysis,
    running: false,
    stage: ANALYSIS_STAGES.length,
    source
  }),
  reset: () => set({
    current: null,
    running: false,
    stage: 0,
    source: null
  })
}));
export {
  ANALYSIS_STAGES as A,
  useAnalysisStore as u
};
