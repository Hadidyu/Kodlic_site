import type { ReactNode, CSSProperties } from "react";
import { useInView } from "../hooks";
import { ArrowRight, ArrowUpRight } from "./icons";

export function Reveal({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}

export function SectionHead({
  no,
  label,
  title,
  desc,
  right,
}: {
  no: string;
  label: string;
  title: ReactNode;
  desc?: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <div className="flex items-center gap-4 mb-6">
          <span className="label-mono text-mint-400">[ {no} — {label} ]</span>
          <span className="h-px flex-1 bg-line hidden sm:block" />
        </div>
      </Reveal>
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <Reveal delay={80}>
          <h2 className="font-display font-extrabold tracking-[-0.03em] leading-[1.02] text-[clamp(2rem,4.6vw,3.9rem)] max-w-3xl">
            {title}
          </h2>
        </Reveal>
        {desc && (
          <Reveal delay={160} className="lg:max-w-sm">
            <p className="text-fog-400 leading-relaxed">{desc}</p>
          </Reveal>
        )}
        {right}
      </div>
    </div>
  );
}

export function Corners({ color = "border-mint-400/50" }: { color?: string }) {
  const c = `absolute w-3 h-3 border-current ${color}`;
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      <span className={`${c} top-0 left-0 border-t border-l`} />
      <span className={`${c} top-0 right-0 border-t border-r`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}

export function BtnPrimary({
  href,
  children,
  onClick,
  className = "",
}: {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const cls = `group inline-flex items-center gap-2.5 bg-mint-400 text-ink-950 font-display font-bold tracking-tight px-7 py-4 text-[15px] transition-all duration-300 hover:bg-mint-300 hover:shadow-[0_0_36px_color-mix(in_srgb,var(--color-mint-400)_28%,transparent)] active:scale-[0.98] ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );
  return href ? (
    <a href={href} className={cls} onClick={onClick}>{inner}</a>
  ) : (
    <button type="button" className={cls} onClick={onClick}>{inner}</button>
  );
}

export function BtnGhost({
  href,
  children,
  onClick,
  className = "",
  external = false,
}: {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  external?: boolean;
}) {
  const cls = `group inline-flex items-center gap-2.5 border border-line text-fog-200 font-display font-bold tracking-tight px-7 py-4 text-[15px] transition-all duration-300 hover:border-mint-400/60 hover:text-mint-300 hover:bg-mint-400/5 active:scale-[0.98] ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );
  return href ? (
    <a href={href} className={cls} onClick={onClick} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      {inner}
    </a>
  ) : (
    <button type="button" className={cls} onClick={onClick}>{inner}</button>
  );
}
