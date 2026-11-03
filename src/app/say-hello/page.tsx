import type { Metadata } from "next";
import InflatedHeading from "@/components/InflatedHeading";
import ContactCards from "@/components/ContactCards";
import ContactForm from "@/components/forms/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Say Hello — Contact Dairy Classic",
  description: "Call, WhatsApp or email Dairy Classic. Factory in Tashkent, contacts in Tashkent and Samarkand. Open Monday–Saturday 09:00–20:00.",
  alternates: { canonical: "/say-hello" },
};

export default function SayHelloPage() {
  return (
    <>
      <section className="px-4 pb-16 pt-32 md:px-8 md:pt-40" data-flood="#D5E9FF">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-display text-lg font-bold text-plum/60">Say Hello 👋</p>
          <InflatedHeading as="h1" text="Discover the magic behind every scoop." className="text-huge max-w-[16ch]" />
          <div className="mt-14"><ContactCards /></div>
        </div>
      </section>
      <section className="px-4 py-20 md:px-8" data-flood="#FFFDFB" aria-label="Contact form">
        <div className="mx-auto max-w-4xl"><ContactForm /></div>
      </section>
      <section className="px-4 pb-28 md:px-8" data-flood="#FFFDFB" aria-labelledby="map-title">
        <div className="mx-auto max-w-[1400px]">
          <h2 id="map-title" className="mb-6 font-display text-big font-extrabold">Find the factory</h2>
          <div className="sticker relative h-[420px] overflow-hidden rounded-[48px] bg-mint md:h-[520px]">
            <iframe
              title={`Map: Dairy Classic factory, ${site.address.plusCode}`}
              src="https://www.google.com/maps?q=65M6%2BH9%20Tashkent%2C%20Uzbekistan&z=15&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full [filter:saturate(0.55)_hue-rotate(-12deg)_brightness(1.08)_contrast(0.92)]"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-strawberry/30 to-lilac/20 mix-blend-multiply" />
            <a href="https://www.google.com/maps/search/?api=1&query=65M6%2BH9%20Tashkent" target="_blank" rel="noopener noreferrer" className="absolute bottom-5 left-5 rounded-full bg-white px-5 py-3 font-display font-bold shadow-lg hover:text-berry">
              📍 {site.address.line} · Open in Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
