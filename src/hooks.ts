import { useEffect, useRef, useState } from "react";

const RM_QUERY = "(prefers-reduced-motion: reduce)";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(
    () => typeof window !== "undefined" && window.matchMedia(RM_QUERY).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(RM_QUERY);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useInView<T extends Element>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#";

export function useScrambleRotate(words: string[], interval = 2600): string {
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(words[0] ?? "");
  const idxRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (words.length === 0) return;
    if (reduced) {
      const t = setInterval(() => {
        idxRef.current = (idxRef.current + 1) % words.length;
        setDisplay(words[idxRef.current]);
      }, interval);
      return () => clearInterval(t);
    }
    const scrambleTo = (word: string) => {
      let frame = 0;
      const total = 14;
      const tick = () => {
        frame += 1;
        const locked = Math.floor(word.length * (frame / total));
        let out = word.slice(0, locked);
        for (let i = locked; i < word.length; i += 1) {
          out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        setDisplay(out);
        if (frame < total) {
          timerRef.current = setTimeout(tick, 34);
        }
      };
      tick();
    };
    scrambleTo(words[0]);
    const t = setInterval(() => {
      idxRef.current = (idxRef.current + 1) % words.length;
      scrambleTo(words[idxRef.current]);
    }, interval);
    return () => {
      clearInterval(t);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [words, interval, reduced]);

  return display;
}

export function useCountUp(target: number, play: boolean, duration = 1400): number {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!play) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [play, target, duration, reduced]);
  return value;
}

export function saveLead(kind: "estimate" | "contact", payload: Record<string, unknown>) {
  try {
    const key = `kodlic-leads-${kind}`;
    const existing = JSON.parse(localStorage.getItem(key) ?? "[]") as unknown[];
    existing.push({ ...payload, at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing));
  } catch {
    /* storage unavailable — lead still acknowledged in UI */
  }
}

export function makeRefCode(): string {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `KD-${new Date().getFullYear()}-${n}`;
}
