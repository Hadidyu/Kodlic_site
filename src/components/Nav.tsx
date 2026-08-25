import { useEffect, useState } from "react";
import { NAV_LINKS } from "../data";
import { LogoMark, MenuIcon, CloseIcon, ArrowRight } from "./icons";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ink-950/85 backdrop-blur-md border-b border-line/70"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-[72px] flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 group" aria-label="Kodlic home">
            <LogoMark size={26} className="text-fog-100 transition-colors duration-300 group-hover:text-mint-300" />
            <span className="font-display font-extrabold tracking-[-0.02em] text-xl">
              kodlic<span className="text-mint-400">.</span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="label-mono hover:text-mint-300 transition-colors duration-200 normal-case tracking-[0.18em]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#estimate"
              className="hidden sm:inline-flex items-center gap-2 bg-fog-100 text-ink-950 font-display font-bold text-sm px-5 py-2.5 transition-all duration-300 hover:bg-mint-400 hover:shadow-[0_0_28px_rgba(63,229,155,0.3)] active:scale-[0.97]"
            >
              Start a Project
              <ArrowRight size={15} />
            </a>
            <button
              type="button"
              className="lg:hidden p-2 text-fog-200 hover:text-mint-300 transition-colors"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-400 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-ink-950/97 backdrop-blur-lg" onClick={() => setOpen(false)} />
        <div className="relative h-full flex flex-col px-6 py-6">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2.5">
              <LogoMark size={24} className="text-fog-100" />
              <span className="font-display font-extrabold text-lg">kodlic<span className="text-mint-400">.</span></span>
            </span>
            <button
              type="button"
              className="p-2 text-fog-200 hover:text-mint-300 transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <CloseIcon size={24} />
            </button>
          </div>
          <nav className="mt-14 flex flex-col" aria-label="Mobile">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`border-b border-line/60 py-4 flex items-baseline gap-4 font-display font-extrabold text-3xl tracking-tight transition-all duration-500 hover:text-mint-300 hover:pl-2 ${
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              >
                <span className="label-mono text-mint-400">0{i + 1}</span>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <a
              href="#estimate"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 bg-mint-400 text-ink-950 font-display font-bold px-6 py-4"
            >
              Start a Project <ArrowRight size={16} />
            </a>
            <a href="mailto:hello@kodlic.dev" className="label-mono text-center hover:text-mint-300 transition-colors">
              hello@kodlic.dev
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
