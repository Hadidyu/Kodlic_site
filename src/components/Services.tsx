import { SERVICES } from "../data";
import {
  GlyphMobile, GlyphFrontend, GlyphBackend, GlyphApi, GlyphCommerce, ArrowUpRight,
} from "./icons";
import { Reveal } from "./ui";

const GLYPHS = {
  mobile: GlyphMobile,
  frontend: GlyphFrontend,
  backend: GlyphBackend,
  api: GlyphApi,
  commerce: GlyphCommerce,
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-[380px_1fr] gap-14 lg:gap-20">
          {/* sticky intro */}
          <div className="lg:sticky lg:top-28 self-start">
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <span className="label-mono text-mint-400">[ 01 — Services ]</span>
                <span className="h-px w-16 bg-line" />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,4vw,3.4rem)]">
                Software &amp; apps, engineered <span className="text-mint-400">end-to-end</span>.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-fog-400 leading-relaxed">
                Five disciplines, one accountable team. Every service ships with
                testing, documentation and a clean handoff — no orphaned codebases.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <ul className="mt-10 border-t border-line">
                {SERVICES.map((s) => (
                  <li key={s.id} className="border-b border-line">
                    <a
                      href={`#svc-${s.id}`}
                      className="group flex items-center justify-between py-3.5 label-mono hover:text-mint-300 transition-colors duration-200"
                    >
                      <span className="flex items-center gap-4">
                        <span className="text-fog-500 group-hover:text-mint-500 transition-colors">{s.no}</span>
                        {s.title}
                      </span>
                      <ArrowUpRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={280}>
              <a
                href="#estimate"
                className="group mt-10 inline-flex items-center gap-2 font-display font-bold text-mint-300 hover:text-mint-400 transition-colors"
              >
                Start a Project
                <span className="block h-px w-8 bg-mint-500/60 transition-all duration-300 group-hover:w-12" />
              </a>
            </Reveal>
          </div>

          {/* service blocks */}
          <div>
            {SERVICES.map((s, idx) => {
              const Glyph = GLYPHS[s.glyph];
              return (
                <Reveal key={s.id} delay={idx * 60}>
                  <article
                    id={`svc-${s.id}`}
                    className="group relative border-t border-line py-12 md:py-14 transition-all duration-500 hover:bg-ink-900/70 hover:pl-4 scroll-mt-28"
                  >
                    <div className="grid md:grid-cols-[80px_1fr] gap-6 md:gap-8">
                      <div className="flex md:flex-col items-center md:items-start gap-5">
                        <span className="font-display font-black text-4xl md:text-5xl stroke-text group-hover:text-mint-400 group-hover:[-webkit-text-stroke:0px] transition-all duration-500">
                          {s.no}
                        </span>
                        <span className="w-12 h-12 border border-line flex items-center justify-center text-fog-400 transition-all duration-500 group-hover:border-mint-400/60 group-hover:text-mint-300 group-hover:bg-mint-400/5">
                          <Glyph size={22} />
                        </span>
                      </div>
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-display font-extrabold tracking-tight text-2xl md:text-3xl">
                              {s.title}
                            </h3>
                            <p className="mt-1 font-mono text-xs text-sun-400/90 tracking-wide">{s.tagline}</p>
                          </div>
                          <ArrowUpRight
                            size={22}
                            className="mt-2 text-fog-500 opacity-0 -translate-x-2 translate-y-2 transition-all duration-400 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-mint-300 shrink-0"
                          />
                        </div>
                        <p className="mt-4 text-fog-400 leading-relaxed max-w-xl">{s.desc}</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {s.items.map((item) => (
                            <span key={item} className="chip">{item}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
            <div className="border-t border-line" />
          </div>
        </div>
      </div>
    </section>
  );
}
