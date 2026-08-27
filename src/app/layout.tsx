import type { Metadata } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "../index.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans-custom",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono-custom",
  display: "swap",
});

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
    <html lang="en" className="dark">
      <body className={`${archivo.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
