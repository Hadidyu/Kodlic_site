import type { Metadata } from "next";
import { Science_Gothic, JetBrains_Mono } from "next/font/google";
import "../index.css";

const scienceGothic = Science_Gothic({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sg",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jbm",
  display: "swap",
});

/** Theme flash prevention — runs before first paint. */
const themeInit = `
(function () {
  try {
    var stored = localStorage.getItem("kodlic-theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://kodlic.dev"),
  title: {
    default: "Kodlic — We Build Software & Tech",
    template: "%s · Kodlic",
  },
  description:
    "Kodlic is a premium technology studio — web development, mobile apps, AI solutions, custom software and product development. Get a project estimate before you talk to anyone.",
  keywords: [
    "software agency", "web development", "mobile app development",
    "AI solutions", "SaaS development", "Shopify", "React", "Next.js",
  ],
  openGraph: {
    type: "website",
    url: "https://kodlic.dev",
    siteName: "Kodlic",
    title: "Kodlic — We Build Software & Tech",
    description:
      "Web, mobile, AI & custom software — engineered from first commit to production scale.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={`${scienceGothic.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
