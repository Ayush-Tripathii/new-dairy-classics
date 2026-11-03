import type { Metadata } from "next";
import InflatedHeading from "@/components/InflatedHeading";
import SweetRoad from "@/components/story/SweetRoad";

export const metadata: Metadata = {
  title: "Our Story — 30 Years of Dairy Classic",
  description: "From 1996 to our 30th birthday in 2026: the Dairy Classic story of quality, passion, an 80,000-litre-a-day plant and the #1 consumer choice.",
  alternates: { canonical: "/story" },
};

export default function StoryPage() {
  return (
    <>
      <section className="px-4 pb-20 pt-32 text-center md:px-8 md:pt-40" data-flood="#E7DEFF">
        <p className="font-display text-lg font-bold text-plum/60">Our Story · 1996 — 2026</p>
        <InflatedHeading as="h1" text="The Sweet Road" inflated color={["#FF4F7B", "#6A4CFF"]} className="text-mega mx-auto" />
        <p className="mx-auto mt-6 max-w-xl text-xl text-plum/80">Thirty years, one scoop at a time. Scroll down and follow the ball.</p>
        <p className="mt-10 text-3xl" aria-hidden>↓</p>
      </section>
      <section data-flood="#FFFDFB" aria-label="Milestones">
        <SweetRoad />
      </section>
      <section className="px-4 pb-32 pt-[min(28vw,260px)] text-center md:px-8" data-flood="#FFF0B5" aria-labelledby="finale">
        <h2 id="finale" className="font-display text-big font-extrabold">2026: 30 Years!</h2>
        <p className="mx-auto mt-5 max-w-2xl text-xl text-plum/80 md:text-2xl">A symbol of freshness, joy and unforgettable flavour — because every moment deserves a reason to celebrate.</p>
      </section>
    </>
  );
}
