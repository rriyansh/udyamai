import { G as create, H as persist } from "./index-CeuI7PIL.js";
const useOnboardingStore = create()(
  persist(
    (set) => ({
      profile: null,
      completed: false,
      isDemo: false,
      setProfile: (profile) => set({ profile, completed: true, isDemo: false }),
      loadDemo: (profile) => set({ profile, completed: true, isDemo: true }),
      updateProfile: (patch) => set((state) => ({
        profile: state.profile ? { ...state.profile, ...patch } : state.profile
      })),
      complete: () => set({ completed: true }),
      reset: () => set({ profile: null, completed: false, isDemo: false })
    }),
    { name: "udyamai-onboarding" }
  )
);
export {
  useOnboardingStore as u
};
