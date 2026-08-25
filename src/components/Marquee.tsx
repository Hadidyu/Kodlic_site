import type { CSSProperties } from "react";
import { TECH_STACK } from "../data";
import { Asterisk } from "./icons";

function Row({ items, reverse = false, speed, muted = false }: {
  items: string[];
  reverse?: boolean;
  speed: string;
  muted?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee py-5 md:py-6">
      <div
        className={`marquee-track items-center ${reverse ? "rev" : ""}`}
        style={{ "--speed": speed } as CSSProperties}
      >
        {doubled.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className={`mr-10 md:mr-14 flex items-center gap-10 md:gap-14 shrink-0 font-display font-extrabold tracking-tight text-2xl md:text-[2rem] whitespace-nowrap transition-colors duration-300 ${
              muted ? "text-fog-500 hover:text-fog-200" : "text-fog-200 hover:text-mint-300"
            }`}
          >
            {t}
            <Asterisk size={15} className={muted ? "text-sun-400/70" : "text-mint-500/80"} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="Technology stack" className="relative border-y border-line bg-ink-900/60">
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between pt-4">
        <span className="label-mono text-mint-400">[ Stack ]</span>
        <span className="label-mono hidden sm:inline">20 technologies · battle-tested</span>
      </div>
      <Row items={TECH_STACK.slice(0, 10)} speed="34s" />
      <div className="h-px bg-line/70 mx-5 md:mx-8" />
      <Row items={TECH_STACK.slice(10)} reverse speed="44s" muted />
    </section>
  );
}
