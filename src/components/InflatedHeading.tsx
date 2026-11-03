"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

interface Props {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /** puffy 3D balloon letters (true) or flat elastic display type (false) */
  inflated?: boolean;
  /** letter colour for inflated mode; can be an array to cycle */
  color?: string | string[];
  breathe?: boolean;
  /** weight swell near the cursor */
  weightFollow?: boolean;
}

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// Elastic heading: each letter jiggles independently as the cursor passes and the
// weight swells near the pointer. In inflated mode the letters are puffy balloons that
// gently breathe and squish under the cursor.
export default function InflatedHeading({ text, as: Tag = "h2", className = "", inflated = false, color, breathe = inflated, weightFollow = !inflated }: Props) {
  const root = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || reduced() || !matchMedia("(hover: hover)").matches) return;
    const letters = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-l]"));
    const busy = new WeakSet<Element>();

    const jiggle = (l: HTMLSpanElement) => {
      if (busy.has(l)) return;
      busy.add(l);
      const kf = inflated
        ? { scaleX: [1, 1.18, 0.92, 1.05, 1], scaleY: [1, 0.78, 1.1, 0.97, 1] }
        : { rotate: [0, -10, 7, -3, 0], y: [0, -10, 3, 0] };
      animate(l, kf, { duration: 0.7, ease: [0.22, 1, 0.36, 1] }).then(() => busy.delete(l));
    };

    let rects: DOMRect[] = [];
    const measure = () => (rects = letters.map((l) => l.getBoundingClientRect()));
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        if (!rects.length) measure();
        letters.forEach((l, i) => {
          const r = rects[i];
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          const d = Math.hypot(dx, dy);
          if (d < r.width * 0.6 && d < 90) jiggle(l);
          if (weightFollow) {
            const w = Math.round(500 + 300 * Math.max(0, 1 - d / 220));
            l.style.fontVariationSettings = `"wght" ${w}`;
          }
        });
      });
    };
    const onLeave = () => { if (weightFollow) letters.forEach((l) => (l.style.fontVariationSettings = "")); rects = []; };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    addEventListener("scroll", onLeave, { passive: true });
    addEventListener("resize", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      removeEventListener("scroll", onLeave);
      removeEventListener("resize", onLeave);
    };
  }, [inflated, weightFollow, text]);

  const colors = Array.isArray(color) ? color : color ? [color] : undefined;
  let n = 0;

  return (
    <Tag ref={root} aria-label={text} className={`font-display ${inflated ? "inflated font-extrabold" : "font-bold"} ${className}`}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} aria-hidden className="inline-block whitespace-nowrap">
          {Array.from(word).map((ch, ci) => {
            const c = colors?.[n++ % colors.length];
            return (
              <span key={ci} className={breathe ? "breathe inline-block" : "inline-block"} style={breathe ? { animationDelay: `${(n % 7) * -0.4}s` } : undefined}>
                <span data-l className="inline-block origin-bottom" style={c ? ({ "--puff": c } as React.CSSProperties) : undefined}>{ch}</span>
              </span>
            );
          })}
          {wi < text.split(" ").length - 1 && <span className="inline-block w-[0.28em]" />}
        </span>
      ))}
    </Tag>
  );
}
