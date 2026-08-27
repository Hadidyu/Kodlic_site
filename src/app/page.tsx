import type { Metadata } from "next";
import Home from "../components/Home";

export const metadata: Metadata = {
  alternates: { canonical: "https://kodlic.dev/" },
};

/**
 * Homepage — server component.
 * The entire interactive marketing experience lives in the "use client"
 * boundary at components/Home.tsx.
 */
export default function Page() {
  return <Home />;
}
