import App from "@/App";
import { router } from "@/router";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Skip the cosmic intro animation so the hero content is immediately visible.
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

describe("LandingPage", () => {
  beforeEach(() => {
    mockReducedMotion();
  });

  it("renders the UdyamAI brand, tagline, explanation, and timing", async () => {
    await renderAt("/");
    // The brand appears in both the header and the hero, so assert it is present.
    expect((await screen.findAllByText("UdyamAI")).length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", {
        name: /Build a Business That Fits Your Reality/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /combines local market intelligence, business feasibility/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/Takes about 3 minutes/i)).toBeInTheDocument();
  });

  it("shows Get Started and Try Demo buttons plus the three benefits", async () => {
    await renderAt("/");
    expect(
      await screen.findByRole("button", { name: /Start Simulation/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Try Demo/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Understand your market")).toBeInTheDocument();
    expect(screen.getByText("Plan your money")).toBeInTheDocument();
    expect(screen.getByText("Find suitable financing")).toBeInTheDocument();
  });

  it("routes Get Started to onboarding", async () => {
    const user = userEvent.setup();
    await renderAt("/");
    await user.click(
      await screen.findByRole("button", { name: /Start Simulation/i }),
    );
    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/onboarding");
    });
    expect(
      await screen.findByRole("heading", { name: /What is your name\?/i }),
    ).toBeInTheDocument();
  });

  it("routes Try Demo to the dashboard pre-loaded with demo data", async () => {
    const user = userEvent.setup();
    await renderAt("/");
    await user.click(await screen.findByRole("button", { name: /Try Demo/i }));
    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/dashboard");
    });
    // Dashboard shows the demo profile name and the clearly-labelled demo badge.
    expect(
      await screen.findByText(/Welcome back, Meena Devi/i),
    ).toBeInTheDocument();
    expect(screen.getByText("DEMO DATA")).toBeInTheDocument();
  });
});
