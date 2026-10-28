import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Calendar, Clapperboard, MapPin, Play, Volume2 } from "lucide-react";
import { useSitePreferences } from "@/lib/site-preferences";
import fe26AdVideo from "@/assets/datasebrae-anuncio-20s-v14-qrcode-maior.mp4";
import fe26FairVideo from "@/assets/fe26.mp4";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Fe26Section() {
  const reduce = useReducedMotion();
  const { t } = useSitePreferences();
  const copy = t.motion;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const playAd = () => {
    void videoRef.current?.play();
  };

  const meta = [
    { icon: Clapperboard, label: copy.event },
    { icon: MapPin, label: copy.venue },
    { icon: Calendar, label: copy.dates },
    { icon: Volume2, label: copy.duration },
  ];

  return (
    <section id="motion" className="relative scroll-mt-24 overflow-x-clip px-5 pb-20 pt-8 md:pb-28 md:pt-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-grayink-2">
            {copy.label}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-[1.08] text-ink sm:text-5xl">
            {copy.title}{" "}
            <span className="font-serif font-medium italic">{copy.titleItalic}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-grayink sm:text-lg">
            {copy.subtitle}
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {meta.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[12px] font-medium text-ink shadow-[var(--card-shadow)]"
            >
              <Icon className="size-3.5 text-olive" strokeWidth={2.25} />
              {label}
            </li>
          ))}
        </motion.ul>

        <motion.figure
          initial={{ opacity: 0, y: reduce ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="mt-12"
        >
          <div className="group relative overflow-hidden rounded-[1.25rem] bg-[#0c0e0a] shadow-[var(--card-shadow)] ring-1 ring-line sm:rounded-[1.5rem]">
            <video
              ref={videoRef}
              src={fe26AdVideo}
              width={1920}
              height={1080}
              controls={started}
              playsInline
              preload="auto"
              className="aspect-video w-full bg-[#0c0e0a] object-contain"
              onPlay={() => setStarted(true)}
              onEnded={() => setStarted(false)}
            />
            {!started && (
              <button
                type="button"
                onClick={playAd}
                className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0c0e0a]/35 transition hover:bg-[#0c0e0a]/20"
                aria-label={copy.play}
              >
                <span className="grid size-16 place-items-center rounded-full bg-lime text-[#1c1c1a] shadow-lg transition group-hover:brightness-95 sm:size-[4.5rem]">
                  <Play className="ml-0.5 size-7 fill-current sm:size-8" />
                </span>
                <span className="rounded-full bg-surface/95 px-4 py-1.5 text-xs font-bold text-ink backdrop-blur-sm sm:text-sm">
                  {copy.play}
                </span>
              </button>
            )}
          </div>
          <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2 px-1">
            <span className="text-sm font-semibold text-ink">{copy.adTitle}</span>
            <span className="text-sm text-grayink">{copy.adCaption}</span>
          </figcaption>
        </motion.figure>

        <div className="mt-14 grid items-start gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12">
          <motion.figure
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="overflow-hidden rounded-[1.25rem] bg-[#0c0e0a] shadow-[var(--card-shadow)] ring-1 ring-line">
              <video
                src={fe26FairVideo}
                width={848}
                height={478}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="h-auto w-full object-contain"
              />
            </div>
            <figcaption className="mt-3 px-1">
              <div className="text-sm font-semibold text-ink">{copy.fairTitle}</div>
              <p className="mt-0.5 text-sm leading-relaxed text-grayink">{copy.fairCaption}</p>
            </figcaption>
          </motion.figure>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.06 }}
            className="flex flex-col justify-center md:pt-2"
          >
            <p className="text-base leading-relaxed text-grayink">{copy.description}</p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-grayink-2">
                  {copy.objectiveLabel}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/85">{copy.objective}</p>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-grayink-2">
                  {copy.resultLabel}
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/85">{copy.result}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {[t.tags.videoEditing, t.tags.motion, t.tags.branding].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-[11px] font-medium text-ink"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
