"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const numbers = [
  { value: 1996, label: "Where it all began", color: "#FFF0B5", format: (n: number) => String(n) },
  { value: 30, label: "Years of joy", color: "#FFD9E1", format: (n: number) => `${n}`, suffix: " yrs" },
  { value: 80000, label: "Litres a day", color: "#CDF2E2", format: (n: number) => n.toLocaleString("en-US"), suffix: " L" },
  { value: 44, label: "Products to love", color: "#E7DEFF", format: (n: number) => String(n) },
  { value: 1, label: "Consumer choice", color: "#D5E9FF", format: (n: number) => `#${n}` },
];

export function JellyNumber({ value, format, suffix = "", from = 0 }: { value: number; format: (n: number) => string; suffix?: string; from?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [n, setN] = useState(from);
  useEffect(() => {
    if (!inView) return;
    const c = animate(from, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value, from]);
  return (
    <span ref={ref} aria-label={format(value) + suffix}>
      <span aria-hidden>{format(n)}<span className="text-[0.45em]">{suffix}</span></span>
    </span>
  );
}

export default function BigNumbers() {
  return (
    <section className="px-4 py-28 md:px-8 md:py-36" data-flood="#FFFDFB" aria-label="Dairy Classic in numbers">
      <ul className="mx-auto grid max-w-[1400px] gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {numbers.map((n, i) => (
          <motion.li
            key={n.label}
            initial={{ y: 120, scaleY: 1.3, scaleX: 0.8, opacity: 0 }}
            whileInView={{ y: 0, scaleY: 1, scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 260, damping: 11 }}
            whileHover={{ scaleX: [1, 1.08, 0.96, 1.02, 1], scaleY: [1, 0.92, 1.05, 0.99, 1], transition: { duration: 0.6 } }}
            className={`clay flex min-h-[240px] flex-col justify-between rounded-[44px] p-7 ${i < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
            style={{ background: n.color }}
          >
            <span className="inflated font-display text-[clamp(56px,7vw,112px)] font-extrabold leading-none tabular-nums" style={{ "--puff": i % 2 ? "#6A4CFF" : "#FF4F7B" } as React.CSSProperties}>
              <JellyNumber value={n.value} format={n.format} suffix={n.suffix} from={n.value === 1996 ? 1900 : 0} />
            </span>
            <span className="text-lg font-semibold text-plum/75">{n.label}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
