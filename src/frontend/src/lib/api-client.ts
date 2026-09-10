import {
  Radius as BackendRadius,
  Variant_user_assistant,
  createActor,
} from "@/backend";
import { generateDemoAnalysis } from "@/lib/analysis-engine";
import {
  computeFinancialPlan as engineComputeFinancialPlan,
  computeFinancing as engineComputeFinancing,
} from "@/lib/finance-engine";
import type {
  Amortization,
  AnalysisInput,
  AnalysisResult,
  BreakEven,
  CashRequirement,
  ChatMessage,
  ChatRequest,
  ChatResponse,
  Competitor,
  Confidence,
  Estimate,
  FinanceInput,
  FinancialPlan,
  Financing,
  GovernmentScheme,
  HyperLocalAnalysis,
  MapData,
  MarketReach,
  Moratorium,
  OperatingCosts,
  Pricing,
  PrincipalInterest,
  ProjectCostRange,
  Provenance,
  Radius,
  RepaymentRow,
  RiskAssessment,
  RiskCategory,
  SWOT,
  SchemeMatch,
  SchemeRoutingInput,
  SchemeRoutingResult,
  SchemeRule,
  SchemeStatus,
  Scores,
  WorkingCapital,
  WorkingCapitalInput,
} from "@/lib/types";
import { useActor } from "@caffeineai/core-infrastructure";

/**
 * Backend API client with graceful DEMO DATA fallback.
 * ------------------------------------------------------------------
 * Every operation first tries the real backend actor. When the backend
 * is unavailable (no actor, or the call throws), it falls back to a
 * clearly-labelled demo analysis generated client-side. Callers must
 * surface the returned `source` so users always know whether they are
 * looking at real or demo data.
 */

export type DataSource = "backend" | "demo";

export interface AnalysisRunResult {
  analysis: HyperLocalAnalysis;
  source: DataSource;
}

export interface ChatRunResult {
  reply: string;
  source: DataSource;
}

/* ---- backend -> frontend type mappers ---------------------------- */

function mapConfidence(value: string): Confidence {
  return value === "High" ? "High" : value === "Low" ? "Low" : "Medium";
}

function mapProvenance(value: string): Provenance {
  switch (value) {
    case "Observed":
      return "Observed";
    case "Calculated":
      return "Calculated";
    case "UserProvided":
      return "UserProvided";
    default:
      return "Estimated";
  }
}

function mapEstimate(value: {
  value: bigint;
  provenance: string;
  confidence: string;
}): Estimate {
  return {
    value: Number(value.value),
    provenance: mapProvenance(value.provenance),
    confidence: mapConfidence(value.confidence),
  };
}

function mapCompetitor(value: {
  id: bigint;
  name: string;
  lat: number;
  lng: number;
  distanceKm: number;
  priceRangeMin: bigint;
  priceRangeMax: bigint;
  priceRangeAvg: bigint;
}): Competitor {
  return {
    id: Number(value.id),
    name: value.name,
    lat: value.lat,
    lng: value.lng,
    distanceKm: value.distanceKm,
    priceRangeMin: Number(value.priceRangeMin),
    priceRangeMax: Number(value.priceRangeMax),
    priceRangeAvg: Number(value.priceRangeAvg),
  };
}

function mapMap(value: {
  userLocation: { lat: number; lng: number };
  competitors: Array<{
    id: bigint;
    name: string;
    lat: number;
    lng: number;
    distanceKm: number;
    priceRangeMin: bigint;
    priceRangeMax: bigint;
    priceRangeAvg: bigint;
  }>;
  competitorDensity: number;
  nearestCompetitors: Array<{
    id: bigint;
    name: string;
    lat: number;
    lng: number;
    distanceKm: number;
    priceRangeMin: bigint;
    priceRangeMax: bigint;
    priceRangeAvg: bigint;
  }>;
  averageDistance: number;
  businessClusters: Array<string>;
  underservedZones: Array<string>;
  reliableDataAvailable: boolean;
}): MapData {
  return {
    userLocation: value.userLocation,
    competitors: value.competitors.map(mapCompetitor),
    competitorDensity: value.competitorDensity,
    nearestCompetitors: value.nearestCompetitors.map(mapCompetitor),
    averageDistance: value.averageDistance,
    businessClusters: value.businessClusters,
    underservedZones: value.underservedZones,
    reliableDataAvailable: value.reliableDataAvailable,
  };
}

function mapScores(value: {
  demand: { score: bigint; explanation: string; reasoning: string };
  supplyGap: { score: bigint; explanation: string; reasoning: string };
  competition: { score: bigint; explanation: string; reasoning: string };
  opportunity: { score: bigint; explanation: string; reasoning: string };
}): Scores {
  const map = (
    s: {
      score: bigint;
      explanation: string;
      reasoning: string;
    },
    provenance: Provenance,
    confidence: Confidence,
  ) => ({
    score: Number(s.score),
    explanation: s.explanation,
    reasoning: s.reasoning,
    provenance,
    confidence,
  });
  return {
    demand: map(value.demand, "Estimated", "Medium"),
    supplyGap: map(value.supplyGap, "Calculated", "Medium"),
    competition: map(value.competition, "Observed", "Medium"),
    opportunity: map(value.opportunity, "Calculated", "Medium"),
  };
}

function mapPricing(value: {
  competitorPriceRange: { min: bigint; max: bigint; avg: bigint };
  productionCost: { value: bigint; provenance: string; confidence: string };
  transportCost: { value: bigint; provenance: string; confidence: string };
  packagingCost: { value: bigint; provenance: string; confidence: string };
  operatingCost: { value: bigint; provenance: string; confidence: string };
  recommendedPriceRange: { min: bigint; max: bigint };
  estimatedMargin: { value: bigint; provenance: string; confidence: string };
}): Pricing {
  return {
    competitorPriceRange: {
      min: Number(value.competitorPriceRange.min),
      max: Number(value.competitorPriceRange.max),
      avg: Number(value.competitorPriceRange.avg),
    },
    productionCost: mapEstimate(value.productionCost),
    transportCost: mapEstimate(value.transportCost),
    packagingCost: mapEstimate(value.packagingCost),
    operatingCost: mapEstimate(value.operatingCost),
    recommendedPriceRange: {
      min: Number(value.recommendedPriceRange.min),
      max: Number(value.recommendedPriceRange.max),
    },
    estimatedMargin: mapEstimate(value.estimatedMargin),
  };
}

function mapSwot(value: {
  strengths: Array<string>;
  weaknesses: Array<string>;
  opportunities: Array<string>;
  threats: Array<string>;
}): SWOT {
  return {
    strengths: value.strengths,
    weaknesses: value.weaknesses,
    opportunities: value.opportunities,
    threats: value.threats,
  };
}

function mapRisk(value: {
  categories: Array<{
    category: string;
    level: string;
    why: string;
    whatToDo: string;
  }>;
}): RiskAssessment {
  const categories: RiskCategory[] = value.categories.map((c) => ({
    category: c.category,
    level: c.level === "low" ? "low" : c.level === "high" ? "high" : "medium",
    why: c.why,
    whatToDo: c.whatToDo,
  }));
  return { categories };
}

function mapMarket(value: {
  estimatedReach: { value: bigint; provenance: string; confidence: string };
  potentialCustomerBase: {
    value: bigint;
    provenance: string;
    confidence: string;
  };
  nearbyMarkets: Array<string>;
  distributionChannels: Array<string>;
  accessibility: string;
  underservedOpportunities: Array<string>;
  demandIndicators: Array<string>;
  supplyIndicators: Array<string>;
  competitionLevel: string;
}): MarketReach {
  return {
    estimatedReach: mapEstimate(value.estimatedReach),
    potentialCustomerBase: mapEstimate(value.potentialCustomerBase),
    nearbyMarkets: value.nearbyMarkets,
    distributionChannels: value.distributionChannels,
    accessibility: value.accessibility,
    underservedOpportunities: value.underservedOpportunities,
    demandIndicators: value.demandIndicators,
    supplyIndicators: value.supplyIndicators,
    competitionLevel: value.competitionLevel,
  };
}

function mapResult(value: {
  market: Parameters<typeof mapMarket>[0];
  map: Parameters<typeof mapMap>[0];
  scores: Parameters<typeof mapScores>[0];
  pricing: Parameters<typeof mapPricing>[0];
  swot: Parameters<typeof mapSwot>[0];
  risk: Parameters<typeof mapRisk>[0];
}): AnalysisResult {
  return {
    market: mapMarket(value.market),
    map: mapMap(value.map),
    scores: mapScores(value.scores),
    pricing: mapPricing(value.pricing),
    swot: mapSwot(value.swot),
    risk: mapRisk(value.risk),
  };
}

/* ---- radius / input conversion ----------------------------------- */

function toBackendRadius(radius: Radius): BackendRadius {
  return radius === "5km" ? BackendRadius.R5km : BackendRadius.R10km;
}

function toBackendInput(input: AnalysisInput): {
  village: string;
  block: string;
  district: string;
  state: string;
  category: string;
  capital: bigint;
} {
  return {
    village: input.village,
    block: input.block,
    district: input.district,
    state: input.state,
    category: input.category,
    capital: BigInt(Math.round(input.capital)),
  };
}

/* ---- Phase 3: finance / scheme mappers --------------------------- */

function mapProjectCostRange(value: {
  min: bigint;
  max: bigint;
}): ProjectCostRange {
  return { min: Number(value.min), max: Number(value.max) };
}

function mapSchemeRule(value: {
  name: string;
  minProjectCost: bigint;
  maxProjectCost: bigint;
  loanPercent: bigint;
  beneficiaryContributionPercent: bigint;
  interestRatePercent: bigint;
  tenureMonths: bigint;
  moratoriumMonths: bigint;
}): SchemeRule {
  return {
    name: value.name,
    minProjectCost: Number(value.minProjectCost),
    maxProjectCost: Number(value.maxProjectCost),
    loanPercent: Number(value.loanPercent),
    beneficiaryContributionPercent: Number(
      value.beneficiaryContributionPercent,
    ),
    interestRatePercent: Number(value.interestRatePercent),
    tenureMonths: Number(value.tenureMonths),
    moratoriumMonths: Number(value.moratoriumMonths),
  };
}

function mapRepaymentRow(value: {
  month: bigint;
  openingBalance: bigint;
  principal: bigint;
  interest: bigint;
  emi: bigint;
  closingBalance: bigint;
}): RepaymentRow {
  return {
    month: Number(value.month),
    openingBalance: Number(value.openingBalance),
    principal: Number(value.principal),
    interest: Number(value.interest),
    emi: Number(value.emi),
    closingBalance: Number(value.closingBalance),
  };
}

function mapPrincipalInterest(value: {
  totalPrincipal: bigint;
  totalInterest: bigint;
  totalRepayment: bigint;
}): PrincipalInterest {
  return {
    totalPrincipal: Number(value.totalPrincipal),
    totalInterest: Number(value.totalInterest),
    totalRepayment: Number(value.totalRepayment),
  };
}

function mapAmortization(value: {
  emi: { value: bigint; provenance: string; confidence: string };
  totalRepayment: { value: bigint; provenance: string; confidence: string };
  totalInterest: { value: bigint; provenance: string; confidence: string };
  schedule: Array<{
    month: bigint;
    openingBalance: bigint;
    principal: bigint;
    interest: bigint;
    emi: bigint;
    closingBalance: bigint;
  }>;
  principalInterest: {
    totalPrincipal: bigint;
    totalInterest: bigint;
    totalRepayment: bigint;
  };
}): Amortization {
  return {
    emi: mapEstimate(value.emi),
    totalRepayment: mapEstimate(value.totalRepayment),
    totalInterest: mapEstimate(value.totalInterest),
    schedule: value.schedule.map(mapRepaymentRow),
    principalInterest: mapPrincipalInterest(value.principalInterest),
  };
}

function mapMoratorium(value: {
  moratoriumMonths: bigint;
  repaymentStartMonth: bigint;
  interestAccruedDuringMoratorium: {
    value: bigint;
    provenance: string;
    confidence: string;
  };
  explanation: string;
}): Moratorium {
  return {
    moratoriumMonths: Number(value.moratoriumMonths),
    repaymentStartMonth: Number(value.repaymentStartMonth),
    interestAccruedDuringMoratorium: mapEstimate(
      value.interestAccruedDuringMoratorium,
    ),
    explanation: value.explanation,
  };
}

function mapWorkingCapital(value: {
  initialRequirement: { value: bigint; provenance: string; confidence: string };
  monthlyRequirement: { value: bigint; provenance: string; confidence: string };
  emergencyBuffer: { value: bigint; provenance: string; confidence: string };
  totalRequirement: { value: bigint; provenance: string; confidence: string };
}): WorkingCapital {
  return {
    initialRequirement: mapEstimate(value.initialRequirement),
    monthlyRequirement: mapEstimate(value.monthlyRequirement),
    emergencyBuffer: mapEstimate(value.emergencyBuffer),
    totalRequirement: mapEstimate(value.totalRequirement),
  };
}

function mapBreakEven(value: {
  breakEvenSales: { value: bigint; provenance: string; confidence: string };
  breakEvenUnits?: { value: bigint; provenance: string; confidence: string };
  explanation: string;
  assumptions: Array<string>;
}): BreakEven {
  return {
    breakEvenSales: mapEstimate(value.breakEvenSales),
    breakEvenUnits: value.breakEvenUnits
      ? mapEstimate(value.breakEvenUnits)
      : undefined,
    explanation: value.explanation,
    assumptions: value.assumptions,
  };
}

function mapCashRequirement(value: {
  projectCost: { value: bigint; provenance: string; confidence: string };
  workingCapital: { value: bigint; provenance: string; confidence: string };
  buffer: { value: bigint; provenance: string; confidence: string };
  total: { value: bigint; provenance: string; confidence: string };
}): CashRequirement {
  return {
    projectCost: mapEstimate(value.projectCost),
    workingCapital: mapEstimate(value.workingCapital),
    buffer: mapEstimate(value.buffer),
    total: mapEstimate(value.total),
  };
}

function mapFinancing(value: {
  feasibleProjectCost: {
    value: bigint;
    provenance: string;
    confidence: string;
  };
  beneficiaryContribution: {
    value: bigint;
    provenance: string;
    confidence: string;
  };
  loanAmount: { value: bigint; provenance: string; confidence: string };
  maximumLoan: { value: bigint; provenance: string; confidence: string };
  scheme: {
    name: string;
    minProjectCost: bigint;
    maxProjectCost: bigint;
    loanPercent: bigint;
    beneficiaryContributionPercent: bigint;
    interestRatePercent: bigint;
    tenureMonths: bigint;
    moratoriumMonths: bigint;
  };
}): Financing {
  return {
    feasibleProjectCost: mapEstimate(value.feasibleProjectCost),
    beneficiaryContribution: mapEstimate(value.beneficiaryContribution),
    loanAmount: mapEstimate(value.loanAmount),
    maximumLoan: mapEstimate(value.maximumLoan),
    scheme: mapSchemeRule(value.scheme),
  };
}

function mapFinancialPlan(value: {
  financing: Parameters<typeof mapFinancing>[0];
  amortization: Parameters<typeof mapAmortization>[0];
  moratorium: Parameters<typeof mapMoratorium>[0];
  workingCapital: Parameters<typeof mapWorkingCapital>[0];
  cashRequirement: Parameters<typeof mapCashRequirement>[0];
  monthlyOperatingCost: {
    value: bigint;
    provenance: string;
    confidence: string;
  };
  breakEven: Parameters<typeof mapBreakEven>[0];
}): FinancialPlan {
  return {
    financing: mapFinancing(value.financing),
    amortization: mapAmortization(value.amortization),
    moratorium: mapMoratorium(value.moratorium),
    workingCapital: mapWorkingCapital(value.workingCapital),
    cashRequirement: mapCashRequirement(value.cashRequirement),
    monthlyOperatingCost: mapEstimate(value.monthlyOperatingCost),
    breakEven: mapBreakEven(value.breakEven),
  };
}

function mapSchemeStatus(value: string): SchemeStatus {
  return value === "Active"
    ? "Active"
    : value === "Inactive"
      ? "Inactive"
      : "UnderReview";
}

function mapScheme(value: {
  id: bigint;
  name: string;
  eligibility: string;
  beneficiaryType: string;
  projectCostRange: { min: bigint; max: bigint };
  loanPercentage?: bigint;
  interestRate?: number;
  tenureMonths?: bigint;
  moratoriumMonths?: bigint;
  marginRequirement?: bigint;
  documents: Array<string>;
  officialSource: string;
  lastVerifiedDate: bigint;
  status: string;
}): GovernmentScheme {
  return {
    id: Number(value.id),
    name: value.name,
    eligibility: value.eligibility,
    beneficiaryType: value.beneficiaryType,
    projectCostRange: mapProjectCostRange(value.projectCostRange),
    loanPercentage:
      value.loanPercentage !== undefined
        ? Number(value.loanPercentage)
        : undefined,
    interestRate: value.interestRate,
    tenureMonths:
      value.tenureMonths !== undefined ? Number(value.tenureMonths) : undefined,
    moratoriumMonths:
      value.moratoriumMonths !== undefined
        ? Number(value.moratoriumMonths)
        : undefined,
    marginRequirement:
      value.marginRequirement !== undefined
        ? Number(value.marginRequirement)
        : undefined,
    documents: value.documents,
    officialSource: value.officialSource,
    lastVerifiedDate: Number(value.lastVerifiedDate),
    status: mapSchemeStatus(value.status),
  };
}

function mapSchemeMatch(value: {
  scheme: Parameters<typeof mapScheme>[0];
  whyMayFit: string;
  projectCostLimit: { min: bigint; max: bigint };
  contribution?: bigint;
  loan?: bigint;
  interestRate?: number;
  tenureMonths?: bigint;
  moratoriumMonths?: bigint;
  requiredDocuments: Array<string>;
  officialVerificationNote: string;
}): SchemeMatch {
  return {
    scheme: mapScheme(value.scheme),
    whyMayFit: value.whyMayFit,
    projectCostLimit: mapProjectCostRange(value.projectCostLimit),
    contribution:
      value.contribution !== undefined ? Number(value.contribution) : undefined,
    loan: value.loan !== undefined ? Number(value.loan) : undefined,
    interestRate: value.interestRate,
    tenureMonths:
      value.tenureMonths !== undefined ? Number(value.tenureMonths) : undefined,
    moratoriumMonths:
      value.moratoriumMonths !== undefined
        ? Number(value.moratoriumMonths)
        : undefined,
    requiredDocuments: value.requiredDocuments,
    officialVerificationNote: value.officialVerificationNote,
  };
}

function mapSchemeRoutingResult(value: {
  heading: string;
  matches: Array<Parameters<typeof mapSchemeMatch>[0]>;
}): SchemeRoutingResult {
  return {
    heading: value.heading,
    matches: value.matches.map(mapSchemeMatch),
  };
}

/* ---- Phase 3: input conversion ----------------------------------- */

function toBackendOperatingCosts(op: OperatingCosts): {
  rent: bigint;
  salary: bigint;
  rawMaterial: bigint;
  electricity: bigint;
  transport: bigint;
  packaging: bigint;
  marketing: bigint;
  maintenance: bigint;
  other: bigint;
} {
  return {
    rent: BigInt(Math.round(op.rent)),
    salary: BigInt(Math.round(op.salary)),
    rawMaterial: BigInt(Math.round(op.rawMaterial)),
    electricity: BigInt(Math.round(op.electricity)),
    transport: BigInt(Math.round(op.transport)),
    packaging: BigInt(Math.round(op.packaging)),
    marketing: BigInt(Math.round(op.marketing)),
    maintenance: BigInt(Math.round(op.maintenance)),
    other: BigInt(Math.round(op.other)),
  };
}

function toBackendWorkingCapitalInput(wc: WorkingCapitalInput): {
  initialRequirement: bigint;
  monthlyRequirement: bigint;
  emergencyBufferPercent: bigint;
} {
  return {
    initialRequirement: BigInt(Math.round(wc.initialRequirement)),
    monthlyRequirement: BigInt(Math.round(wc.monthlyRequirement)),
    emergencyBufferPercent: BigInt(Math.round(wc.emergencyBufferPercent)),
  };
}

function toBackendFinanceInput(input: FinanceInput): {
  proposedProjectCost: bigint;
  ownCapital: bigint;
  loanRequirement: bigint;
  tenureMonths: bigint;
  interestRatePercent: bigint;
  marginPercent: bigint;
  moratoriumMonths: bigint;
  operatingCosts: ReturnType<typeof toBackendOperatingCosts>;
  workingCapital: ReturnType<typeof toBackendWorkingCapitalInput>;
  pricePerUnit: bigint;
  variableCostPerUnit: bigint;
} {
  return {
    proposedProjectCost: BigInt(Math.round(input.proposedProjectCost)),
    ownCapital: BigInt(Math.round(input.ownCapital)),
    loanRequirement: BigInt(Math.round(input.loanRequirement)),
    tenureMonths: BigInt(Math.round(input.tenureMonths)),
    interestRatePercent: BigInt(Math.round(input.interestRatePercent)),
    marginPercent: BigInt(Math.round(input.marginPercent)),
    moratoriumMonths: BigInt(Math.round(input.moratoriumMonths)),
    operatingCosts: toBackendOperatingCosts(input.operatingCosts),
    workingCapital: toBackendWorkingCapitalInput(input.workingCapital),
    pricePerUnit: BigInt(Math.round(input.pricePerUnit)),
    variableCostPerUnit: BigInt(Math.round(input.variableCostPerUnit)),
  };
}

function toBackendSchemeRule(rule: SchemeRule): {
  name: string;
  minProjectCost: bigint;
  maxProjectCost: bigint;
  loanPercent: bigint;
  beneficiaryContributionPercent: bigint;
  interestRatePercent: bigint;
  tenureMonths: bigint;
  moratoriumMonths: bigint;
} {
  return {
    name: rule.name,
    minProjectCost: BigInt(Math.round(rule.minProjectCost)),
    maxProjectCost: BigInt(Math.round(rule.maxProjectCost)),
    loanPercent: BigInt(Math.round(rule.loanPercent)),
    beneficiaryContributionPercent: BigInt(
      Math.round(rule.beneficiaryContributionPercent),
    ),
    interestRatePercent: BigInt(Math.round(rule.interestRatePercent)),
    tenureMonths: BigInt(Math.round(rule.tenureMonths)),
    moratoriumMonths: BigInt(Math.round(rule.moratoriumMonths)),
  };
}

function toBackendSchemeRoutingInput(input: SchemeRoutingInput): {
  projectCost: bigint;
  businessCategory: string;
  beneficiaryCategory: string;
  contribution: bigint;
  location: string;
} {
  return {
    projectCost: BigInt(Math.round(input.projectCost)),
    businessCategory: input.businessCategory,
    beneficiaryCategory: input.beneficiaryCategory,
    contribution: BigInt(Math.round(input.contribution)),
    location: input.location,
  };
}

/* ---- grounded demo reply ----------------------------------------- */

/**
 * Builds a clearly-labelled, context-grounded demo reply when the
 * backend is unavailable. The assistant is strictly an explanation /
 * recommendation layer: it never invents loan amounts, scheme
 * eligibility, competitor numbers, financial calculations, or factual
 * market values. It only reasons from the user's own analysis data.
 */
function buildGroundedDemoReply(
  message: string,
  analysis: HyperLocalAnalysis | null,
): string {
  if (!analysis) {
    return "I can help once you run an analysis. Start a new analysis so I can answer questions about your specific market context. I never invent loan amounts, scheme eligibility, or market figures.";
  }

  const { input, result } = analysis;
  const label = input.category;
  const demand = result.scores.demand.score;
  const competition = result.scores.competition.score;
  const opportunity = result.scores.opportunity.score;
  const highRisks = result.risk.categories
    .filter((c) => c.level === "high")
    .map((c) => c.category);

  const lower = message.toLowerCase();

  if (lower.includes("suitable") || lower.includes("village")) {
    return `Based on your ${label} analysis in ${input.village}, ${input.district}, ${input.state}, demand scores ${demand}/100 and the overall opportunity scores ${opportunity}/100. That suggests the business is ${
      opportunity >= 70 ? "reasonably suitable" : "worth a closer look"
    } for your village. This is a demo explanation grounded in your own analysis data — I never invent market figures.`;
  }

  if (lower.includes("competition")) {
    return `Competition scores ${competition}/100 in your ${label} analysis, which is ${
      competition >= 60 ? "high" : competition >= 40 ? "moderate" : "low"
    }. This comes from the competitor data in your report. I can't invent competitor numbers — rely on the clearly-labelled data shown in this analysis.`;
  }

  if (lower.includes("risk")) {
    const risks = highRisks.length
      ? highRisks.join(", ")
      : "no High-rated categories";
    return `Your analysis rates ${risks} as the main risk areas. To reduce risk, focus on the recommended actions in the risk section of your report. This is a demo explanation grounded in your own analysis data.`;
  }

  if (lower.includes("opportunity")) {
    return `Your overall opportunity scores ${opportunity}/100, driven by demand at ${demand}/100 and a supply gap in your area. The opportunity section of your report explains this in plain language. I never invent market values.`;
  }

  if (lower.includes("margin")) {
    return `Margin is the share of each sale you keep after covering production, transport, packaging, and operating costs. Your analysis estimates a margin for your ${label} business — see the pricing section for the exact figure. I never invent financial calculations.`;
  }

  return `I can explain this ${label} analysis in plain language. Based on your results, focus on the highest-scoring opportunity and any High-rated risks. This is a demo explanation grounded in your own analysis data — I never invent loan amounts, scheme eligibility, competitor numbers, or market values.`;
}

/* ---- public API hook --------------------------------------------- */

export function useAnalysisApi() {
  const { actor, isFetching } = useActor(createActor);
  const backendAvailable = !!actor && !isFetching;

  async function runAnalysis(
    input: AnalysisInput,
    radius: Radius,
  ): Promise<AnalysisRunResult> {
    if (actor) {
      try {
        const result = await actor.runAnalysis(
          toBackendInput(input),
          toBackendRadius(radius),
        );
        // The backend assigns a monotonically increasing Nat id to each stored
        // analysis, but runAnalysis returns only the derived result. Read the
        // just-created id back via listAnalyses (the highest id is the newest
        // record) and store it so Ask UdyamAI chat can ground its reply in this
        // analysis instead of a frontend-only an-<timestamp> id.
        let backendId: number | undefined;
        try {
          const stored = await actor.listAnalyses();
          const latest = stored.reduce<bigint | null>(
            (max, a) => (max === null || a.id > max ? a.id : max),
            null,
          );
          if (latest !== null) backendId = Number(latest);
        } catch {
          backendId = undefined;
        }
        return {
          analysis: {
            id: `an-${Date.now()}`,
            backendId,
            input,
            radius,
            createdAt: Date.now(),
            result: mapResult(result),
          },
          source: "backend",
        };
      } catch {
        // fall through to demo data
      }
    }
    return { analysis: generateDemoAnalysis(input, radius), source: "demo" };
  }

  async function chat(
    request: ChatRequest,
    analysis: HyperLocalAnalysis | null,
  ): Promise<ChatRunResult> {
    // Ground the backend reply in the backend's stored Nat analysis id. When
    // the analysis is demo data (no backendId), keep the demo reply path.
    const backendId = analysis?.backendId;
    if (actor && backendId !== undefined) {
      try {
        const history: Array<{
          content: string;
          role: Variant_user_assistant;
        }> = request.history.map((m) => ({
          content: m.content,
          role:
            m.role === "user"
              ? Variant_user_assistant.user
              : Variant_user_assistant.assistant,
        }));
        const response = await actor.chat({
          analysisId: BigInt(backendId),
          message: request.message,
          history,
        });
        return { reply: response.reply, source: "backend" };
      } catch {
        // fall through to demo reply
      }
    }
    return {
      reply: buildGroundedDemoReply(request.message, analysis),
      source: "demo",
    };
  }

  return { runAnalysis, chat, backendAvailable };
}

/* ---- Phase 3: finance / scheme API ------------------------------- */

export interface FinanceRunResult<T> {
  data: T;
  source: DataSource;
}

/**
 * Backend finance + scheme client with graceful DEMO fallback.
 * Every operation first tries the real backend actor. When the backend is
 * unavailable (no actor, or the call throws), it falls back to the
 * deterministic client-side finance engine so figures are never invented.
 * Callers must surface the returned `source` so users always know whether
 * they are looking at real or computed figures.
 */
export function useFinanceApi() {
  const { actor, isFetching } = useActor(createActor);
  const backendAvailable = !!actor && !isFetching;

  async function computeFinancialPlan(
    input: FinanceInput,
    rule: SchemeRule,
  ): Promise<FinanceRunResult<FinancialPlan>> {
    if (actor) {
      try {
        const result = await actor.computeFinancialPlan(
          toBackendFinanceInput(input),
          toBackendSchemeRule(rule),
        );
        return { data: mapFinancialPlan(result), source: "backend" };
      } catch {
        // fall through to deterministic engine
      }
    }
    return {
      data: engineComputeFinancialPlan(input, rule),
      source: "demo",
    };
  }

  async function computeFinancing(
    input: FinanceInput,
    rule: SchemeRule,
  ): Promise<FinanceRunResult<Financing>> {
    if (actor) {
      try {
        const result = await actor.computeFinancing(
          toBackendFinanceInput(input),
          toBackendSchemeRule(rule),
        );
        return { data: mapFinancing(result), source: "backend" };
      } catch {
        // fall through to deterministic engine
      }
    }
    return { data: engineComputeFinancing(input, rule), source: "demo" };
  }

  async function routeSchemes(
    input: SchemeRoutingInput,
  ): Promise<FinanceRunResult<SchemeRoutingResult>> {
    if (actor) {
      try {
        const result = await actor.routeSchemes(
          toBackendSchemeRoutingInput(input),
        );
        return { data: mapSchemeRoutingResult(result), source: "backend" };
      } catch {
        // fall through to demo
      }
    }
    return {
      data: { heading: "Potentially applicable schemes", matches: [] },
      source: "demo",
    };
  }

  async function listSchemes(): Promise<FinanceRunResult<GovernmentScheme[]>> {
    if (actor) {
      try {
        const result = await actor.listSchemes();
        return { data: result.map(mapScheme), source: "backend" };
      } catch {
        // fall through to demo
      }
    }
    return { data: [], source: "demo" };
  }

  async function getScheme(
    id: number,
  ): Promise<FinanceRunResult<GovernmentScheme | null>> {
    if (actor) {
      try {
        const result = await actor.getScheme(BigInt(id));
        return { data: result ? mapScheme(result) : null, source: "backend" };
      } catch {
        // fall through to demo
      }
    }
    return { data: null, source: "demo" };
  }

  return {
    computeFinancialPlan,
    computeFinancing,
    routeSchemes,
    listSchemes,
    getScheme,
    backendAvailable,
  };
}

export type { ChatMessage };
