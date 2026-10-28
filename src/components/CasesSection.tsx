import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Maximize2, X } from "lucide-react";
import { getScrollProjects, type ScrollProject } from "@/lib/scroll-projects";
import { useSitePreferences } from "@/lib/site-preferences";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
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

function CaseMedia({
  p,
  labels,
  priority,
  onExpand,
}: {
  p: ScrollProject;
  labels: { thumbAlt: string; expandVideo: string };
  priority?: boolean;
  onExpand?: () => void;
}) {
  const src = p.preview ?? p.previewThumb;
  const width = p.previewWidth ?? p.previewThumbWidth;
  const height = p.previewHeight ?? p.previewThumbHeight;

  return (
    <div className="min-w-0">
      <div className="overflow-hidden rounded-[1.15rem] bg-panel ring-1 ring-line">
        {p.siteUrl ? (
          <div className="flex items-center gap-2 border-b border-line bg-surface px-3 py-1.5">
            <span className="flex gap-1" aria-hidden>
              <span className="size-1.5 rounded-full bg-[#ff5f57]" />
              <span className="size-1.5 rounded-full bg-[#febc2e]" />
              <span className="size-1.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="min-w-0 truncate text-[10px] font-medium tracking-wide text-grayink-2">
              {p.siteUrl}
            </span>
          </div>
        ) : null}
        {p.video ? (
          <button
            type="button"
            onClick={onExpand}
            className="group/media relative block w-full cursor-zoom-in"
            aria-label={labels.expandVideo}
          >
            <video
              src={p.video}
              width={p.videoWidth}
              height={p.videoHeight}
              autoPlay
              loop
              muted
              playsInline
              preload={priority ? "auto" : "metadata"}
              className="pointer-events-none block h-auto w-full"
            />
            <span className="pointer-events-none absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-[#1c1c1a]/70 text-white opacity-0 shadow-md backdrop-blur-sm transition group-hover/media:opacity-100">
              <Maximize2 className="size-4" />
            </span>
          </button>
        ) : (
          <img
            src={src}
            alt={`${labels.thumbAlt} ${p.name}`}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "low"}
            decoding="async"
            draggable={false}
            className="block h-auto w-full"
          />
        )}
      </div>
    </div>
  );
}

export function CasesSection() {
  const reduce = useReducedMotion();
  const { locale, t } = useSitePreferences();
  const labels = t.scrollCases;
  const projects = useMemo(() => getScrollProjects(t), [locale]);
  const [lightbox, setLightbox] = useState<ScrollProject | null>(null);

  return (
    <section id="cases" className="relative scroll-mt-24 overflow-x-clip px-5 pb-6 pt-20 md:pb-8 md:pt-28">
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
                className="group relative rounded-[1.5rem] bg-surface p-3 pb-28 shadow-[var(--card-shadow)] ring-1 ring-line md:pb-3"
              >
                <div className="grid md:grid-cols-2 md:items-start md:gap-2">
                  <CaseMedia
                    p={p}
                    labels={labels}
                    priority={i === 0}
                    onExpand={p.video ? () => setLightbox(p) : undefined}
                  />

                  <div className="relative z-10 flex flex-col justify-center px-3 py-5 sm:px-5 md:min-h-full md:p-7 md:pr-44 lg:pr-48">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="font-serif text-xl font-bold leading-snug text-ink sm:text-2xl">
                        {p.name}
                      </h3>
                      <a
                        href={p.projectUrl ?? "#contact"}
                        target={p.projectUrl ? "_blank" : undefined}
                        rel={p.projectUrl ? "noopener noreferrer" : undefined}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-lime px-3.5 py-2 text-xs font-bold text-[#1c1c1a] transition hover:brightness-95 sm:text-sm"
                      >
                        {labels.viewProject}
                        <ArrowUpRight className="size-3.5" />
                      </a>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-grayink">
                      {p.description}
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-grayink-2">
                          {labels.objective}
                        </div>
                        <p className="mt-0.5 text-sm leading-snug text-ink/80">
                          {p.objective}
                        </p>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-grayink-2">
                          {labels.result}
                        </div>
                        <p className="mt-0.5 text-sm leading-snug text-ink/80">
                          {p.result}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-line bg-cream px-2.5 py-0.5 text-[11px] font-medium text-ink"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {p.stateCodes && p.stateCodes.length > 0 && (
                  <div className="px-3 pb-2 pt-4 md:px-5">
                    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-grayink-2">
                      {p.statesLabel}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {p.stateCodes.map((uf) => (
                        <a
                          key={uf}
                          href={`https://datasebrae.com.br/${uf.toLowerCase()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-w-9 items-center justify-center rounded-full border border-line bg-cream px-2.5 py-1 text-[11px] font-semibold text-ink transition hover:border-olive hover:bg-green-soft hover:text-olive"
                        >
                          {uf}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <img
                  src={float.src}
                  alt=""
                  aria-hidden
                  width={396}
                  height={367}
                  loading="lazy"
                  decoding="async"
                  className={`pointer-events-none absolute -bottom-10 left-1/2 z-20 w-36 -translate-x-1/2 select-none sm:left-auto sm:-right-4 sm:w-44 sm:translate-x-0 md:-right-6 md:-bottom-12${
                    float.blend ? " float-blend" : ""
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
          className="mt-10 mb-0 text-center font-serif text-lg italic text-grayink sm:text-xl md:text-2xl"
        >
          {labels.moreProjects}
        </motion.p>
      </div>

      <Dialog open={!!lightbox} onOpenChange={(open) => !open && setLightbox(null)}>
        <DialogContent className="fixed inset-0 left-0 top-0 flex h-full max-h-none w-full max-w-none translate-x-0 translate-y-0 items-center justify-center border-0 bg-transparent p-3 shadow-none sm:p-6 sm:rounded-none [&>button]:hidden">
          <DialogTitle className="sr-only">
            {lightbox?.name}: {labels.expandVideo}
          </DialogTitle>
          <DialogDescription className="sr-only">{labels.expandVideo}</DialogDescription>
          {lightbox?.video ? (
            <div className="relative flex max-h-[92vh] w-full max-w-[96vw] items-center justify-center">
              <video
                key={lightbox.video}
                src={lightbox.video}
                autoPlay
                loop
                muted
                controls
                playsInline
                className="max-h-[92vh] w-full max-w-[96vw] rounded-xl bg-black object-contain"
              />
              <button
                type="button"
                onClick={() => setLightbox(null)}
                className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-[#1c1c1a]/80 text-white transition hover:bg-[#1c1c1a]"
                aria-label={labels.closeVideo}
              >
                <X className="size-5" />
              </button>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
