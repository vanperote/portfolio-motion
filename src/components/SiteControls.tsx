import { Moon, Sun } from "lucide-react";
import { useSitePreferences } from "@/lib/site-preferences";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/translations";

function LangToggle({
  locale,
  setLocale,
}: {
  locale: Locale;
  setLocale: (l: Locale) => void;
}) {
  return (
    <div
      className="flex rounded-full border border-line bg-surface/80 p-0.5 text-[11px] font-semibold uppercase tracking-wider"
      role="group"
      aria-label="Language"
    >
      {(["pt", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={cn(
            "min-w-[1.85rem] rounded-full px-2.5 py-1 transition-all duration-200",
            locale === code
              ? "bg-lime text-[#1c1c1a] shadow-[0_0_12px_rgba(194,232,76,0.35)]"
              : "text-grayink hover:text-ink",
          )}
          aria-pressed={locale === code}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export function SiteControls({ className }: { className?: string }) {
  const { locale, setLocale, theme, toggleTheme, t } = useSitePreferences();
  const isDark = theme === "dark";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <LangToggle locale={locale} setLocale={setLocale} />
      <button
        type="button"
        onClick={toggleTheme}
        className="grid size-8 shrink-0 place-items-center rounded-full border border-line bg-surface/80 text-ink transition-colors duration-200 hover:border-olive hover:text-olive"
        aria-label={isDark ? t.controls.themeLight : t.controls.themeDark}
      >
        {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
      </button>
    </div>
  );
}
