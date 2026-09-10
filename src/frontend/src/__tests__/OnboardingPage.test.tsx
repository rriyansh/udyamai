import App from "@/App";
import { useOnboardingStore } from "@/lib/onboarding-store";
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

async function renderAt(path: string) {
  await router.navigate({ to: path });
  return render(<App />);
}

describe("OnboardingPage", () => {
  beforeEach(() => {
    mockReducedMotion();
    useOnboardingStore.persist.clearStorage();
    useOnboardingStore.setState({
      profile: null,
      completed: false,
      isDemo: false,
      draft: {},
      onboardingStep: 0,
    });
  });

  it("shows one question at a time with a compact progress indicator", async () => {
    await renderAt("/onboarding");
    expect(
      await screen.findByRole("heading", { name: /What is your name\?/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Step 1 of (12|13)/i)).toBeInTheDocument();
    // Only the first question is visible, not later ones.
    expect(
      screen.queryByText(/Which village do you live in\?/i),
    ).not.toBeInTheDocument();
  });

  it("collects the full profile and routes to the dashboard", async () => {
    const user = userEvent.setup();
    await renderAt("/onboarding");

    // Step 1: Name
    await user.type(
      screen.getByLabelText(/What is your name\?/i),
      "Meena Devi",
    );
    await user.click(screen.getByRole("button", { name: /Next/i }));

    // Step 2: Village — "Indore" is a single match, so a confirmation modal appears.
    await user.type(
      await screen.findByLabelText(/Which village do you live in\?/i),
      "Indore",
    );
    await user.click(await screen.findByRole("button", { name: /^Indore$/i }));
    await user.click(await screen.findByRole("button", { name: /Confirm/i }));

    // Steps 3-5: Block, District, State are auto-filled by the location confirm.
    await user.click(screen.getByRole("button", { name: /Next/i })); // block
    await user.click(screen.getByRole("button", { name: /Next/i })); // district
    await user.click(screen.getByRole("button", { name: /Next/i })); // state
    await user.click(screen.getByRole("button", { name: /Next/i })); // margin

    // Step 6: Margin capital
    await user.type(
      await screen.findByLabelText(/How much margin capital can you put in\?/i),
      "100000",
    );
    await user.click(screen.getByRole("button", { name: /Next/i }));

    // Step 7: Business category
    await user.click(
      await screen.findByRole("button", { name: /Dairy Farming/i }),
    );
    await user.click(screen.getByRole("button", { name: /Next/i }));

    // Step 8: Land availability, then area
    await user.click(
      await screen.findByRole("button", {
        name: /Yes, I have land or space/i,
      }),
    );
    await user.click(screen.getByRole("button", { name: /Next/i }));

    await user.type(
      await screen.findByLabelText(
        /How many square feet of land or space do you have\?/i,
      ),
      "200",
    );
    await user.click(screen.getByRole("button", { name: /Next/i }));

    // Step 9: Experience
    await user.type(
      await screen.findByLabelText(
        /How many years of experience do you have\?/i,
      ),
      "4",
    );
    await user.click(screen.getByRole("button", { name: /Next/i }));

    // Step 10: Investment
    await user.type(
      await screen.findByLabelText(/What is your expected total investment\?/i),
      "250000",
    );
    await user.click(screen.getByRole("button", { name: /Next/i }));

    // Step 11: Sales
    await user.type(
      await screen.findByLabelText(/What monthly sales do you expect\?/i),
      "45000",
    );
    await user.click(screen.getByRole("button", { name: /Next/i }));

    // Step 12: Loan — Finish
    await user.type(
      await screen.findByLabelText(/How much loan do you need\?/i),
      "150000",
    );
    await user.click(screen.getByRole("button", { name: /Finish/i }));

    // Routes to the dashboard with the entered data reflected.
    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/dashboard");
    });
    expect(
      await screen.findByText(/Welcome back, Meena Devi/i),
    ).toBeInTheDocument();
  });

  it("shows a help tooltip for margin capital", async () => {
    const user = userEvent.setup();
    await renderAt("/onboarding");

    // Advance to the margin step.
    await user.type(
      await screen.findByLabelText(/What is your name\?/i),
      "Meena Devi",
    );
    await user.click(screen.getByRole("button", { name: /Next/i }));
    await user.type(
      await screen.findByLabelText(/Which village do you live in\?/i),
      "Indore",
    );
    await user.click(await screen.findByRole("button", { name: /^Indore$/i }));
    await user.click(await screen.findByRole("button", { name: /Confirm/i }));
    await user.click(screen.getByRole("button", { name: /Next/i }));
    await user.click(screen.getByRole("button", { name: /Next/i }));
    await user.click(screen.getByRole("button", { name: /Next/i }));
    await user.click(screen.getByRole("button", { name: /Next/i }));

    const helpButton = await screen.findByRole("button", {
      name: /What does 'margin capital' mean\?/i,
    });
    await user.click(helpButton);
    expect(
      screen.getByText(/Margin capital is the money you can put in yourself/i),
    ).toBeInTheDocument();
  });
});
