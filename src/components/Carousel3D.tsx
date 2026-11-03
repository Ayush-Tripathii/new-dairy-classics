"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform, AnimatePresence, type MotionValue } from "framer-motion";
import { categories, productsIn } from "@/data/products";
import ProductImage from "./ProductImage";
import JellyButton from "./JellyButton";
import { flood } from "./FloodBackground";
import { play } from "@/lib/sound";

const hero: Record<string, string> = { cones: "golden-fantasy", sticks: "super-choc", cups: "creamica-cheesecake", biscuit: "sandwich", tubs: "french-vanilla", cassatta: "classic-cassatta" };
const N = categories.length;
const STEP = 360 / N;

// "Pick Your Format": category discs on a rotating 3D cylinder. Drag with inertia,
// arrow keys or buttons to spin; the front disc floods the page with its pastel.
export default function Carousel3D() {
  const section = useRef<HTMLElement>(null);
  const rot = useMotionValue(0);
  const [front, setFront] = useState(0);
  const [radius, setRadius] = useState(420);
  const drag = useRef<{ x: number; r: number; v: number; t: number } | null>(null);

  useEffect(() => {
    const r = () => setRadius(innerWidth < 640 ? 210 : innerWidth < 1024 ? 320 : 430);
    r();
    addEventListener("resize", r);
    return () => removeEventListener("resize", r);
  }, []);

  useMotionValueEvent(rot, "change", (v) => {
    const i = (((Math.round(-v / STEP) % N) + N) % N);
    if (i !== front) { setFront(i); play("crunch"); }
  });

  useEffect(() => {
    if (section.current) flood(section.current, categories[front].color);
  }, [front]);

  const snapTo = (target: number) => animate(rot, target, { type: "spring", stiffness: 140, damping: 18 });
  const go = (d: number) => snapTo(Math.round(rot.get() / STEP) * STEP - d * STEP);

  const onDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    rot.stop();
    drag.current = { x: e.clientX, r: rot.get(), v: 0, t: performance.now() };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const now = performance.now();
    const next = d.r + (e.clientX - d.x) * 0.35;
    d.v = ((next - rot.get()) / Math.max(1, now - d.t)) * 1000;
    d.t = now;
    rot.set(next);
  };
  const onUp = () => {
    const d = drag.current;
    if (!d) return;
    drag.current = null;
    animate(rot, rot.get(), {
      type: "inertia",
      velocity: d.v,
      power: 0.35,
      timeConstant: 320,
      modifyTarget: (t) => Math.round(t / STEP) * STEP,
      bounceStiffness: 200,
      bounceDamping: 20,
    });
  };

  const c = categories[front];
  const count = productsIn(c.slug).length;

  return (
    <section ref={section} className="relative overflow-hidden px-4 py-28 md:py-36" data-flood="#FFFDFB" aria-roledescription="carousel" aria-label="Pick your format">
      <div className="mx-auto max-w-[1400px] text-center">
        <p className="font-display text-lg font-bold text-plum/60">Pick Your Format</p>
        <div className="relative h-[1.1em] text-mega font-display font-extrabold" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.h2
              key={c.slug}
              initial={{ y: "60%", opacity: 0, scaleY: 0.6 }}
              animate={{ y: 0, opacity: 1, scaleY: 1 }}
              exit={{ y: "-60%", opacity: 0, scaleY: 0.6 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="absolute inset-x-0"
            >
              {c.name}
            </motion.h2>
          </AnimatePresence>
        </div>
      </div>

      <div
        className="relative mx-auto mt-4 h-[300px] max-w-[1200px] cursor-grab touch-pan-y select-none active:cursor-grabbing md:h-[420px]"
        style={{ perspective: 1400 }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        tabIndex={0}
        aria-label="Format carousel. Use left and right arrow keys to spin."
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
          if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
        }}
      >
        <motion.div className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transformStyle: "preserve-3d", rotateY: rot, z: -radius }}>
          {categories.map((cat, i) => (
            <Disc key={cat.slug} i={i} rot={rot} radius={radius} color={cat.color} name={cat.name} slug={cat.slug} active={i === front} />
          ))}
        </motion.div>
      </div>

      <div className="mx-auto mt-6 flex max-w-[1400px] flex-col items-center gap-5">
        <p className="text-xl font-semibold text-plum/80">{count} {c.countLabel}</p>
        <div className="flex items-center gap-3">
          <button onClick={() => go(-1)} aria-label="Previous format" className="clay grid h-14 w-14 place-items-center rounded-full text-2xl" data-cursor="button">←</button>
          <JellyButton href={`/flavours/${c.slug}`} size="lg">See all {c.name.toLowerCase()}</JellyButton>
          <button onClick={() => go(1)} aria-label="Next format" className="clay grid h-14 w-14 place-items-center rounded-full text-2xl" data-cursor="button">→</button>
        </div>
      </div>
    </section>
  );
}

function Disc({ i, rot, radius, color, name, slug, active }: { i: number; rot: MotionValue<number>; radius: number; color: string; name: string; slug: string; active: boolean }) {
  // scale up as the disc approaches the front
  const scale = useTransform(rot, (r) => {
    const a = ((((i * STEP + r) % 360) + 540) % 360) - 180;
    return 0.75 + 0.35 * Math.max(0, Math.cos((a * Math.PI) / 180));
  });
  const p = productsIn(slug).find((x) => x.slug === hero[slug])!;
  return (
    <motion.div
      className="absolute left-[-110px] top-[-110px] h-[220px] w-[220px] md:left-[-150px] md:top-[-150px] md:h-[300px] md:w-[300px]"
      style={{ transform: `rotateY(${i * STEP}deg) translateZ(${radius}px)`, backfaceVisibility: "hidden" }}
      aria-hidden={!active}
    >
      <motion.div style={{ scale }} className="h-full w-full">
        <div
          className="relative grid h-full w-full place-items-center rounded-full"
          style={{ background: `radial-gradient(circle at 35% 28%, #fff 0%, ${color} 45%, color-mix(in srgb, ${color} 80%, #2A1A3C) 100%)`, boxShadow: `inset 0 6px 16px rgba(255,255,255,.9), inset 0 -16px 30px color-mix(in srgb, ${color} 60%, #2A1A3C 15%), 0 30px 50px -20px rgba(42,26,60,.35)` }}
        >
          <div className="pointer-events-none relative h-[72%] w-[72%]"><ProductImage product={p} sizes="300px" /></div>
          <span className="absolute bottom-[8%] rounded-full bg-white/80 px-3 py-1 font-display text-sm font-bold">{name}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
