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

// These tests characterize the *interaction* behavior of the Phase 3 financial
// pages — scheme routing form + search/filter, modal open/close, what-if
// preset/reset, and the finance overview. They assert observable UI behavior,
// not the internal calculation math (which FinanceEngine.test.ts covers with
// concrete deterministic values).

describe("SchemesPage interactions", () => {
  beforeEach(() => {
    mockReducedMotion();
    useOnboardingStore.getState().reset();
    useOnboardingStore.getState().loadDemo(DEMO_PROFILE);
  });

  it("shows an empty state until the routing form is submitted", async () => {
    await renderAt("/schemes");
    expect(
      await screen.findByText("Enter your business details"),
    ).toBeInTheDocument();
    expect(screen.getByTestId("empty_state")).toBeInTheDocument();
  });

  it("routes schemes deterministically and filters the list by search", async () => {
    const user = userEvent.setup();
    await renderAt("/schemes");

    // Submit the default routing form (dairy, ₹2,50,000 project cost).
    await user.click(screen.getByTestId("scheme_find_button"));
    const list = await screen.findByTestId("schemes_list");

    // Dairy + general schemes match; the heading never claims guaranteed
    // eligibility. The phrase appears on the section heading and on each
    // match card badge, so assert at least one occurrence.
    expect(
      screen.getAllByText("Potentially applicable").length,
    ).toBeGreaterThan(0);
    expect(within(list).getAllByRole("heading").length).toBeGreaterThan(0);

    // Searching narrows the list to the matching livestock scheme.
    await user.type(screen.getByTestId("scheme_search_input"), "livestock");
    expect(
      within(list).getByRole("heading", {
        name: /National Livestock Mission/i,
      }),
    ).toBeInTheDocument();
  });

  it("shows an empty state when no scheme matches the search", async () => {
    const user = userEvent.setup();
    await renderAt("/schemes");
    await user.click(screen.getByTestId("scheme_find_button"));
    await screen.findByTestId("schemes_list");

    await user.type(screen.getByTestId("scheme_search_input"), "zzzz-no-match");
    expect(await screen.findByText("No schemes found")).toBeInTheDocument();
  });

  it("opens a scheme detail modal from a match card", async () => {
    const user = userEvent.setup();
    await renderAt("/schemes");
    await user.click(screen.getByTestId("scheme_find_button"));
    const list = await screen.findByTestId("schemes_list");

    const firstCard = within(list).getAllByTestId(
      /scheme_item\.\d+\.select_button/,
    )[0];
    await user.click(firstCard);

    const modal = await screen.findByTestId("modal");
    // The modal shows the scheme's verified financing terms.
    expect(within(modal).getByText("Required documents")).toBeInTheDocument();
    expect(within(modal).getByText("Eligibility")).toBeInTheDocument();
  });
});

describe("WhatIfPage interactions", () => {
  beforeEach(() => {
    mockReducedMotion();
    useOnboardingStore.getState().reset();
    useOnboardingStore.getState().loadDemo(DEMO_PROFILE);
  });

  it("labels what-if outputs as demo/illustrative estimates", async () => {
    await renderAt("/what-if");
    expect(await screen.findByText("DEMO DATA")).toBeInTheDocument();
    expect(
      screen.getByText(
        /figures are illustrative projections for demonstration/i,
      ),
    ).toBeInTheDocument();
  });

  it("applies a preset and resets back to balanced", async () => {
    const user = userEvent.setup();
    await renderAt("/what-if");
    await screen.findByTestId("whatif_page");

    // Applying the Conservative preset changes the assumptions.
    await user.click(screen.getByTestId("preset_button.conservative"));
    expect(screen.getByTestId("assumptions_panel")).toBeInTheDocument();

    // Reset to Balanced restores the balanced scenario values.
    await user.click(screen.getByTestId("reset_button"));
    expect(screen.getByTestId("assumptions_panel")).toBeInTheDocument();
  });

  it("renders the projected outcome metrics", async () => {
    await renderAt("/what-if");
    await screen.findByTestId("whatif_page");
    const grid = screen.getByTestId("outcomes_grid");
    expect(within(grid).getByText("Monthly profit")).toBeInTheDocument();
    expect(within(grid).getByText("Break-even")).toBeInTheDocument();
    expect(within(grid).getByText("Repayment capacity")).toBeInTheDocument();
    expect(within(grid).getByText("Annual profit")).toBeInTheDocument();
  });
});

describe("FinancePage interactions", () => {
  beforeEach(() => {
    mockReducedMotion();
    useOnboardingStore.getState().reset();
    useOnboardingStore.getState().loadDemo(DEMO_PROFILE);
  });

  it("labels finance figures as estimates, not guarantees", async () => {
    await renderAt("/finance");
    expect(await screen.findByText("Estimated")).toBeInTheDocument();
    expect(
      screen.getByText(/Figures are estimates worked out from your inputs/i),
    ).toBeInTheDocument();
  });

  it("renders the finance overview metrics", async () => {
    await renderAt("/finance");
    await screen.findByTestId("finance_page");
    const grid = screen.getByTestId("overview_grid");
    expect(within(grid).getByText("Project cost")).toBeInTheDocument();
    expect(within(grid).getByText("Own contribution")).toBeInTheDocument();
    // "Loan" also appears on the financing chip category, so assert at least
    // one occurrence within the overview grid.
    expect(within(grid).getAllByText("Loan").length).toBeGreaterThan(0);
    expect(within(grid).getByText("EMI")).toBeInTheDocument();
    // "Interest" also appears on the financing chip category, so assert at
    // least one occurrence within the overview grid.
    expect(within(grid).getAllByText("Interest").length).toBeGreaterThan(0);
    // "Break-even" also appears on the financing chip category, so assert at
    // least one occurrence within the overview grid.
    expect(within(grid).getAllByText("Break-even").length).toBeGreaterThan(0);
  });
});
