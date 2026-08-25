import { ENGAGEMENTS } from "../data";
import { ArrowRight } from "./icons";
import { Reveal, SectionHead } from "./ui";

const ACCENT_TEXT = {
  mint: "group-hover:text-mint-400",
  sun: "group-hover:text-sun-400",
  steel: "group-hover:text-steel-400",
};
const ACCENT_BTN = {
  mint: "bg-mint-400 text-ink-950 hover:bg-mint-300 hover:shadow-[0_0_30px_rgba(63,229,155,0.25)]",
  sun: "border border-sun-400/50 text-sun-300 hover:bg-sun-400/10",
  steel: "border border-steel-400/50 text-steel-400 hover:bg-steel-400/10",
};

export default function Engagement() {
  return (
    <section id="engagement" className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHead
          no="03"
          label="Engagement"
          title={<>Three ways to work with <span className="text-mint-400">Kodlic</span>.</>}
          desc="A fixed project, a standing retainer, or senior consulting hours. Pick the shape that matches where your product is today."
        />

        <div>
          {ENGAGEMENTS.map((e, i) => (
            <Reveal key={e.id} delay={i * 80}>
              <article className="group grid lg:grid-cols-[110px_1.1fr_1.3fr_auto] gap-6 lg:gap-10 items-start border-t border-line py-10 md:py-12 transition-all duration-500 hover:bg-ink-900/70 hover:px-4">
                <span className={`font-display font-black text-5xl md:text-6xl stroke-text transition-all duration-500 ${ACCENT_TEXT[e.accent]} group-hover:[-webkit-text-stroke:0px]`}>
                  {e.no}
                </span>
                <div>
                  <h3 className="font-display font-extrabold tracking-tight text-2xl md:text-[1.75rem]">{e.name}</h3>
                  <p className="mt-2.5 text-fog-400 leading-relaxed max-w-sm">{e.tagline}</p>
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 content-start">
                  {e.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[15px] text-fog-300">
                      <span className="w-3 h-px bg-mint-500/80 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={e.href}
                  className={`inline-flex items-center gap-2.5 font-display font-bold text-[15px] px-6 py-3.5 transition-all duration-300 active:scale-[0.97] whitespace-nowrap ${ACCENT_BTN[e.accent]}`}
                >
                  {e.cta}
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </article>
            </Reveal>
          ))}
          <div className="border-t border-line" />
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 panel px-7 py-6">
            <p className="text-fog-300">
              Not sure which model fits? <span className="text-fog-500">Most clients start with a 2-minute estimate.</span>
            </p>
            <a
              href="#estimate"
              className="group inline-flex items-center gap-2 font-display font-bold text-mint-300 hover:text-mint-400 transition-colors whitespace-nowrap"
            >
              Get an estimate
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
