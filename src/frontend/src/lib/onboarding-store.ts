import type { OnboardingDraft, OnboardingProfile } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingState {
  profile: OnboardingProfile | null;
  completed: boolean;
  isDemo: boolean;
  draft: OnboardingDraft;
  onboardingStep: number;
  setProfile: (profile: OnboardingProfile) => void;
  loadDemo: (profile: OnboardingProfile) => void;
  updateProfile: (patch: Partial<OnboardingProfile>) => void;
  complete: () => void;
  reset: () => void;
  updateDraft: (patch: OnboardingDraft) => void;
  setOnboardingStep: (step: number) => void;
  clearDraft: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      profile: null,
      completed: false,
      isDemo: false,
      draft: {},
      onboardingStep: 0,
      setProfile: (profile) =>
        set({
          profile,
          completed: true,
          isDemo: false,
          draft: {},
          onboardingStep: 0,
        }),
      loadDemo: (profile) =>
        set({
          profile,
          completed: true,
          isDemo: true,
          draft: {},
          onboardingStep: 0,
        }),
      updateProfile: (patch) =>
        set((state) => ({
          profile: state.profile
            ? { ...state.profile, ...patch }
            : state.profile,
        })),
      complete: () => set({ completed: true }),
      reset: () =>
        set({
          profile: null,
          completed: false,
          isDemo: false,
          draft: {},
          onboardingStep: 0,
        }),
      updateDraft: (patch) =>
        set((state) => ({ draft: { ...state.draft, ...patch } })),
      setOnboardingStep: (step) => set({ onboardingStep: step }),
      clearDraft: () => set({ draft: {}, onboardingStep: 0 }),
    }),
    { name: "udyamai-onboarding" },
  ),
);
