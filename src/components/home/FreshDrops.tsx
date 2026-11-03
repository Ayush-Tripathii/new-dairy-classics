"use client";

import { motion } from "framer-motion";
import ProductImage from "../ProductImage";
import TLink from "../TLink";
import { productHref, products } from "@/data/products";

const drops = products.filter((p) => p.isNew);
const colors = ["#FFD9E1", "#FFDCC8", "#E7DEFF", "#CDF2E2", "#FFF0B5"];

export default function FreshDrops() {
  return (
    <section className="relative overflow-hidden px-4 py-28 md:px-8 md:py-36" data-flood="#FFFDFB" aria-labelledby="drops-title">
      {/* diagonal ticker tape */}
      <div aria-hidden className="pointer-events-none absolute left-[-10%] top-1/2 w-[120%] -translate-y-1/2 -rotate-[8deg] bg-berry py-3">
        <div className="ticker flex w-max whitespace-nowrap font-display text-2xl font-extrabold tracking-wide text-white md:text-4xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k}>{Array.from({ length: 12 }).map(() => "NEW DROP · ").join("")}</span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
          <h2 id="drops-title" className="font-display text-big font-extrabold">Fresh Drops</h2>
          <p className="max-w-sm text-lg text-plum/75">Five brand-new sticks. Limited patience required — they won&apos;t last long in your freezer.</p>
        </div>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {drops.map((p, i) => (
            <motion.li
              key={p.slug}
              initial={{ opacity: 0, y: 60, rotate: i % 2 ? 6 : -6 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 220, damping: 16 }}
              className="group h-[340px] [perspective:1200px] md:h-[380px]"
            >
              <TLink href={productHref(p)} className="relative block h-full w-full rounded-[36px] transition-transform duration-700 [transform-style:preserve-3d] [transition-timing-function:cubic-bezier(.34,1.4,.64,1)] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
                <div className="sticker absolute inset-0 flex flex-col rounded-[36px] p-4 [backface-visibility:hidden]" style={{ background: colors[i] }}>
                  <span className="new-badge absolute -right-2 -top-2 z-10 grid h-14 w-14 rotate-12 place-items-center rounded-full bg-grape font-display text-sm font-extrabold text-white shadow-lg">NEW</span>
                  <div className="relative flex-1"><ProductImage product={p} sizes="240px" /></div>
                  <p className="font-display text-2xl font-extrabold">{p.name}</p>
                  <p className="text-xs font-semibold uppercase tracking-widest text-plum/50">Drop {String(i + 1).padStart(2, "0")}</p>
                </div>
                <div className="sticker absolute inset-0 flex flex-col justify-between rounded-[36px] bg-white p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <p className="font-display text-2xl font-extrabold">{p.name}</p>
                  <p className="text-plum/80">{p.description ?? "[CLIENT TO PROVIDE DESCRIPTION]"}</p>
                  <span className="font-semibold text-berry">View flavour →</span>
                </div>
              </TLink>
            </motion.li>
          ))}
        </ul>
      </div>
      <style>{`@keyframes nb{0%,100%{transform:rotate(12deg) translateY(0) scale(1)}40%{transform:rotate(-4deg) translateY(-8px) scale(1.08,.94)}60%{transform:rotate(14deg) translateY(0) scale(.96,1.06)}}.new-badge{animation:nb 1.8s cubic-bezier(.34,1.56,.64,1) infinite}`}</style>
    </section>
  );
}
