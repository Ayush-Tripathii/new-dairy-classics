import TLink from "./TLink";
import FallingLetters from "./FallingLetters";
import { IconSocial } from "./Icons";
import { categories } from "@/data/products";
import { site, tel } from "@/data/site";

export default function Footer() {
  return (
    <footer className="relative bg-strawberry px-4 pb-36 pt-16 md:px-8" data-flood="#FFD9E1">
      <div className="mx-auto max-w-[1400px]">
        <FallingLetters />
        <div className="mt-10 grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-bold leading-tight">Crafting world-class ice creams with passion, quality and innovation since 1996.</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {site.socials.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="clay grid h-12 w-12 place-items-center rounded-2xl text-plum transition-transform duration-300 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-1 hover:scale-110 hover:text-berry">
                    <IconSocial name={s.name} className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Flavours">
            <h2 className="mb-3 font-display text-lg font-bold">Flavours</h2>
            <ul className="space-y-2">
              {categories.map((c) => (
                <li key={c.slug}><TLink href={`/flavours/${c.slug}`} className="hover:text-berry">{c.name}</TLink></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <h2 className="mb-3 font-display text-lg font-bold">Company</h2>
            <ul className="space-y-2">
              {[["Story", "/story"], ["Recipes", "/recipes"], ["Ask Us", "/ask-us"], ["Partner", "/partner"], ["Say Hello", "/say-hello"]].map(([l, h]) => (
                <li key={h}><TLink href={h} className="hover:text-berry">{l}</TLink></li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="mb-3 font-display text-lg font-bold">Contact & Hours</h2>
            <ul className="space-y-1.5 text-sm">
              {site.phones.map((p) => <li key={p}><a href={tel(p)} className="hover:text-berry">{p}</a></li>)}
              <li><a href={`mailto:${site.email}`} className="hover:text-berry">{site.email}</a></li>
              <li className="pt-2 text-plum/70">{site.address.line}, {site.address.city}</li>
              <li className="text-plum/70">{site.hours}</li>
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-plum/10 pt-6 text-sm text-plum/60">© 2026 Dairy Classic. All rights reserved.</p>
      </div>
    </footer>
  );
}
