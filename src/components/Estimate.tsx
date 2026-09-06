import { useMemo, useRef, useState } from "react";
import {
  PROJECT_TYPES, DESIGN_OPTIONS, TIMELINE_OPTIONS, BUDGET_OPTIONS,
} from "../data";
import { makeRefCode, submitLead, useCountUp, useInView } from "../hooks";
import { ArrowLeft, ArrowRight, CheckIcon, DrawCheck, SpinnerIcon } from "./icons";
import { Corners, Reveal, SectionHead } from "./ui";

const STEPS = ["Project Type", "Scope", "Design", "Timeline", "Budget", "Your Details"];

type Phase = "form" | "calculating" | "result" | "submitted";

const round50 = (n: number) => Math.max(500, Math.round(n / 50) * 50);
const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

function OptionCard({
  selected, onClick, title, desc, badge,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  desc?: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative text-left border p-5 transition-all duration-300 active:scale-[0.98] ${
        selected
          ? "border-mint-400/80 bg-mint-400/[0.08] option-pop"
          : "border-line bg-ink-900 hover:border-fog-500/60 hover:bg-ink-800"
      }`}
    >
      <span className="flex items-start justify-between gap-3">
        <span>
          <span className={`block font-display font-bold tracking-tight text-[15px] md:text-base ${selected ? "text-mint-300" : "text-fog-100"}`}>
            {title}
          </span>
          {desc && <span className="mt-1 block text-[13px] leading-relaxed text-fog-500">{desc}</span>}
          {badge && (
            <span className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.14em] text-sun-400 border border-sun-400/40 px-2 py-0.5">
              {badge}
            </span>
          )}
        </span>
        <span
          className={`shrink-0 w-5 h-5 border flex items-center justify-center transition-all duration-300 ${
            selected ? "border-mint-400 bg-mint-400 text-ink-950" : "border-fog-500/50 text-transparent"
          }`}
        >
          <CheckIcon size={12} strokeWidth={2.6} />
        </span>
      </span>
    </button>
  );
}

export default function Estimate() {
  const [ref, inView] = useInView<HTMLDivElement>(0.05);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [phase, setPhase] = useState<Phase>("form");

  const [typeId, setTypeId] = useState<string | null>(null);
  const [scopeIdx, setScopeIdx] = useState<number | null>(null);
  const [designIdx, setDesignIdx] = useState<number | null>(null);
  const [timelineIdx, setTimelineIdx] = useState<number | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [contact, setContact] = useState({ name: "", email: "", company: "", phone: "", desc: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const refCode = useRef<string>("");

  const type = useMemo(() => PROJECT_TYPES.find((t) => t.id === typeId) ?? null, [typeId]);

  const estimate = useMemo(() => {
    if (!type || scopeIdx === null || designIdx === null || timelineIdx === null) return null;
    const scope = type.scopes[scopeIdx];
    const design = DESIGN_OPTIONS[designIdx];
    const tl = TIMELINE_OPTIONS[timelineIdx];
    const lo = round50(type.base[0] * scope.mult * tl.factor + design.add[0]);
    const hi = round50(type.base[1] * scope.mult * tl.factor + design.add[1]);
    const midWeeks = Math.min(24, Math.max(2, Math.round(((type.base[0] + type.base[1]) / 2) * scope.mult / 1000)));
    return { lo, hi, scope, design, tl, weeksLo: midWeeks, weeksHi: Math.round(midWeeks * 1.5) };
  }, [type, scopeIdx, designIdx, timelineIdx]);

  const canNext =
    (step === 0 && typeId !== null) ||
    (step === 1 && scopeIdx !== null) ||
    (step === 2 && designIdx !== null) ||
    (step === 3 && timelineIdx !== null) ||
    (step === 4 && budget !== null) ||
    step === 5;

  const goNext = () => {
    if (step === 5) {
      const errs: { name?: string; email?: string } = {};
      if (!contact.name.trim()) errs.name = "Please add your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) errs.email = "A valid email is required.";
      setErrors(errs);
      if (Object.keys(errs).length) return;
      refCode.current = makeRefCode();
      setPhase("calculating");
      window.setTimeout(() => setPhase("result"), 1500);
      return;
    }
    setDir("fwd");
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setDir("back");
    setStep((s) => Math.max(0, s - 1));
  };

  const jumpTo = (i: number) => {
    if (i < step) {
      setDir("back");
      setStep(i);
    }
  };

  const reset = () => {
    setStep(0); setDir("back"); setPhase("form");
    setTypeId(null); setScopeIdx(null); setDesignIdx(null); setTimelineIdx(null); setBudget(null);
    setContact({ name: "", email: "", company: "", phone: "", desc: "" });
    setErrors({}); setSubmitting(false);
  };

  const sendInquiry = () => {
    setSubmitting(true);
    window.setTimeout(() => {
      void submitLead("estimate", {
        ref: refCode.current, type: type?.label, scope: estimate?.scope.label,
        design: estimate?.design.label, timeline: estimate?.tl.label, budget,
        range: estimate ? [estimate.lo, estimate.hi] : null, contact,
      });
      setSubmitting(false);
      setPhase("submitted");
    }, 1300);
  };

  const lo = useCountUp(estimate?.lo ?? 0, phase === "result");
  const hi = useCountUp(estimate?.hi ?? 0, phase === "result");

  return (
    <section id="estimate" className="relative py-24 md:py-36 bg-ink-900/40 border-y border-line/60">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHead
          no="06"
          label="Estimate"
          title={<>Get your project estimate <span className="text-mint-400">before you talk to anyone</span>.</>}
          desc="Six quick steps. Real numbers, no sales call required — the range updates as you answer."
        />

        <Reveal>
          <div ref={ref} className="relative panel grid lg:grid-cols-[300px_1fr] overflow-hidden">
            <Corners />

            {/* rail */}
            <aside className="border-b lg:border-b-0 lg:border-r border-line bg-ink-850/80 p-6 md:p-7">
              <div className="flex items-center justify-between mb-5">
                <span className="label-mono">Progress</span>
                <span className="font-mono text-xs text-mint-400">
                  {phase === "form" ? `STEP ${step + 1} / 6` : phase === "calculating" ? "CRUNCHING…" : "DONE"}
                </span>
              </div>
              <div className="h-1 bg-line mb-7 overflow-hidden">
                <div
                  className="h-full bg-mint-400 transition-all duration-700 ease-out"
                  style={{ width: phase === "form" ? `${((step + 1) / 6) * 100}%` : "100%" }}
                />
              </div>
              <ol className="space-y-1">
                {STEPS.map((s, i) => {
                  const done =
                    phase !== "form" ||
                    i < step ||
                    (i === 0 && typeId) || (i === 1 && scopeIdx !== null) ||
                    (i === 2 && designIdx !== null) || (i === 3 && timelineIdx !== null) ||
                    (i === 4 && budget !== null);
                  const current = phase === "form" && i === step;
                  return (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => jumpTo(i)}
                        disabled={phase !== "form"}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all duration-300 ${
                          current ? "bg-mint-400/10 text-mint-300" : done ? "text-fog-200" : "text-fog-500"
                        } ${phase === "form" && i < step ? "hover:bg-ink-800 cursor-pointer" : ""}`}
                      >
                        <span className={`w-6 h-6 shrink-0 border flex items-center justify-center font-mono text-[10px] transition-colors ${
                          done && !current ? "border-mint-500/60 text-mint-400" : current ? "border-mint-400 text-mint-300" : "border-line"
                        }`}>
                          {done && !current ? <CheckIcon size={11} strokeWidth={2.4} /> : i + 1}
                        </span>
                        <span className="font-display font-semibold text-sm tracking-tight">{s}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-8 pt-6 border-t border-line hidden lg:block">
                <p className="label-mono mb-3">Selections</p>
                <div className="flex flex-wrap gap-1.5">
                  {type && (
                    <span
                      className="chip"
                      style={{ color: "var(--color-mint-300)", borderColor: "color-mix(in srgb, var(--color-mint-400) 45%, transparent)" }}
                    >
                      {type.label}
                    </span>
                  )}
                  {type && scopeIdx !== null && <span className="chip">{type.scopes[scopeIdx].label}</span>}
                  {designIdx !== null && <span className="chip">{DESIGN_OPTIONS[designIdx].label}</span>}
                  {timelineIdx !== null && <span className="chip">{TIMELINE_OPTIONS[timelineIdx].label}</span>}
                  {budget && <span className="chip">{budget}</span>}
                </div>
              </div>
            </aside>

            {/* stage */}
            <div className="p-6 md:p-10 min-h-[520px] flex flex-col">
              {phase === "form" && (
                <div key={step} className={dir === "fwd" ? "step-fwd flex-1 flex flex-col" : "step-back flex-1 flex flex-col"}>
                  <div className="flex-1">
                    {step === 0 && (
                      <>
                        <h3 className="font-display font-extrabold tracking-tight text-2xl md:text-3xl">What are we building?</h3>
                        <p className="mt-2 text-fog-400 text-sm">Pick the closest match — you can refine later.</p>
                        <div className="mt-7 grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
                          {PROJECT_TYPES.map((t) => (
                            <OptionCard key={t.id} selected={typeId === t.id} onClick={() => { setTypeId(t.id); setScopeIdx(null); }} title={t.label} desc={t.hint} />
                          ))}
                        </div>
                      </>
                    )}
                    {step === 1 && type && (
                      <>
                        <h3 className="font-display font-extrabold tracking-tight text-2xl md:text-3xl">How big is the scope?</h3>
                        <p className="mt-2 text-fog-400 text-sm">Options for a {type.label.toLowerCase()}.</p>
                        <div className="mt-7 grid sm:grid-cols-2 gap-3">
                          {type.scopes.map((s, i) => (
                            <OptionCard key={s.label} selected={scopeIdx === i} onClick={() => setScopeIdx(i)} title={s.label} />
                          ))}
                        </div>
                      </>
                    )}
                    {step === 2 && (
                      <>
                        <h3 className="font-display font-extrabold tracking-tight text-2xl md:text-3xl">What about design?</h3>
                        <div className="mt-7 grid sm:grid-cols-3 gap-3">
                          {DESIGN_OPTIONS.map((d, i) => (
                            <OptionCard key={d.label} selected={designIdx === i} onClick={() => setDesignIdx(i)} title={d.label} desc={d.desc} badge={d.add[0] > 0 ? `+${fmt(d.add[0])}+` : "included"} />
                          ))}
                        </div>
                      </>
                    )}
                    {step === 3 && (
                      <>
                        <h3 className="font-display font-extrabold tracking-tight text-2xl md:text-3xl">When do you need it?</h3>
                        <div className="mt-7 grid sm:grid-cols-2 gap-3">
                          {TIMELINE_OPTIONS.map((t, i) => (
                            <OptionCard key={t.label} selected={timelineIdx === i} onClick={() => setTimelineIdx(i)} title={t.label} desc={t.note} badge={t.factor > 1 ? "rush pricing" : t.factor < 1 ? "best rate" : undefined} />
                          ))}
                        </div>
                      </>
                    )}
                    {step === 4 && (
                      <>
                        <h3 className="font-display font-extrabold tracking-tight text-2xl md:text-3xl">What budget are you working with?</h3>
                        <p className="mt-2 text-fog-400 text-sm">This helps us right-size the proposal — it doesn't lock you in.</p>
                        <div className="mt-7 grid grid-cols-2 xl:grid-cols-3 gap-3">
                          {BUDGET_OPTIONS.map((b) => (
                            <OptionCard key={b} selected={budget === b} onClick={() => setBudget(b)} title={b} />
                          ))}
                        </div>
                      </>
                    )}
                    {step === 5 && (
                      <>
                        <h3 className="font-display font-extrabold tracking-tight text-2xl md:text-3xl">Where do we send it?</h3>
                        <div className="mt-7 grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="label-mono block mb-2" htmlFor="est-name">Name *</label>
                            <input id="est-name" className={`field ${errors.name ? "field-error" : ""}`} placeholder="Ada Lovelace" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
                            {errors.name && <p className="mt-1.5 text-xs text-sun-400">{errors.name}</p>}
                          </div>
                          <div>
                            <label className="label-mono block mb-2" htmlFor="est-email">Email *</label>
                            <input id="est-email" type="email" className={`field ${errors.email ? "field-error" : ""}`} placeholder="ada@company.com" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                            {errors.email && <p className="mt-1.5 text-xs text-sun-400">{errors.email}</p>}
                          </div>
                          <div>
                            <label className="label-mono block mb-2" htmlFor="est-company">Company</label>
                            <input id="est-company" className="field" placeholder="Analytical Engines Inc." value={contact.company} onChange={(e) => setContact({ ...contact, company: e.target.value })} />
                          </div>
                          <div>
                            <label className="label-mono block mb-2" htmlFor="est-phone">Phone</label>
                            <input id="est-phone" className="field" placeholder="+1 555 000 0000" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="label-mono block mb-2" htmlFor="est-desc">Project description</label>
                            <textarea id="est-desc" className="field min-h-[110px] resize-y" placeholder="Tell us what you're imagining — even rough is fine." value={contact.desc} onChange={(e) => setContact({ ...contact, desc: e.target.value })} />
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="mt-10 pt-6 border-t border-line flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={goBack}
                      className={`inline-flex items-center gap-2 font-display font-semibold text-sm text-fog-400 transition-all duration-300 hover:text-fog-100 ${step === 0 ? "opacity-0 pointer-events-none" : ""}`}
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={goNext}
                      disabled={!canNext}
                      className={`group inline-flex items-center gap-2.5 font-display font-bold px-7 py-3.5 text-[15px] transition-all duration-300 active:scale-[0.97] ${
                        canNext
                          ? "bg-mint-400 text-ink-950 hover:bg-mint-300 hover:shadow-[0_0_30px_color-mix(in_srgb,var(--color-mint-400)_25%,transparent)]"
                          : "bg-ink-700 text-fog-500 cursor-not-allowed"
                      }`}
                    >
                      {step === 5 ? "Generate Estimate" : "Continue"}
                      {step === 5 ? <CheckIcon size={16} /> : <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />}
                    </button>
                  </div>
                </div>
              )}

              {phase === "calculating" && (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <SpinnerIcon size={40} className="text-mint-400" />
                  <p className="mt-6 font-display font-extrabold text-2xl tracking-tight">Crunching the numbers…</p>
                  <p className="mt-2 font-mono text-sm text-fog-500">scope × design × timeline → range</p>
                </div>
              )}

              {phase === "result" && estimate && type && (
                <div className="flex-1 flex flex-col step-fwd">
                  <p className="label-mono text-mint-400">Estimated investment</p>
                  <div className="mt-3 font-display font-black tracking-[-0.03em] text-[clamp(2.4rem,6vw,4.4rem)] leading-none">
                    {fmt(lo)} <span className="text-fog-500">—</span> <span className="text-mint-400">{fmt(hi)}</span>
                  </div>
                  <p className="mt-3 text-fog-400 text-sm">
                    Typical timeline: <span className="text-fog-200 font-medium">≈ {estimate.weeksLo}–{estimate.weeksHi} weeks</span>
                    {" · "}Reference <span className="font-mono text-mint-300">{refCode.current}</span>
                  </p>

                  <div className="mt-8 border border-line divide-y divide-line">
                    {[
                      ["Project type", type.label],
                      ["Scope", `${estimate.scope.label} (×${estimate.scope.mult})`],
                      ["Design", estimate.design.add[0] > 0 ? `${estimate.design.label} (+${fmt(estimate.design.add[0])}–${fmt(estimate.design.add[1])})` : estimate.design.label],
                      ["Timeline", `${estimate.tl.label} (×${estimate.tl.factor})`],
                      ["Budget band", budget ?? "—"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm">
                        <span className="label-mono">{k}</span>
                        <span className="text-fog-200 font-medium text-right">{v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={sendInquiry}
                      disabled={submitting}
                      className="group inline-flex items-center gap-2.5 bg-mint-400 text-ink-950 font-display font-bold px-7 py-4 text-[15px] transition-all duration-300 hover:bg-mint-300 hover:shadow-[0_0_36px_color-mix(in_srgb,var(--color-mint-400)_28%,transparent)] active:scale-[0.98] disabled:opacity-60"
                    >
                      {submitting ? <SpinnerIcon size={17} /> : <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />}
                      {submitting ? "Sending…" : "Send inquiry to Kodlic"}
                    </button>
                    <button
                      type="button"
                      onClick={reset}
                      className="inline-flex items-center gap-2 border border-line px-7 py-4 font-display font-bold text-[15px] text-fog-300 transition-all duration-300 hover:border-fog-500/60 hover:text-fog-100"
                    >
                      Start over
                    </button>
                  </div>
                </div>
              )}

              {phase === "submitted" && (
                <div className="flex-1 flex flex-col items-center justify-center text-center step-fwd">
                  <span className="w-16 h-16 rounded-full border-2 border-mint-400 text-mint-400 flex items-center justify-center">
                    <DrawCheck size={30} />
                  </span>
                  <h3 className="mt-7 font-display font-extrabold tracking-tight text-3xl">Inquiry received.</h3>
                  <p className="mt-3 text-fog-400 max-w-md leading-relaxed">
                    Reference <span className="font-mono text-mint-300">{refCode.current}</span> — we'll reply to{" "}
                    <span className="text-fog-200">{contact.email}</span> within one business day with next steps and a call link.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-8 inline-flex items-center gap-2 border border-line px-7 py-3.5 font-display font-bold text-[15px] text-fog-300 transition-all duration-300 hover:border-mint-400/60 hover:text-mint-300"
                  >
                    Build another estimate
                  </button>
                </div>
              )}
            </div>
          </div>
        </Reveal>
        <p className={`label-mono mt-5 text-center transition-opacity duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
          * Estimates are directional ranges, not quotes. A 30-minute scoping call locks the real number.
        </p>
      </div>
    </section>
  );
}
