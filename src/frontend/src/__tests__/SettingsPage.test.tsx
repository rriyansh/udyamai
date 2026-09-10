import App from "@/App";
import { DEMO_PROFILE } from "@/lib/demo-data";
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

describe("SettingsPage theme and accessibility", () => {
  beforeEach(() => {
    mockReducedMotion();
    useOnboardingStore.getState().reset();
    useOnboardingStore.getState().loadDemo(DEMO_PROFILE);
    document.documentElement.className = "";
  });

  it("shows all working settings sections", async () => {
    await renderAt("/settings");
    expect(
      await screen.findByRole("heading", { name: /Settings/i }),
    ).toBeInTheDocument();
    for (const section of [
      "Account",
      "Language",
      "Voice & Listening",
      "Notifications",
      "Privacy",
      "Accessibility",
      "Theme",
      "About",
    ]) {
      // Some section names (e.g. "Language") also appear in the About list, so
      // assert the section title is present at least once.
      expect(screen.getAllByText(section).length).toBeGreaterThan(0);
    }
  });

  it("applies the dark theme app-wide", async () => {
    const user = userEvent.setup();
    await renderAt("/settings");
    await user.click(await screen.findByRole("button", { name: /^Dark$/i }));
    await waitFor(() => {
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
  });

  it("wires accessibility toggles to app-wide classes", async () => {
    const user = userEvent.setup();
    await renderAt("/settings");

    await user.click(
      await screen.findByTestId("accessibility_large_text_toggle"),
    );
    await waitFor(() => {
      expect(document.documentElement.classList.contains("text-large")).toBe(
        true,
      );
    });

    await user.click(screen.getByTestId("accessibility_high_contrast_toggle"));
    await waitFor(() => {
      expect(document.documentElement.classList.contains("high-contrast")).toBe(
        true,
      );
    });

    await user.click(screen.getByTestId("accessibility_reduced_motion_toggle"));
    await waitFor(() => {
      expect(document.documentElement.classList.contains("reduce-motion")).toBe(
        true,
      );
    });
  });

  it("keeps auto-read important explanations OFF by default", async () => {
    await renderAt("/settings");
    await screen.findByRole("heading", { name: /Settings/i });
    const autoRead = screen.getByTestId("voice_autoread_toggle");
    expect(autoRead).toHaveAttribute("data-state", "unchecked");
  });
});
