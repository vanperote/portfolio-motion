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
        className="group relative flex items-center gap-2.5 sm:gap-3 rounded-2xl sm:rounded-[24px] border border-line bg-surface/95 backdrop-blur-xl px-3 py-2.5 sm:px-4 sm:py-3 shadow-[var(--card-shadow)] transition-all duration-500"
        style={{ minHeight: "64px" }}
      >
        <div className="relative shrink-0">
          <div className="size-9 sm:size-10 overflow-hidden rounded-full border-2 border-cream shadow-[0_6px_18px_-6px_rgba(0,0,0,0.25)]">
            <img
              src={contactAvatar}
              alt={t.floating.photoAlt}
              className="size-full object-cover object-center"
            />
          </div>
        </div>

        <div className="relative min-w-0 flex-1">
          <div className="text-xs font-semibold leading-tight tracking-tight text-ink sm:text-sm">
            {t.floating.title}
          </div>
          <div className="mt-0.5 text-[10px] leading-tight text-grayink sm:text-xs">
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
          className="relative inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full bg-lime px-2.5 py-1.5 text-[11px] font-bold text-[#1c1c1a] transition hover:brightness-95 sm:px-3.5 sm:py-2 sm:text-xs"
        >
          <span className="grid size-4 place-items-center rounded-full bg-[#25D366]/15 text-[#25D366]">
            <MessageCircle className="size-3" strokeWidth={2.5} />
          </span>
          <span className="hidden sm:inline">{t.floating.cta}</span>
          <span className="sm:hidden">{t.floating.ctaShort}</span>
        </motion.a>
      </div>
    </motion.aside>
  );
}
