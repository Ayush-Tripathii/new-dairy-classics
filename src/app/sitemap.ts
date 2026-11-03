import type { MetadataRoute } from "next";
import { categories, products } from "@/data/products";
import { recipes } from "@/data/content";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["", "/flavours", "/story", "/partner", "/recipes", "/ask-us", "/say-hello",
    ...categories.map((c) => `/flavours/${c.slug}`),
    ...products.map((p) => `/flavours/${p.category}/${p.slug}`),
    ...recipes.map((r) => `/recipes/${r.slug}`)];
  return paths.map((p) => ({ url: site.url + p, lastModified: now, priority: p === "" ? 1 : p.split("/").length > 3 ? 0.6 : 0.8 }));
}
