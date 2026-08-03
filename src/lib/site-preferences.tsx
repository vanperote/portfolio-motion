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

const LOCALE_KEY = "vancode-locale";

type SitePreferencesContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationDict;
};

const SitePreferencesContext = createContext<SitePreferencesContextValue | null>(null);

function readLocale(): Locale {
  if (typeof window === "undefined") return "pt";
  const stored = localStorage.getItem(LOCALE_KEY);
  return stored === "en" ? "en" : "pt";
}

export function SitePreferencesProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(LOCALE_KEY, next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
    document.documentElement.classList.remove("dark");
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
    }),
    [locale, setLocale],
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
