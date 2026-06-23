import { Moon, Sun } from "lucide-react";
import { useSitePreferences } from "@/lib/site-preferences";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/translations";

const PANEL =
  "flex items-center gap-1.5 rounded-full border border-white/15 bg-black p-1 shadow-[0_8px_24px_rgba(0,0,0,0.45)]";

function LangToggle({
  locale,
  setLocale,
}: {
  locale: Locale;
  setLocale: (l: Locale) => void;
}) {
  return (
    <div
      className="flex rounded-full p-0.5 text-[11px] font-semibold uppercase tracking-wider"
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
              ? "bg-[#34f56b] text-black shadow-[0_0_12px_rgba(52,245,107,0.35)]"
              : "text-white hover:text-[#34f56b]",
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
    <div className={cn(PANEL, className)}>
      <LangToggle locale={locale} setLocale={setLocale} />
      <span className="h-5 w-px bg-white/15" aria-hidden />
      <button
        type="button"
        onClick={toggleTheme}
        className="grid size-8 shrink-0 place-items-center rounded-full text-white transition-colors duration-200 hover:text-[#34f56b]"
        aria-label={isDark ? t.controls.themeLight : t.controls.themeDark}
      >
        {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
      </button>
    </div>
  );
}
