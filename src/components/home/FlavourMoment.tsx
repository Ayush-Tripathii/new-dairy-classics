"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import PhysicsPlayground, { type PhysicsItem } from "../PhysicsPlayground";
import ProductImage from "../ProductImage";
import InflatedHeading from "../InflatedHeading";
import JellyButton from "../JellyButton";
import { byName, getCategory, ingredientInfo, productHref, type Ingredient } from "@/data/products";

const slides: { name: string; bits: Ingredient[] }[] = [
  { name: "Golden Fantasy", bits: ["peanuts", "peanuts", "peanuts", "chocolate", "wafer", "peanuts"] },
  { name: "Super Twist", bits: ["raspberry", "raspberry", "raspberry", "chocolate", "wafer", "raspberry"] },
  { name: "Round Pie", bits: ["cookies", "cookies", "chocolate", "cookies", "chocolate", "cookies"] },
  { name: "Creamica Cheesecake", bits: ["blueberry", "blueberry", "blueberry", "blueberry", "blueberry", "blueberry"] },
  { name: "Classic Cassatta", bits: ["peanuts", "peanuts", "peanuts", "peanuts", "peanuts", "peanuts"] },
];

function Slide({ name, bits, index }: { name: string; bits: Ingredient[]; index: number }) {
  const p = byName(name)!;
  const cat = getCategory(p.category)!;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 150, damping: 14 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 150, damping: 14 });

  const items = useMemo<PhysicsItem[]>(
    () =>
      bits.flatMap((b, i) =>
        [0, 1].map((k) => ({
          id: `${b}-${i}-${k}`,
          w: 64,
          h: 64,
          shape: "circle" as const,
          label: ingredientInfo[b].label,
          content: (
            <span className="clay grid h-full w-full place-items-center rounded-full text-3xl" style={{ background: ingredientInfo[b].color }}>
              {ingredientInfo[b].emoji}
            </span>
          ),
        }))
      ),
    [bits]
  );

  return (
    <section
      className="relative flex min-h-[100svh] snap-start items-center overflow-hidden px-4 py-24 md:px-8"
      data-flood={cat.color}
      aria-label={`Flavour of the moment: ${p.name}`}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
    >
      <PhysicsPlayground items={items} repel tilt={false} mobileCount={6} stagger={90} className="pointer-events-none !absolute inset-0" />
      <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-center gap-6 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <p className="font-display text-lg font-bold text-plum/60">Flavour of the Moment · {String(index + 1).padStart(2, "0")}/05</p>
          <InflatedHeading as="h3" text={p.name} inflated color={index % 2 ? "#6A4CFF" : "#FF4F7B"} className="text-huge mt-2" />
          <p className="mt-6 max-w-md text-lg text-plum/80 md:text-xl">{p.description}</p>
          <div className="mt-8"><JellyButton href={productHref(p)} variant="white">Get the scoop →</JellyButton></div>
        </div>
        <div className="order-1 md:order-2" style={{ perspective: 1000 }}>
          <div className="bob relative mx-auto aspect-square w-[min(80vw,520px)]" style={{ transformStyle: "preserve-3d" }}>
            <motion.div style={{ rotateX: rx, rotateY: ry }} className="h-full w-full">
              <ProductImage product={p} sizes="(max-width: 768px) 80vw, 520px" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FlavourMoment() {
  const ref = useRef<HTMLDivElement>(null);
  // gentle scroll-snap only while these slides are on screen
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      document.documentElement.style.scrollSnapType = e.isIntersecting && !matchMedia("(prefers-reduced-motion: reduce)").matches ? "y proximity" : "";
    }, { threshold: 0.15 });
    if (ref.current) io.observe(ref.current);
    return () => { io.disconnect(); document.documentElement.style.scrollSnapType = ""; };
  }, []);

  return (
    <div ref={ref}>
      {slides.map((s, i) => <Slide key={s.name} {...s} index={i} />)}
    </div>
  );
}
