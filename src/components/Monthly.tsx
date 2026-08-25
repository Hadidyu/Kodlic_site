import { MONTHLY } from "../data";
import { ArrowRight, CheckIcon } from "./icons";
import { Corners, Reveal, SectionHead } from "./ui";

export default function Monthly() {
  return (
    <section id="monthly" className="relative py-24 md:py-36 bg-ink-900/40 border-y border-line/60">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHead
          no="04"
          label="Monthly"
          title={<>Ongoing engineering, <span className="stroke-text">on subscription</span>.</>}
          desc="Two flat monthly services for teams that need capacity without the hiring cycle."
        />

        <div className="grid lg:grid-cols-2 gap-5">
          {MONTHLY.map((m, i) => (
            <Reveal key={m.id} delay={i * 110}>
              <article className="group relative panel h-full p-8 md:p-10 transition-all duration-500 hover:border-mint-400/50 hover:-translate-y-1">
                <Corners />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="label-mono text-mint-400">{m.tag}</p>
                    <h3 className="mt-3 font-display font-extrabold tracking-tight text-2xl md:text-3xl">{m.name}</h3>
                  </div>
                  {m.badge && (
                    <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-sun-400 border border-sun-400/40 bg-sun-400/10 px-3 py-1.5">
                      {m.badge}
                    </span>
                  )}
                </div>

                <div className="mt-8 flex items-baseline gap-2">
                  <span className="font-display font-black tracking-[-0.03em] text-[clamp(2.4rem,4.5vw,3.6rem)] leading-none">
                    {m.price}
                  </span>
                  <span className="font-mono text-sm text-fog-400">{m.period}</span>
                </div>
                <p className="mt-2 text-sm text-fog-500">starting from · {m.note}</p>

                <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-7">
                  {m.includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[15px] text-fog-300">
                      <CheckIcon size={15} className="text-mint-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={m.href}
                  className="group/btn mt-9 inline-flex items-center gap-2.5 border border-line px-6 py-3.5 font-display font-bold text-[15px] text-fog-200 transition-all duration-300 hover:border-mint-400/60 hover:text-mint-300 hover:bg-mint-400/5 active:scale-[0.97]"
                >
                  {m.cta}
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
