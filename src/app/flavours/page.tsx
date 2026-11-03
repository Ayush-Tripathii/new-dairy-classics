import type { Metadata } from "next";
import InflatedHeading from "@/components/InflatedHeading";
import ProductGrid from "@/components/flavours/ProductGrid";
import TLink from "@/components/TLink";
import { categories, products, productsIn } from "@/data/products";

export const metadata: Metadata = {
  title: "Flavours — 44 Ice Creams in 6 Formats",
  description: "Explore all 44 Dairy Classic ice creams: cones, sticks, cups, biscuits, 1-litre tubs and cassatta. Filter by chocolate, vanilla, fruity, coffee or nutty.",
  alternates: { canonical: "/flavours" },
};

export default function FlavoursPage() {
  return (
    <>
      <section className="px-4 pb-12 pt-32 md:px-8 md:pt-40" data-flood="#FFF0B5">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-display text-lg font-bold text-plum/60">44 products · 6 formats</p>
          <InflatedHeading as="h1" text="Flavours" inflated color={["#FF4F7B", "#6A4CFF"]} className="text-mega" />
          <p className="mt-6 max-w-xl text-xl text-plum/80">Pick a format, or just scroll and let your stomach decide.</p>
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((c, i) => (
              <li key={c.slug} style={{ rotate: `${i % 2 ? 2 : -2}deg` }}>
                <TLink href={`/flavours/${c.slug}`} className="sticker block rounded-[32px] p-5 transition-transform duration-300 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-2 hover:rotate-0" style={{ background: c.color }}>
                  <span className="block font-display text-3xl font-extrabold">{c.name}</span>
                  <span className="text-sm font-semibold text-plum/60">{productsIn(c.slug).length} flavours</span>
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="px-4 pb-28 pt-8 md:px-8" data-flood="#FFFDFB" aria-label="All products">
        <div className="mx-auto max-w-[1400px]"><ProductGrid items={products} /></div>
      </section>
    </>
  );
}
