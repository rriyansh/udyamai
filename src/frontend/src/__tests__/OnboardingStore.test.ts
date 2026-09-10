import { DEMO_PROFILE } from "@/lib/demo-data";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { beforeEach, describe, expect, it } from "vitest";

describe("onboarding store demo-data contract", () => {
  beforeEach(() => {
    useOnboardingStore.getState().reset();
  });

  it("starts empty and not completed", () => {
    const state = useOnboardingStore.getState();
    expect(state.profile).toBeNull();
    expect(state.completed).toBe(false);
    expect(state.isDemo).toBe(false);
  });

  it("marks a real user profile as non-demo", () => {
    useOnboardingStore.getState().setProfile(DEMO_PROFILE);
    const state = useOnboardingStore.getState();
    expect(state.profile).toEqual(DEMO_PROFILE);
    expect(state.completed).toBe(true);
    // A real onboarding must never be flagged as demo data.
    expect(state.isDemo).toBe(false);
  });

  it("marks a demo-loaded profile as demo data", () => {
    useOnboardingStore.getState().loadDemo(DEMO_PROFILE);
    const state = useOnboardingStore.getState();
    expect(state.profile).toEqual(DEMO_PROFILE);
    expect(state.completed).toBe(true);
    // The demo flag is what drives the clearly-labelled DEMO DATA badge.
    expect(state.isDemo).toBe(true);
  });

  it("updates a profile in place without clearing the demo flag", () => {
    useOnboardingStore.getState().loadDemo(DEMO_PROFILE);
    useOnboardingStore.getState().updateProfile({ name: "Renamed" });
    const state = useOnboardingStore.getState();
    expect(state.profile?.name).toBe("Renamed");
    expect(state.profile?.businessCategory).toBe("dairy");
    expect(state.isDemo).toBe(true);
  });

  it("reset clears the profile and demo flag", () => {
    useOnboardingStore.getState().loadDemo(DEMO_PROFILE);
    useOnboardingStore.getState().reset();
    const state = useOnboardingStore.getState();
    expect(state.profile).toBeNull();
    expect(state.completed).toBe(false);
    expect(state.isDemo).toBe(false);
  });
});
