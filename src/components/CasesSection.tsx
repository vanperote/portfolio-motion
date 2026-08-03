import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { getScrollProjects } from "@/lib/scroll-projects";
import { useSitePreferences } from "@/lib/site-preferences";
import asset01 from "@/assets/float/asset01.png";
import asset02 from "@/assets/float/asset02.png";
import asset03 from "@/assets/float/asset03.png";
import clock from "@/assets/float/clock.png";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Same size/placement as Salto "Os 3 Mitos" cards */
const CASE_FLOATS = [
  { src: asset01, blend: false },
  { src: asset02, blend: false },
  { src: asset03, blend: false },
  { src: clock, blend: true },
] as const;

export function CasesSection() {
  const reduce = useReducedMotion();
  const { locale, t } = useSitePreferences();
  const labels = t.scrollCases;
  const projects = useMemo(() => getScrollProjects(t), [locale]);

  return (
    <section id="cases" className="relative overflow-x-clip px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-grayink-2">
            {labels.label}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-[1.08] text-ink sm:text-5xl">
            {labels.title}{" "}
            <span className="font-serif font-medium italic">{labels.titleItalic}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-grayink sm:text-lg">
            {labels.subtitle}
          </p>
        </motion.div>

        <div className="mt-14 flex flex-col gap-10 sm:gap-12">
          {projects.map((p, i) => {
            const float = CASE_FLOATS[i % CASE_FLOATS.length];

            return (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: reduce ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE, delay: i * 0.06 }}
                className="group relative grid rounded-[1.5rem] bg-white pb-28 shadow-[0_10px_30px_rgba(20,20,15,0.05)] ring-1 ring-black/5 md:grid-cols-[minmax(220px,38%)_1fr] md:pb-10"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-t-[1.5rem] bg-panel md:aspect-auto md:min-h-[200px] md:rounded-l-[1.5rem] md:rounded-tr-none">
                  {p.video ? (
                    <video
                      src={p.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 size-full object-cover object-top"
                    />
                  ) : (
                    <img
                      src={p.previewThumb ?? p.preview}
                      alt={`${labels.thumbAlt} ${p.name}`}
                      width={p.previewThumbWidth ?? p.previewWidth}
                      height={p.previewThumbHeight ?? p.previewHeight}
                      loading="lazy"
                      decoding="async"
                      className={`absolute inset-0 size-full object-cover ${
                        p.deckThumbPosition === "left-top" ? "object-left-top" : "object-top"
                      }`}
                    />
                  )}
                </div>

                <div className="relative z-10 flex flex-col justify-center p-5 sm:p-6 md:p-7 md:pr-40">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="font-serif text-xl font-bold leading-snug text-ink sm:text-2xl">
                      {p.name}
                    </h3>
                    <a
                      href={p.projectUrl ?? "#contact"}
                      target={p.projectUrl ? "_blank" : undefined}
                      rel={p.projectUrl ? "noopener noreferrer" : undefined}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-lime px-3.5 py-2 text-xs font-bold text-ink transition hover:brightness-95 sm:text-sm"
                    >
                      {labels.viewProject}
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-grayink">
                    {p.description}
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-grayink-2">
                        {labels.objective}
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-ink/80">
                        {p.objective}
                      </p>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-grayink-2">
                        {labels.result}
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-sm leading-snug text-ink/80">
                        {p.result}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-black/10 bg-cream px-2.5 py-0.5 text-[11px] font-medium text-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Same classes/sizes as Salto "Os 3 Mitos" floats */}
                <img
                  src={float.src}
                  alt=""
                  aria-hidden
                  width={396}
                  height={367}
                  loading="lazy"
                  decoding="async"
                  className={`pointer-events-none absolute -bottom-8 left-1/2 z-20 w-36 -translate-x-1/2 select-none sm:left-auto sm:right-3 sm:w-44 sm:translate-x-0${
                    float.blend ? " mix-blend-multiply" : ""
                  }`}
                />
              </motion.article>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-14 mb-4 text-center font-serif text-lg italic text-grayink sm:text-xl md:text-2xl"
        >
          {labels.moreProjects}
        </motion.p>
      </div>
    </section>
  );
}
