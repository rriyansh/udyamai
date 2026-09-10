import {
  BUSINESS_CATEGORIES,
  DEMO_ANALYSES,
  DEMO_BADGE,
  DEMO_FINANCE,
  DEMO_LOANS,
  DEMO_MARKET,
  DEMO_PROFILE,
  DEMO_REPORTS,
  DEMO_SCENARIOS,
  DEMO_SCHEMES,
  categoryName,
} from "@/lib/demo-data";
import { describe, expect, it } from "vitest";

describe("demo data", () => {
  it("is clearly labelled as demo data", () => {
    expect(DEMO_BADGE).toBe("DEMO DATA");
  });

  it("lists a large, searchable catalog including the original core categories", () => {
    expect(BUSINESS_CATEGORIES.length).toBeGreaterThanOrEqual(100);
    const ids = BUSINESS_CATEGORIES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    const names = BUSINESS_CATEGORIES.map((c) => c.name);
    expect(names).toContain("Dairy Farming");
    expect(names).toContain("Poultry Farming");
    expect(names).toContain("Goat & Sheep Rearing");
    expect(names).toContain("Fisheries & Aquaculture");
    expect(names).toContain("Organic Farming");
    expect(names).toContain("Horticulture");
    expect(names).toContain("Food Processing");
    expect(names).toContain("Handicrafts");
    expect(names).toContain("Tailoring & Garments");
    expect(names).toContain("Agro-Processing");
    expect(names).toContain("Beekeeping");
    expect(names).toContain("Mushroom Cultivation");
    expect(names).toContain("Animal Feed Production");
    expect(names).toContain("Rural Tourism");
    expect(names).toContain("Agri-Equipment Rental");
  });

  it("provides a sample rural entrepreneur profile", () => {
    expect(DEMO_PROFILE.name).toBe("Meena Devi");
    expect(DEMO_PROFILE.businessCategory).toBe("dairy");
    expect(DEMO_PROFILE.marginCapital).toBe(100000);
  });

  it("provides populated demo collections for every data-driven page", () => {
    expect(DEMO_ANALYSES.length).toBeGreaterThan(0);
    expect(DEMO_MARKET.length).toBeGreaterThan(0);
    expect(DEMO_SCHEMES.length).toBeGreaterThan(0);
    expect(DEMO_LOANS.length).toBeGreaterThan(0);
    expect(DEMO_REPORTS.length).toBeGreaterThan(0);
    expect(DEMO_SCENARIOS.length).toBeGreaterThan(0);
    expect(DEMO_FINANCE).toBeDefined();
  });

  it("maps category ids to display names", () => {
    expect(categoryName("dairy")).toBe("Dairy Farming");
    expect(categoryName("beekeeping")).toBe("Beekeeping");
  });
});
