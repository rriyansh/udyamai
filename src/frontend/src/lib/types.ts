export type RiskLevel = "low" | "medium" | "high";

export type BusinessCategoryId =
  | "dairy"
  | "poultry"
  | "goat"
  | "fisheries"
  | "organic-farming"
  | "horticulture"
  | "food-processing"
  | "handicrafts"
  | "tailoring"
  | "agro-processing"
  | "beekeeping"
  | "mushroom"
  | "animal-feed"
  | "rural-tourism"
  | "agri-equipment";

export interface BusinessCategory {
  id: BusinessCategoryId;
  name: string;
  description: string;
  icon: string;
}

export interface OnboardingProfile {
  name: string;
  village: string;
  block: string;
  district: string;
  state: string;
  marginCapital: number;
  businessCategory: BusinessCategoryId;
  landAssets: number;
  experienceYears: number;
  expectedInvestment: number;
  expectedMonthlySales: number;
  expectedLoanRequirement: number;
  hasLand?: boolean;
  landAreaSqFt?: number;
}

export interface OnboardingDraft extends Partial<OnboardingProfile> {
  landAvailability?: "yes" | "no";
}

export type AnalysisStatus = "completed" | "in-progress" | "draft";

export interface Analysis {
  id: string;
  title: string;
  category: BusinessCategoryId;
  createdAt: number;
  score: number;
  risk: RiskLevel;
  status: AnalysisStatus;
  summary: string;
}

export interface MarketOpportunity {
  id: string;
  category: BusinessCategoryId;
  demand: number;
  competition: number;
  growth: number;
  seasonality: string;
  priceTrend: number;
  summary: string;
}

export interface FinanceSnapshot {
  capital: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  monthlyProfit: number;
  profitMargin: number;
  breakEvenMonths: number;
  cashReserve: number;
  loanRequirement: number;
  repaymentCapacity: number;
}

export interface Scheme {
  id: string;
  name: string;
  provider: string;
  category: string;
  benefit: string;
  eligibility: string;
  maxAmount: number;
  interestRate: string;
  matchScore: number;
  deadline?: string;
  description: string;
}

export interface Loan {
  id: string;
  name: string;
  provider: string;
  type: string;
  amount: number;
  interestRate: string;
  tenureMonths: number;
  processingFee: string;
  collateralRequired: boolean;
  matchScore: number;
  description: string;
}

export type ReportType =
  | "analysis"
  | "finance"
  | "market"
  | "scheme"
  | "what-if";

export interface Report {
  id: string;
  title: string;
  type: ReportType;
  createdAt: number;
  summary: string;
  sourceId?: string;
  downloadUrl?: string;
}

export interface Scenario {
  id: string;
  label: string;
  investment: number;
  monthlySales: number;
  monthlyProfit: number;
  paybackMonths: number;
  risk: RiskLevel;
}

export interface VoiceSettings {
  enabled: boolean;
  rate: number;
  pitch: number;
  voiceURI: string | null;
}

export interface NotificationSettings {
  enabled: boolean;
  email: boolean;
  push: boolean;
}

export interface PrivacySettings {
  shareData: boolean;
  analytics: boolean;
}

export interface AccessibilitySettings {
  largeText: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
}

export type ThemeMode = "system" | "light" | "dark";

export interface AppSettings {
  theme: ThemeMode;
  language: string;
  voice: VoiceSettings;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  accessibility: AccessibilitySettings;
  autoRead: boolean;
}

/* ------------------------------------------------------------------ */
/* Phase 2 — Hyper-local market analysis domain types                  */
/* ------------------------------------------------------------------ */

export type Radius = "5km" | "10km";

export type Provenance =
  | "Estimated"
  | "Observed"
  | "Calculated"
  | "UserProvided";

export type Confidence = "High" | "Medium" | "Low";

export interface AnalysisInput {
  village: string;
  block: string;
  district: string;
  state: string;
  category: string;
  capital: number;
}

/** A single estimate with its provenance label and confidence badge. */
export interface Estimate {
  value: number;
  provenance: Provenance;
  confidence: Confidence;
}

export interface Competitor {
  id: number;
  name: string;
  lat: number;
  lng: number;
  distanceKm: number;
  priceRangeMin: number;
  priceRangeMax: number;
  priceRangeAvg: number;
}

export interface MapData {
  userLocation: { lat: number; lng: number };
  competitors: Competitor[];
  competitorDensity: number;
  nearestCompetitors: Competitor[];
  averageDistance: number;
  businessClusters: string[];
  underservedZones: string[];
  reliableDataAvailable: boolean;
}

export interface ScoreCard {
  score: number;
  explanation: string;
  reasoning: string;
  provenance: Provenance;
  confidence: Confidence;
}

export interface Scores {
  demand: ScoreCard;
  supplyGap: ScoreCard;
  competition: ScoreCard;
  opportunity: ScoreCard;
}

export interface Pricing {
  competitorPriceRange: { min: number; max: number; avg: number };
  productionCost: Estimate;
  transportCost: Estimate;
  packagingCost: Estimate;
  operatingCost: Estimate;
  recommendedPriceRange: { min: number; max: number };
  estimatedMargin: Estimate;
}

export interface SWOT {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

export interface RiskCategory {
  category: string;
  level: RiskLevel;
  why: string;
  whatToDo: string;
}

export interface RiskAssessment {
  categories: RiskCategory[];
}

export interface MarketReach {
  estimatedReach: Estimate;
  potentialCustomerBase: Estimate;
  nearbyMarkets: string[];
  distributionChannels: string[];
  accessibility: string;
  underservedOpportunities: string[];
  demandIndicators: string[];
  supplyIndicators: string[];
  competitionLevel: string;
}

export interface AnalysisResult {
  market: MarketReach;
  map: MapData;
  scores: Scores;
  pricing: Pricing;
  swot: SWOT;
  risk: RiskAssessment;
}

/**
 * The full hyper-local analysis produced by running the Phase 2 engine.
 * Distinct from the Phase 1 summary `Analysis` type used by the dashboard.
 */
export interface HyperLocalAnalysis {
  id: string;
  /**
   * The backend's stored Nat analysis id, captured when a real backend
   * analysis is run. Present only for backend-sourced analyses; undefined
   * for demo data. Used to ground Ask UdyamAI chat in the current analysis.
   */
  backendId?: number;
  input: AnalysisInput;
  radius: Radius;
  createdAt: number;
  result: AnalysisResult;
}

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatRequest {
  analysisId: string;
  message: string;
  history: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
}

/* ------------------------------------------------------------------ */
/* Phase 3 — Financial planning & government scheme domain types       */
/* ------------------------------------------------------------------ */

export interface ProjectCostRange {
  min: number;
  max: number;
}

/** Monthly operating cost breakdown, in rupees. */
export interface OperatingCosts {
  rent: number;
  salary: number;
  rawMaterial: number;
  electricity: number;
  transport: number;
  packaging: number;
  marketing: number;
  maintenance: number;
  other: number;
}

export interface WorkingCapitalInput {
  initialRequirement: number;
  monthlyRequirement: number;
  emergencyBufferPercent: number;
}

/** Inputs to the deterministic financial planning engine. */
export interface FinanceInput {
  proposedProjectCost: number;
  ownCapital: number;
  loanRequirement: number;
  tenureMonths: number;
  interestRatePercent: number;
  marginPercent: number;
  moratoriumMonths: number;
  operatingCosts: OperatingCosts;
  workingCapital: WorkingCapitalInput;
  /** Selling price per unit, in rupees. Used for break-even. */
  pricePerUnit: number;
  /** Variable cost per unit, in rupees. Used for break-even. */
  variableCostPerUnit: number;
}

/** The financing terms of a matched government scheme. */
export interface SchemeRule {
  name: string;
  minProjectCost: number;
  maxProjectCost: number;
  loanPercent: number;
  beneficiaryContributionPercent: number;
  interestRatePercent: number;
  tenureMonths: number;
  moratoriumMonths: number;
}

export interface PrincipalInterest {
  totalPrincipal: number;
  totalInterest: number;
  totalRepayment: number;
}

export interface RepaymentRow {
  month: number;
  openingBalance: number;
  principal: number;
  interest: number;
  emi: number;
  closingBalance: number;
}

export interface Amortization {
  emi: Estimate;
  totalRepayment: Estimate;
  totalInterest: Estimate;
  schedule: RepaymentRow[];
  principalInterest: PrincipalInterest;
}

export interface Moratorium {
  moratoriumMonths: number;
  repaymentStartMonth: number;
  interestAccruedDuringMoratorium: Estimate;
  explanation: string;
}

export interface WorkingCapital {
  initialRequirement: Estimate;
  monthlyRequirement: Estimate;
  emergencyBuffer: Estimate;
  totalRequirement: Estimate;
}

export interface BreakEven {
  breakEvenSales: Estimate;
  breakEvenUnits?: Estimate;
  explanation: string;
  assumptions: string[];
}

export interface CashRequirement {
  projectCost: Estimate;
  workingCapital: Estimate;
  buffer: Estimate;
  total: Estimate;
}

export interface Financing {
  feasibleProjectCost: Estimate;
  beneficiaryContribution: Estimate;
  loanAmount: Estimate;
  maximumLoan: Estimate;
  scheme: SchemeRule;
}

export interface FinancialPlan {
  financing: Financing;
  amortization: Amortization;
  moratorium: Moratorium;
  workingCapital: WorkingCapital;
  cashRequirement: CashRequirement;
  monthlyOperatingCost: Estimate;
  breakEven: BreakEven;
}

export type SchemeStatus = "Active" | "Inactive" | "UnderReview";

/** A government scheme as returned by the backend (Phase 3). */
export interface GovernmentScheme {
  id: number;
  name: string;
  eligibility: string;
  beneficiaryType: string;
  projectCostRange: ProjectCostRange;
  loanPercentage?: number;
  interestRate?: number;
  tenureMonths?: number;
  moratoriumMonths?: number;
  marginRequirement?: number;
  documents: string[];
  officialSource: string;
  lastVerifiedDate: number;
  status: SchemeStatus;
}

export interface SchemeRoutingInput {
  projectCost: number;
  businessCategory: string;
  beneficiaryCategory: string;
  contribution: number;
  location: string;
}

export interface SchemeMatch {
  scheme: GovernmentScheme;
  whyMayFit: string;
  projectCostLimit: ProjectCostRange;
  contribution?: number;
  loan?: number;
  interestRate?: number;
  tenureMonths?: number;
  moratoriumMonths?: number;
  requiredDocuments: string[];
  officialVerificationNote: string;
}

export interface SchemeRoutingResult {
  heading: string;
  matches: SchemeMatch[];
}

export interface FeasibilityBreakdown {
  market: number;
  financial: number;
  competition: number;
  risk: number;
}

export interface FeasibilityScore {
  overall: number;
  breakdown: FeasibilityBreakdown;
  explanation: string;
}

export interface Recommendation {
  feasibility: FeasibilityScore;
  opportunity: string;
  risk: string;
  investment: number;
  projectCost: number;
  ownContribution: number;
  loan: number;
  potentialScheme: string;
  emi: number;
  workingCapital: number;
  nextAction: string;
}

export interface WhatIfScenario {
  id: string;
  label: string;
  revenue: number;
  profit: number;
  emi: number;
  breakEven: number;
  loan: number;
  cashRequirement: number;
  risk: RiskLevel;
}
