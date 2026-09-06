import { useState, type FormEvent } from "react";
import { BUDGET_OPTIONS, PROJECT_TYPES, TIMELINE_OPTIONS } from "../data";
import { submitLead } from "../hooks";
import { ArrowRight, DrawCheck, MailIcon, SpinnerIcon } from "./icons";
import { Corners, Reveal } from "./ui";

const EMPTY = {
  name: "", email: "", company: "", type: "", budget: "", timeline: "", desc: "",
};

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const set = (k: keyof typeof EMPTY) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email required.";
    if (!form.desc.trim()) errs.desc = "A few lines about the project helps.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    window.setTimeout(() => {
      void submitLead("contact", form);
      setStatus("sent");
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 lg:gap-20">
          {/* left */}
          <div>
            <Reveal>
              <div className="flex items-center gap-4 mb-6">
                <span className="label-mono text-mint-400">[ 07 — Contact ]</span>
                <span className="h-px w-16 bg-line" />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(2.4rem,5.5vw,4.4rem)]">
                Let's build something <span className="text-mint-400">together</span>.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-fog-400 leading-relaxed max-w-md text-lg">
                Tell us where your product is and where it needs to go. A senior engineer —
                not a sales rep — reads every message.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-10 space-y-4 max-w-md">
                <a href="mailto:hello@kodlic.dev" className="group flex items-center justify-between border border-line px-6 py-5 transition-all duration-300 hover:border-mint-400/60 hover:bg-mint-400/5">
                  <span className="flex items-center gap-3.5">
                    <MailIcon size={19} className="text-mint-400" />
                    <span className="font-mono text-sm text-fog-200">hello@kodlic.dev</span>
                  </span>
                  <ArrowRight size={16} className="text-fog-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-mint-300" />
                </a>
                <div className="flex items-center justify-between border border-line px-6 py-5">
                  <span className="label-mono">Response time</span>
                  <span className="font-display font-bold text-fog-200">&lt; 24 hours</span>
                </div>
                <div className="flex items-center justify-between border border-line px-6 py-5">
                  <span className="label-mono">Current capacity</span>
                  <span className="flex items-center gap-2.5 font-display font-bold text-mint-300">
                    <span className="w-2 h-2 rounded-full bg-mint-400 pulse-dot" /> 2 slots open
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={140}>
            <div className="relative panel p-7 md:p-9">
              <Corners />
              {status === "sent" ? (
                <div className="py-16 flex flex-col items-center text-center step-fwd">
                  <span className="w-16 h-16 rounded-full border-2 border-mint-400 text-mint-400 flex items-center justify-center">
                    <DrawCheck size={30} />
                  </span>
                  <h3 className="mt-7 font-display font-extrabold tracking-tight text-2xl">Message received.</h3>
                  <p className="mt-3 text-fog-400 max-w-sm leading-relaxed">
                    Thanks, {form.name.split(" ")[0] || "friend"} — we'll get back to{" "}
                    <span className="text-fog-200">{form.email}</span> within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setForm(EMPTY); setStatus("idle"); }}
                    className="mt-8 inline-flex items-center gap-2 border border-line px-6 py-3 font-display font-bold text-sm text-fog-300 transition-all duration-300 hover:border-mint-400/60 hover:text-mint-300"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <p className="label-mono mb-7">Project inquiry</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label-mono block mb-2" htmlFor="ct-name">Name *</label>
                      <input id="ct-name" className={`field ${errors.name ? "field-error" : ""}`} placeholder="Your name" value={form.name} onChange={(e) => set("name")(e.target.value)} />
                      {errors.name && <p className="mt-1.5 text-xs text-sun-400">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="label-mono block mb-2" htmlFor="ct-email">Email *</label>
                      <input id="ct-email" type="email" className={`field ${errors.email ? "field-error" : ""}`} placeholder="you@company.com" value={form.email} onChange={(e) => set("email")(e.target.value)} />
                      {errors.email && <p className="mt-1.5 text-xs text-sun-400">{errors.email}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label-mono block mb-2" htmlFor="ct-company">Company</label>
                      <input id="ct-company" className="field" placeholder="Company or product name" value={form.company} onChange={(e) => set("company")(e.target.value)} />
                    </div>
                    <div>
                      <label className="label-mono block mb-2" htmlFor="ct-type">Project type</label>
                      <select id="ct-type" className="field" value={form.type} onChange={(e) => set("type")(e.target.value)}>
                        <option value="">Select…</option>
                        {PROJECT_TYPES.map((t) => <option key={t.id} value={t.label}>{t.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="label-mono block mb-2" htmlFor="ct-budget">Budget</label>
                      <select id="ct-budget" className="field" value={form.budget} onChange={(e) => set("budget")(e.target.value)}>
                        <option value="">Select…</option>
                        {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label-mono block mb-2" htmlFor="ct-timeline">Timeline</label>
                      <select id="ct-timeline" className="field" value={form.timeline} onChange={(e) => set("timeline")(e.target.value)}>
                        <option value="">Select…</option>
                        {TIMELINE_OPTIONS.map((t) => <option key={t.label} value={t.label}>{t.label}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label-mono block mb-2" htmlFor="ct-desc">Project description *</label>
                      <textarea id="ct-desc" className={`field min-h-[130px] resize-y ${errors.desc ? "field-error" : ""}`} placeholder="Goals, current state, links, deadlines — anything that helps." value={form.desc} onChange={(e) => set("desc")(e.target.value)} />
                      {errors.desc && <p className="mt-1.5 text-xs text-sun-400">{errors.desc}</p>}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group mt-7 w-full inline-flex items-center justify-center gap-2.5 bg-mint-400 text-ink-950 font-display font-bold px-7 py-4 text-[15px] transition-all duration-300 hover:bg-mint-300 hover:shadow-[0_0_36px_color-mix(in_srgb,var(--color-mint-400)_28%,transparent)] active:scale-[0.98] disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <><SpinnerIcon size={17} /> Sending…</>
                    ) : (
                      <>Send Message <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" /></>
                    )}
                  </button>
                  <p className="mt-4 text-xs text-fog-500 leading-relaxed">
                    By sending, you agree to be contacted about your inquiry. No newsletters, no spam — ever.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
