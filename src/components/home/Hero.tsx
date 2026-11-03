"use client";

import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import PhysicsPlayground, { type PhysicsItem } from "../PhysicsPlayground";
import InflatedHeading from "../InflatedHeading";
import JellyButton from "../JellyButton";
import ProductImage from "../ProductImage";
import { byName } from "@/data/products";

const drop: [string, number, number][] = [
  ["Golden Fantasy", 110, 230], ["Choco Boom", 110, 230], ["Vega", 110, 220], ["Super Choc", 110, 220],
  ["Creamica Cheesecake", 160, 140], ["Creamica Vanilla", 160, 140], ["Round Pie", 150, 150], ["Sandwich", 210, 130], ["French Vanilla", 180, 160],
];

export function ThirtySticker({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`} aria-label="Celebrating 30 years" role="img">
      <div className="relative h-full w-full">
        <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 h-full w-full drop-shadow-[0_10px_16px_rgba(42,26,60,0.2)]">
          <defs><path id="circ" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" /></defs>
          <circle cx="100" cy="100" r="96" fill="#fff" />
          <circle cx="100" cy="100" r="88" fill="#6A4CFF" />
          <text fill="#fff" fontSize="17" fontWeight="800" style={{ fontFamily: "var(--font-bricolage)" }}>
            <textPath href="#circ" textLength="448" lengthAdjust="spacing">30 YEARS · 1996 — 2026 · HAPPY BIRTHDAY ·</textPath>
          </text>
        </svg>
        <span className="absolute inset-0 grid place-items-center font-display text-[42%] font-extrabold leading-none text-butter" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>30</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const headline = useRef<HTMLDivElement>(null);
  const ctas = useRef<HTMLDivElement>(null);
  const items = useMemo<PhysicsItem[]>(
    () =>
      drop.map(([name, w, h]) => {
        const p = byName(name)!;
        return { id: p.slug, w, h, label: p.name, content: <ProductImage product={p} sizes="220px" priority /> };
      }),
    []
  );

  return (
    <section className="relative min-h-[max(100svh,820px)] overflow-hidden pb-48" data-flood="#FFFDFB" aria-label="Uzbekistan's favourite ice cream">
      {/* soft pastel blobs */}
      <div aria-hidden className="absolute -left-[10%] top-[8%] h-[46vw] w-[46vw] rounded-full bg-strawberry opacity-70 blur-[80px]" />
      <div aria-hidden className="absolute -right-[12%] top-[30%] h-[40vw] w-[40vw] rounded-full bg-lilac opacity-70 blur-[80px]" />
      <div aria-hidden className="absolute bottom-[-10%] left-[30%] h-[30vw] w-[30vw] rounded-full bg-butter opacity-80 blur-[80px]" />

      <ThirtySticker className="absolute right-3 top-[76px] z-30 h-20 w-20 md:right-12 md:top-28 md:h-40 md:w-40" />

      <div className="relative z-20 mx-auto flex max-w-[1400px] flex-col items-center px-4 pt-44 text-center md:pt-36">
        <div ref={headline} className="w-fit">
          <InflatedHeading
            as="h1"
            text="UZBEKISTAN'S FAVOURITE ICE CREAM."
            inflated
            color={["#FF4F7B", "#FF4F7B", "#6A4CFF"]}
            className="mx-auto max-w-[13ch] text-[clamp(30px,8.4vw,150px)] md:text-[clamp(52px,8.4vw,150px)] leading-[0.9] tracking-[-0.045em]"
          />
        </div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, type: "spring", stiffness: 120, damping: 16 }} className="mt-6 max-w-xl text-lg text-plum/80 md:text-xl">
          Thirty years of rich, creamy, made-with-the-finest-ingredients happiness. Since 1996.
        </motion.p>
        <div ref={ctas} className="mt-8 flex flex-wrap justify-center gap-3">
          <JellyButton href="/flavours" size="lg">Explore Flavours</JellyButton>
          <JellyButton href="/story" size="lg" variant="white">Our Story</JellyButton>
        </div>
        <p className="mt-5 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-plum/70 backdrop-blur">
          Psst… try throwing one. <span aria-hidden>🤾</span>
        </p>
      </div>

      <PhysicsPlayground items={items} obstacles={[headline, ctas]} startOnView={false} className="pointer-events-none !absolute inset-0 z-10" mobileCount={5} />
    </section>
  );
}
