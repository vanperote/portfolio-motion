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
      className="flex rounded-full border border-black/15 bg-white/70 p-0.5 text-[11px] font-semibold uppercase tracking-wider"
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
              ? "bg-lime text-ink shadow-[0_0_12px_rgba(194,232,76,0.35)]"
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
  const { locale, setLocale } = useSitePreferences();

  return (
    <div className={cn("flex items-center", className)}>
      <LangToggle locale={locale} setLocale={setLocale} />
    </div>
  );
}
