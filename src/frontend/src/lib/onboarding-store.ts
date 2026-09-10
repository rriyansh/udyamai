import type { OnboardingProfile } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OnboardingState {
  profile: OnboardingProfile | null;
  completed: boolean;
  isDemo: boolean;
  setProfile: (profile: OnboardingProfile) => void;
  loadDemo: (profile: OnboardingProfile) => void;
  updateProfile: (patch: Partial<OnboardingProfile>) => void;
  complete: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      profile: null,
      completed: false,
      isDemo: false,
      setProfile: (profile) => set({ profile, completed: true, isDemo: false }),
      loadDemo: (profile) => set({ profile, completed: true, isDemo: true }),
      updateProfile: (patch) =>
        set((state) => ({
          profile: state.profile
            ? { ...state.profile, ...patch }
            : state.profile,
        })),
      complete: () => set({ completed: true }),
      reset: () => set({ profile: null, completed: false, isDemo: false }),
    }),
    { name: "udyamai-onboarding" },
  ),
);
