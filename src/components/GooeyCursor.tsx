"use client";

import { useEffect, useRef, useState } from "react";

type Mode = "default" | "grab" | "link" | "button";

// Desktop-only jelly cursor. A Berry Punch blob follows with springy lag, stretches
// along its velocity, and melts (metaball goo) into a ghost blob parked on hovered buttons.
export default function GooeyCursor() {
  const blob = useRef<HTMLDivElement>(null);
  const anchor = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("default");
  const [on, setOn] = useState(false);

  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setOn(true);
    document.documentElement.classList.add("has-goo");

    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const pos = { ...target };
    const vel = { x: 0, y: 0 };
    let hoverEl: HTMLElement | null = null;
    let currentMode: Mode = "default";
    let scale = 1;
    let raf = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) { visible = true; blob.current!.style.opacity = "1"; }
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, [role=button], input, textarea, select, label");
      let m: Mode = "default";
      if (el) {
        const d = el.dataset.cursor;
        if (d === "grab") m = "grab";
        else if (d === "button" || el.tagName === "BUTTON" || el.getAttribute("role") === "button") m = "button";
        else if (el.tagName === "A" || d === "link") m = "link";
      }
      hoverEl = m === "button" ? el : null;
      if (m !== currentMode) { currentMode = m; setMode(m); }
    };
    const onLeave = () => { visible = false; blob.current!.style.opacity = "0"; };

    const tick = () => {
      // critically-underdamped spring for that jelly lag
      const k = 0.18, d = 0.62;
      vel.x = (vel.x + (target.x - pos.x) * k) * d;
      vel.y = (vel.y + (target.y - pos.y) * k) * d;
      pos.x += vel.x;
      pos.y += vel.y;
      const speed = Math.min(Math.hypot(vel.x, vel.y), 40);
      const angle = Math.atan2(vel.y, vel.x);
      const wanted = currentMode === "grab" ? 4.2 : currentMode === "link" ? 0.3 : currentMode === "button" ? 1.9 : 1;
      scale += (wanted - scale) * 0.18;
      const stretch = 1 + speed / 60;
      if (blob.current) {
        blob.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) rotate(${angle}rad) scale(${scale * stretch}, ${scale / stretch})`;
      }
      if (label.current) label.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      if (anchor.current) {
        if (hoverEl) {
          const r = hoverEl.getBoundingClientRect();
          anchor.current.style.opacity = "1";
          anchor.current.style.transform = `translate3d(${r.left + r.width / 2}px, ${r.top + r.height / 2}px, 0) scale(${Math.min(r.width, 220) / 40}, ${Math.min(r.height, 80) / 40})`;
        } else anchor.current.style.opacity = "0";
      }
      raf = requestAnimationFrame(tick);
    };

    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-goo");
    };
  }, []);

  if (!on) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9997]">
      <svg className="absolute h-0 w-0">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="b" />
          <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="g" />
          <feComposite in="SourceGraphic" in2="g" operator="atop" />
        </filter>
      </svg>
      <div className="absolute inset-0" style={{ filter: "url(#goo)", opacity: mode === "button" ? 0.32 : 0.92, transition: "opacity .25s" }}>
        <div ref={anchor} className="absolute left-[-20px] top-[-20px] h-10 w-10 rounded-full bg-berry opacity-0 transition-opacity duration-200" />
        <div ref={blob} className="absolute left-[-9px] top-[-9px] h-[18px] w-[18px] rounded-full bg-berry opacity-0" />
      </div>
      <div ref={label} className="absolute left-0 top-0">
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[13px] font-bold text-white transition-all duration-300"
          style={{ opacity: mode === "grab" || mode === "link" ? 1 : 0, scale: mode === "grab" || mode === "link" ? "1" : "0.4" }}
        >
          {mode === "grab" ? "Grab me" : <span className="block text-[28px] leading-none text-berry drop-shadow-[0_2px_4px_rgba(255,79,123,0.4)]">♥</span>}
        </span>
      </div>
    </div>
  );
}
