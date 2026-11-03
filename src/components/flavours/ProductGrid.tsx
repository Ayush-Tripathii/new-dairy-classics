"use client";

import { useCallback, useMemo, useState } from "react";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import BottomSheet from "../BottomSheet";
import ProductImage from "../ProductImage";
import JellyButton from "../JellyButton";
import { getCategory, ingredientInfo, productHref, type Product } from "@/data/products";

const filters = [
  { key: "chocolate", label: "Chocolate" },
  { key: "vanilla", label: "Vanilla" },
  { key: "fruity", label: "Fruity" },
  { key: "coffee", label: "Coffee" },
  { key: "nutty", label: "Nutty" },
  { key: "new", label: "New" },
] as const;
type FilterKey = (typeof filters)[number]["key"];

const matches = (p: Product, f: FilterKey) => (f === "new" ? !!p.isNew : p.tastes.includes(f));

export default function ProductGrid({ items }: { items: Product[] }) {
  const [active, setActive] = useState<FilterKey | null>(null);
  const [open, setOpen] = useState<Product | null>(null);
  const shown = useMemo(() => (active ? items.filter((p) => matches(p, active)) : items), [items, active]);
  const close = useCallback(() => setOpen(null), []);

  return (
    <div>
      <div role="group" aria-label="Filter by taste" className="mb-10 flex flex-wrap gap-2">
        <Pill on={!active} onClick={() => setActive(null)}>All <span className="opacity-60">{items.length}</span></Pill>
        {filters.map((f) => {
          const n = items.filter((p) => matches(p, f.key)).length;
          if (!n) return null;
          return (
            <Pill key={f.key} on={active === f.key} onClick={() => setActive(active === f.key ? null : f.key)}>
              {f.label} <span className="opacity-60">{n}</span>
            </Pill>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">{shown.length} products shown</p>
      <LayoutGroup>
        <motion.ul layout className="grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 md:auto-rows-[170px] md:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.li
                layout
                key={p.slug}
                className={i % 3 === 1 ? "row-span-3" : "row-span-2"}
                initial={{ opacity: 0, scale: 0.6, y: -40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.6, y: 30 }}
                transition={{ type: "spring", stiffness: 380, damping: 22, delay: Math.min(i, 8) * 0.025 }}
              >
                <ProductCard p={p} tall={i % 3 === 1} onOpen={() => setOpen(p)} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </LayoutGroup>

      <BottomSheet open={!!open} onClose={close} label={open ? `${open.name} quick view` : "Quick view"} color={open ? getCategory(open.category)!.color : "#fff"}>
        {open && <QuickView p={open} />}
      </BottomSheet>
    </div>
  );
}

function Pill({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button
      onClick={onClick}
      aria-pressed={on}
      whileTap={{ scaleX: 1.1, scaleY: 0.88 }}
      transition={{ type: "spring", stiffness: 600, damping: 14 }}
      className={`h-11 rounded-full px-5 font-semibold transition-colors ${on ? "bg-plum text-white" : "bg-white/80 text-plum shadow-[0_4px_12px_-6px_rgba(42,26,60,.3)] hover:bg-white"}`}
    >
      {children}
    </motion.button>
  );
}

function QuickView({ p }: { p: Product }) {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-center">
      <div className="bob relative mx-auto aspect-square w-60 md:w-full"><ProductImage product={p} sizes="320px" /></div>
      <div>
        <h2 className="font-display text-5xl font-extrabold leading-none tracking-tight">{p.name}</h2>
        {p.format && <p className="mt-2 font-semibold text-plum/60">{p.format}</p>}
        <p className="mt-4 text-lg text-plum/80">{p.description ?? "[CLIENT TO PROVIDE DESCRIPTION]"}</p>
        {p.inside.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.inside.map((i) => <li key={i} className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold">{ingredientInfo[i].emoji} {ingredientInfo[i].label}</li>)}
          </ul>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <JellyButton href={productHref(p)}>See full flavour</JellyButton>
          <JellyButton href="/partner#where" variant="white">Where to buy</JellyButton>
        </div>
      </div>
    </div>
  );
}
