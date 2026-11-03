import type { Metadata } from "next";
import Image from "next/image";
import InflatedHeading from "@/components/InflatedHeading";
import TLink from "@/components/TLink";
import { recipes } from "@/data/content";
import { IMG_BASE } from "@/data/products";

export const metadata: Metadata = {
  title: "Recipes — Make Something Delicious",
  description: "Easy recipes made with Dairy Classic ice cream: the Creamica Milkshake, a Cassatta party stack and a Super Vanilla affogato.",
  alternates: { canonical: "/recipes" },
};

export default function RecipesPage() {
  return (
    <section className="px-4 pb-28 pt-32 md:px-8 md:pt-40" data-flood="#FFDCC8">
      <div className="mx-auto max-w-[1400px]">
        <InflatedHeading as="h1" text="Recipes" inflated color={["#FF4F7B", "#6A4CFF"]} className="text-mega" />
        <p className="mt-4 max-w-xl text-xl text-plum/75">Few ingredients, big smiles. Spoons at the ready.</p>
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((r, i) => (
            <li key={r.slug} className={i === 0 ? "md:row-span-2" : ""}>
              <TLink href={`/recipes/${r.slug}`} className="group sticker flex h-full flex-col overflow-hidden rounded-[44px] p-6 transition-transform duration-500 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] hover:-rotate-1 hover:scale-[1.02]" style={{ background: r.color }}>
                <div className={`relative overflow-hidden rounded-[32px] bg-white/50 ${i === 0 ? "h-[420px]" : "h-56"}`}>
                  {r.image && <Image src={IMG_BASE + r.image} alt={r.title} fill sizes="(max-width: 768px) 90vw, 33vw" className="float-shadow object-contain p-6 transition-transform duration-700 group-hover:scale-110" />}
                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-sm font-bold">⏱ {r.prep}</span>
                </div>
                <h2 className="mt-5 font-display text-3xl font-extrabold leading-none">{r.title}</h2>
                <p className="mt-2 text-plum/75">{r.intro}</p>
                {r.draft && <p className="mt-3 text-xs font-bold uppercase tracking-wide text-plum/50">[Draft – client to approve]</p>}
              </TLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
