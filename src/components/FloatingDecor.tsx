import { useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import nuvem from "@/assets/float/nuvem.png";
import phone from "@/assets/float/phone.png";
import seta from "@/assets/float/seta.png";
import plus from "@/assets/float/plus.png";
import people from "@/assets/float/people.png";
import flor from "@/assets/float/flor.png";
import clock from "@/assets/float/clock.png";
import asset01 from "@/assets/float/asset01.png";
import asset02 from "@/assets/float/asset02.png";
import arrow from "@/assets/float/arrow.png";

type FloatItem = {
  src: string;
  className: string;
  range?: number;
  dur?: number;
  delay?: number;
  /** Assets with black background blend out on cream */
  blend?: boolean;
};

function FloatImg({
  src,
  className,
  range = 14,
  dur = 6,
  delay = 0,
  blend = true,
  reduce,
}: FloatItem & { reduce: boolean | null }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute z-10 select-none", className)}
    >
      <div
        className={cn(!reduce && "float-bob")}
        style={
          {
            "--float-range": `${range}px`,
            "--float-dur": `${dur}s`,
            "--float-delay": `${delay}s`,
          } as CSSProperties
        }
      >
        <img
          src={src}
          alt=""
          draggable={false}
          className={cn(
            "h-auto w-full drop-shadow-md",
            blend && "mix-blend-multiply",
          )}
        />
      </div>
    </div>
  );
}

/** Decorative floating icons around the hero — Salto-style */
export function HeroFloats() {
  const reduce = useReducedMotion();

  const items: FloatItem[] = [
    {
      src: nuvem,
      className: "-left-16 top-4 w-28 opacity-90 sm:-left-20 sm:w-40 md:w-44",
      range: 12,
      dur: 7,
      delay: 0,
    },
    {
      src: nuvem,
      className: "-right-14 top-[42%] hidden w-36 opacity-85 sm:block md:w-52",
      range: 16,
      dur: 8,
      delay: 1.2,
    },
    {
      src: nuvem,
      className: "-left-8 bottom-8 w-28 opacity-75 sm:w-40",
      range: 10,
      dur: 6.5,
      delay: 0.6,
    },
    {
      src: seta,
      className: "left-1 top-[34%] w-16 sm:left-4 sm:w-24 md:w-28",
      range: 18,
      dur: 5.5,
      delay: 0.3,
    },
    {
      src: people,
      className: "-right-4 top-6 w-24 sm:-right-2 sm:w-36 md:w-40",
      range: 14,
      dur: 6.2,
      delay: 0.8,
      blend: false,
    },
    {
      src: plus,
      className: "right-6 bottom-16 hidden w-14 -rotate-12 sm:block md:right-10 md:w-20",
      range: 11,
      dur: 5.8,
      delay: 1.5,
    },
    {
      src: phone,
      className: "left-[8%] bottom-4 hidden w-16 sm:block md:w-24",
      range: 13,
      dur: 6.8,
      delay: 0.4,
    },
    {
      src: clock,
      className: "right-[12%] top-[22%] hidden w-16 sm:block md:w-24",
      range: 15,
      dur: 7.2,
      delay: 1.1,
    },
  ];

  return (
    <>
      {items.map((item, i) => (
        <FloatImg key={i} {...item} reduce={reduce} />
      ))}
    </>
  );
}

/** Sparse floats for mid/lower sections */
export function SectionFloats({ variant }: { variant: "services" | "about" | "contact" }) {
  const reduce = useReducedMotion();

  if (variant === "services") {
    return (
      <>
        <FloatImg
          src={flor}
          className="-right-6 top-8 w-20 opacity-90 sm:w-28 md:w-32"
          range={12}
          dur={6.5}
          delay={0.2}
          reduce={reduce}
        />
        <FloatImg
          src={arrow}
          className="-left-4 bottom-10 hidden w-20 sm:block md:w-28"
          range={14}
          dur={7}
          delay={0.9}
          reduce={reduce}
        />
      </>
    );
  }

  if (variant === "about") {
    return (
      <>
        <FloatImg
          src={asset01}
          className="-left-6 top-10 hidden w-28 sm:block md:w-36"
          range={12}
          dur={6}
          delay={0.3}
          blend={false}
          reduce={reduce}
        />
        <FloatImg
          src={plus}
          className="-right-4 bottom-8 w-14 rotate-12 sm:w-20"
          range={10}
          dur={5.5}
          delay={0.7}
          reduce={reduce}
        />
      </>
    );
  }

  return (
    <>
      <FloatImg
        src={asset02}
        className="-right-4 top-6 hidden w-28 sm:block md:w-36"
        range={13}
        dur={6.8}
        delay={0.4}
        blend={false}
        reduce={reduce}
      />
      <FloatImg
        src={seta}
        className="-left-2 bottom-12 w-16 rotate-[-20deg] opacity-90 sm:w-24"
        range={16}
        dur={5.8}
        delay={0.2}
        reduce={reduce}
      />
    </>
  );
}
