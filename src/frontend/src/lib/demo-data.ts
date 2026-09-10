import type {
  Analysis,
  BusinessCategory,
  BusinessCategoryId,
  FinanceSnapshot,
  Loan,
  MarketOpportunity,
  OnboardingProfile,
  Report,
  Scenario,
  Scheme,
} from "@/lib/types";

/**
 * DEMO DATA
 * ------------------------------------------------------------------
 * All records below are clearly labelled sample data used to populate
 * the UdyamAI interface for demonstration purposes. They represent a
 * fictional rural entrepreneur and are never presented as real user
 * data, real government schemes, or real financial offers.
 */

export const DEMO_BADGE = "DEMO DATA";

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  {
    id: "dairy",
    name: "Dairy Farming",
    description: "Milk production and sale to cooperatives and local markets.",
    icon: "🐄",
  },
  {
    id: "poultry",
    name: "Poultry Farming",
    description: "Layer and broiler birds for eggs and meat.",
    icon: "🐔",
  },
  {
    id: "goat",
    name: "Goat & Sheep Rearing",
    description: "Meat, milk, and wool from small ruminants.",
    icon: "🐐",
  },
  {
    id: "fisheries",
    name: "Fisheries & Aquaculture",
    description: "Fish farming in ponds and tanks.",
    icon: "🐟",
  },
  {
    id: "organic-farming",
    name: "Organic Farming",
    description: "Chemical-free crop cultivation with premium pricing.",
    icon: "🌱",
  },
  {
    id: "horticulture",
    name: "Horticulture",
    description: "Fruits, vegetables, and flowers for local supply.",
    icon: "🍅",
  },
  {
    id: "food-processing",
    name: "Food Processing",
    description: "Value addition like pickles, spices, and packaged goods.",
    icon: "🥫",
  },
  {
    id: "handicrafts",
    name: "Handicrafts",
    description: "Artisan crafts, pottery, and woven goods.",
    icon: "🧶",
  },
  {
    id: "tailoring",
    name: "Tailoring & Garments",
    description: "Stitching, uniforms, and ready-made garments.",
    icon: "🧵",
  },
  {
    id: "agro-processing",
    name: "Agro-Processing",
    description: "Milling, grading, and processing of farm produce.",
    icon: "🌾",
  },
  {
    id: "beekeeping",
    name: "Beekeeping",
    description: "Honey and bee products from managed hives.",
    icon: "🐝",
  },
  {
    id: "mushroom",
    name: "Mushroom Cultivation",
    description: "Oyster and button mushrooms for local markets.",
    icon: "🍄",
  },
  {
    id: "animal-feed",
    name: "Animal Feed Production",
    description: "Balanced feed for cattle and poultry.",
    icon: "🌿",
  },
  {
    id: "rural-tourism",
    name: "Rural Tourism",
    description: "Homestays and farm experiences for visitors.",
    icon: "🏡",
  },
  {
    id: "agri-equipment",
    name: "Agri-Equipment Rental",
    description: "Tractor and implement rental services.",
    icon: "🚜",
  },
];

export const DEMO_PROFILE: OnboardingProfile = {
  name: "Meena Devi",
  village: "Rampur",
  block: "Khairagarh",
  district: "Rajpur",
  state: "Madhya Pradesh",
  marginCapital: 100000,
  businessCategory: "dairy",
  landAssets: 2,
  experienceYears: 4,
  expectedInvestment: 250000,
  expectedMonthlySales: 45000,
  expectedLoanRequirement: 150000,
};

export const DEMO_ANALYSES: Analysis[] = [
  {
    id: "an-1",
    title: "Dairy Business Viability",
    category: "dairy",
    createdAt: 1725000000000,
    score: 82,
    risk: "low",
    status: "completed",
    summary:
      "Strong local milk demand with a stable cooperative buyer. Recommended herd expansion is viable at current capital.",
  },
  {
    id: "an-2",
    title: "Poultry Layer Unit",
    category: "poultry",
    createdAt: 1723000000000,
    score: 64,
    risk: "medium",
    status: "completed",
    summary:
      "Moderate demand but higher feed-cost volatility. A smaller starter flock reduces downside risk.",
  },
  {
    id: "an-3",
    title: "Organic Vegetable Plot",
    category: "organic-farming",
    createdAt: 1721000000000,
    score: 71,
    risk: "medium",
    status: "in-progress",
    summary:
      "Premium pricing available but requires certification and consistent market access.",
  },
];

export const DEMO_MARKET: MarketOpportunity[] = [
  {
    id: "mk-1",
    category: "dairy",
    demand: 88,
    competition: 42,
    growth: 6,
    seasonality: "Stable year-round",
    priceTrend: 3,
    summary:
      "Consistent demand from the district cooperative with limited nearby competition.",
  },
  {
    id: "mk-2",
    category: "poultry",
    demand: 74,
    competition: 61,
    growth: 8,
    seasonality: "Peaks around festivals",
    priceTrend: 4,
    summary: "Growing demand but several active suppliers in the block.",
  },
  {
    id: "mk-3",
    category: "organic-farming",
    demand: 66,
    competition: 28,
    growth: 12,
    seasonality: "Seasonal harvest windows",
    priceTrend: 7,
    summary:
      "Low competition with rising urban demand for certified organic produce.",
  },
];

export const DEMO_FINANCE: FinanceSnapshot = {
  capital: 100000,
  monthlyRevenue: 45000,
  monthlyExpenses: 31000,
  monthlyProfit: 14000,
  profitMargin: 31,
  breakEvenMonths: 7,
  cashReserve: 22000,
  loanRequirement: 150000,
  repaymentCapacity: 9000,
};

export const DEMO_SCHEMES: Scheme[] = [
  {
    id: "sc-1",
    name: "PM Formalisation of Micro Food Processing Enterprises",
    provider: "Ministry of Food Processing",
    category: "food-processing",
    benefit: "Credit-linked capital subsidy up to 35%",
    eligibility: "Individual micro food processing units",
    maxAmount: 1000000,
    interestRate: "Subsidised",
    matchScore: 92,
    description:
      "Supports micro food processing units with capital subsidy and credit linkage.",
  },
  {
    id: "sc-2",
    name: "National Livestock Mission",
    provider: "Ministry of Fisheries & Animal Husbandry",
    category: "dairy",
    benefit: "Capital subsidy for dairy infrastructure",
    eligibility: "Dairy farmers and producer groups",
    maxAmount: 500000,
    interestRate: "Subsidised",
    matchScore: 88,
    description:
      "Financial support for dairy development, breed improvement, and infrastructure.",
  },
  {
    id: "sc-3",
    name: "PMEGP (Prime Minister's Employment Generation Programme)",
    provider: "KVIC",
    category: "general",
    benefit: "Margin money subsidy up to 25%",
    eligibility: "New micro enterprises in rural areas",
    maxAmount: 2500000,
    interestRate: "Subsidised",
    matchScore: 85,
    description:
      "Generates employment by supporting new micro-enterprises with margin money subsidy.",
  },
  {
    id: "sc-4",
    name: "Kisan Credit Card",
    provider: "NABARD / Banks",
    category: "agriculture",
    benefit: "Affordable working capital credit",
    eligibility: "Farmers and dairy/poultry units",
    maxAmount: 300000,
    interestRate: "Low interest",
    matchScore: 80,
    description:
      "Provides short-term credit for cultivation and allied activities.",
  },
];

export const DEMO_LOANS: Loan[] = [
  {
    id: "ln-1",
    name: "Dairy Development Loan",
    provider: "District Cooperative Bank",
    type: "Term loan",
    amount: 150000,
    interestRate: "9.5% p.a.",
    tenureMonths: 36,
    processingFee: "0.5%",
    collateralRequired: false,
    matchScore: 90,
    description:
      "Term loan for cattle purchase and shed construction with cooperative linkage.",
  },
  {
    id: "ln-2",
    name: "Micro Enterprise Loan",
    provider: "Regional Rural Bank",
    type: "Term loan",
    amount: 200000,
    interestRate: "10% p.a.",
    tenureMonths: 48,
    processingFee: "1%",
    collateralRequired: false,
    matchScore: 84,
    description:
      "Flexible term loan for small business expansion with minimal documentation.",
  },
  {
    id: "ln-3",
    name: "Working Capital Overdraft",
    provider: "Commercial Bank",
    type: "Overdraft",
    amount: 100000,
    interestRate: "11% p.a.",
    tenureMonths: 12,
    processingFee: "0.75%",
    collateralRequired: true,
    matchScore: 72,
    description: "Revolving credit to manage seasonal cash-flow gaps.",
  },
];

export const DEMO_REPORTS: Report[] = [
  {
    id: "rp-1",
    title: "Dairy Business Analysis Report",
    type: "analysis",
    createdAt: 1725000000000,
    summary: "Full viability analysis with risk breakdown and recommendations.",
    sourceId: "an-1",
  },
  {
    id: "rp-2",
    title: "Monthly Finance Snapshot",
    type: "finance",
    createdAt: 1724000000000,
    summary:
      "Revenue, expenses, profit, and break-even summary for the current month.",
  },
  {
    id: "rp-3",
    title: "Market Opportunity Scan",
    type: "market",
    createdAt: 1723000000000,
    summary:
      "Demand, competition, and pricing trends across target categories.",
    sourceId: "mk-1",
  },
  {
    id: "rp-4",
    title: "Eligible Schemes Summary",
    type: "scheme",
    createdAt: 1722000000000,
    summary: "Shortlist of government schemes matched to the business profile.",
    sourceId: "sc-1",
  },
];

export const DEMO_SCENARIOS: Scenario[] = [
  {
    id: "scn-1",
    label: "Conservative",
    investment: 150000,
    monthlySales: 36000,
    monthlyProfit: 10000,
    paybackMonths: 15,
    risk: "low",
  },
  {
    id: "scn-2",
    label: "Balanced",
    investment: 250000,
    monthlySales: 45000,
    monthlyProfit: 14000,
    paybackMonths: 18,
    risk: "medium",
  },
  {
    id: "scn-3",
    label: "Aggressive",
    investment: 400000,
    monthlySales: 68000,
    monthlyProfit: 21000,
    paybackMonths: 19,
    risk: "high",
  },
];

export function categoryName(id: BusinessCategoryId): string {
  return BUSINESS_CATEGORIES.find((c) => c.id === id)?.name ?? id;
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
