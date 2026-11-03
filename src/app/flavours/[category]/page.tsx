import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryHero from "@/components/flavours/CategoryHero";
import ProductGrid from "@/components/flavours/ProductGrid";
import { categories, getCategory, productsIn } from "@/data/products";

type Params = { params: Promise<{ category: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => categories.map((c) => ({ category: c.slug }));

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = getCategory((await params).category);
  if (!c) return {};
  const n = productsIn(c.slug).length;
  return {
    title: `${c.name} — ${n} Dairy Classic ${c.name}`,
    description: `${c.intro} Discover all ${n} Dairy Classic ${c.name.toLowerCase()}, made with the finest ingredients since 1996.`,
    alternates: { canonical: `/flavours/${c.slug}` },
    openGraph: { title: `Dairy Classic ${c.name}`, description: c.intro },
  };
}

export default async function CategoryPage({ params }: Params) {
  const c = getCategory((await params).category);
  if (!c) notFound();
  const items = productsIn(c.slug);
  const heroes = items.filter((p) => p.image).slice(0, 3);
  return (
    <>
      <CategoryHero category={c} heroes={heroes} count={items.length} />
      <section className="px-4 pb-28 md:px-8" data-flood={c.color} aria-label={`All ${c.name}`}>
        <div className="mx-auto max-w-[1400px]"><ProductGrid items={items} /></div>
      </section>
    </>
  );
}
