import { useSettingsStore } from "@/lib/settings-store";
import type { ThemeMode } from "@/lib/types";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { settings, setTheme } = useSettingsStore();
  const [systemDark, setSystemDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemDark(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const resolvedTheme: ResolvedTheme =
    settings.theme === "system"
      ? systemDark
        ? "dark"
        : "light"
      : settings.theme;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.style.colorScheme = resolvedTheme;
    root.classList.toggle("text-large", settings.accessibility.largeText);
    root.classList.toggle("high-contrast", settings.accessibility.highContrast);
    root.classList.toggle(
      "reduce-motion",
      settings.accessibility.reducedMotion,
    );
  }, [resolvedTheme, settings.accessibility]);

  const value = useMemo(
    () => ({ theme: settings.theme, resolvedTheme, setTheme }),
    [settings.theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
