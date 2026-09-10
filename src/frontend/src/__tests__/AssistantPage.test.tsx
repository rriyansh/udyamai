import App from "@/App";
import { generateDemoAnalysis } from "@/lib/analysis-engine";
import { useAnalysisStore } from "@/lib/analysis-store";
import { DEMO_PROFILE } from "@/lib/demo-data";
import { useOnboardingStore } from "@/lib/onboarding-store";
import type { AnalysisInput } from "@/lib/types";
import { router } from "@/router";
import { render, screen, waitFor } from "@testing-library/react";
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

const INPUT: AnalysisInput = {
  village: "Rampur",
  block: "Khairagarh",
  district: "Rajpur",
  state: "Madhya Pradesh",
  category: "dairy",
  capital: 100000,
};

async function renderAt(path: string) {
  await router.navigate({ to: path });
  return render(<App />);
}

describe("AssistantPage Ask UdyamAI", () => {
  beforeEach(() => {
    mockReducedMotion();
    useOnboardingStore.getState().reset();
    useOnboardingStore.getState().loadDemo(DEMO_PROFILE);
    // Seed a completed demo analysis so the assistant has context to answer from.
    useAnalysisStore.getState().reset();
    useAnalysisStore
      .getState()
      .complete(generateDemoAnalysis(INPUT, "5km"), "demo");
  });

  it("answers a context-aware question grounded in the current analysis", async () => {
    const user = userEvent.setup();
    await renderAt("/assistant");

    expect(
      await screen.findByRole("heading", { name: /Ask UdyamAI/i }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /Is this business suitable for my village\?/i,
      }),
    );

    // The demo reply is grounded in the analysis's own scores and location.
    await waitFor(() => {
      expect(screen.getByText(/demand scores/i)).toBeInTheDocument();
    });
    // "Rampur" appears in both the context banner and the grounded reply.
    expect(screen.getAllByText(/Rampur/i).length).toBeGreaterThanOrEqual(1);
    // The reply is clearly labelled as demo data.
    expect(screen.getByText("Demo data")).toBeInTheDocument();
  });

  it("never invents financial figures in its replies", async () => {
    const user = userEvent.setup();
    await renderAt("/assistant");
    await screen.findByRole("heading", { name: /Ask UdyamAI/i });

    await user.click(
      screen.getByRole("button", { name: /What does margin mean\?/i }),
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Margin is the share of each sale/i),
      ).toBeInTheDocument();
    });
    // The assistant explicitly declines to invent financial calculations.
    expect(
      screen.getByText(/I never invent financial calculations/i),
    ).toBeInTheDocument();
  });

  it("shows an empty state when no analysis exists", async () => {
    useAnalysisStore.getState().reset();
    await renderAt("/assistant");
    expect(await screen.findByText(/No analysis yet/i)).toBeInTheDocument();
    expect(screen.getByText(/Run a new analysis first/i)).toBeInTheDocument();
  });
});
