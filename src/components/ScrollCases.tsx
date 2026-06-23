import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getScrollProjects, type ScrollProject } from "@/lib/scroll-projects";
import { useSitePreferences } from "@/lib/site-preferences";
import type { TranslationDict } from "@/lib/translations";

const SECTION_SCROLL_VH = 650;
const TEXT_ITEM_COUNT = 6;
const PROJECT_COUNT = 4;

type Project = ScrollProject;

type ScrollCaseLabels = TranslationDict["scrollCases"];

const TL = {
  spreadEnd: 12,
  pauseEnd: 18,
  exitEnd: 20,
  projectStarts: [20, 40, 60, 80] as const,
  crossfadeDur: 3.5,
} as const;

/** Cards do deck */
function cardMetrics(count: number) {
  const vw = typeof window === "undefined" ? 1280 : Math.min(window.innerWidth, 1500);
  const baseW = vw < 768 ? 150 : vw < 1024 ? 230 : 300;
  const cardW = Math.round(baseW * 1.22);
  const gap = ((vw - cardW - 40) / (count - 1)) * 1.1;
  return { cardW, gap };
}

function stackedX(i: number) {
  return i * -20;
}

function spreadX(i: number, count: number) {
  const mid = (count - 1) / 2;
  return (i - mid) * cardMetrics(count).gap;
}

function MockPlaceholder({ p }: { p: Project }) {
  return (
    <>
      <div
        className="absolute inset-0 opacity-90"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 20%, ${p.accent}55, transparent 55%), radial-gradient(circle at 80% 85%, ${p.accent}30, transparent 50%), linear-gradient(180deg, #0f0f10, #060607)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.08) 45%, transparent 55%)",
        }}
      />
      <div className="relative flex h-full flex-col justify-between p-5 md:p-8">
        <div>
          <div className="mb-3 h-2 w-16 rounded-full bg-white/15" />
          <div className="font-display text-2xl leading-[1.05] tracking-tight text-site-fg/95 md:text-5xl">
            {p.name}
          </div>
          <div className="mt-3 h-2 w-32 rounded-full bg-white/10 md:w-40" />
          <div className="mt-2 h-2 w-24 rounded-full bg-white/10 md:w-28" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="h-10 rounded-lg border border-white/5 bg-white/[0.05] md:h-14" />
          <div className="h-10 rounded-lg border border-white/5 bg-white/[0.05] md:h-14" />
          <div className="h-10 rounded-lg border border-white/5 bg-white/[0.05] md:h-14" />
        </div>
      </div>
    </>
  );
}

const deckThumbObjectClass = (position: Project["deckThumbPosition"]) =>
  position === "left-top" ? "object-cover object-left-top" : "object-cover object-top";

/** Deck: preenche toda a área de mídia do card */
function DeckFocusedImage({
  p,
  thumbAlt,
}: {
  p: Project;
  thumbAlt: string;
}) {
  if (!p.previewThumb || !p.previewThumbWidth || !p.previewThumbHeight) return null;

  return (
    <div className="absolute inset-0 overflow-hidden bg-site-mock-inner">
      <img
        src={p.previewThumb}
        srcSet={
          p.previewThumb2x
            ? `${p.previewThumb} 1x, ${p.previewThumb2x} 2x`
            : undefined
        }
        sizes="800px"
        alt={`${thumbAlt} ${p.name}`}
        width={p.previewThumbWidth}
        height={p.previewThumbHeight}
        decoding="async"
        loading="lazy"
        draggable={false}
        className={`absolute inset-0 size-full ${deckThumbObjectClass(p.deckThumbPosition)}`}
      />
    </div>
  );
}

function DeckFocusedVideo({ p }: { p: Project }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-site-mock-inner">
      <video
        src={p.video}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 size-full object-cover object-top"
      />
    </div>
  );
}

function CardMedia({
  p,
  isExpanded,
  labels,
}: {
  p: Project;
  isExpanded: boolean;
  labels: ScrollCaseLabels;
}) {
  if (!isExpanded) {
    if (p.video) return <DeckFocusedVideo p={p} />;
    if (p.previewThumb) return <DeckFocusedImage p={p} thumbAlt={labels.thumbAlt} />;
    return <MockPlaceholder p={p} />;
  }

  if (p.video) {
    return (
      <div className="project-media absolute inset-0">
        <video
          src={p.video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 size-full object-cover object-top"
        />
      </div>
    );
  }

  if (p.preview && p.previewWidth && p.previewHeight) {
    const objectClass =
      p.deckThumbPosition === "left-top"
        ? "object-cover object-left-top"
        : "object-cover object-top";

    return (
      <div className="project-media absolute inset-0 overflow-hidden">
        <img
          src={p.preview}
          alt={`${labels.previewAlt} ${p.name}`}
          width={p.previewWidth}
          height={p.previewHeight}
          decoding="sync"
          loading="eager"
          draggable={false}
          className={`absolute inset-0 size-full ${objectClass}`}
        />
      </div>
    );
  }

  return <MockPlaceholder p={p} />;
}

function CardMock({
  p,
  className = "",
  variant = "deck",
  labels,
}: {
  p: Project;
  className?: string;
  variant?: "deck" | "expanded";
  labels: ScrollCaseLabels;
}) {
  const isExpanded = variant === "expanded";
  const siteLabel =
    p.siteUrl ?? `${p.name.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "")}.com`;

  if (!isExpanded) {
    return (
      <div
        className={`relative grid h-full w-full grid-rows-[10%_1fr] overflow-hidden rounded-[14px] border border-site bg-site-mock ${className}`}
        style={{
          boxShadow: `0 22px 50px -14px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 0 36px -8px ${p.accent}40`,
        }}
      >
        <div className="flex min-h-[22px] items-center gap-1 border-b border-site bg-site-mock-bar px-2.5">
          <span className="size-[7px] shrink-0 rounded-full bg-[#ff5f57]/90" />
          <span className="size-[7px] shrink-0 rounded-full bg-[#febc2e]/90" />
          <span className="size-[7px] shrink-0 rounded-full bg-[#28c840]/90" />
          <span className="mx-1 min-w-0 flex-1 truncate rounded-md bg-site-fg/10 px-2 py-0.5 text-center text-[8px] text-site-dim">
            {siteLabel}
          </span>
        </div>
        <div className="relative min-h-0 overflow-hidden bg-site-mock-inner">
          <CardMedia p={p} isExpanded={false} labels={labels} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-2xl border border-site bg-site-mock ${className}`}
      style={{
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset",
      }}
    >
      <div className="flex h-8 items-center gap-1.5 border-b border-site bg-site-surface px-4">
        <span className="size-2 rounded-full bg-site-fg/15" />
        <span className="size-2 rounded-full bg-site-fg/15" />
        <span className="size-2 rounded-full bg-site-fg/15" />
        <span className="ml-3 truncate text-[10px] text-site-dim">{siteLabel}</span>
      </div>
      <div className="absolute inset-0 top-8">
        <CardMedia p={p} isExpanded labels={labels} />
      </div>
    </div>
  );
}

function ProjectCopy({
  p,
  labels,
  itemRefs,
  className = "",
}: {
  p: Project;
  labels: ScrollCaseLabels;
  itemRefs?: ((el: HTMLElement | null) => void)[];
  className?: string;
}) {
  const setRef = (i: number) => (el: HTMLElement | null) => {
    itemRefs?.[i]?.(el);
  };

  return (
    <div className={className}>
      <span
        ref={setRef(0)}
        className="block text-xs uppercase tracking-[0.2em] text-site-dim"
      >
        {labels.featured}
      </span>
      <h3
        ref={setRef(1)}
        className="mt-2 font-display text-4xl tracking-tight text-site-fg md:text-6xl"
      >
        {p.name}
      </h3>
      <p ref={setRef(2)} className="mt-4 leading-relaxed text-site-muted">
        {p.description}
      </p>
      <div ref={setRef(3)} className="mt-6 space-y-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-site-subtle">{labels.objective}</div>
          <div className="mt-1 text-sm text-site-fg/80">{p.objective}</div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-site-subtle">{labels.result}</div>
          <div className="mt-1 text-sm text-site-fg/80">{p.result}</div>
        </div>
      </div>
      <div ref={setRef(4)} className="mt-6 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border px-3 py-1 text-xs"
            style={{
              borderColor: `${p.accent}55`,
              background: `${p.accent}14`,
              color: p.accent,
            }}
          >
            {t}
          </span>
        ))}
      </div>
      <a
        ref={setRef(5)}
        href={p.projectUrl ?? "#contact"}
        target={p.projectUrl ? "_blank" : undefined}
        rel={p.projectUrl ? "noopener noreferrer" : undefined}
        className="pointer-events-auto mt-8 inline-flex items-center gap-2 rounded-full bg-site-cta px-4 py-2 text-sm font-medium text-site-cta-fg transition-transform duration-300 hover:scale-[1.03]"
      >
        {labels.viewProject}
        <ArrowUpRight className="size-4" />
      </a>
    </div>
  );
}

function ProjectSlide({
  p,
  labels,
  slideRef,
  mockupShellRef,
  textRef,
  itemRefs,
}: {
  p: Project;
  labels: ScrollCaseLabels;
  slideRef: (el: HTMLDivElement | null) => void;
  mockupShellRef: (el: HTMLDivElement | null) => void;
  textRef: (el: HTMLDivElement | null) => void;
  itemRefs: ((el: HTMLElement | null) => void)[];
}) {
  return (
    <div
      ref={slideRef}
      className="invisible absolute inset-0 flex items-center justify-center px-6 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-14">
        <div
          ref={mockupShellRef}
          className="aspect-[16/10] w-full max-w-2xl justify-self-center md:justify-self-end"
        >
          <div className="relative h-full w-full">
            <CardMock p={p} variant="expanded" labels={labels} className="shadow-[0_50px_120px_-30px_rgba(0,0,0,0.95)]" />
          </div>
        </div>
        <div ref={textRef}>
          <ProjectCopy p={p} labels={labels} itemRefs={itemRefs} className="max-w-lg" />
        </div>
      </div>
    </div>
  );
}

export function ScrollCases() {
  const reduce = useReducedMotion();
  const { locale, t } = useSitePreferences();
  const labels = t.scrollCases;
  const projects = useMemo(() => getScrollProjects(t), [locale]);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const expandedRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const mockupShellsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mediaElsRef = useRef<(HTMLElement | null)[]>([]);
  const textsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textItemsRef = useRef<(HTMLElement | null)[][]>(
    Array.from({ length: PROJECT_COUNT }, () => Array(TEXT_ITEM_COUNT).fill(null)),
  );

  useEffect(() => {
    if (reduce) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
      const mockupShells = mockupShellsRef.current.filter(Boolean) as HTMLDivElement[];
      const mediaEls = mediaElsRef.current.filter(Boolean) as HTMLElement[];
      const texts = textsRef.current.filter(Boolean) as HTMLDivElement[];

      const lockMediaSharp = () => {
        mediaEls.forEach((el) => {
          gsap.set(el, { clearProps: "transform,filter,scale,rotate,rotateX,rotateY,rotateZ,z" });
        });
      };
      const getItems = (i: number) =>
        textItemsRef.current[i].filter(Boolean) as HTMLElement[];

      gsap.set(cards, {
        xPercent: -50,
        yPercent: -50,
        x: (i: number) => stackedX(i),
        y: 0,
        rotateZ: (i: number) => (i - (PROJECT_COUNT - 1) / 2) * 4,
        scale: 0.95,
        width: () => cardMetrics(PROJECT_COUNT).cardW,
        zIndex: (i: number) => 40 - i,
        transformPerspective: 1200,
        opacity: 1,
        force3D: true,
      });
      gsap.set(heroRef.current, { autoAlpha: 1, y: 0 });
      gsap.set(deckRef.current, { autoAlpha: 1, y: 0 });
      gsap.set(expandedRef.current, { autoAlpha: 0 });

      const idleSlide = {
        visibility: "hidden" as const,
        opacity: 0,
      };
      gsap.set(slides, idleSlide);
      slides.forEach((_, i) => {
        gsap.set(mockupShells[i], { y: 0, opacity: 1, clearProps: "transform,filter,z,scale" });
        gsap.set(texts[i], { y: 0, opacity: 1, filter: "blur(0px)" });
        gsap.set(getItems(i), { opacity: 0, y: 22, filter: "blur(8px)" });
      });
      lockMediaSharp();

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: pinRef.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        cards,
        {
          x: (i: number) => spreadX(i, PROJECT_COUNT),
          rotateZ: 0,
          scale: 1,
          y: 0,
          duration: TL.spreadEnd,
        },
        0,
      );
      tl.to({}, { duration: TL.pauseEnd - TL.spreadEnd });
      tl.to(heroRef.current, { autoAlpha: 0, y: -32, duration: TL.exitEnd - TL.pauseEnd, ease: "power2.out" }, TL.pauseEnd);
      tl.to(deckRef.current, { autoAlpha: 0, y: -48, duration: TL.exitEnd - TL.pauseEnd, ease: "power2.out" }, TL.pauseEnd);
      tl.to(expandedRef.current, { autoAlpha: 1, duration: TL.exitEnd - TL.pauseEnd }, TL.pauseEnd);

      const staggerIn = (index: number, at: number, dur: number) => {
        tl.fromTo(
          getItems(index),
          { opacity: 0, y: 22, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.14,
            duration: dur * 0.55,
            ease: "power2.out",
          },
          at + dur * 0.22,
        );
      };

      const activateProject = (index: number, at: number, dur: number) => {
        const slide = slides[index];
        const shell = mockupShells[index];
        const text = texts[index];

        tl.set(slide, { visibility: "visible" }, at);
        tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: dur, ease: "power2.out" }, at);
        tl.fromTo(shell, { opacity: 0 }, { opacity: 1, duration: dur, ease: "power2.out" }, at);
        tl.call(lockMediaSharp, [], at);
        tl.call(lockMediaSharp, [], at + dur);
        tl.fromTo(
          text,
          { y: 52, opacity: 0, filter: "blur(10px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: dur * 0.85, ease: "power3.out" },
          at + dur * 0.06,
        );
        staggerIn(index, at, dur);
      };

      const morphProject = (from: number, to: number, at: number, dur: number) => {
        const outSlide = slides[from];
        const inSlide = slides[to];
        const outShell = mockupShells[from];
        const inShell = mockupShells[to];
        const outText = texts[from];
        const inText = texts[to];

        tl.set(inSlide, { visibility: "visible" }, at);
        tl.fromTo(inSlide, { opacity: 0 }, { opacity: 1, duration: dur, ease: "power2.out" }, at);
        tl.fromTo(inShell, { opacity: 0 }, { opacity: 1, duration: dur, ease: "power2.out" }, at);
        tl.to(outSlide, { opacity: 0, duration: dur, ease: "power2.inOut" }, at);
        tl.to(outShell, { opacity: 0, duration: dur, ease: "power2.inOut" }, at);
        tl.call(lockMediaSharp, [], at);
        tl.call(lockMediaSharp, [], at + dur);

        tl.to(
          outText,
          { y: -52, opacity: 0, filter: "blur(8px)", duration: dur * 0.75, ease: "power2.in" },
          at,
        );
        tl.fromTo(
          inText,
          { y: 56, opacity: 0, filter: "blur(10px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: dur * 0.8, ease: "power3.out" },
          at + dur * 0.12,
        );

        staggerIn(to, at, dur);

        tl.set(outSlide, { visibility: "hidden", opacity: 0 }, at + dur);
        tl.set(outShell, { opacity: 1 }, at + dur);
        tl.set(outText, { y: 0, opacity: 1, filter: "blur(0px)" }, at + dur);
        tl.set(getItems(from), { opacity: 0, y: 22, filter: "blur(8px)" }, at + dur);
      };

      activateProject(0, TL.exitEnd, TL.crossfadeDur);

      for (let i = 1; i < PROJECT_COUNT; i++) {
        const at = TL.projectStarts[i] - TL.crossfadeDur * 0.45;
        morphProject(i - 1, i, at, TL.crossfadeDur);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce, locale]);

  if (reduce) {
    return (
      <section id="cases" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-display text-4xl tracking-tight text-site-fg md:text-6xl">
            {labels.title}
            <br />
            {labels.titleLine2}
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {projects.map((p) => (
              <div key={p.name} className="rounded-3xl border border-site bg-site-surface p-6">
                <div className="mb-5 aspect-[16/10] overflow-hidden rounded-2xl">
                  <CardMock p={p} variant="expanded" labels={labels} />
                </div>
                <h3 className="font-display text-2xl text-site-fg">{p.name}</h3>
                <p className="mt-2 text-sm text-site-muted">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="cases"
      ref={sectionRef}
      className="relative bg-site"
      style={{ height: `${SECTION_SCROLL_VH}vh` }}
    >
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden">
        <div
          ref={heroRef}
          className="pointer-events-none absolute inset-x-0 top-[28%] z-20 px-6 text-center md:top-[26%]"
        >
          <h2 className="mx-auto max-w-4xl font-display text-2xl leading-[1.05] tracking-[-0.02em] text-site-fg md:text-5xl">
            {labels.title}
            <br />
            {labels.titleLine2}
          </h2>
          <p className="mt-3 text-sm text-site-muted md:text-base">{labels.subtitle}</p>
        </div>

        <div
          ref={deckRef}
          className="absolute inset-x-0 bottom-0 top-[32%] z-10 md:top-[28%]"
          style={{ perspective: "1600px" }}
        >
          <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
            {projects.map((p, i) => (
              <div
                key={p.name}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="absolute left-1/2 top-1/2 aspect-[16/12] will-change-transform p-px"
              >
                <CardMock p={p} variant="deck" labels={labels} className="h-full w-full" />
              </div>
            ))}
          </div>
        </div>

        <div ref={expandedRef} className="invisible absolute inset-0 z-30">
          {projects.map((p, i) => (
            <ProjectSlide
              key={p.name}
              p={p}
              labels={labels}
              slideRef={(el) => {
                slidesRef.current[i] = el;
                if (el) {
                  const media = el.querySelector<HTMLElement>(".project-media");
                  mediaElsRef.current[i] = media;
                }
              }}
              mockupShellRef={(el) => {
                mockupShellsRef.current[i] = el;
              }}
              textRef={(el) => {
                textsRef.current[i] = el;
              }}
              itemRefs={Array.from({ length: TEXT_ITEM_COUNT }, (_, j) => (el) => {
                textItemsRef.current[i][j] = el;
              })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
