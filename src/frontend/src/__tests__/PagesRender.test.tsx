import { renderApp } from "@/__tests__/renderApp";
import { DEMO_PROFILE } from "@/lib/demo-data";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { router } from "@/router";
import { screen, within } from "@testing-library/react";
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
  return renderApp();
}

describe("all 12 pages render without crashing", () => {
  beforeEach(() => {
    mockReducedMotion();
    useOnboardingStore.getState().reset();
    useOnboardingStore.getState().loadDemo(DEMO_PROFILE);
  });

  it("renders the landing page", async () => {
    await renderAt("/");
    expect(
      await screen.findByRole("heading", {
        name: /Build a Business That Fits Your Reality/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the onboarding page", async () => {
    await renderAt("/onboarding");
    expect(
      await screen.findByRole("heading", { name: /What is your name\?/i }),
    ).toBeInTheDocument();
  });

  it("renders the dashboard page", async () => {
    await renderAt("/dashboard");
    expect(
      await screen.findByText(/Welcome back, Meena Devi/i),
    ).toBeInTheDocument();
  });

  it("renders the New Analysis page", async () => {
    await renderAt("/new");
    expect(
      await screen.findByRole("heading", { name: /New Analysis/i }),
    ).toBeInTheDocument();
  });

  it("renders the My Analyses page", async () => {
    await renderAt("/analyses");
    expect(
      await screen.findByRole("heading", { name: /My Analyses/i }),
    ).toBeInTheDocument();
  });

  it("renders the Market page", async () => {
    await renderAt("/market");
    expect(
      await screen.findByRole("heading", { name: /Market Intelligence/i }),
    ).toBeInTheDocument();
  });

  it("renders the Finance page", async () => {
    await renderAt("/finance");
    expect(
      await screen.findByRole("heading", { name: /Finance/i }),
    ).toBeInTheDocument();
  });

  it("renders the Schemes page", async () => {
    await renderAt("/schemes");
    expect(
      await screen.findByRole("heading", { name: /Government Schemes/i }),
    ).toBeInTheDocument();
  });

  it("renders the What-if Lab page", async () => {
    await renderAt("/what-if");
    expect(
      await screen.findByRole("heading", { name: /What-if Lab/i }),
    ).toBeInTheDocument();
  });

  it("renders the Reports page", async () => {
    await renderAt("/reports");
    expect(
      await screen.findByRole("heading", { name: /Reports/i }),
    ).toBeInTheDocument();
  });

  it("renders the Profile page", async () => {
    await renderAt("/profile");
    expect(
      await screen.findByRole("heading", { name: /Profile/i }),
    ).toBeInTheDocument();
  });

  it("renders the Settings page", async () => {
    await renderAt("/settings");
    expect(
      await screen.findByRole("heading", { name: /Settings/i }),
    ).toBeInTheDocument();
  });
});

describe("mobile menu drawer", () => {
  beforeEach(() => {
    mockReducedMotion();
    useOnboardingStore.getState().reset();
    useOnboardingStore.getState().loadDemo(DEMO_PROFILE);
  });

  it("opens the mobile menu and exposes Finance, Schemes, and What-if", async () => {
    const user = userEvent.setup();
    await renderAt("/dashboard");
    await screen.findByText(/Welcome back, Meena Devi/i);

    // The mobile menu button is present in the AppShell header.
    const menuButton = screen.getByTestId("mobile_menu_button");
    await user.click(menuButton);

    // The drawer opens and lists the navigation links, including the Phase 3
    // financial pages that must be reachable on mobile.
    const menu = await screen.findByTestId("mobile_menu");
    expect(
      within(menu).getByRole("link", { name: /Finance/i }),
    ).toBeInTheDocument();
    expect(
      within(menu).getByRole("link", { name: /Schemes/i }),
    ).toBeInTheDocument();
    expect(
      within(menu).getByRole("link", { name: /What-if/i }),
    ).toBeInTheDocument();
  });
});
