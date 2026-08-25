import type { CSSProperties } from "react";
import { useCountUp, useInView, useScrambleRotate } from "../hooks";
import { STATS } from "../data";
import { ArrowRight } from "./icons";
import { Corners } from "./ui";

const ROTATING = ["web platforms", "mobile apps", "AI products", "e-commerce", "SaaS engines", "custom software"];

const CAPABILITIES = [
  "Web development",
  "Mobile applications",
  "AI solutions",
  "Custom software",
  "Product development",
];

const TERM_LINES: { mark: string; markColor: string; text: string }[] = [
  { mark: "$", markColor: "text-fog-400", text: 'kodlic init --project "your-idea"' },
  { mark: "✓", markColor: "text-mint-400", text: "scope locked · architecture drafted" },
  { mark: "✓", markColor: "text-mint-400", text: "design system compiled · 48 components" },
  { mark: "●", markColor: "text-sun-400", text: "build passing · 214 tests · 0 warnings" },
  { mark: "▲", markColor: "text-steel-400", text: "deployed → production in 1.2s" },
];

function Stat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const n = useCountUp(value, inView, 1300 + delay);
  return (
    <div ref={ref} className="border-t border-line pt-4">
      <div className="font-display font-extrabold text-3xl md:text-4xl tracking-tight">
        {n}
        <span className="text-mint-400">{suffix}</span>
      </div>
      <div className="label-mono mt-1.5">{label}</div>
    </div>
  );
}

export default function Hero() {
  const rotating = useScrambleRotate(ROTATING, 2600);

  return (
    <section id="top" className="relative pt-32 lg:pt-44 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* meta row */}
        <div className="flex items-center justify-between gap-4 mb-12 md:mb-16">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-mint-400 pulse-dot" />
            <span className="label-mono">Accepting projects — Q3 2026</span>
          </div>
          <span className="label-mono hidden md:inline">48.8566° N, 2.3522° E — shipping worldwide</span>
        </div>

        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-14 lg:gap-10 items-end">
          {/* headline */}
          <div>
            <h1 className="font-display font-black tracking-[-0.035em] leading-[0.95] text-[clamp(3.1rem,9.5vw,7.6rem)]">
              <span className="hero-line"><span style={{ animationDelay: "0.05s" }}>We build</span></span>
              <span className="hero-line"><span style={{ animationDelay: "0.17s" }} className="stroke-text">software</span></span>
              <span className="hero-line"><span style={{ animationDelay: "0.29s" }}>&amp; tech<span className="text-mint-400">.</span></span></span>
            </h1>

            <div
              className="mt-7 font-mono text-sm md:text-base text-mint-400 h-6 flex items-center gap-2"
              aria-live="polite"
            >
              <span className="text-fog-500">{"//"}</span>
              <span className="whitespace-nowrap overflow-hidden">currently shipping: {rotating}</span>
              <span className="cursor-blink text-mint-400">▍</span>
            </div>

            <p className="mt-6 max-w-xl text-fog-400 leading-relaxed text-base md:text-lg">
              Kodlic is a technology studio for teams that ship. From first commit to
              production scale —{" "}
              {CAPABILITIES.map((c, i) => (
                <span key={c}>
                  <span className="text-fog-200 font-medium">{c.toLowerCase()}</span>
                  {i < CAPABILITIES.length - 1 && <span className="text-mint-500 mx-2">/</span>}
                </span>
              ))}
              .
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#estimate"
                className="group inline-flex items-center gap-2.5 bg-mint-400 text-ink-950 font-display font-bold tracking-tight px-8 py-4 text-[15px] transition-all duration-300 hover:bg-mint-300 hover:shadow-[0_0_40px_rgba(63,229,155,0.3)] active:scale-[0.98]"
              >
                Start a Project
                <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="group inline-flex items-center gap-2 text-fog-300 font-display font-semibold px-2 py-4 transition-colors hover:text-mint-300"
              >
                Explore services
                <span className="block h-px w-8 bg-fog-500 transition-all duration-300 group-hover:w-12 group-hover:bg-mint-400" />
              </a>
            </div>
          </div>

          {/* terminal + stats */}
          <div className="flex flex-col gap-6">
            <div className="relative panel p-0 overflow-hidden">
              <Corners />
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-line bg-ink-800/60">
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
                <span className="w-2.5 h-2.5 rounded-full bg-mint-500/70" />
                <span className="ml-3 font-mono text-[11px] text-fog-500 tracking-wider">kodlic — deploy.log</span>
              </div>
              <div className="px-5 py-5 font-mono text-[13px] leading-[2.1]">
                {TERM_LINES.map((l, i) => (
                  <div key={l.text} className="term-line flex gap-2.5" style={{ "--i": i } as CSSProperties}>
                    <span className={l.markColor}>{l.mark}</span>
                    <span className="text-fog-300">{l.text}</span>
                  </div>
                ))}
                <div className="term-line flex gap-2.5" style={{ "--i": TERM_LINES.length } as CSSProperties}>
                  <span className="text-fog-500">$</span>
                  <span className="text-fog-100">waiting for your project</span>
                  <span className="cursor-blink text-mint-400">▍</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-6">
              {STATS.map((s, i) => (
                <Stat key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={i * 120} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 mt-20 md:mt-28 flex items-center gap-4">
        <span className="label-mono">scroll</span>
        <span className="relative h-px flex-1 bg-line overflow-hidden">
          <span className="sweep-line" />
        </span>
      </div>
    </section>
  );
}
