"use client";

import { useRef } from "react";
import { animate, motion, useMotionValue, useSpring } from "framer-motion";
import ProductImage from "../ProductImage";
import InflatedHeading from "../InflatedHeading";
import JellyButton from "../JellyButton";
import TLink from "../TLink";
import { getCategory, ingredientInfo, productHref, type Product } from "@/data/products";

export default function ProductDetail({ p, related }: { p: Product; related: Product[] }) {
  const cat = getCategory(p.category)!;
  const spin = useMotionValue(0);
  const rotateY = useSpring(spin, { stiffness: 120, damping: 14 });
  const drag = useRef<{ x: number; s: number } | null>(null);

  return (
    <>
      <section className="relative px-4 pb-16 pt-32 md:px-8 md:pt-36" data-flood={cat.color}>
        <nav aria-label="Breadcrumb" className="mx-auto mb-6 max-w-[1400px] text-sm font-semibold text-plum/60">
          <TLink href="/flavours" className="hover:text-berry">Flavours</TLink> <span aria-hidden>/</span>{" "}
          <TLink href={`/flavours/${cat.slug}`} className="hover:text-berry">{cat.name}</TLink> <span aria-hidden>/</span>{" "}
          <span aria-current="page" className="text-plum">{p.name}</span>
        </nav>
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-2">
          <div
            className="relative mx-auto aspect-square w-[min(84vw,560px)] cursor-grab touch-pan-y select-none active:cursor-grabbing"
            style={{ perspective: 1000 }}
            onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); drag.current = { x: e.clientX, s: spin.get() }; }}
            onPointerMove={(e) => { if (drag.current) spin.set(drag.current.s + (e.clientX - drag.current.x) * 0.8); }}
            onPointerUp={() => { drag.current = null; animate(spin, Math.round(spin.get() / 360) * 360, { type: "spring", stiffness: 60, damping: 12 }); }}
            data-cursor="grab"
            role="img"
            aria-label={`${p.name}. Drag to spin.`}
          >
            <div className="absolute inset-[12%] rounded-full bg-white/60 blur-2xl" aria-hidden />
            <div className="bob h-full w-full">
              <motion.div style={{ rotateY }} className="h-full w-full">
                <ProductImage product={p} sizes="(max-width: 768px) 84vw, 560px" priority />
              </motion.div>
            </div>
          </div>

          <div>
            {p.isNew && <span className="mb-3 inline-block rotate-[-4deg] rounded-full bg-grape px-4 py-1.5 font-display font-extrabold text-white">NEW</span>}
            <InflatedHeading as="h1" text={p.name} className="text-huge" />
            {p.format && <p className="mt-3 inline-block rounded-full bg-white px-4 py-1.5 font-semibold">{p.format}</p>}
            <p className="mt-6 max-w-xl text-xl leading-relaxed text-plum/85">{p.description ?? "[CLIENT TO PROVIDE DESCRIPTION]"}</p>

            {p.inside.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-3 font-display text-xl font-bold">What&apos;s inside</h2>
                <ul className="flex flex-wrap gap-3">
                  {p.inside.map((i, k) => (
                    <motion.li
                      key={i}
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: k % 2 ? 4 : -4 }}
                      whileHover={{ rotate: 0, scale: 1.1 }}
                      transition={{ delay: 0.3 + k * 0.07, type: "spring", stiffness: 500, damping: 14 }}
                      className="sticker flex items-center gap-2 rounded-full px-4 py-2 font-semibold"
                      style={{ background: ingredientInfo[i].color === "#FFFDFB" ? "#fff" : ingredientInfo[i].color }}
                    >
                      <span className="text-2xl" aria-hidden>{ingredientInfo[i].emoji}</span>{ingredientInfo[i].label}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {p.notes.length > 0 && (
              <div className="mt-6">
                <h2 className="mb-3 font-display text-xl font-bold">Taste notes</h2>
                <ul className="flex flex-wrap gap-2">
                  {p.notes.map((n) => <li key={n} className="rounded-full bg-white/80 px-4 py-1.5 text-sm font-semibold">{n}</li>)}
                </ul>
              </div>
            )}

            <div className="mt-10 flex flex-wrap gap-3">
              <JellyButton href="/partner#where" size="lg">Where to buy</JellyButton>
              <JellyButton href="/partner" size="lg" variant="white">Bulk order</JellyButton>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-4 py-24 md:px-8" data-flood="#FFFDFB" aria-labelledby="related">
          <div className="mx-auto max-w-[1400px]">
            <h2 id="related" className="font-display text-big font-extrabold">You&apos;ll also love</h2>
            <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((r, i) => (
                <motion.li
                  key={r.slug}
                  initial={{ y: -260, x: (i - 1.5) * -60, rotate: (i % 2 ? 1 : -1) * 40, opacity: 0 }}
                  whileInView={{ y: 0, x: 0, rotate: (i % 2 ? 1 : -1) * 3, opacity: 1 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 180, damping: 10, mass: 1.2 }}
                >
                  <TLink href={productHref(r)} className="sticker block rounded-[36px] p-4 transition-transform duration-300 hover:-translate-y-2" style={{ background: getCategory(r.category)!.color }}>
                    <div className="relative h-48"><ProductImage product={r} sizes="240px" /></div>
                    <p className="mt-2 font-display text-xl font-bold">{r.name}</p>
                  </TLink>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
