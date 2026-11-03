"use client";

import { motion } from "framer-motion";
import StickerCard from "../StickerCard";
import InflatedHeading from "../InflatedHeading";

const stickers = [
  { big: "Since 1996", small: "Est.", hidden: "Delighting taste buds for 30 years and counting.", color: "#FFF0B5", rot: -6 },
  { big: "80,000 L", small: "a day", hidden: "Daily capacity at our modernised plant.", color: "#CDF2E2", rot: 4 },
  { big: "#1", small: "Consumer Choice", hidden: "Awarded #1 choice by our consumers.", color: "#FFD9E1", rot: -3 },
  { big: "Healthy Living", small: "Our motto", hidden: "Our motto from the very beginning.", color: "#D5E9FF", rot: 5 },
  { big: "Natural", small: "Ingredients", hidden: "Only the finest, natural ingredients.", color: "#FFDCC8", rot: -4 },
  { big: "30 Years", small: "Young", hidden: "1996 → 2026. Happy birthday to us!", color: "#E7DEFF", rot: 3 },
];

export default function StickerBoard() {
  return (
    <section className="relative px-4 py-28 md:px-8 md:py-40" data-flood="#FFF0B5" aria-label="We Are Dairy Classic">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <InflatedHeading as="h2" text="We Are Dairy Classic" className="text-huge" />
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-plum/80 md:text-xl">
            Since 1996, Dairy Classic has been crafting delicious ice creams with the finest ingredients. Our commitment to quality ensures every bite is rich, creamy, and satisfying. From timeless classics to exciting new treats, we bring joy to every moment. Because for us, great taste isn&apos;t just a promise — it&apos;s a tradition.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {stickers.map((s, i) => (
            <motion.li
              key={s.big}
              initial={{ opacity: 0, scale: 1.6, y: -40, rotate: s.rot * 4 }}
              whileInView={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 380, damping: 14, mass: 0.8 }}
            >
              <StickerCard color={s.color} rotate={s.rot} hidden={s.hidden} className="aspect-square">
                <div className="flex h-full flex-col justify-center p-5">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-plum/60">{s.small}</span>
                  <span className="font-display text-[clamp(22px,2.8vw,40px)] font-extrabold leading-[0.95] tracking-tight">{s.big}</span>
                </div>
              </StickerCard>
            </motion.li>
          ))}
        </ul>
      </div>
      <p className="mx-auto mt-10 max-w-[1400px] text-sm text-plum/60">Hover or focus a sticker to peel it.</p>
    </section>
  );
}
