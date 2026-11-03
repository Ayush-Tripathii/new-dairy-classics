"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, wa } from "@/data/site";

// Simplified Uzbekistan outline (lon/lat projected into a 1000×600 box).
const outline = "M0,42 L151,0 L290,84 L348,147 L516,133 L568,189 L609,252 L696,329 L754,294 L835,252 L870,287 L992,336 L928,371 L870,385 L783,392 L731,427 L696,497 L667,588 L609,574 L615,532 L522,490 L464,455 L377,406 L290,308 L232,301 L238,252 L145,217 L58,301 L0,301 Z";
const cities = [
  { name: "Tashkent", x: 768, y: 301, dome: "#6A4CFF" },
  { name: "Samarkand", x: 636, y: 416, dome: "#FF4F7B" },
];
const route = "M636,416 C670,350 712,330 768,301 C735,372 700,420 636,416 Z";

export default function UzMap() {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <div className="relative mx-auto mb-6 aspect-[10/6.4] w-full max-w-[920px]" style={{ perspective: 1600 }}>
      <div className="absolute inset-0" style={{ transform: "rotateX(30deg) rotateZ(-4deg) scale(0.9)", transformStyle: "preserve-3d" }}>
        <svg viewBox="-20 -20 1040 640" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="land" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E5FAF0" /><stop offset="1" stopColor="#B8EBD3" /></linearGradient>
          </defs>
          {/* clay thickness */}
          {[28, 21, 14, 7].map((d) => (
            <path key={d} d={outline} transform={`translate(0 ${d})`} fill="#8FD9B6" opacity={0.35 + (28 - d) / 60} strokeLinejoin="round" stroke="#8FD9B6" strokeWidth="18" />
          ))}
          <path d={outline} fill="url(#land)" stroke="#fff" strokeWidth="18" strokeLinejoin="round" />
          <path d={route} fill="none" stroke="#FF4F7B" strokeWidth="6" strokeDasharray="2 16" strokeLinecap="round" opacity=".7" />
          {/* delivery van */}
          <g className="motion-reduce:hidden">
            <g>
              <animateMotion dur="7s" repeatCount="indefinite" path={route} rotate="auto" />
              <g transform="scale(1.9) translate(-26 -18)">
                <rect x="0" y="4" width="40" height="24" rx="7" fill="#fff" stroke="#2A1A3C" strokeOpacity=".1" />
                <rect x="34" y="10" width="18" height="18" rx="6" fill="#FFD9E1" />
                <rect x="38" y="13" width="9" height="7" rx="2" fill="#D5E9FF" />
                <circle cx="20" cy="15" r="7" fill="#FF4F7B" />
                <circle cx="11" cy="30" r="5" fill="#2A1A3C" /><circle cx="40" cy="30" r="5" fill="#2A1A3C" />
              </g>
            </g>
          </g>
        </svg>

        {cities.map((c) => (
          <div key={c.name} className="absolute" style={{ left: `${((c.x + 20) / 1040) * 100}%`, top: `${((c.y + 20) / 640) * 100}%`, transformStyle: "preserve-3d" }}>
            <div style={{ transform: "rotateZ(4deg) rotateX(-30deg)", transformOrigin: "bottom center" }} className="relative -translate-x-1/2 -translate-y-full">
              <button
                onMouseEnter={() => setHover(c.name)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(c.name)}
                onBlur={() => setHover(null)}
                onClick={() => setHover((h) => (h === c.name ? null : c.name))}
                aria-label={`${c.name} — show WhatsApp`}
                className="flex flex-col items-center"
                data-cursor="button"
              >
                {/* tiny clay landmark: dome + tower */}
                <svg viewBox="0 0 60 70" className="h-16 w-14 drop-shadow-[0_8px_8px_rgba(42,26,60,0.2)] md:h-20 md:w-16">
                  <rect x="40" y="10" width="8" height="50" rx="4" fill="#fff" />
                  <circle cx="44" cy="10" r="5" fill={c.dome} />
                  <rect x="6" y="36" width="34" height="24" rx="6" fill="#fff" />
                  <path d="M8 38a15 15 0 0 1 30 0Z" fill={c.dome} />
                  <ellipse cx="18" cy="30" rx="4" ry="2.4" fill="#fff" opacity=".6" />
                </svg>
                <span className="mt-1 rounded-full bg-plum px-3 py-1 font-display text-sm font-bold text-white">{c.name}</span>
              </button>
              <AnimatePresence>
                {hover === c.name && (
                  <motion.a
                    href={wa(site.whatsapp.find((w) => w.city === c.name)!.number)}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.5, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: 6 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    onMouseEnter={() => setHover(c.name)}
                    className="clay absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded-[22px] rounded-bl-md px-4 py-3 text-left"
                  >
                    <span className="block text-xs font-semibold uppercase tracking-wide text-plum/60">WhatsApp · {c.name}</span>
                    <span className="font-display text-lg font-bold">{site.whatsapp.find((w) => w.city === c.name)!.number}</span>
                  </motion.a>
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
