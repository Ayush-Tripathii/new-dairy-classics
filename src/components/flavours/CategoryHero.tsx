"use client";

import { motion } from "framer-motion";
import InflatedHeading from "../InflatedHeading";
import ProductImage from "../ProductImage";
import type { Category, Product } from "@/data/products";

export default function CategoryHero({ category, heroes, count }: { category: Category; heroes: Product[]; count: number }) {
  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-32 md:px-8 md:pt-40" data-flood={category.color}>
      <div className="mx-auto grid max-w-[1400px] items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="font-display text-lg font-bold text-plum/60">{count} {category.countLabel}</p>
          <InflatedHeading as="h1" text={category.name} inflated color={["#FF4F7B", "#6A4CFF"]} className="text-mega" />
          <p className="mt-6 max-w-md text-xl text-plum/80 md:text-2xl">{category.intro}</p>
        </div>
        <div className="relative h-[300px] md:h-[420px]" aria-hidden>
          {heroes.slice(0, 3).map((p, i) => (
            <motion.div
              key={p.slug}
              className="absolute"
              style={{ left: `${[2, 34, 64][i]}%`, top: `${[16, 0, 22][i]}%`, width: "36%", height: "78%" }}
              initial={{ y: -300, rotate: [-20, 10, 24][i], opacity: 0 }}
              animate={{ y: 0, rotate: [-8, 3, 10][i], opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.12, type: "spring", stiffness: 160, damping: 11 }}
            >
              <div className="bob h-full w-full" style={{ animationDelay: `${i * -1.3}s` }}>
                <ProductImage product={p} sizes="300px" priority />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
