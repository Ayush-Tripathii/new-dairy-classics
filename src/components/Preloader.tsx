"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { burst } from "@/lib/sprinkles";

// First-visit-only loader: glossy scoop bounces with squash & stretch while the
// percentage counts up, then pops into sprinkles. Hidden pre-paint by an inline
// script in <head> for returning visitors (html.dc-seen).
export default function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const scoop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document.documentElement.classList.contains("dc-seen")) { setDone(true); return; }
    document.documentElement.style.overflow = "hidden";
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduced ? 600 : 1900;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / total);
      setPct(Math.round((1 - Math.pow(1 - p, 2)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          const r = scoop.current?.getBoundingClientRect();
          if (r) burst(r.left + r.width / 2, r.top + r.height / 2, { count: 90, power: 16, gravity: 0.3 });
          setDone(true);
          document.documentElement.style.overflow = "";
          try { localStorage.setItem("dc-seen", "1"); } catch {}
        }, reduced ? 0 : 380);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          id="preloader"
          role="status"
          aria-label={`Loading ${pct}%`}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cloud"
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
        >
          <div className="relative h-56 w-40">
            <div ref={scoop} className="preloader-scoop absolute left-[calc(50%-56px)] top-0 h-28 w-28">
              <motion.div className="h-full w-full" exit={{ scale: 1.6, opacity: 0 }}>
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <defs>
                    <radialGradient id="pl-g" cx="35%" cy="30%" r="75%">
                      <stop offset="0" stopColor="#FFE4EA" />
                      <stop offset="0.45" stopColor="#FF9DB4" />
                      <stop offset="1" stopColor="#FF4F7B" />
                    </radialGradient>
                  </defs>
                  <circle cx="50" cy="50" r="46" fill="url(#pl-g)" />
                  <ellipse cx="36" cy="30" rx="14" ry="8" fill="#fff" opacity="0.7" transform="rotate(-25 36 30)" />
                  {[["#6A4CFF", 62, 40, 30], ["#FFF0B5", 30, 62, -20], ["#CDF2E2", 68, 66, 60], ["#D5E9FF", 48, 74, 10]].map(([c, x, y, r], i) => (
                    <rect key={i} x={(x as number) - 6} y={(y as number) - 2} width="12" height="4" rx="2" fill={c as string} transform={`rotate(${r} ${x} ${y})`} />
                  ))}
                </svg>
              </motion.div>
            </div>
            <div className="preloader-shadow absolute bottom-6 left-[calc(50%-48px)] h-4 w-24 rounded-full bg-plum/15 blur-[3px]" />
          </div>
          <p className="font-display text-6xl font-extrabold tabular-nums tracking-tight text-plum" aria-hidden>
            {pct}<span className="text-berry">%</span>
          </p>
          <p className="mt-2 text-sm text-plum/60">Scooping 30 years of joy…</p>
          <style>{`
            @keyframes pl-bounce {
              0% { transform: translateY(0) scale(1, 1); animation-timing-function: cubic-bezier(.5,0,.9,.5); }
              45% { transform: translateY(92px) scale(1, 1); }
              50% { transform: translateY(104px) scale(1.25, 0.72); animation-timing-function: cubic-bezier(.1,.5,.5,1); }
              58% { transform: translateY(84px) scale(0.9, 1.12); }
              100% { transform: translateY(0) scale(1, 1); }
            }
            @keyframes pl-shadow { 0%,100% { transform: scale(0.5); opacity: .4 } 50% { transform: scale(1.1); opacity: 1 } }
            .preloader-scoop { animation: pl-bounce 0.62s infinite; }
            .preloader-shadow { animation: pl-shadow 0.62s infinite; }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
