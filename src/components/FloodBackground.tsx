"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// The page "changes flavour": any element with data-flood="#hex" that crosses the
// viewport centre floods the fixed backdrop with its pastel. Components can also
// dispatch a "dc:flood" CustomEvent to override (e.g. the 3D carousel).
export default function FloodBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const path = usePathname();

  useEffect(() => {
    let raf = 0;
    let override: string | null = null;
    let overrideEl: Element | null = null;
    const set = (c: string) => { if (ref.current && ref.current.style.backgroundColor !== c) ref.current.style.backgroundColor = c; };

    const check = () => {
      raf = 0;
      const mid = innerHeight / 2;
      let color = "#FFFDFB";
      let hit: Element | null = null;
      document.querySelectorAll<HTMLElement>("[data-flood]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) { color = el.dataset.flood!; hit = el; }
      });
      if (override && hit === overrideEl) color = override;
      set(color);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    const onFlood = (e: Event) => {
      const { color, el } = (e as CustomEvent<{ color: string | null; el: Element }>).detail;
      override = color;
      overrideEl = el;
      check();
    };

    check();
    const t = setTimeout(check, 300);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    addEventListener("dc:flood", onFlood);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      removeEventListener("dc:flood", onFlood);
    };
  }, [path]);

  return <div ref={ref} aria-hidden className="fixed inset-0 -z-10" style={{ backgroundColor: "#FFFDFB", transition: "background-color 0.9s cubic-bezier(.22,1,.36,1)" }} />;
}

export const flood = (el: Element, color: string | null) => dispatchEvent(new CustomEvent("dc:flood", { detail: { color, el } }));
