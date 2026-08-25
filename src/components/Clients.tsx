import { useState } from "react";
import { CLIENTS } from "../data";
import { useInView } from "../hooks";
import { ArrowRight } from "./icons";
import { Reveal, SectionHead } from "./ui";

function Pipeline({ steps }: { steps: string[] }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="mt-10 border border-line bg-ink-900/70 p-6 md:p-8">
      <p className="label-mono mb-6">The complete journey</p>
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-0">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 flex items-center md:flex-col md:items-center gap-4 md:gap-0">
            <div className="flex flex-col items-center gap-3">
              <span
                className={`w-11 h-11 rounded-full border flex items-center justify-center font-display font-bold text-sm transition-all duration-500 ${
                  inView ? "border-mint-400/70 bg-mint-400/10 text-mint-300" : "border-line text-fog-500"
                }`}
                style={{ transitionDelay: `${i * 160}ms` }}
              >
                {i + 1}
              </span>
              <span
                className={`font-display font-bold tracking-tight transition-all duration-500 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                style={{ transitionDelay: `${i * 160 + 80}ms` }}
              >
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span className="relative hidden md:block flex-1 h-px bg-line mx-2 mt-[-24px] overflow-hidden">
                <span
                  className="absolute inset-y-0 left-0 bg-mint-400/80 transition-transform duration-700 ease-out origin-left"
                  style={{ transform: inView ? "scaleX(1)" : "scaleX(0)", transitionDelay: `${i * 160 + 200}ms` }}
                />
              </span>
            )}
            {i < steps.length - 1 && (
              <span className="md:hidden ml-[21px] w-px h-5 bg-line relative overflow-hidden">
                <span
                  className="absolute inset-x-0 top-0 bg-mint-400/80 transition-transform duration-500 origin-top"
                  style={{ transform: inView ? "scaleY(1)" : "scaleY(0)", transitionDelay: `${i * 160 + 200}ms` }}
                />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Clients() {
  const [active, setActive] = useState(0);
  const seg = CLIENTS[active];

  return (
    <section id="clients" className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHead
          no="05"
          label="Clients"
          title={<>Who Kodlic <span className="text-mint-400">serves</span>.</>}
          desc="Four kinds of clients, one standard of engineering. Select your stage."
        />

        {/* tabs */}
        <Reveal>
          <div className="flex flex-wrap gap-2 border-b border-line" role="tablist" aria-label="Client segments">
            {CLIENTS.map((c, i) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={`relative px-5 py-4 font-display font-bold tracking-tight text-sm md:text-base transition-colors duration-300 ${
                  active === i ? "text-mint-300" : "text-fog-400 hover:text-fog-200"
                }`}
              >
                <span className="font-mono text-[11px] mr-2 text-fog-500">0{i + 1}</span>
                {c.name}
                <span
                  className={`absolute left-0 right-0 -bottom-px h-[2px] transition-all duration-400 ${
                    active === i ? "bg-mint-400 opacity-100" : "bg-transparent opacity-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </Reveal>

        {/* panel */}
        <div key={seg.id} className="step-fwd grid lg:grid-cols-[1.1fr_1.4fr] gap-10 lg:gap-16 pt-12">
          <div>
            <p className="label-mono text-mint-400">[ {seg.no} ]</p>
            <h3 className="mt-4 font-display font-extrabold tracking-[-0.02em] text-3xl md:text-4xl leading-tight">
              {seg.name}
            </h3>
            <p className="mt-5 text-fog-400 leading-relaxed text-lg">{seg.desc}</p>
            <a
              href="#estimate"
              className="group mt-8 inline-flex items-center gap-2 font-display font-bold text-mint-300 hover:text-mint-400 transition-colors"
            >
              Start with an estimate
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 content-start">
            {seg.points.map((p, i) => (
              <div
                key={p.label}
                className="panel p-6 transition-all duration-500 hover:border-mint-400/50 hover:-translate-y-1"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <p className="font-mono text-[11px] text-fog-500">0{i + 1}</p>
                <p className="mt-2 font-display font-bold tracking-tight text-lg">{p.label}</p>
                <p className="mt-1.5 text-sm text-fog-400">{p.detail}</p>
              </div>
            ))}
            {seg.pipeline && (
              <div className="sm:col-span-2">
                <Pipeline steps={seg.pipeline} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
