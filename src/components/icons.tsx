import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 20, ...rest }: P) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...rest,
  };
}

export function LogoMark({ size = 26, ...rest }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...rest}>
      <path d="M7.2 4.5 3 12l4.2 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.8 4.5 21 12l-4.2 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.6 7.5 10.4 16.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export const ArrowUpRight = (p: P) => (
  <svg {...base(p)}><path d="M7 17 17 7" /><path d="M9 7h8v8" /></svg>
);

export const ArrowRight = (p: P) => (
  <svg {...base(p)}><path d="M4 12h15" /><path d="m13 6 6 6-6 6" /></svg>
);

export const ArrowLeft = (p: P) => (
  <svg {...base(p)}><path d="M20 12H5" /><path d="m11 18-6-6 6-6" /></svg>
);

export const CheckIcon = (p: P) => (
  <svg {...base(p)}><path d="m4.5 12.5 5 5L19.5 6.5" /></svg>
);

export const DrawCheck = (p: P) => (
  <svg {...base(p)} strokeWidth={2.2}><path className="draw-check" d="m4.5 12.5 5 5L19.5 6.5" /></svg>
);

export const MenuIcon = (p: P) => (
  <svg {...base(p)}><path d="M3 8h18" /><path d="M7 16h14" /></svg>
);

export const CloseIcon = (p: P) => (
  <svg {...base(p)}><path d="m5.5 5.5 13 13" /><path d="m18.5 5.5-13 13" /></svg>
);

export const Diamond = ({ size = 10, ...rest }: P) => (
  <svg width={size} height={size} viewBox="0 0 10 10" fill="currentColor" {...rest}>
    <rect x="2.2" y="2.2" width="5.6" height="5.6" transform="rotate(45 5 5)" />
  </svg>
);

export const Asterisk = ({ size = 16, ...rest }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...rest}>
    <path d="M12 3v18" /><path d="m4.2 7.5 15.6 9" /><path d="m19.8 7.5-15.6 9" />
  </svg>
);

/* ---------- service glyphs ---------- */

export const GlyphMobile = (p: P) => (
  <svg {...base(p)}>
    <rect x="7.5" y="2.5" width="9" height="19" rx="2" />
    <path d="M10.8 18.4h2.4" /><path d="M11 6h2" />
  </svg>
);

export const GlyphFrontend = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
    <path d="M3 9h18" /><path d="M6.2 6.75h.01M8.8 6.75h.01" />
    <path d="m10 12.5-2 2 2 2" /><path d="m14 12.5 2 2-2 2" />
  </svg>
);

export const GlyphBackend = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="17" height="7" rx="1.2" />
    <rect x="3.5" y="13.5" width="17" height="7" rx="1.2" />
    <path d="M6.8 7h.01M6.8 17h.01" /><path d="M14 7h3.4M14 17h3.4" />
  </svg>
);

export const GlyphApi = (p: P) => (
  <svg {...base(p)}>
    <circle cx="5.5" cy="12" r="2.6" />
    <circle cx="18.5" cy="5.5" r="2.6" />
    <circle cx="18.5" cy="18.5" r="2.6" />
    <path d="m7.9 10.8 8.2-4.1" /><path d="m7.9 13.2 8.2 4.1" />
  </svg>
);

export const GlyphCommerce = (p: P) => (
  <svg {...base(p)}>
    <path d="M3.5 4h2.2l2.2 11.2a1.6 1.6 0 0 0 1.6 1.3h7.4a1.6 1.6 0 0 0 1.6-1.3L20.5 8H6.3" />
    <circle cx="10" cy="20" r="1.3" /><circle cx="16.5" cy="20" r="1.3" />
  </svg>
);

/* ---------- solution glyphs ---------- */

export const GlyphLayers = (p: P) => (
  <svg {...base(p)}>
    <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
    <path d="m3.5 12 8.5 4.5 8.5-4.5" /><path d="m3.5 16.5 8.5 4.5 8.5-4.5" />
  </svg>
);

export const GlyphCoin = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 6.8v10.4" />
    <path d="M14.8 9c-.7-1.1-5.6-1.4-5.6.7 0 2.4 5.6 1.5 5.6 4 0 2.1-5.1 2-5.9.5" />
  </svg>
);

export const GlyphBrowser = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="16" rx="1.5" />
    <path d="M3 8.5h18" /><path d="M12 8.5V20" />
    <path d="m6 13 1.7 1.7L6 16.4" /><path d="M15 14.5h3" /><path d="M15 17h2" />
  </svg>
);

export const GlyphSpark = (p: P) => (
  <svg {...base(p)}>
    <path d="M11 3.5c.5 3.3 2.1 5.5 5.6 6-3.5.8-5.1 2.8-5.6 5.9-.5-3.1-2.1-5.1-5.6-5.9 3.5-.5 5.1-2.7 5.6-6Z" />
    <path d="M18.2 14.2c.3 1.9 1.2 3.1 3.2 3.4-2 .5-2.9 1.7-3.2 3.4-.3-1.7-1.2-2.9-3.2-3.4 2-.3 2.9-1.5 3.2-3.4Z" />
    <path d="M6.5 16.5c.2 1.3.8 2.1 2.2 2.3-1.4.4-2 1.2-2.2 2.4-.2-1.2-.8-2-2.2-2.4 1.4-.2 2-1 2.2-2.3Z" />
  </svg>
);

export const GlyphBars = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 20v-7" /><path d="M10 20V5" /><path d="M15 20v-10" /><path d="M20 20v-5" />
    <path d="M3 20h18" />
  </svg>
);

export const GlyphShield = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3 5 5.7v5.5c0 4.4 2.9 7.6 7 9.3 4.1-1.7 7-4.9 7-9.3V5.7L12 3Z" />
    <path d="m9 11.6 2.2 2.2 4-4.6" />
  </svg>
);

/* ---------- socials ---------- */

export const GithubIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const XSocialIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 3.5h4.7L20 20.5h-4.7L4 3.5Z" />
    <path d="M19.6 3.5 13.7 9.7" /><path d="m4.4 20.5 6-6.3" />
  </svg>
);

export const LinkedInIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);

export const MailIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const SunIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
  </svg>
);

export const MoonIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </svg>
);

export const SpinnerIcon = ({ size = 18, ...rest }: P) => (
  <svg className="spin-slow" width={size} height={size} viewBox="0 0 24 24" fill="none" {...rest}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.4" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
);
