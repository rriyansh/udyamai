import App from "@/App";
import { DEMO_PROFILE } from "@/lib/demo-data";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { router } from "@/router";
import { render, screen } from "@testing-library/react";
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

describe("DashboardPage", () => {
  beforeEach(() => {
    mockReducedMotion();
    useOnboardingStore.getState().reset();
  });

  it("renders the greeting, business summary, and snapshot cards", async () => {
    useOnboardingStore.getState().loadDemo(DEMO_PROFILE);
    await renderAt("/dashboard");

    expect(
      await screen.findByText(/Welcome back, Meena Devi/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Business Summary")).toBeInTheDocument();
    expect(screen.getByText("Feasibility Score")).toBeInTheDocument();
    expect(screen.getByText("Market Opportunity")).toBeInTheDocument();
    expect(screen.getByText("Finance Snapshot")).toBeInTheDocument();
    expect(screen.getByText("Next Recommended Step")).toBeInTheDocument();
    expect(screen.getByText("Recent Analyses")).toBeInTheDocument();
    expect(screen.getByText("Saved Reports")).toBeInTheDocument();
  });

  it("clearly labels demo data and never presents it as real", async () => {
    useOnboardingStore.getState().loadDemo(DEMO_PROFILE);
    await renderAt("/dashboard");

    expect(await screen.findByText("DEMO DATA")).toBeInTheDocument();
    // The feasibility score is explicitly a placeholder estimate.
    expect(
      screen.getByText(/Placeholder estimate based on your profile/i),
    ).toBeInTheDocument();
  });

  it("shows a loading skeleton before the dashboard content", async () => {
    useOnboardingStore.getState().loadDemo(DEMO_PROFILE);
    await renderAt("/dashboard");
    // The loading state is present initially, then content replaces it.
    expect(screen.getByTestId("dashboard_loading_state")).toBeInTheDocument();
    expect(
      await screen.findByText(/Welcome back, Meena Devi/i),
    ).toBeInTheDocument();
  });
});
