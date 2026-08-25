import { SOLUTIONS } from "../data";
import {
  GlyphLayers, GlyphCoin, GlyphBrowser, GlyphSpark, GlyphBars, GlyphShield,
} from "./icons";
import { Reveal, SectionHead } from "./ui";

const GLYPHS = {
  layers: GlyphLayers,
  coin: GlyphCoin,
  browser: GlyphBrowser,
  spark: GlyphSpark,
  bars: GlyphBars,
  shield: GlyphShield,
};

export default function Solutions() {
  return (
    <section id="solutions" className="relative py-24 md:py-36 bg-ink-900/40 border-y border-line/60">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHead
          no="02"
          label="Solutions"
          title={<>Whatever it is, we've probably <span className="stroke-text">built one</span>.</>}
          desc="Six categories cover most of what clients bring us. If yours isn't here, it falls under custom software — and we love those."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">
          {SOLUTIONS.map((s, i) => {
            const Glyph = GLYPHS[s.glyph];
            return (
              <Reveal key={s.id} delay={(i % 3) * 90} className={s.span}>
                <article className="group relative h-full panel p-7 md:p-8 transition-all duration-500 hover:border-mint-400/50 hover:-translate-y-1 hover:bg-ink-800">
                  <div className="flex items-start justify-between">
                    <span className="w-11 h-11 border border-line flex items-center justify-center text-fog-400 transition-all duration-500 group-hover:text-mint-300 group-hover:border-mint-400/60 group-hover:bg-mint-400/5">
                      <Glyph size={21} />
                    </span>
                    <span className="label-mono text-fog-500">{s.no}</span>
                  </div>
                  <h3 className="mt-6 font-display font-extrabold tracking-tight text-xl md:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-fog-400">{s.desc}</p>
                  <ul className={`mt-6 grid gap-x-6 gap-y-2.5 ${s.items.length > 6 ? "sm:grid-cols-2" : ""}`}>
                    {s.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[15px] text-fog-300">
                        <span className="w-1.5 h-1.5 bg-mint-500/70 rotate-45 shrink-0 transition-transform duration-300 group-hover:bg-mint-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
