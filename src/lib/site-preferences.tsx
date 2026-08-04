import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, type Locale, type TranslationDict } from "@/lib/translations";

export type Theme = "light" | "dark";

const LOCALE_KEY = "vancode-locale";
const THEME_KEY = "vancode-theme";

type SitePreferencesContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  t: TranslationDict;
};

const SitePreferencesContext = createContext<SitePreferencesContextValue | null>(null);

function readLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  const stored = localStorage.getItem(LOCALE_KEY);
  return stored === "en" ? "en" : "pt";
}

function readTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_KEY);
  return stored === "dark" ? "dark" : "light";
}

export function SitePreferencesProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readLocale);
  const [theme, setThemeState] = useState<Theme>(readTheme);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(LOCALE_KEY, next);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem(THEME_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [locale, theme]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      theme,
      setTheme,
      toggleTheme,
      t: translations[locale],
    }),
    [locale, setLocale, theme, setTheme, toggleTheme],
  );

  return (
    <SitePreferencesContext.Provider value={value}>{children}</SitePreferencesContext.Provider>
  );
}

export function useSitePreferences() {
  const ctx = useContext(SitePreferencesContext);
  if (!ctx) {
    throw new Error("useSitePreferences must be used within SitePreferencesProvider");
  }
  return ctx;
}
