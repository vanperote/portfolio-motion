import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import contactAvatar from "@/assets/contact-avatar.png";
import { useSitePreferences } from "@/lib/site-preferences";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FloatingContactCard() {
  const { t } = useSitePreferences();

  return (
    <motion.aside
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
      className="fixed z-[60] bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2"
    >
      <div
        className="group relative flex items-center gap-2.5 sm:gap-3 rounded-2xl sm:rounded-[24px] border border-site bg-site-floating backdrop-blur-xl px-3 py-2.5 sm:px-4 sm:py-3 transition-all duration-500"
        style={{ minHeight: "64px", boxShadow: "var(--site-floating-shadow)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-[24px] opacity-60 dark:opacity-100"
          style={{
            background:
              "radial-gradient(120% 80% at 0% 0%, color-mix(in srgb, var(--site-fg) 6%, transparent), transparent 50%)",
          }}
        />

        <div className="relative shrink-0">
          <div className="size-9 sm:size-10 rounded-full border-2 border-site-fg/80 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.25)] dark:shadow-[0_6px_18px_-6px_rgba(0,0,0,0.6)] overflow-hidden">
            <img
              src={contactAvatar}
              alt={t.floating.photoAlt}
              className="size-full object-cover object-center"
            />
          </div>
        </div>

        <div className="relative flex-1 min-w-0">
          <div className="text-site-fg font-semibold text-xs sm:text-sm leading-tight tracking-tight">
            {t.floating.title}
          </div>
          <div className="mt-0.5 text-[10px] sm:text-xs text-site-muted leading-tight">
            {t.floating.availability}
          </div>
        </div>

        <motion.a
          href="https://wa.me/5548992239757"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          className="relative shrink-0 inline-flex items-center gap-1.5 rounded-full bg-site-cta text-site-cta-fg px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-medium cursor-pointer transition-shadow duration-500 hover:shadow-[0_0_24px_rgba(52,245,107,0.4)]"
        >
          <span className="grid place-items-center size-4 rounded-full bg-[#25D366]/15 text-[#25D366]">
            <MessageCircle className="size-3" strokeWidth={2.5} />
          </span>
          <span className="hidden sm:inline">{t.floating.cta}</span>
          <span className="sm:hidden">{t.floating.ctaShort}</span>
        </motion.a>
      </div>
    </motion.aside>
  );
}
