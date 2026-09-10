import type {
  AccessibilitySettings,
  AppSettings,
  NotificationSettings,
  PrivacySettings,
  ThemeMode,
  VoiceSettings,
} from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  settings: AppSettings;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: string) => void;
  updateVoice: (patch: Partial<VoiceSettings>) => void;
  updateNotifications: (patch: Partial<NotificationSettings>) => void;
  updatePrivacy: (patch: Partial<PrivacySettings>) => void;
  updateAccessibility: (patch: Partial<AccessibilitySettings>) => void;
  setAutoRead: (autoRead: boolean) => void;
  reset: () => void;
}

const defaultSettings: AppSettings = {
  theme: "system",
  language: "en",
  voice: { enabled: true, rate: 1, pitch: 1, voiceURI: null },
  notifications: { enabled: true, email: true, push: true },
  privacy: { shareData: false, analytics: true },
  accessibility: {
    largeText: false,
    highContrast: false,
    reducedMotion: false,
  },
  autoRead: false,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      setTheme: (theme) =>
        set((state) => ({ settings: { ...state.settings, theme } })),
      setLanguage: (language) =>
        set((state) => ({ settings: { ...state.settings, language } })),
      updateVoice: (patch) =>
        set((state) => ({
          settings: {
            ...state.settings,
            voice: { ...state.settings.voice, ...patch },
          },
        })),
      updateNotifications: (patch) =>
        set((state) => ({
          settings: {
            ...state.settings,
            notifications: { ...state.settings.notifications, ...patch },
          },
        })),
      updatePrivacy: (patch) =>
        set((state) => ({
          settings: {
            ...state.settings,
            privacy: { ...state.settings.privacy, ...patch },
          },
        })),
      updateAccessibility: (patch) =>
        set((state) => ({
          settings: {
            ...state.settings,
            accessibility: { ...state.settings.accessibility, ...patch },
          },
        })),
      setAutoRead: (autoRead) =>
        set((state) => ({ settings: { ...state.settings, autoRead } })),
      reset: () => set({ settings: defaultSettings }),
    }),
    { name: "udyamai-settings" },
  ),
);
