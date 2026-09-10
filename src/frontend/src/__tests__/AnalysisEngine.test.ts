import { generateDemoAnalysis } from "@/lib/analysis-engine";
import type { AnalysisInput, Radius } from "@/lib/types";
import { describe, expect, it } from "vitest";

const DAIRY_INPUT: AnalysisInput = {
  village: "Rampur",
  block: "Khairagarh",
  district: "Rajpur",
  state: "Madhya Pradesh",
  category: "dairy",
  capital: 100000,
};

describe("generateDemoAnalysis", () => {
  it("labels every estimate with a provenance and confidence badge", () => {
    const analysis = generateDemoAnalysis(DAIRY_INPUT, "5km");
    const { market, pricing, scores } = analysis.result;

    const estimates = [
      market.estimatedReach,
      market.potentialCustomerBase,
      pricing.productionCost,
      pricing.transportCost,
      pricing.packagingCost,
      pricing.operatingCost,
      pricing.estimatedMargin,
    ];
    for (const estimate of estimates) {
      expect(["Estimated", "Observed", "Calculated", "UserProvided"]).toContain(
        estimate.provenance,
      );
      expect(["High", "Medium", "Low"]).toContain(estimate.confidence);
    }

    // The four score cards each carry a provenance and confidence badge.
    for (const card of [
      scores.demand,
      scores.supplyGap,
      scores.competition,
      scores.opportunity,
    ]) {
      expect(["Estimated", "Observed", "Calculated", "UserProvided"]).toContain(
        card.provenance,
      );
      expect(["High", "Medium", "Low"]).toContain(card.confidence);
    }
  });

  it("scales market reach and competitor count with the radius", () => {
    const five = generateDemoAnalysis(DAIRY_INPUT, "5km");
    const ten = generateDemoAnalysis(DAIRY_INPUT, "10km");

    // A 10 km radius reaches more people and more competitors than 5 km.
    expect(ten.result.market.estimatedReach.value).toBeGreaterThan(
      five.result.market.estimatedReach.value,
    );
    expect(ten.result.map.competitors.length).toBeGreaterThan(
      five.result.map.competitors.length,
    );
    expect(five.result.map.competitors.length).toBe(4);
    expect(ten.result.map.competitors.length).toBe(7);
  });

  it("marks the map as having no reliable external data", () => {
    const analysis = generateDemoAnalysis(DAIRY_INPUT, "5km");
    // Competitor counts are never invented: demo data is clearly flagged.
    expect(analysis.result.map.reliableDataAvailable).toBe(false);
  });

  it("produces a SWOT covering supply chain, seasonality, buyers, and transport", () => {
    const { swot } = generateDemoAnalysis(DAIRY_INPUT, "5km").result;
    expect(swot.strengths.length).toBeGreaterThan(0);
    expect(swot.weaknesses.length).toBeGreaterThan(0);
    expect(swot.opportunities.length).toBeGreaterThan(0);
    expect(swot.threats.length).toBeGreaterThan(0);

    const all = [
      ...swot.strengths,
      ...swot.weaknesses,
      ...swot.opportunities,
      ...swot.threats,
    ]
      .join(" ")
      .toLowerCase();
    expect(all).toMatch(/seasonal|season/);
    expect(all).toMatch(/buyer|cooperative/);
    expect(all).toMatch(/transport/);
  });

  it("scores six risk categories each with a WHY and WHAT TO DO", () => {
    const { risk } = generateDemoAnalysis(DAIRY_INPUT, "5km").result;
    const names = risk.categories.map((c) => c.category);
    expect(names).toEqual([
      "Financial",
      "Market",
      "Supply",
      "Seasonality",
      "Operational",
      "Customer Concentration",
    ]);
    for (const category of risk.categories) {
      expect(["low", "medium", "high"]).toContain(category.level);
      expect(category.why.length).toBeGreaterThan(0);
      expect(category.whatToDo.length).toBeGreaterThan(0);
    }
  });

  it("reflects the input location and capital in the analysis", () => {
    const analysis = generateDemoAnalysis(DAIRY_INPUT, "5km");
    expect(analysis.input).toEqual(DAIRY_INPUT);
    expect(analysis.radius).toBe("5km" as Radius);
    expect(analysis.result.market.nearbyMarkets.length).toBeGreaterThan(0);
  });
});
