import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RecipeDetail from "@/components/RecipeDetail";
import { recipes } from "@/data/content";
import { IMG_BASE } from "@/data/products";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => recipes.map((r) => ({ slug: r.slug }));

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const r = recipes.find((x) => x.slug === slug);
  if (!r) return {};
  return { title: `${r.title} Recipe`, description: r.intro, alternates: { canonical: `/recipes/${r.slug}` }, openGraph: { title: r.title, description: r.intro, images: r.image ? [IMG_BASE + r.image] : undefined } };
}

export default async function RecipePage({ params }: Params) {
  const { slug } = await params;
  const r = recipes.find((x) => x.slug === slug);
  if (!r) notFound();
  return <RecipeDetail r={r} />;
}
