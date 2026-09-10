import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SWOT {
    weaknesses: Array<string>;
    strengths: Array<string>;
    threats: Array<string>;
    opportunities: Array<string>;
}
export interface ProjectCostRange {
    max: bigint;
    min: bigint;
}
export type Timestamp = bigint;
export interface WorkingCapitalInput {
    initialRequirement: bigint;
    monthlyRequirement: bigint;
    emergencyBufferPercent: bigint;
}
export interface Pricing {
    packagingCost: Estimate;
    recommendedPriceRange: {
        max: bigint;
        min: bigint;
    };
    productionCost: Estimate;
    transportCost: Estimate;
    competitorPriceRange: {
        avg: bigint;
        max: bigint;
        min: bigint;
    };
    operatingCost: Estimate;
    estimatedMargin: Estimate;
}
export interface Financing {
    loanAmount: Estimate;
    scheme: SchemeRule;
    feasibleProjectCost: Estimate;
    beneficiaryContribution: Estimate;
    maximumLoan: Estimate;
}
export type Result__1 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export interface CashRequirement {
    total: Estimate;
    projectCost: Estimate;
    buffer: Estimate;
    workingCapital: Estimate;
}
export interface RiskAssessment {
    categories: Array<RiskCategory>;
}
export interface Analysis {
    id: bigint;
    result: AnalysisResult;
    createdAt: bigint;
    radius: Radius;
    input: AnalysisInput;
}
export interface MapData {
    businessClusters: Array<string>;
    underservedZones: Array<string>;
    userLocation: {
        lat: number;
        lng: number;
    };
    reliableDataAvailable: boolean;
    competitors: Array<Competitor>;
    averageDistance: number;
    nearestCompetitors: Array<Competitor>;
    competitorDensity: number;
}
export interface WorkingCapital {
    initialRequirement: Estimate;
    emergencyBuffer: Estimate;
    totalRequirement: Estimate;
    monthlyRequirement: Estimate;
}
export interface Amortization {
    emi: Estimate;
    totalRepayment: Estimate;
    totalInterest: Estimate;
    schedule: Array<RepaymentRow>;
    principalInterest: PrincipalInterest;
}
export interface AnalysisInput {
    district: string;
    state: string;
    village: string;
    capital: bigint;
    category: string;
    block: string;
}
export interface ChatRequest {
    history: Array<ChatMessage>;
    analysisId: bigint;
    message: string;
}
export interface Cell {
    value: Value;
    name: string;
}
export interface ChatMessage {
    content: string;
    role: Variant_user_assistant;
}
export interface SchemeRule {
    maxProjectCost: bigint;
    moratoriumMonths: bigint;
    name: string;
    loanPercent: bigint;
    tenureMonths: bigint;
    beneficiaryContributionPercent: bigint;
    interestRatePercent: bigint;
    minProjectCost: bigint;
}
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export interface RepaymentRow {
    emi: bigint;
    month: bigint;
    principal: bigint;
    interest: bigint;
    closingBalance: bigint;
    openingBalance: bigint;
}
export interface FinanceInput {
    operatingCosts: OperatingCosts;
    moratoriumMonths: bigint;
    pricePerUnit: bigint;
    loanRequirement: bigint;
    ownCapital: bigint;
    tenureMonths: bigint;
    proposedProjectCost: bigint;
    variableCostPerUnit: bigint;
    interestRatePercent: bigint;
    marginPercent: bigint;
    workingCapital: WorkingCapitalInput;
}
export interface AnalysisResult {
    map: MapData;
    scores: Scores;
    risk: RiskAssessment;
    swot: SWOT;
    pricing: Pricing;
    market: MarketReach;
}
export interface SchemeRoutingResult {
    heading: string;
    matches: Array<SchemeMatch>;
}
export interface SchemeRoutingInput {
    projectCost: bigint;
    businessCategory: string;
    beneficiaryCategory: string;
    contribution: bigint;
    location: string;
}
export interface SchemeMatch {
    moratoriumMonths?: bigint;
    requiredDocuments: Array<string>;
    scheme: Scheme;
    loan?: bigint;
    officialVerificationNote: string;
    tenureMonths?: bigint;
    interestRate?: number;
    projectCostLimit: ProjectCostRange;
    contribution?: bigint;
    whyMayFit: string;
}
export interface FinancialPlan {
    moratorium: Moratorium;
    breakEven: BreakEven;
    financing: Financing;
    workingCapital: WorkingCapital;
    cashRequirement: CashRequirement;
    monthlyOperatingCost: Estimate;
    amortization: Amortization;
}
export interface BreakEven {
    explanation: string;
    breakEvenSales: Estimate;
    breakEvenUnits?: Estimate;
    assumptions: Array<string>;
}
export interface ScoreCard {
    explanation: string;
    reasoning: string;
    score: bigint;
}
export interface PrincipalInterest {
    totalRepayment: bigint;
    totalInterest: bigint;
    totalPrincipal: bigint;
}
export interface Scheme {
    id: bigint;
    status: SchemeStatus;
    documents: Array<string>;
    moratoriumMonths?: bigint;
    projectCostRange: ProjectCostRange;
    beneficiaryType: string;
    marginRequirement?: bigint;
    name: string;
    eligibility: string;
    tenureMonths?: bigint;
    loanPercentage?: bigint;
    interestRate?: number;
    lastVerifiedDate: Timestamp;
    officialSource: string;
}
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface Competitor {
    id: bigint;
    lat: number;
    lng: number;
    name: string;
    distanceKm: number;
    priceRangeAvg: bigint;
    priceRangeMax: bigint;
    priceRangeMin: bigint;
}
export interface Result {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export interface RiskCategory {
    why: string;
    whatToDo: string;
    level: RiskLevel;
    category: string;
}
export interface ChatResponse {
    reply: string;
}
export interface Scores {
    supplyGap: ScoreCard;
    demand: ScoreCard;
    competition: ScoreCard;
    opportunity: ScoreCard;
}
export interface Estimate {
    provenance: Provenance;
    value: bigint;
    confidence: Confidence;
}
export interface OperatingCosts {
    rawMaterial: bigint;
    salary: bigint;
    other: bigint;
    marketing: bigint;
    rent: bigint;
    transport: bigint;
    electricity: bigint;
    maintenance: bigint;
    packaging: bigint;
}
export interface MarketReach {
    demandIndicators: Array<string>;
    potentialCustomerBase: Estimate;
    competitionLevel: string;
    nearbyMarkets: Array<string>;
    estimatedReach: Estimate;
    supplyIndicators: Array<string>;
    underservedOpportunities: Array<string>;
    distributionChannels: Array<string>;
    accessibility: string;
}
export interface Moratorium {
    moratoriumMonths: bigint;
    explanation: string;
    repaymentStartMonth: bigint;
    interestAccruedDuringMoratorium: Estimate;
}
export enum Confidence {
    Low = "Low",
    High = "High",
    Medium = "Medium"
}
export enum Provenance {
    Estimated = "Estimated",
    UserProvided = "UserProvided",
    Calculated = "Calculated",
    Observed = "Observed"
}
export enum Radius {
    R5km = "R5km",
    R10km = "R10km"
}
export enum SchemeStatus {
    UnderReview = "UnderReview",
    Inactive = "Inactive",
    Active = "Active"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_user_assistant {
    user = "user",
    assistant = "assistant"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    chat(request: ChatRequest): Promise<ChatResponse>;
    computeAmortization(loanAmount: bigint, interestRatePercent: bigint, tenureMonths: bigint, moratoriumMonths: bigint): Promise<Amortization>;
    computeBreakEven(fixedCosts: bigint, variableCostPerUnit: bigint, pricePerUnit: bigint): Promise<BreakEven>;
    computeCashRequirement(feasibleProjectCost: bigint, workingCapitalTotal: bigint, buffer: bigint): Promise<CashRequirement>;
    computeFinancialPlan(input: FinanceInput, rule: SchemeRule): Promise<FinancialPlan>;
    computeFinancing(input: FinanceInput, rule: SchemeRule): Promise<Financing>;
    computeMoratorium(loanAmount: bigint, interestRatePercent: bigint, moratoriumMonths: bigint): Promise<Moratorium>;
    computeWorkingCapital(input: WorkingCapitalInput): Promise<WorkingCapital>;
    execute(qJson: string): Promise<Result>;
    getAnalysis(id: bigint): Promise<Analysis | null>;
    getApiDoc(): Promise<string>;
    getCallerUserRole(): Promise<UserRole>;
    getScheme(id: bigint): Promise<Scheme | null>;
    isCallerAdmin(): Promise<boolean>;
    listAnalyses(): Promise<Array<Analysis>>;
    listSchemes(): Promise<Array<Scheme>>;
    routeSchemes(input: SchemeRoutingInput): Promise<SchemeRoutingResult>;
    runAnalysis(input: AnalysisInput, radius: Radius): Promise<AnalysisResult>;
    schema(): Promise<string>;
}
