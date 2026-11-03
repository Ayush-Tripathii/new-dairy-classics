import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/flavours/ProductDetail";
import { getCategory, getProduct, imgUrl, products } from "@/data/products";
import { site } from "@/data/site";

type Params = { params: Promise<{ category: string; product: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ category: p.category, product: p.slug }));

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category, product } = await params;
  const p = getProduct(category, product);
  if (!p) return {};
  const img = imgUrl(p);
  const desc = p.description ?? `${p.name} by Dairy Classic — ${getCategory(p.category)!.name}.`;
  return {
    title: `${p.name} — ${getCategory(p.category)!.name}`,
    description: desc,
    alternates: { canonical: `/flavours/${p.category}/${p.slug}` },
    openGraph: { title: `${p.name} · Dairy Classic`, description: desc, images: img ? [img] : undefined },
  };
}

export default async function ProductPage({ params }: Params) {
  const { category, product } = await params;
  const p = getProduct(category, product);
  if (!p) notFound();
  // related: same category first, then shared tastes elsewhere
  const sameCat = products.filter((x) => x.category === p.category && x.slug !== p.slug);
  const shared = products.filter((x) => x.category !== p.category && x.tastes.some((t) => p.tastes.includes(t)));
  const related = [...sameCat.slice(0, 2), ...shared.slice(0, 2), ...sameCat.slice(2)].slice(0, 4);
  const img = imgUrl(p);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description ?? undefined,
    image: img ?? undefined,
    category: getCategory(p.category)!.name,
    brand: { "@type": "Brand", name: "Dairy Classic" },
    manufacturer: { "@type": "Organization", name: site.company },
    url: `${site.url}/flavours/${p.category}/${p.slug}`,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetail p={p} related={related} />
    </>
  );
}
