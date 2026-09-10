import App from "@/App";
import { useAnalysisStore } from "@/lib/analysis-store";
import { DEMO_PROFILE } from "@/lib/demo-data";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { router } from "@/router";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

function mockReducedMotion() {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

async function renderAt(path: string) {
  await router.navigate({ to: path });
  return render(<App />);
}

describe("NewAnalysisPage hyper-local analysis flow", () => {
  beforeEach(() => {
    mockReducedMotion();
    useOnboardingStore.getState().reset();
    useOnboardingStore.getState().loadDemo(DEMO_PROFILE);
    useAnalysisStore.getState().reset();
  });

  it("validates required inputs before starting", async () => {
    const user = userEvent.setup();
    await renderAt("/new");

    // Clear the prefilled capital so the form is incomplete.
    const capital = screen.getByLabelText(/Capital you plan to invest/i);
    await user.clear(capital);

    await user.click(screen.getByRole("button", { name: /Start analysis/i }));

    expect(
      await screen.findByText(/Enter a positive capital amount/i),
    ).toBeInTheDocument();
    // Still on the form, not analyzing.
    expect(
      screen.queryByText(/Analysing your market/i),
    ).not.toBeInTheDocument();
  });

  it("shows the animated ten-stage progress sequence when an analysis starts", async () => {
    const user = userEvent.setup();
    await renderAt("/new");
    await screen.findByRole("heading", { name: /New Analysis/i });

    // The form is prefilled from the demo profile, so it is valid as-is.
    await user.click(screen.getByRole("button", { name: /Start analysis/i }));

    // The animated progress sequence is shown while running.
    expect(screen.getByText(/Analysing your market/i)).toBeInTheDocument();
    const stages = screen.getByLabelText("Analysis stages");
    expect(stages).toBeInTheDocument();
    for (const stage of [
      "Location",
      "Market",
      "Competitors",
      "Demand",
      "Pricing",
      "SWOT",
      "Risk",
      "Finance",
      "Schemes",
      "Report",
    ]) {
      expect(within(stages).getByText(stage)).toBeInTheDocument();
    }
  });

  it("renders a completed analysis result with the DEMO DATA badge", async () => {
    // Seed a completed analysis directly so the result phase renders without
    // waiting on the animated progress timers.
    useAnalysisStore.getState().complete(
      {
        id: "an-test",
        input: {
          village: "Rampur",
          block: "Khairagarh",
          district: "Rajpur",
          state: "Madhya Pradesh",
          category: "dairy",
          capital: 100000,
        },
        radius: "5km",
        createdAt: Date.now(),
        result: {
          market: {
            estimatedReach: {
              value: 4200,
              provenance: "Estimated",
              confidence: "Medium",
            },
            potentialCustomerBase: {
              value: 2702,
              provenance: "Calculated",
              confidence: "Medium",
            },
            nearbyMarkets: ["Rampur weekly haat"],
            distributionChannels: ["Direct to local households"],
            accessibility: "Good road access within 5 km.",
            underservedOpportunities: ["Northern hamlets"],
            demandIndicators: ["Steady dairy demand"],
            supplyIndicators: ["A few active suppliers"],
            competitionLevel: "Moderate",
          },
          map: {
            userLocation: { lat: 23.2, lng: 77.4 },
            competitors: [],
            competitorDensity: 0,
            nearestCompetitors: [],
            averageDistance: 0,
            businessClusters: [],
            underservedZones: [],
            reliableDataAvailable: false,
          },
          scores: {
            demand: {
              score: 88,
              explanation: "Strong demand",
              reasoning: "From household density",
              provenance: "Estimated",
              confidence: "Medium",
            },
            supplyGap: {
              score: 56,
              explanation: "Moderate gap",
              reasoning: "Calculated",
              provenance: "Calculated",
              confidence: "Medium",
            },
            competition: {
              score: 42,
              explanation: "Moderate competition",
              reasoning: "Observed",
              provenance: "Observed",
              confidence: "Medium",
            },
            opportunity: {
              score: 51,
              explanation: "Workable opportunity",
              reasoning: "Calculated",
              provenance: "Calculated",
              confidence: "Medium",
            },
          },
          pricing: {
            competitorPriceRange: { min: 40, max: 58, avg: 49 },
            productionCost: {
              value: 22,
              provenance: "Calculated",
              confidence: "Medium",
            },
            transportCost: {
              value: 6,
              provenance: "Estimated",
              confidence: "Medium",
            },
            packagingCost: {
              value: 4,
              provenance: "Estimated",
              confidence: "Low",
            },
            operatingCost: {
              value: 32,
              provenance: "Calculated",
              confidence: "Medium",
            },
            recommendedPriceRange: { min: 38, max: 46 },
            estimatedMargin: {
              value: 10,
              provenance: "Calculated",
              confidence: "Medium",
            },
          },
          swot: {
            strengths: ["Local demand is steady"],
            weaknesses: ["Seasonal demand"],
            opportunities: ["Underserved clusters"],
            threats: ["Transport volatility"],
          },
          risk: {
            categories: [
              {
                category: "Financial",
                level: "medium",
                why: "Capital moderate",
                whatToDo: "Phase investment",
              },
              {
                category: "Market",
                level: "medium",
                why: "Competition moderate",
                whatToDo: "Differentiate",
              },
              {
                category: "Supply",
                level: "medium",
                why: "Seasonal",
                whatToDo: "Lock suppliers",
              },
              {
                category: "Seasonality",
                level: "medium",
                why: "Demand dips",
                whatToDo: "Plan inventory",
              },
              {
                category: "Operational",
                level: "medium",
                why: "Quality control",
                whatToDo: "Document processes",
              },
              {
                category: "Customer Concentration",
                level: "medium",
                why: "Single buyer",
                whatToDo: "Add channel",
              },
            ],
          },
        },
      },
      "demo",
    );

    await renderAt("/new");

    // The result renders with the clearly-labelled DEMO DATA badge.
    expect(await screen.findByText("DEMO DATA")).toBeInTheDocument();
    expect(
      screen.getByText(/Dairy Farming Market Analysis/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/5km radius/i)).toBeInTheDocument();
    // The result includes the market, pricing, SWOT, and risk sections.
    expect(screen.getByText("Market reach")).toBeInTheDocument();
    expect(screen.getByText("Pricing & costs")).toBeInTheDocument();
    expect(screen.getByText("SWOT")).toBeInTheDocument();
    expect(screen.getByText("Risk assessment")).toBeInTheDocument();
  });

  it("shows the 5km/10km radius toggle on the form", async () => {
    await renderAt("/new");
    await screen.findByRole("heading", { name: /New Analysis/i });
    const toggle = screen.getByLabelText("Analysis radius");
    expect(toggle).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "5km" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "10km" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });
});
