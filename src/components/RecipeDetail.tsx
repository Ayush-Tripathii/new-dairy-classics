"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import InflatedHeading from "./InflatedHeading";
import TLink from "./TLink";
import ProductImage from "./ProductImage";
import { IMG_BASE, byName, getCategory, productHref } from "@/data/products";
import type { Recipe } from "@/data/content";
import { burst } from "@/lib/sprinkles";
import { play } from "@/lib/sound";

export default function RecipeDetail({ r }: { r: Recipe }) {
  const [done, setDone] = useState<boolean[]>(() => r.ingredients.map(() => false));
  const made = r.madeWith.map((n) => byName(n)).filter(Boolean) as NonNullable<ReturnType<typeof byName>>[];

  return (
    <>
      <section className="px-4 pb-16 pt-32 md:px-8 md:pt-40" data-flood={r.color}>
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-2">
          <div>
            <TLink href="/recipes" className="font-semibold text-plum/60 hover:text-berry">← All recipes</TLink>
            <InflatedHeading as="h1" text={r.title} className="text-huge mt-4" />
            <p className="mt-6 max-w-xl text-xl text-plum/80">{r.intro}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <motion.span animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }} transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }} className="sticker inline-block rounded-full bg-white px-5 py-2 font-display text-lg font-bold">⏱ {r.prep}</motion.span>
              <span className="sticker inline-block rounded-full bg-white px-5 py-2 font-display text-lg font-bold">🥤 {r.serves}</span>
            </div>
            {r.draft && <p className="mt-6 inline-block rounded-2xl bg-white/70 px-4 py-2 text-sm font-bold uppercase tracking-wide text-plum/60">[Draft – client to approve]</p>}
          </div>
          <div className="relative aspect-square w-full max-w-[520px] justify-self-center">
            <div className="absolute inset-[10%] rounded-full bg-white/60 blur-2xl" aria-hidden />
            {r.image && <div className="bob relative h-full w-full"><Image src={IMG_BASE + r.image} alt={r.title} fill priority sizes="520px" className="float-shadow object-contain" /></div>}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:px-8" data-flood="#FFFDFB">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-4xl font-extrabold">Ingredients</h2>
            <ul className="mt-6 space-y-3">
              {r.ingredients.map((ing, i) => (
                <li key={ing}>
                  <label className="clay flex cursor-pointer items-center gap-4 rounded-[24px] px-5 py-4">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={done[i]}
                      onChange={(e) => {
                        const next = [...done];
                        next[i] = !next[i];
                        setDone(next);
                        if (next[i]) {
                          play("pop");
                          const b = (e.currentTarget.nextElementSibling as HTMLElement).getBoundingClientRect();
                          burst(b.left + b.width / 2, b.top + b.height / 2, { count: 10, power: 5 });
                        }
                      }}
                    />
                    <motion.span
                      animate={done[i] ? { scale: [1, 1.4, 0.9, 1], backgroundColor: "#FF4F7B" } : { scale: 1, backgroundColor: "#ffffff" }}
                      transition={{ duration: 0.4 }}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-berry text-white peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-grape"
                    >
                      {done[i] && "✓"}
                    </motion.span>
                    <span className={`text-lg font-semibold transition-opacity ${done[i] ? "line-through opacity-50" : ""}`}>{ing}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-4xl font-extrabold">Steps</h2>
            <ol className="mt-6 space-y-4">
              {r.steps.map((s, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, type: "spring", stiffness: 240, damping: 20 }} className="flex gap-4 rounded-[28px] p-5" style={{ background: r.color }}>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white font-display text-2xl font-extrabold text-berry">{i + 1}</span>
                  <p className="pt-2 text-lg">{s}</p>
                </motion.li>
              ))}
            </ol>

            {made.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-2xl font-bold">Made with</h2>
                <ul className="mt-4 flex flex-wrap gap-4">
                  {made.map((p, i) => (
                    <li key={p.slug} style={{ rotate: `${i % 2 ? 3 : -3}deg` }}>
                      <TLink href={productHref(p)} className="sticker flex items-center gap-3 rounded-[28px] py-2 pl-2 pr-5 transition-transform hover:scale-105" style={{ background: getCategory(p.category)!.color }}>
                        <span className="relative h-16 w-16"><ProductImage product={p} sizes="64px" shadow={false} /></span>
                        <span className="font-display text-xl font-bold">{p.name}</span>
                      </TLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
