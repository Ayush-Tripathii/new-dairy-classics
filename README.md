# Dairy Classic — "Sweet Physics"

Next.js 15 (App Router) · TypeScript · Tailwind v4 · Framer Motion · Matter.js

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | Where |
|---|---|
| Products (44), categories, Flavour Match mapping | `src/data/products.ts` |
| Recipes, FAQs | `src/data/content.ts` |
| Contacts, socials, hours | `src/data/site.ts` |
| UI strings (EN live; UZ/RU fall back to EN) | `src/i18n/dictionaries.ts` |
| Form validation (shared client/server) | `src/lib/validate.ts`, `src/app/api/contact/route.ts` |

The data modules have the same shape a Sanity/Strapi fetch would return, so swapping in a CMS only touches those files.

Reusable components: `PhysicsPlayground`, `InflatedHeading`, `JellyButton`, `GooeyCursor`, `StickerCard`, `SwipeMatch`, `Carousel3D`, `BottomSheet`, `ChatFAQ`, `Dock`, `FallingLetters` (all in `src/components`).

## Before launch — client to provide

- Tapo and Heart Delight descriptions; Ambroziya and Choco Chips tub images
- Founder name and quote (Story, stop 2)
- Sugar-free answer (FAQ)
- Approval of the three draft recipes
- Stockist list for "Where to buy"
- Official logo (a placeholder wordmark is used)
- Email/CRM destination for form submissions — `src/app/api/contact/route.ts` currently validates and logs only
- Production domain (set in `src/data/site.ts`, used for canonical URLs, sitemap and JSON-LD)
