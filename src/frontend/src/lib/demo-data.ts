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

export const DEMO_BADGE = "ESTIMATED DATA";

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
  // Additional searchable business ideas. These extend the curated set
  // above; deterministic demand/competition baselines gracefully default
  // for any id below (see analysis-engine.ts), never invented per-item.
  {
    id: "general-store",
    name: "General Store / Kirana",
    description: "Daily groceries and household essentials for the locality.",
    icon: "🛒",
  },
  {
    id: "mobile-repair",
    name: "Mobile & Electronics Repair",
    description: "Screen, battery, and hardware repair services.",
    icon: "📱",
  },
  {
    id: "bakery",
    name: "Bakery",
    description: "Bread, cakes, and baked snacks for local sale.",
    icon: "🍞",
  },
  {
    id: "tea-stall",
    name: "Tea Stall / Cafe",
    description: "Tea, snacks, and light refreshments.",
    icon: "☕",
  },
  {
    id: "restaurant",
    name: "Restaurant / Dhaba",
    description: "Sit-down meals and local cuisine.",
    icon: "🍽️",
  },
  {
    id: "catering",
    name: "Catering Services",
    description: "Event and bulk-order food catering.",
    icon: "🍱",
  },
  {
    id: "juice-bar",
    name: "Juice & Fruit Stall",
    description: "Fresh juices and seasonal fruit sales.",
    icon: "🥤",
  },
  {
    id: "grocery-delivery",
    name: "Grocery Delivery Service",
    description: "Local delivery of groceries and essentials.",
    icon: "🚲",
  },
  {
    id: "clothing-store",
    name: "Clothing & Garments Store",
    description: "Ready-made clothes retail.",
    icon: "👕",
  },
  {
    id: "footwear-store",
    name: "Footwear Store",
    description: "Shoes and footwear retail.",
    icon: "👟",
  },
  {
    id: "embroidery",
    name: "Embroidery & Zari Work",
    description: "Decorative stitching and embellishment services.",
    icon: "🪡",
  },
  {
    id: "shoe-repair",
    name: "Shoe & Leather Repair",
    description: "Cobbler and leather goods repair.",
    icon: "🥾",
  },
  {
    id: "salon",
    name: "Beauty Salon / Barber Shop",
    description: "Haircuts, grooming, and beauty services.",
    icon: "💇",
  },
  {
    id: "spa-wellness",
    name: "Spa & Wellness Centre",
    description: "Massage, wellness, and relaxation services.",
    icon: "💆",
  },
  {
    id: "gym-fitness",
    name: "Gym & Fitness Centre",
    description: "Fitness training and workout facilities.",
    icon: "🏋️",
  },
  {
    id: "yoga-studio",
    name: "Yoga & Wellness Studio",
    description: "Yoga classes and holistic wellness sessions.",
    icon: "🧘",
  },
  {
    id: "pharmacy",
    name: "Pharmacy / Medical Store",
    description: "Medicines and healthcare essentials retail.",
    icon: "💊",
  },
  {
    id: "clinic",
    name: "Diagnostic / Health Clinic",
    description: "Basic diagnostics and primary healthcare services.",
    icon: "🩺",
  },
  {
    id: "ayurveda",
    name: "Ayurveda & Herbal Products",
    description: "Traditional herbal remedies and wellness products.",
    icon: "🌿",
  },
  {
    id: "coaching-centre",
    name: "Tuition / Coaching Centre",
    description: "Academic tuition and exam preparation classes.",
    icon: "📚",
  },
  {
    id: "computer-training",
    name: "Computer Training Institute",
    description: "Basic computer literacy and skill training.",
    icon: "💻",
  },
  {
    id: "vocational-training",
    name: "Vocational Skill Training",
    description: "Trade skill training such as plumbing, wiring, tailoring.",
    icon: "🛠️",
  },
  {
    id: "preschool",
    name: "Preschool / Daycare",
    description: "Early childhood education and daycare services.",
    icon: "🧸",
  },
  {
    id: "library-stationery",
    name: "Stationery & Bookstore",
    description: "Books, stationery, and school supplies retail.",
    icon: "📖",
  },
  {
    id: "photography",
    name: "Photography & Videography",
    description: "Event photography and videography services.",
    icon: "📷",
  },
  {
    id: "printing-press",
    name: "Printing & Xerox Shop",
    description: "Printing, photocopying, and document services.",
    icon: "🖨️",
  },
  {
    id: "graphic-design",
    name: "Graphic Design & Branding",
    description: "Logo, print, and digital design services.",
    icon: "🎨",
  },
  {
    id: "web-development",
    name: "Web & App Development",
    description: "Website and mobile app development services.",
    icon: "🖥️",
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing Services",
    description: "Social media and online marketing for local businesses.",
    icon: "📣",
  },
  {
    id: "data-entry",
    name: "Data Entry & BPO Services",
    description: "Remote data entry and back-office support.",
    icon: "⌨️",
  },
  {
    id: "cyber-cafe",
    name: "Cyber Cafe / Digital Seva Kendra",
    description: "Internet access, printing, and government e-services.",
    icon: "🌐",
  },
  {
    id: "mobile-recharge",
    name: "Mobile Recharge & SIM Shop",
    description: "Recharge, SIM sales, and mobile accessories.",
    icon: "📶",
  },
  {
    id: "electrician",
    name: "Electrician Services",
    description: "Household and commercial electrical work.",
    icon: "🔌",
  },
  {
    id: "plumber",
    name: "Plumbing Services",
    description: "Pipeline installation and repair services.",
    icon: "🚰",
  },
  {
    id: "carpentry",
    name: "Carpentry & Furniture Making",
    description: "Custom furniture and woodwork services.",
    icon: "🪚",
  },
  {
    id: "welding",
    name: "Welding & Fabrication",
    description: "Metal fabrication and welding services.",
    icon: "🔥",
  },
  {
    id: "masonry",
    name: "Masonry & Construction Work",
    description: "Building construction and masonry contracting.",
    icon: "🧱",
  },
  {
    id: "painting-services",
    name: "Painting & Home Renovation",
    description: "Wall painting and home improvement services.",
    icon: "🎨",
  },
  {
    id: "interior-design",
    name: "Interior Design Services",
    description: "Home and office interior design consulting.",
    icon: "🛋️",
  },
  {
    id: "hardware-store",
    name: "Hardware & Building Materials",
    description: "Construction materials and hardware retail.",
    icon: "🔧",
  },
  {
    id: "real-estate",
    name: "Real Estate Brokerage",
    description: "Property sale, purchase, and rental brokerage.",
    icon: "🏠",
  },
  {
    id: "auto-repair",
    name: "Vehicle Repair Garage",
    description: "Two-wheeler and four-wheeler repair services.",
    icon: "🔩",
  },
  {
    id: "auto-parts",
    name: "Auto Parts & Accessories",
    description: "Vehicle spare parts and accessories retail.",
    icon: "🚗",
  },
  {
    id: "car-wash",
    name: "Car & Bike Wash",
    description: "Vehicle cleaning and detailing services.",
    icon: "🧼",
  },
  {
    id: "taxi-service",
    name: "Taxi / Auto-Rickshaw Service",
    description: "Local passenger transport service.",
    icon: "🚕",
  },
  {
    id: "goods-transport",
    name: "Goods Transport & Logistics",
    description: "Local freight and goods delivery services.",
    icon: "🚚",
  },
  {
    id: "courier-service",
    name: "Courier & Parcel Delivery",
    description: "Local parcel pickup and delivery services.",
    icon: "📦",
  },
  {
    id: "warehouse-rental",
    name: "Warehouse / Godown Rental",
    description: "Storage space rental for goods and produce.",
    icon: "🏬",
  },
  {
    id: "cold-storage",
    name: "Cold Storage Facility",
    description: "Refrigerated storage for perishable produce.",
    icon: "🧊",
  },
  {
    id: "solar-energy",
    name: "Solar Energy Installation",
    description: "Solar panel sales and installation services.",
    icon: "☀️",
  },
  {
    id: "waste-recycling",
    name: "Waste Collection & Recycling",
    description: "Scrap collection and recycling services.",
    icon: "♻️",
  },
  {
    id: "water-supply",
    name: "Packaged Drinking Water",
    description: "Water purification and bottled water supply.",
    icon: "💧",
  },
  {
    id: "event-management",
    name: "Event Management",
    description: "Wedding and event planning services.",
    icon: "🎉",
  },
  {
    id: "tent-decoration",
    name: "Tent & Decoration Services",
    description: "Event tent, lighting, and decoration rental.",
    icon: "🎪",
  },
  {
    id: "music-band",
    name: "Music Band / DJ Services",
    description: "Live music and DJ services for events.",
    icon: "🎵",
  },
  {
    id: "homestay",
    name: "Homestay / Guesthouse",
    description: "Short-term lodging for travellers.",
    icon: "🛏️",
  },
  {
    id: "travel-agency",
    name: "Travel & Ticketing Agency",
    description: "Travel booking and ticketing services.",
    icon: "🧳",
  },
  {
    id: "pet-care",
    name: "Pet Care & Grooming",
    description: "Pet grooming, boarding, and supplies.",
    icon: "🐾",
  },
  {
    id: "nursery-plants",
    name: "Plant Nursery",
    description: "Saplings, plants, and gardening supplies.",
    icon: "🌳",
  },
  {
    id: "landscaping",
    name: "Landscaping & Gardening",
    description: "Garden design and maintenance services.",
    icon: "🌷",
  },
  {
    id: "dairy-processing",
    name: "Dairy Product Processing",
    description: "Paneer, ghee, and value-added dairy products.",
    icon: "🧀",
  },
  {
    id: "spice-grinding",
    name: "Spice Grinding & Packaging",
    description: "Masala grinding, blending, and packaging.",
    icon: "🌶️",
  },
  {
    id: "flour-mill",
    name: "Flour Mill (Atta Chakki)",
    description: "Grain milling services for local households.",
    icon: "🌾",
  },
  {
    id: "oil-extraction",
    name: "Oil Extraction (Ghani)",
    description: "Cold-pressed edible oil extraction.",
    icon: "🫗",
  },
  {
    id: "candle-making",
    name: "Candle & Incense Making",
    description: "Handmade candles and agarbatti production.",
    icon: "🕯️",
  },
  {
    id: "soap-making",
    name: "Soap & Detergent Making",
    description: "Handmade soap and cleaning product manufacturing.",
    icon: "🧼",
  },
  {
    id: "packaging-unit",
    name: "Packaging & Labelling Unit",
    description: "Contract packaging for local manufacturers.",
    icon: "📦",
  },
  {
    id: "textile-weaving",
    name: "Handloom Weaving",
    description: "Traditional handloom textile production.",
    icon: "🧵",
  },
  {
    id: "leather-goods",
    name: "Leather Goods Manufacturing",
    description: "Bags, belts, and leather accessories production.",
    icon: "👜",
  },
  {
    id: "jewellery-making",
    name: "Jewellery Making",
    description: "Artisan and imitation jewellery production.",
    icon: "💍",
  },
  {
    id: "pottery",
    name: "Pottery & Ceramics",
    description: "Handmade pottery and ceramic goods.",
    icon: "🏺",
  },
  {
    id: "furniture-store",
    name: "Furniture Store",
    description: "Ready-made furniture retail.",
    icon: "🪑",
  },
  {
    id: "toy-making",
    name: "Toy Making",
    description: "Handmade and wooden toy production.",
    icon: "🧸",
  },
  {
    id: "bookbinding",
    name: "Bookbinding & Notebook Making",
    description: "Notebook and register manufacturing.",
    icon: "📓",
  },
  {
    id: "sericulture",
    name: "Sericulture (Silk Farming)",
    description: "Silkworm rearing and raw silk production.",
    icon: "🐛",
  },
  {
    id: "sericulture-weaving",
    name: "Silk Weaving",
    description: "Silk fabric weaving and finishing.",
    icon: "🧣",
  },
  {
    id: "floriculture",
    name: "Floriculture (Flower Farming)",
    description: "Cut flower and ornamental plant cultivation.",
    icon: "🌸",
  },
  {
    id: "spice-farming",
    name: "Spice Cultivation",
    description: "Growing chili, turmeric, and other spices.",
    icon: "🌶️",
  },
  {
    id: "medicinal-plants",
    name: "Medicinal Plant Cultivation",
    description: "Growing herbs used in ayurvedic products.",
    icon: "🪴",
  },
  {
    id: "seed-production",
    name: "Seed Production & Supply",
    description: "Certified seed multiplication and sale.",
    icon: "🌱",
  },
  {
    id: "vermicompost",
    name: "Vermicompost / Organic Fertiliser",
    description: "Organic compost and fertiliser production.",
    icon: "🪱",
  },
  {
    id: "biogas-plant",
    name: "Biogas Plant Services",
    description: "Biogas installation for farms and households.",
    icon: "🔋",
  },
  {
    id: "cattle-feed-store",
    name: "Cattle Feed & Veterinary Store",
    description: "Animal feed and basic veterinary supplies.",
    icon: "🐄",
  },
  {
    id: "duck-farming",
    name: "Duck Farming",
    description: "Duck rearing for eggs and meat.",
    icon: "🦆",
  },
  {
    id: "rabbit-farming",
    name: "Rabbit Farming",
    description: "Rabbit rearing for meat and wool.",
    icon: "🐇",
  },
  {
    id: "quail-farming",
    name: "Quail Farming",
    description: "Quail rearing for eggs and meat.",
    icon: "🐦",
  },
  {
    id: "security-services",
    name: "Security Guard Services",
    description: "Security personnel supply for premises.",
    icon: "🛡️",
  },
  {
    id: "cleaning-services",
    name: "Housekeeping & Cleaning Services",
    description: "Home and office cleaning contracts.",
    icon: "🧹",
  },
  {
    id: "laundry",
    name: "Laundry & Dry Cleaning",
    description: "Washing, ironing, and dry-cleaning services.",
    icon: "🧺",
  },
  {
    id: "tailored-uniforms",
    name: "School Uniform Stitching",
    description: "Bulk uniform stitching for schools.",
    icon: "👔",
  },
  {
    id: "rental-equipment",
    name: "Equipment & Tool Rental",
    description: "Renting out tools and small machinery.",
    icon: "🧰",
  },
  {
    id: "financial-services",
    name: "Micro-Finance / BC Agent",
    description: "Banking correspondent and micro-loan facilitation.",
    icon: "💳",
  },
  {
    id: "insurance-agent",
    name: "Insurance Agent Services",
    description: "Life and general insurance sales.",
    icon: "📄",
  },
  {
    id: "accounting-services",
    name: "Accounting & Tax Filing",
    description: "Bookkeeping and tax filing assistance.",
    icon: "🧾",
  },
  {
    id: "legal-services",
    name: "Legal & Documentation Services",
    description: "Document drafting and basic legal assistance.",
    icon: "⚖️",
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
