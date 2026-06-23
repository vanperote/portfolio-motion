import { createFileRoute } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Sparkles, Palette, Layout, Monitor } from "lucide-react";
import { FloatingContactCard } from "@/components/FloatingContactCard";
import { ScrollCases } from "@/components/ScrollCases";
import { SiteControls } from "@/components/SiteControls";
import { useSitePreferences } from "@/lib/site-preferences";
import aboutVanessa from "@/assets/about-vanessa.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VanCode — Design & Development" },
      { name: "description", content: "Premium product design portfolio crafting brand identity, websites and UI for SaaS and startups worldwide." },
      { property: "og:title", content: "VanCode — Design & Development" },
      { property: "og:description", content: "Premium product design portfolio crafting brand identity, websites and UI for SaaS and startups." },
    ],
  }),
  component: Index,
});

const EASE = [0.16, 1, 0.3, 1] as const;

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
  const linkClass =
    "text-sm text-site-muted hover:text-site-fg transition-colors duration-300";

  return (
    <header className="fixed top-3 inset-x-0 z-50 flex flex-col gap-2 px-3 pointer-events-none sm:top-4 sm:block sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        className="pointer-events-auto self-end sm:fixed sm:top-4 sm:right-4 sm:z-[60]"
      >
        <SiteControls className="max-sm:scale-[0.92] max-sm:origin-top-right" />
      </motion.div>

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="pointer-events-auto mx-auto flex w-full max-w-full items-center justify-center gap-2.5 min-[400px]:gap-3 sm:w-fit sm:max-w-none sm:gap-5 md:gap-8 rounded-full border border-site bg-site-nav px-2.5 min-[400px]:px-3 sm:px-4 md:px-6 py-2 backdrop-blur-md sm:py-2.5"
        style={{ boxShadow: "var(--site-nav-shadow)" }}
      >
        <a href="#cases" className={linkClass}>
          {t.nav.cases}
        </a>
        <a href="#services" className={`${linkClass} hidden sm:inline`}>
          {t.nav.services}
        </a>
        <div className="flex items-center gap-1.5 px-0.5 sm:gap-2 sm:px-2">
          <div className="size-7 rounded-md bg-[#34f56b] grid place-items-center shrink-0">
            <Sparkles className="size-4 text-black" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-tight min-w-0">
            <span className="font-semibold tracking-tight text-site-fg text-sm">VanCode</span>
            <span className="text-[10px] text-site-muted tracking-wide hidden min-[400px]:block sm:block">
              {t.nav.tagline}
            </span>
          </div>
        </div>
        <a href="#about" className={`${linkClass} hidden sm:inline`}>
          {t.nav.about}
        </a>
        <a href="#contact" className={linkClass}>
          {t.nav.contact}
        </a>
      </motion.nav>
    </header>
  );
}

type Project = {
  name: string;
  description: string;
  tags: string[];
  gradient: string;
  accent: string;
  span?: string;
};

const projects: Project[] = [
  {
    name: "Feedelize",
    description: "Identidade visual e site para uma plataforma de coleta automatizada de feedbacks. Transmite confiança e simplicidade, destacando melhoria contínua.",
    tags: ["Id. Visual", "Landing Page", "UI Design"],
    gradient: "from-emerald-500/40 via-emerald-700/20 to-transparent",
    accent: "#34f56b",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    name: "DataSebrae",
    description: "Identidade e site para uma solução de teleradiologia 24/7 — agilidade e suporte contínuo para clínicas.",
    tags: ["Id. Visual", "Landing Page"],
    gradient: "from-cyan-500/40 via-blue-700/20 to-transparent",
    accent: "#22d3ee",
  },
  {
    name: "Soukeshi",
    description: "Plataforma de cashback que substitui descontos por fidelização inteligente.",
    tags: ["Id. Visual", "Landing Page"],
    gradient: "from-rose-500/40 via-fuchsia-700/20 to-transparent",
    accent: "#f43f5e",
  },
  {
    name: "Manybot",
    description: "Automação de vendas no WhatsApp — praticidade, escala e conversão.",
    tags: ["Landing Page"],
    gradient: "from-amber-400/40 via-orange-600/20 to-transparent",
    accent: "#fbbf24",
  },
  {
    name: "Zapster",
    description: "Plataforma de mensagens transacionais via WhatsApp. Proposta técnica traduzida em experiência clara.",
    tags: ["Landing Page", "UI Design"],
    gradient: "from-lime-400/40 via-emerald-700/20 to-transparent",
    accent: "#84cc16",
    span: "md:col-span-2",
  },
];

function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: EASE, delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-7 ${p.span ?? ""}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-60 transition-opacity duration-500 group-hover:opacity-100`} />
      <div className="absolute -inset-px rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `0 0 80px -10px ${p.accent}55 inset` }} />

      <div className="relative z-10 flex flex-col h-full min-h-[260px] md:min-h-[320px]">
        <div className="flex-1 flex items-center justify-center py-6">
          <motion.div
            whileHover={{ scale: 1.04, rotate: -1 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative w-full max-w-md aspect-[16/10] rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] grid place-items-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-50" style={{
              backgroundImage: `radial-gradient(circle at 30% 20%, ${p.accent}40, transparent 50%), radial-gradient(circle at 80% 80%, ${p.accent}30, transparent 50%)`,
            }} />
            <span className="relative font-display text-2xl md:text-3xl tracking-tight text-white/90">{p.name}</span>
          </motion.div>
        </div>

        <div>
          <h3 className="font-display text-2xl md:text-3xl text-white tracking-tight">{p.name}</h3>
          <p className="mt-2 text-sm text-white/65 leading-relaxed max-w-xl">{p.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <motion.span
                key={t}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 hover:bg-white/10 hover:border-white/25 transition-colors duration-300"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Cases() {
  const reveal = useReveal();
  return (
    <section id="cases" className="px-6 pb-20">
      <div className="mx-auto max-w-7xl">
        <motion.div {...reveal} className="mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-white/40">Cases selecionados</span>
            <h2 className="mt-2 font-display text-3xl md:text-5xl tracking-tight text-white">Projetos recentes</h2>
          </div>
          <p className="max-w-sm text-sm text-white/55">Uma seleção de produtos que ajudei a desenhar do conceito ao lançamento.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-[minmax(280px,auto)]">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const reveal = useReveal();
  const { t } = useSitePreferences();
  const items = [
    { icon: Palette, title: t.services.visualId.title, desc: t.services.visualId.desc },
    { icon: Monitor, title: t.services.websites.title, desc: t.services.websites.desc },
    { icon: Layout, title: t.services.ui.title, desc: t.services.ui.desc },
  ];
  return (
    <section id="services" className="px-6 py-20 border-t border-site">
      <div className="mx-auto max-w-7xl">
        <motion.h2 {...reveal} className="font-display text-3xl md:text-5xl tracking-tight text-site-fg max-w-2xl">
          {t.services.title}
        </motion.h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-site bg-site-surface p-6 md:p-8 transition-all duration-500 hover:bg-site-surface/80 hover:border-site"
            >
              <div className="size-11 rounded-xl bg-[#34f56b]/15 text-[#34f56b] grid place-items-center mb-5 transition-transform duration-500 group-hover:scale-110">
                <it.icon className="size-5" />
              </div>
              <h3 className="font-display text-xl text-site-fg">{it.title}</h3>
              <p className="mt-2 text-sm text-site-muted leading-relaxed">{it.desc}</p>
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
    <section id="about" className="px-6 py-24 border-t border-site">
      <div className="mx-auto max-w-5xl grid md:grid-cols-[1fr_auto] gap-12 items-start">
        <motion.div {...reveal}>
          <span className="text-xs uppercase tracking-[0.2em] text-site-dim">{t.about.label}</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl tracking-tight text-site-fg">{t.about.title}</h2>
          <div className="mt-6 space-y-4 text-site-muted leading-relaxed max-w-xl">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="relative size-72 sm:size-80 md:size-96 lg:size-[28rem] rounded-3xl overflow-hidden border border-site shadow-[0_24px_60px_-20px_rgba(0,0,0,0.25)] dark:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] shrink-0"
        >
          <img
            src={aboutVanessa}
            alt={t.about.photoAlt}
            className="size-full object-cover object-[center_15%]"
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
      className="overflow-hidden border-y border-site py-8 md:py-12 bg-site-marquee"
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: hover ? 12 : 28, ease: "linear", repeat: Infinity }}
      >
        {[...items, ...items].map((line, i) => (
          <span key={i} className="font-display text-5xl md:text-8xl tracking-tight text-site-fg px-6 flex items-center gap-6">
            {line}
            <span className="text-[#34f56b]">✦</span>
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
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div {...reveal} className="text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-site-dim">{t.contact.label}</span>
          <h2 className="mt-3 font-display text-4xl md:text-6xl tracking-tight text-site-fg">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-site-muted max-w-xl mx-auto">{t.contact.subtitle}</p>
        </motion.div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-site-dim">
          <span>© {new Date().getFullYear()} VanCode</span>
          <span>{t.contact.footer}</span>
        </div>
      </div>
    </section>
  );
}

function GridBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.18]"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, var(--site-grid-dot) 1px, transparent 0)",
        backgroundSize: "28px 28px",
        maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
      }}
    />
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-site text-site-fg antialiased relative overflow-x-hidden">
      <DocumentMeta />
      <GridBackdrop />
      <Header />
      <main>
        <ScrollCases />
        <Services />
        <About />
        <Marquee />
        <Contact />
      </main>
      <FloatingContactCard />
    </div>
  );
}
