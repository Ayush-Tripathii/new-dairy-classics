import type { Metadata } from "next";
import InflatedHeading from "@/components/InflatedHeading";
import PartnerForm from "@/components/forms/PartnerForm";
import PartnerCards from "@/components/PartnerCards";
import UzMap from "@/components/home/UzMap";

export const metadata: Metadata = {
  title: "Partner With Us — Retail, Wholesale & Distribution",
  description: "Stock Dairy Classic in your store, café or parlour. Retail and wholesale, food chain partnerships, distribution and bulk orders across Uzbekistan.",
  alternates: { canonical: "/partner" },
};

export default function PartnerPage() {
  return (
    <>
      <section className="px-4 pb-16 pt-32 md:px-8 md:pt-40" data-flood="#CDF2E2">
        <div className="mx-auto max-w-[1400px]">
          <p className="font-display text-lg font-bold text-plum/60">Partner With Us</p>
          <InflatedHeading as="h1" text="Bringing Sweet Moments Closer." inflated color={["#FF4F7B", "#6A4CFF"]} className="text-huge max-w-[14ch]" />
          <div className="mt-14"><PartnerCards /></div>
        </div>
      </section>
      <section id="where" className="scroll-mt-24 px-4 py-20 text-center md:px-8" data-flood="#FFF0B5" aria-labelledby="where-title">
        <h2 id="where-title" className="font-display text-big font-extrabold">Where to buy</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-plum/75 md:text-xl">Find us in leading supermarkets, stores, parlours and cafés across Uzbekistan and beyond. Tap a city for its WhatsApp line.</p>
        <div className="mt-8"><UzMap /></div>
        <p className="mx-auto max-w-xl rounded-2xl bg-white/60 p-4 text-sm font-semibold text-plum/60">[CLIENT TO PROVIDE: list of stockists / store locator data]</p>
      </section>
      <section className="px-4 py-24 md:px-8" data-flood="#FFFDFB" aria-label="Partnership enquiry form">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 font-display text-big font-extrabold">Let&apos;s talk business</h2>
          <PartnerForm />
        </div>
      </section>
    </>
  );
}
