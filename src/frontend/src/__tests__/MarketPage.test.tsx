import App from "@/App";
import { DEMO_PROFILE } from "@/lib/demo-data";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { router } from "@/router";
import { render, screen } from "@testing-library/react";
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

describe("MarketPage market intelligence", () => {
  beforeEach(() => {
    mockReducedMotion();
    useOnboardingStore.getState().reset();
    useOnboardingStore.getState().loadDemo(DEMO_PROFILE);
  });

  it("renders the four score cards with provenance and confidence badges", async () => {
    await renderAt("/market");
    expect(
      await screen.findByRole("heading", { name: /Market Intelligence/i }),
    ).toBeInTheDocument();

    for (const label of [
      "Demand",
      "Supply Gap",
      "Competition",
      "Opportunity",
    ]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
    // Every score card carries a provenance label and a confidence badge.
    const badges = screen.getAllByText(/confidence/i);
    expect(badges.length).toBeGreaterThanOrEqual(4);
    expect(
      screen.getAllByText(/Estimated|Observed|Calculated|User Provided/i)
        .length,
    ).toBeGreaterThanOrEqual(4);
  });

  it("shows pricing, SWOT, and the six-category risk engine", async () => {
    await renderAt("/market");
    await screen.findByRole("heading", { name: /Market Intelligence/i });

    // Pricing
    expect(screen.getByText("Pricing & costs")).toBeInTheDocument();
    expect(screen.getByText(/Competitor min/i)).toBeInTheDocument();
    expect(screen.getByText(/Recommended price range/i)).toBeInTheDocument();
    expect(screen.getByText(/Estimated margin/i)).toBeInTheDocument();

    // SWOT
    expect(screen.getByText("SWOT analysis")).toBeInTheDocument();
    for (const q of ["Strengths", "Weaknesses", "Opportunities", "Threats"]) {
      expect(screen.getByText(q)).toBeInTheDocument();
    }

    // Risk engine
    expect(screen.getByText("Risk engine")).toBeInTheDocument();
    for (const cat of [
      "Financial",
      "Market",
      "Supply",
      "Seasonality",
      "Operational",
      "Customer Concentration",
    ]) {
      // "Market" also appears in the sidebar nav, so allow multiple matches.
      expect(screen.getAllByText(cat).length).toBeGreaterThanOrEqual(1);
    }
  });

  it("expands the 'Why?' reasoning on a score card", async () => {
    const user = userEvent.setup();
    await renderAt("/market");
    await screen.findByRole("heading", { name: /Market Intelligence/i });

    const whyButtons = screen.getAllByRole("button", { name: /Why\?/i });
    expect(whyButtons.length).toBeGreaterThanOrEqual(4);
    await user.click(whyButtons[0]);
    // The reasoning text for the demand card is revealed.
    expect(
      screen.getByText(/Demand is estimated from household density/i),
    ).toBeInTheDocument();
  });

  it("clearly labels the page as DEMO DATA", async () => {
    await renderAt("/market");
    await screen.findByRole("heading", { name: /Market Intelligence/i });
    expect(screen.getByText("DEMO DATA")).toBeInTheDocument();
  });
});
