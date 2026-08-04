import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Sparkles, Palette, Layout, Monitor, AppWindow, Clapperboard, Workflow } from "lucide-react";
import { FloatingContactCard } from "@/components/FloatingContactCard";
import { CasesSection } from "@/components/CasesSection";
import { SiteControls } from "@/components/SiteControls";
import { HeroFloats, SectionFloats } from "@/components/FloatingDecor";
import { useSitePreferences } from "@/lib/site-preferences";
import aboutVanessa from "@/assets/about-vanessa.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VanCode — Design & Development" },
      {
        name: "description",
        content:
          "Portfólio de design de produto: identidade visual, websites e UI para SaaS e startups.",
      },
      { property: "og:title", content: "VanCode — Design & Development" },
      {
        property: "og:description",
        content:
          "Portfólio de design de produto: identidade visual, websites e UI para SaaS e startups.",
      },
    ],
  }),
  component: Index,
});

const EASE = [0.16, 1, 0.3, 1] as const;
const WHATSAPP = "https://wa.me/5548992239757";

function useReveal() {
  const reduce = useReducedMotion();
  return {
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.8, ease: EASE },
  };
}

function DocumentMeta() {
  const { t } = useSitePreferences();
  useEffect(() => {
    document.title = t.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t.meta.description);
  }, [t]);
  return null;
}

function Header() {
  const { t } = useSitePreferences();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <a href="#" className="flex items-center gap-2">
          <div className="grid size-7 place-items-center rounded-md bg-lime">
            <Sparkles className="size-4 text-[#1c1c1a]" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight text-ink">VanCode</span>
            <span className="hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-grayink-2 sm:block">
              {t.nav.tagline}
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="#cases" className="text-sm font-medium text-ink transition hover:text-olive">
            {t.nav.cases}
          </a>
          <a href="#services" className="text-sm font-medium text-ink transition hover:text-olive">
            {t.nav.services}
          </a>
          <a href="#about" className="text-sm font-medium text-ink transition hover:text-olive">
            {t.nav.about}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <SiteControls />
          <a
            href="#contact"
            className="rounded-full bg-lime px-4 py-2 text-sm font-bold text-[#1c1c1a] transition hover:brightness-95 sm:px-5 sm:py-2.5"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useSitePreferences();
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-10 md:pb-24 md:pt-16">
      <HeroFloats />
      <div className="relative z-20 mx-auto max-w-4xl text-center">
        <motion.span
          initial={{ opacity: 0, y: reduce ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="inline-flex items-center rounded-full border border-line px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
        >
          {t.hero.eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
          className="mt-6 text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl md:text-6xl"
        >
          {t.hero.title}
          <br />
          <span className="font-serif font-medium italic">{t.hero.titleItalic}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-grayink sm:text-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.24 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#cases"
            className="rounded-full bg-lime px-6 py-3 text-sm font-bold text-[#1c1c1a] transition hover:brightness-95"
          >
            {t.hero.cta}
          </a>
          <a
            href="#about"
            className="rounded-full border border-line bg-surface/70 px-6 py-3 text-sm font-semibold text-ink transition hover:border-line hover:bg-surface"
          >
            {t.hero.ctaSecondary}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  const reveal = useReveal();
  const { t } = useSitePreferences();
  const items = [
    {
      icon: Palette,
      title: t.services.visualId.title,
      desc: t.services.visualId.desc,
      pill: "bg-peach text-peach-ink",
    },
    {
      icon: Monitor,
      title: t.services.websites.title,
      desc: t.services.websites.desc,
      pill: "bg-green-soft text-olive",
    },
    {
      icon: Layout,
      title: t.services.ui.title,
      desc: t.services.ui.desc,
      pill: "bg-bluec text-blue-ink",
    },
    {
      icon: AppWindow,
      title: t.services.webSystems.title,
      desc: t.services.webSystems.desc,
      pill: "bg-[#eae4f6] text-[#7a5ea8]",
    },
    {
      icon: Clapperboard,
      title: t.services.videoEditing.title,
      desc: t.services.videoEditing.desc,
      pill: "bg-[#fbe3d7] text-peach-ink",
    },
    {
      icon: Workflow,
      title: t.services.automation.title,
      desc: t.services.automation.desc,
      pill: "bg-green-soft text-olive",
    },
  ];

  return (
    <section id="services" className="relative overflow-hidden px-5 py-20 md:py-28">
      <SectionFloats variant="services" />
      <div className="relative z-20 mx-auto max-w-6xl">
        <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-grayink-2">
            {t.services.label}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-[1.08] text-ink sm:text-5xl">
            {t.services.title}{" "}
            <span className="font-serif font-medium italic">{t.services.titleItalic}</span>
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="flex flex-col gap-3 rounded-2xl bg-surface p-6 shadow-[var(--card-shadow)] sm:p-8"
            >
              <div
                className={`flex size-11 shrink-0 items-center justify-center rounded-full ${it.pill}`}
              >
                <it.icon className="size-5" />
              </div>
              <h3 className="font-serif text-xl font-bold text-ink">{it.title}</h3>
              <p className="text-sm leading-relaxed text-grayink">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const reveal = useReveal();
  const { t } = useSitePreferences();

  return (
    <section id="about" className="relative overflow-hidden px-5 py-20 md:py-28">
      <SectionFloats variant="about" />
      <div className="relative z-20 mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
        <motion.div {...reveal}>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-grayink-2">
            {t.about.label}
          </span>
          <h2 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink md:text-5xl">
            {t.about.title}{" "}
            <span className="font-serif font-medium italic">{t.about.titleItalic}</span>
          </h2>
          <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-grayink">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-panel shadow-[var(--card-shadow)] ring-1 ring-line"
        >
          <img
            src={aboutVanessa}
            alt={t.about.photoAlt}
            className="size-full object-cover object-[center_22%]"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const { t } = useSitePreferences();
  const text = t.marquee;
  const items = Array.from({ length: 8 }, () => text);
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="overflow-hidden border-y border-line bg-panel py-5 md:py-7"
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: hover ? 12 : 28, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((line, i) => (
          <span
            key={i}
            className="flex items-center gap-4 px-4 font-serif text-2xl tracking-tight text-ink sm:text-3xl md:text-4xl"
          >
            {line}
            <span className="text-olive">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Contact() {
  const reveal = useReveal();
  const { t } = useSitePreferences();

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-24 md:py-32">
      <SectionFloats variant="contact" />
      <div className="relative z-20 mx-auto max-w-4xl">
        <motion.div {...reveal} className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-grayink-2">
            {t.contact.label}
          </span>
          <h2 className="mt-3 text-4xl font-extrabold leading-[1.08] text-ink md:text-6xl">
            {t.contact.title}{" "}
            <span className="font-serif font-medium italic">{t.contact.titleItalic}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-grayink sm:text-lg">
            {t.contact.subtitle}
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-full bg-lime px-7 py-3.5 text-sm font-bold text-[#1c1c1a] transition hover:brightness-95"
          >
            {t.contact.cta}
          </a>
        </motion.div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 text-xs text-grayink-2 md:flex-row">
          <span>© {new Date().getFullYear()} VanCode</span>
          <span>{t.contact.footer}</span>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cream text-ink antialiased">
      <DocumentMeta />
      <Header />
      <main>
        <Hero />
        <CasesSection />
        <Marquee />
        <Services />
        <About />
        <Contact />
      </main>
      <FloatingContactCard />
    </div>
  );
}
