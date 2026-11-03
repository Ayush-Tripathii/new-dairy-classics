"use client";

import { motion } from "framer-motion";
import ProductImage from "../ProductImage";
import { getCategory, type Product } from "@/data/products";

// Squircle sticker-card. Hover: jelly wobble, product scales & spins 10°, corner peels.
// Each category gets its own little hover gag.
export default function ProductCard({ p, onOpen }: { p: Product; onOpen: () => void; tall?: boolean }) {
  const cat = getCategory(p.category)!;
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={`${p.name} — quick view`}
      className={`group relative block w-full text-left [filter:drop-shadow(0_14px_16px_rgba(42,26,60,0.14))] h-full`}
      whileHover={{ scaleX: [1, 1.04, 0.98, 1.01, 1], scaleY: [1, 0.96, 1.02, 0.995, 1], transition: { duration: 0.6 } }}
      whileTap={p.category === "biscuit" ? { scaleY: 0.82, scaleX: 1.1 } : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 14 }}
      data-cursor="grab"
    >
      {/* peel: corner flap */}
      <div className="sticker shadow-none! relative flex h-full flex-col overflow-hidden rounded-[40px] p-5 transition-[clip-path] duration-500 [clip-path:polygon(0_0,100%_0,100%_100%,100%_100%,0_100%)] [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] group-hover:[clip-path:polygon(0_0,100%_0,100%_86%,86%_100%,0_100%)]" style={{ background: cat.color }}>
        {p.isNew && <span className="absolute left-4 top-4 z-10 rounded-full bg-grape px-3 py-1 text-xs font-extrabold text-white">NEW</span>}
        <div className="relative flex-1">
          <CategoryGag category={p.category} />
          <div className={`h-full w-full transition-transform duration-500 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] group-hover:rotate-[10deg] group-hover:scale-110 ${p.category === "cassatta" ? "hidden" : ""}`}>
            <ProductImage product={p} sizes="(max-width: 768px) 50vw, 300px" />
          </div>
          {p.category === "cassatta" && <CassattaLayers p={p} />}
        </div>
        <p className="mt-2 font-display text-2xl font-extrabold leading-none">{p.name}</p>
        {p.format && <p className="mt-1 text-sm font-semibold text-plum/60">{p.format}</p>}
      </div>
      <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-[14%] w-[14%] origin-bottom-right scale-0 rounded-tl-[14px] bg-gradient-to-br from-white to-[#e9e2f0] shadow-[-4px_-4px_10px_-2px_rgba(42,26,60,.2)] transition-transform duration-500 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] group-hover:scale-100" />
    </motion.button>
  );
}

function CategoryGag({ category }: { category: Product["category"] }) {
  if (category === "cones")
    return <span aria-hidden className="cone-scoop pointer-events-none absolute left-1/2 top-0 z-10 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100" style={{ background: "radial-gradient(circle at 35% 30%, #fff, #FF9DB4 50%, #FF4F7B)" }} />;
  if (category === "tubs")
    return (
      <>
        <span aria-hidden className="tub-lid pointer-events-none absolute left-1/2 top-[6%] z-10 h-5 w-[52%] rounded-full bg-white opacity-0 shadow-md group-hover:opacity-100" />
        <span aria-hidden className="tub-spoon pointer-events-none absolute right-[18%] top-0 z-10 text-4xl opacity-0 group-hover:opacity-100">🥄</span>
      </>
    );
  return null;
}

function CassattaLayers({ p }: { p: Product }) {
  // the slice wobbles apart into three layers
  return (
    <div className="relative h-full w-full">
      {[0, 1, 2].map((i) => (
        <div key={i} className={`cassatta-layer absolute inset-0 l${i}`} style={{ clipPath: `inset(${i * 33.3}% 0 ${100 - (i + 1) * 33.4}% 0)` }}>
          <ProductImage product={p} sizes="300px" shadow={i === 2} />
        </div>
      ))}
    </div>
  );
}
