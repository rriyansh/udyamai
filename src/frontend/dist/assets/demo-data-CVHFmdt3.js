const DEMO_BADGE = "DEMO DATA";
const BUSINESS_CATEGORIES = [
  {
    id: "dairy",
    name: "Dairy Farming",
    description: "Milk production and sale to cooperatives and local markets.",
    icon: "🐄"
  },
  {
    id: "poultry",
    name: "Poultry Farming",
    description: "Layer and broiler birds for eggs and meat.",
    icon: "🐔"
  },
  {
    id: "goat",
    name: "Goat & Sheep Rearing",
    description: "Meat, milk, and wool from small ruminants.",
    icon: "🐐"
  },
  {
    id: "fisheries",
    name: "Fisheries & Aquaculture",
    description: "Fish farming in ponds and tanks.",
    icon: "🐟"
  },
  {
    id: "organic-farming",
    name: "Organic Farming",
    description: "Chemical-free crop cultivation with premium pricing.",
    icon: "🌱"
  },
  {
    id: "horticulture",
    name: "Horticulture",
    description: "Fruits, vegetables, and flowers for local supply.",
    icon: "🍅"
  },
  {
    id: "food-processing",
    name: "Food Processing",
    description: "Value addition like pickles, spices, and packaged goods.",
    icon: "🥫"
  },
  {
    id: "handicrafts",
    name: "Handicrafts",
    description: "Artisan crafts, pottery, and woven goods.",
    icon: "🧶"
  },
  {
    id: "tailoring",
    name: "Tailoring & Garments",
    description: "Stitching, uniforms, and ready-made garments.",
    icon: "🧵"
  },
  {
    id: "agro-processing",
    name: "Agro-Processing",
    description: "Milling, grading, and processing of farm produce.",
    icon: "🌾"
  },
  {
    id: "beekeeping",
    name: "Beekeeping",
    description: "Honey and bee products from managed hives.",
    icon: "🐝"
  },
  {
    id: "mushroom",
    name: "Mushroom Cultivation",
    description: "Oyster and button mushrooms for local markets.",
    icon: "🍄"
  },
  {
    id: "animal-feed",
    name: "Animal Feed Production",
    description: "Balanced feed for cattle and poultry.",
    icon: "🌿"
  },
  {
    id: "rural-tourism",
    name: "Rural Tourism",
    description: "Homestays and farm experiences for visitors.",
    icon: "🏡"
  },
  {
    id: "agri-equipment",
    name: "Agri-Equipment Rental",
    description: "Tractor and implement rental services.",
    icon: "🚜"
  }
];
const DEMO_PROFILE = {
  name: "Meena Devi",
  village: "Rampur",
  block: "Khairagarh",
  district: "Rajpur",
  state: "Madhya Pradesh",
  marginCapital: 1e5,
  businessCategory: "dairy",
  landAssets: 2,
  experienceYears: 4,
  expectedInvestment: 25e4,
  expectedMonthlySales: 45e3,
  expectedLoanRequirement: 15e4
};
const DEMO_ANALYSES = [
  {
    id: "an-1",
    title: "Dairy Business Viability",
    category: "dairy",
    createdAt: 1725e9,
    score: 82,
    risk: "low",
    status: "completed",
    summary: "Strong local milk demand with a stable cooperative buyer. Recommended herd expansion is viable at current capital."
  },
  {
    id: "an-2",
    title: "Poultry Layer Unit",
    category: "poultry",
    createdAt: 1723e9,
    score: 64,
    risk: "medium",
    status: "completed",
    summary: "Moderate demand but higher feed-cost volatility. A smaller starter flock reduces downside risk."
  },
  {
    id: "an-3",
    title: "Organic Vegetable Plot",
    category: "organic-farming",
    createdAt: 1721e9,
    score: 71,
    risk: "medium",
    status: "in-progress",
    summary: "Premium pricing available but requires certification and consistent market access."
  }
];
const DEMO_MARKET = [
  {
    id: "mk-1",
    category: "dairy",
    demand: 88,
    competition: 42,
    growth: 6,
    seasonality: "Stable year-round",
    priceTrend: 3,
    summary: "Consistent demand from the district cooperative with limited nearby competition."
  },
  {
    id: "mk-2",
    category: "poultry",
    demand: 74,
    competition: 61,
    growth: 8,
    seasonality: "Peaks around festivals",
    priceTrend: 4,
    summary: "Growing demand but several active suppliers in the block."
  },
  {
    id: "mk-3",
    category: "organic-farming",
    demand: 66,
    competition: 28,
    growth: 12,
    seasonality: "Seasonal harvest windows",
    priceTrend: 7,
    summary: "Low competition with rising urban demand for certified organic produce."
  }
];
const DEMO_FINANCE = {
  monthlyRevenue: 45e3,
  monthlyExpenses: 31e3,
  monthlyProfit: 14e3,
  profitMargin: 31,
  breakEvenMonths: 7,
  cashReserve: 22e3,
  loanRequirement: 15e4,
  repaymentCapacity: 9e3
};
const DEMO_SCHEMES = [
  {
    id: "sc-1",
    name: "PM Formalisation of Micro Food Processing Enterprises",
    provider: "Ministry of Food Processing",
    category: "food-processing",
    benefit: "Credit-linked capital subsidy up to 35%",
    eligibility: "Individual micro food processing units",
    maxAmount: 1e6,
    interestRate: "Subsidised",
    matchScore: 92,
    description: "Supports micro food processing units with capital subsidy and credit linkage."
  },
  {
    id: "sc-2",
    name: "National Livestock Mission",
    provider: "Ministry of Fisheries & Animal Husbandry",
    category: "dairy",
    benefit: "Capital subsidy for dairy infrastructure",
    eligibility: "Dairy farmers and producer groups",
    maxAmount: 5e5,
    interestRate: "Subsidised",
    matchScore: 88,
    description: "Financial support for dairy development, breed improvement, and infrastructure."
  },
  {
    id: "sc-3",
    name: "PMEGP (Prime Minister's Employment Generation Programme)",
    provider: "KVIC",
    category: "general",
    benefit: "Margin money subsidy up to 25%",
    eligibility: "New micro enterprises in rural areas",
    maxAmount: 25e5,
    interestRate: "Subsidised",
    matchScore: 85,
    description: "Generates employment by supporting new micro-enterprises with margin money subsidy."
  },
  {
    id: "sc-4",
    name: "Kisan Credit Card",
    provider: "NABARD / Banks",
    category: "agriculture",
    benefit: "Affordable working capital credit",
    eligibility: "Farmers and dairy/poultry units",
    maxAmount: 3e5,
    interestRate: "Low interest",
    matchScore: 80,
    description: "Provides short-term credit for cultivation and allied activities."
  }
];
const DEMO_REPORTS = [
  {
    id: "rp-1",
    title: "Dairy Business Analysis Report",
    type: "analysis",
    createdAt: 1725e9,
    summary: "Full viability analysis with risk breakdown and recommendations.",
    sourceId: "an-1"
  },
  {
    id: "rp-2",
    title: "Monthly Finance Snapshot",
    type: "finance",
    createdAt: 1724e9,
    summary: "Revenue, expenses, profit, and break-even summary for the current month."
  },
  {
    id: "rp-3",
    title: "Market Opportunity Scan",
    type: "market",
    createdAt: 1723e9,
    summary: "Demand, competition, and pricing trends across target categories.",
    sourceId: "mk-1"
  },
  {
    id: "rp-4",
    title: "Eligible Schemes Summary",
    type: "scheme",
    createdAt: 1722e9,
    summary: "Shortlist of government schemes matched to the business profile.",
    sourceId: "sc-1"
  }
];
function categoryName(id) {
  var _a;
  return ((_a = BUSINESS_CATEGORIES.find((c) => c.id === id)) == null ? void 0 : _a.name) ?? id;
}
function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}
export {
  BUSINESS_CATEGORIES as B,
  DEMO_PROFILE as D,
  DEMO_BADGE as a,
  DEMO_ANALYSES as b,
  categoryName as c,
  DEMO_MARKET as d,
  DEMO_FINANCE as e,
  formatINR as f,
  DEMO_REPORTS as g,
  DEMO_SCHEMES as h
};
