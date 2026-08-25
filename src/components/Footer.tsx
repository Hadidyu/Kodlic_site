import { useEffect, useState, type ReactNode } from "react";
import { NAV_LINKS, SERVICES } from "../data";
import { CloseIcon, GithubIcon, LinkedInIcon, LogoMark, MailIcon, XSocialIcon } from "./icons";
import { Reveal } from "./ui";

function LegalModal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-ink-950/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative panel w-full sm:max-w-2xl max-h-[85vh] flex flex-col step-fwd">
        <div className="flex items-center justify-between px-7 py-5 border-b border-line">
          <h3 className="font-display font-extrabold tracking-tight text-xl">{title}</h3>
          <button type="button" onClick={onClose} className="p-2 text-fog-400 hover:text-mint-300 transition-colors" aria-label="Close">
            <CloseIcon size={20} />
          </button>
        </div>
        <div className="overflow-y-auto px-7 py-6 text-fog-300 text-[15px] leading-relaxed space-y-5">{children}</div>
      </div>
    </div>
  );
}

const PRIVACY = [
  ["What we collect", "When you submit an estimate or contact form, we store only what you give us: name, email, company, phone and project details. No tracking pixels, no data brokers, no dark patterns."],
  ["How we use it", "Your details are used exclusively to respond to your inquiry and prepare a proposal. We never sell, rent or share personal data with third parties."],
  ["Storage & retention", "Leads are stored securely and deleted on request. Email us at hello@kodlic.dev with the subject 'Delete my data' and it's gone within 7 days."],
  ["Cookies", "This site uses no advertising cookies. Only strictly necessary storage (like remembering your estimate session) is used."],
  ["Your rights", "You may request access, correction or deletion of your data at any time. Contact: hello@kodlic.dev."],
];

const TERMS = [
  ["Scope of service", "All engagements are governed by a written statement of work (SOW) defining deliverables, milestones, timelines and pricing. This website provides estimates, not binding quotes."],
  ["Payment terms", "Project-based work is billed at agreed milestones. Retainers are billed monthly in advance. Invoices are payable within 14 days."],
  ["Intellectual property", "Upon full payment, you own the deliverables — code, designs and documentation. We retain the right to reference the work in our portfolio unless you ask us not to."],
  ["Warranty", "We provide a 30-day fix period after handoff for any defect in delivered work, excluding changes made by third parties."],
  ["Liability", "Our liability is limited to the fees paid for the relevant engagement. We are not liable for indirect or consequential damages."],
];

export default function Footer() {
  const [modal, setModal] = useState<null | "privacy" | "terms">(null);

  return (
    <footer className="relative border-t border-line bg-ink-900/70">
      {/* giant wordmark */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 md:pt-20">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <a href="#top" aria-label="Back to top" className="group block overflow-hidden">
              <span className="block font-display font-black tracking-[-0.04em] leading-[0.85] text-[clamp(3.4rem,12vw,10.5rem)] transition-transform duration-500 group-hover:-translate-y-1">
                KODLIC<span className="text-mint-400">.</span>
              </span>
            </a>
            <a
              href="#top"
              className="group hidden sm:flex flex-col items-center gap-2 pb-3 text-fog-400 hover:text-mint-300 transition-colors"
            >
              <span className="label-mono">top</span>
              <span className="w-10 h-10 border border-line flex items-center justify-center transition-all duration-300 group-hover:border-mint-400/60 group-hover:-translate-y-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V4" /><path d="m6 10 6-6 6 6" /></svg>
              </span>
            </a>
          </div>
        </Reveal>

        {/* columns */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 border-t border-line pt-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <span className="flex items-center gap-2.5">
              <LogoMark size={22} className="text-fog-100" />
              <span className="font-display font-extrabold text-lg">kodlic<span className="text-mint-400">.</span></span>
            </span>
            <p className="mt-4 text-fog-400 text-sm leading-relaxed max-w-xs">
              A technology studio building web, mobile, AI and custom software —
              from first commit to production scale.
            </p>
            <a href="mailto:hello@kodlic.dev" className="mt-5 inline-flex items-center gap-2.5 font-mono text-sm text-fog-200 hover:text-mint-300 transition-colors">
              <MailIcon size={16} className="text-mint-400" /> hello@kodlic.dev
            </a>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: GithubIcon, label: "GitHub", href: "https://github.com" },
                { icon: XSocialIcon, label: "X (Twitter)", href: "https://x.com" },
                { icon: LinkedInIcon, label: "LinkedIn", href: "https://www.linkedin.com" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-10 h-10 border border-line flex items-center justify-center text-fog-400 transition-all duration-300 hover:border-mint-400/60 hover:text-mint-300 hover:-translate-y-0.5"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <p className="label-mono mb-4">Navigate</p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-fog-300 hover:text-mint-300 transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer services">
            <p className="label-mono mb-4">Services</p>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href={`#svc-${s.id}`} className="text-sm text-fog-300 hover:text-mint-300 transition-colors">{s.title}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer legal">
            <p className="label-mono mb-4">Legal</p>
            <ul className="space-y-2.5">
              <li><button type="button" onClick={() => setModal("privacy")} className="text-sm text-fog-300 hover:text-mint-300 transition-colors">Privacy Policy</button></li>
              <li><button type="button" onClick={() => setModal("terms")} className="text-sm text-fog-300 hover:text-mint-300 transition-colors">Terms of Service</button></li>
            </ul>
          </nav>
        </div>

        {/* bottom bar */}
        <div className="mt-12 border-t border-line py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-fog-500">© 2026 Kodlic. All rights reserved.</p>
          <p className="font-mono text-xs text-fog-500 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-mint-400 pulse-dot" />
            all systems operational · built by Kodlic, obviously
          </p>
        </div>
      </div>

      {modal === "privacy" && (
        <LegalModal title="Privacy Policy" onClose={() => setModal(null)}>
          <p className="font-mono text-xs text-fog-500">Last updated — January 2026</p>
          {PRIVACY.map(([h, b]) => (
            <div key={h}><h4 className="font-display font-bold text-fog-100 mb-1.5">{h}</h4><p>{b}</p></div>
          ))}
        </LegalModal>
      )}
      {modal === "terms" && (
        <LegalModal title="Terms of Service" onClose={() => setModal(null)}>
          <p className="font-mono text-xs text-fog-500">Last updated — January 2026</p>
          {TERMS.map(([h, b]) => (
            <div key={h}><h4 className="font-display font-bold text-fog-100 mb-1.5">{h}</h4><p>{b}</p></div>
          ))}
        </LegalModal>
      )}
    </footer>
  );
}
