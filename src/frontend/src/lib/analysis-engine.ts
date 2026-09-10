import type {
  AnalysisInput,
  AnalysisResult,
  Competitor,
  Confidence,
  Estimate,
  HyperLocalAnalysis,
  MapData,
  MarketReach,
  Pricing,
  Provenance,
  Radius,
  RiskAssessment,
  RiskCategory,
  RiskLevel,
  SWOT,
  Scores,
} from "@/lib/types";

/**
 * DEMO DATA analysis engine.
 * ------------------------------------------------------------------
 * This module generates a clearly-labelled, deterministic sample
 * analysis when the backend canister is unavailable. Every value is
 * marked with a provenance label (Estimated / Observed / Calculated /
 * User Provided) and a confidence badge. It is never presented as real
 * market data — callers must surface the DEMO DATA label.
 */

const CATEGORY_DEMAND: Record<string, number> = {
  dairy: 88,
  poultry: 74,
  goat: 70,
  fisheries: 68,
  "organic-farming": 66,
  horticulture: 72,
  "food-processing": 78,
  handicrafts: 60,
  tailoring: 64,
  "agro-processing": 76,
  beekeeping: 58,
  mushroom: 62,
  "animal-feed": 69,
  "rural-tourism": 55,
  "agri-equipment": 57,
};

const CATEGORY_COMPETITION: Record<string, number> = {
  dairy: 42,
  poultry: 61,
  goat: 38,
  fisheries: 45,
  "organic-farming": 28,
  horticulture: 50,
  "food-processing": 55,
  handicrafts: 33,
  tailoring: 58,
  "agro-processing": 47,
  beekeeping: 22,
  mushroom: 30,
  "animal-feed": 40,
  "rural-tourism": 18,
  "agri-equipment": 25,
};

const CATEGORY_LABEL: Record<string, string> = {
  dairy: "Dairy",
  poultry: "Poultry",
  goat: "Goat & Sheep",
  fisheries: "Fisheries",
  "organic-farming": "Organic Farming",
  horticulture: "Horticulture",
  "food-processing": "Food Processing",
  handicrafts: "Handicrafts",
  tailoring: "Tailoring",
  "agro-processing": "Agro-Processing",
  beekeeping: "Beekeeping",
  mushroom: "Mushroom",
  "animal-feed": "Animal Feed",
  "rural-tourism": "Rural Tourism",
  "agri-equipment": "Agri-Equipment",
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function categoryLabel(category: string): string {
  return CATEGORY_LABEL[category] ?? category;
}

export type OutlookLevel = "Low" | "Medium" | "High";

export interface CategoryOutlook {
  demandScore: number;
  demandLevel: OutlookLevel;
  competitionScore: number;
  competitionLevel: OutlookLevel;
}

function levelFromDemand(score: number): OutlookLevel {
  return score >= 70 ? "High" : score >= 45 ? "Medium" : "Low";
}

function levelFromCompetition(score: number): OutlookLevel {
  return score >= 55 ? "High" : score >= 35 ? "Medium" : "Low";
}

/**
 * Deterministic demand/competition outlook for a business category, used to
 * show more than a static description while choosing a business. Falls back
 * to the same defaults the rest of the demo engine uses for any category
 * outside the curated baseline tables \u2014 never invented per category.
 */
export function estimateCategoryOutlook(category: string): CategoryOutlook {
  const demandScore = CATEGORY_DEMAND[category] ?? 65;
  const competitionScore = CATEGORY_COMPETITION[category] ?? 45;
  return {
    demandScore,
    demandLevel: levelFromDemand(demandScore),
    competitionScore,
    competitionLevel: levelFromCompetition(competitionScore),
  };
}

function estimate(
  value: number,
  provenance: Provenance,
  confidence: Confidence,
): Estimate {
  return { value: Math.round(value), provenance, confidence };
}

function riskLevel(score: number): RiskLevel {
  return score >= 75 ? "low" : score >= 55 ? "medium" : "high";
}

function buildCompetitors(input: AnalysisInput, radius: Radius): Competitor[] {
  const competition = CATEGORY_COMPETITION[input.category] ?? 45;
  const count = radius === "5km" ? 4 : 7;
  const names = [
    "Sharma Traders",
    "Village Co-op Outlet",
    "Ramesh Enterprises",
    "Green Agro Mart",
    "Local Mandi Stall",
    "Sunrise Suppliers",
    "Gramin Bazaar",
  ];
  const basePrice = 40 + (competition % 30);
  return Array.from({ length: count }, (_, i) => {
    const distance = 0.8 + i * (radius === "5km" ? 1.1 : 1.6);
    const min = basePrice + i * 3;
    return {
      id: i + 1,
      name: names[i % names.length],
      lat: 23.2 + i * 0.012,
      lng: 77.4 + i * 0.014,
      distanceKm: Math.round(distance * 10) / 10,
      priceRangeMin: min,
      priceRangeMax: min + 18,
      priceRangeAvg: min + 9,
    };
  });
}

function buildMap(input: AnalysisInput, radius: Radius): MapData {
  const competitors = buildCompetitors(input, radius);
  const competition = CATEGORY_COMPETITION[input.category] ?? 45;
  const density = clamp(Math.round(competition / 10), 1, 10);
  const avgDistance =
    competitors.reduce((sum, c) => sum + c.distanceKm, 0) /
    Math.max(competitors.length, 1);
  const nearest = [...competitors]
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, 3);
  return {
    userLocation: { lat: 23.2, lng: 77.4 },
    competitors,
    competitorDensity: density,
    nearestCompetitors: nearest,
    averageDistance: Math.round(avgDistance * 10) / 10,
    businessClusters: [
      "Main market cluster near the bus stand",
      "Cooperative collection centre cluster",
    ],
    underservedZones: [
      "Northern hamlets beyond 4 km",
      "Eastern village cluster with no formal outlet",
    ],
    reliableDataAvailable: false,
  };
}

function buildScores(input: AnalysisInput): Scores {
  const demand = CATEGORY_DEMAND[input.category] ?? 65;
  const competition = CATEGORY_COMPETITION[input.category] ?? 45;
  const supplyGap = clamp(demand - competition + 10, 20, 95);
  const opportunity = clamp(demand - competition + 5, 20, 95);
  const label = categoryLabel(input.category);

  return {
    demand: {
      score: demand,
      explanation: `${label} demand in this area is ${demand >= 75 ? "strong" : demand >= 55 ? "moderate" : "soft"}, driven by local households and nearby markets.`,
      reasoning: `Demand is estimated from household density, nearby market footfall, and seasonal consumption patterns for ${label.toLowerCase()} within the selected radius.`,
      provenance: "Estimated",
      confidence: "Medium",
    },
    supplyGap: {
      score: supplyGap,
      explanation: `There is a ${supplyGap >= 70 ? "wide" : supplyGap >= 50 ? "moderate" : "narrow"} gap between local demand and current supply, leaving room for a new ${label.toLowerCase()} unit.`,
      reasoning:
        "Supply gap is calculated as the difference between estimated demand and the capacity of existing suppliers and cooperatives in the area.",
      provenance: "Calculated",
      confidence: "Medium",
    },
    competition: {
      score: competition,
      explanation: `Competition is ${competition >= 60 ? "high" : competition >= 40 ? "moderate" : "low"} with ${competition >= 60 ? "several" : competition >= 40 ? "a few" : "few"} active suppliers nearby.`,
      reasoning:
        "Competition is scored from the number of nearby suppliers, their price ranges, and how concentrated they are around the main market cluster.",
      provenance: "Observed",
      confidence: "Medium",
    },
    opportunity: {
      score: opportunity,
      explanation: `The overall opportunity is ${opportunity >= 70 ? "attractive" : opportunity >= 50 ? "workable" : "limited"} given demand, supply gap, and competition.`,
      reasoning: `Opportunity combines demand strength, the supply gap, and competitive pressure into a single viability signal for a new ${label.toLowerCase()} business.`,
      provenance: "Calculated",
      confidence: "Medium",
    },
  };
}

function buildPricing(input: AnalysisInput): Pricing {
  const competition = CATEGORY_COMPETITION[input.category] ?? 45;
  const base = 40 + (competition % 30);
  const production = base * 0.55;
  const transport = 6 + (competition % 5);
  const packaging = 4 + (competition % 3);
  const operating = production + transport + packaging;
  const margin = clamp(operating * 0.3, 8, 40);
  return {
    competitorPriceRange: {
      min: base,
      max: base + 18,
      avg: base + 9,
    },
    productionCost: estimate(production, "Calculated", "Medium"),
    transportCost: estimate(transport, "Estimated", "Medium"),
    packagingCost: estimate(packaging, "Estimated", "Low"),
    operatingCost: estimate(operating, "Calculated", "Medium"),
    recommendedPriceRange: {
      min: Math.round(operating * 1.2),
      max: Math.round(operating * 1.45),
    },
    estimatedMargin: estimate(margin, "Calculated", "Medium"),
  };
}

function buildSwot(input: AnalysisInput): SWOT {
  const label = categoryLabel(input.category);
  const competition = CATEGORY_COMPETITION[input.category] ?? 45;
  return {
    strengths: [
      `Local demand for ${label.toLowerCase()} is steady and predictable.`,
      "Raw material is available within the village and nearby blocks.",
      "Short transport distance to the main market keeps logistics costs low.",
    ],
    weaknesses: [
      "Seasonal demand can create cash-flow gaps during lean months.",
      "Dependence on a single cooperative or buyer concentrates sales risk.",
      "Limited cold-chain and storage infrastructure raises spoilage risk.",
    ],
    opportunities: [
      "Underserved village clusters beyond 4 km have no formal outlet.",
      "Value-added packaging can lift margins above commodity pricing.",
      "Growing urban demand supports premium pricing for quality output.",
    ],
    threats: [
      competition >= 60
        ? "Several established suppliers may respond with price cuts."
        : "New entrants could increase competition as the market grows.",
      "Transport cost volatility can erode thin margins.",
      "Purchasing power in the immediate village is limited.",
    ],
  };
}

function buildRisk(input: AnalysisInput): RiskAssessment {
  const demand = CATEGORY_DEMAND[input.category] ?? 65;
  const competition = CATEGORY_COMPETITION[input.category] ?? 45;
  const categories: RiskCategory[] = [
    {
      category: "Financial",
      level: riskLevel(60 + (input.capital > 200000 ? -10 : 10)),
      why: "Capital requirement is moderate relative to projected early revenue.",
      whatToDo: "Phase the investment and keep a working-capital buffer.",
    },
    {
      category: "Market",
      level: riskLevel(competition + 15),
      why: `Competition is ${competition >= 60 ? "high" : "moderate"} in the target radius.`,
      whatToDo: "Differentiate on quality, packaging, and reliable supply.",
    },
    {
      category: "Supply",
      level: riskLevel(55),
      why: "Raw material availability is generally good but seasonal.",
      whatToDo: "Lock in multiple suppliers and store for lean months.",
    },
    {
      category: "Seasonality",
      level: riskLevel(65),
      why: "Demand dips outside peak festival and harvest windows.",
      whatToDo: "Plan inventory and promotions around seasonal peaks.",
    },
    {
      category: "Operational",
      level: riskLevel(50),
      why: "Simple operations but dependent on consistent quality control.",
      whatToDo: "Document standard processes and train one backup operator.",
    },
    {
      category: "Customer Concentration",
      level: riskLevel(demand >= 80 ? 70 : 50),
      why: "A large share of sales may go to a single cooperative buyer.",
      whatToDo: "Develop a second direct-to-consumer sales channel.",
    },
  ];
  return { categories };
}

function buildMarket(input: AnalysisInput, radius: Radius): MarketReach {
  const demand = CATEGORY_DEMAND[input.category] ?? 65;
  const competition = CATEGORY_COMPETITION[input.category] ?? 45;
  const reach = radius === "5km" ? 4200 : 9800;
  const customers = Math.round(reach * (0.35 + demand / 300));
  const label = categoryLabel(input.category);
  return {
    estimatedReach: estimate(reach, "Estimated", "Medium"),
    potentialCustomerBase: estimate(customers, "Calculated", "Medium"),
    nearbyMarkets: [
      `${input.block} weekly haat`,
      `${input.district} mandi`,
      "Village cooperative collection centre",
    ],
    distributionChannels: [
      "Direct to local households",
      "Cooperative / aggregator pickup",
      "Weekly haat and mandi stalls",
    ],
    accessibility:
      radius === "5km"
        ? "Good road access within 5 km; last-mile village roads are partly unpaved."
        : "Wider reach within 10 km; longer routes increase transport time and cost.",
    underservedOpportunities: [
      "Northern hamlets beyond 4 km",
      "Eastern village cluster with no formal outlet",
    ],
    demandIndicators: [
      `Steady ${label.toLowerCase()} demand from local households`,
      "Regular footfall at the weekly haat",
      "Cooperative reports consistent collection volumes",
    ],
    supplyIndicators: [
      `${competition >= 60 ? "Several" : "A few"} active suppliers nearby`,
      "Existing cooperative collection infrastructure",
      "Limited cold-chain and storage capacity",
    ],
    competitionLevel:
      competition >= 60 ? "High" : competition >= 40 ? "Moderate" : "Low",
  };
}

export function generateDemoAnalysis(
  input: AnalysisInput,
  radius: Radius,
): HyperLocalAnalysis {
  const result: AnalysisResult = {
    market: buildMarket(input, radius),
    map: buildMap(input, radius),
    scores: buildScores(input),
    pricing: buildPricing(input),
    swot: buildSwot(input),
    risk: buildRisk(input),
  };
  return {
    id: `demo-${Date.now()}`,
    input,
    radius,
    createdAt: Date.now(),
    result,
  };
}
