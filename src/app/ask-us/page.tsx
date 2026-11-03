import type { Metadata } from "next";
import InflatedHeading from "@/components/InflatedHeading";
import ChatFAQ from "@/components/ChatFAQ";
import { faqs } from "@/data/content";

export const metadata: Metadata = {
  title: "Ask Us — FAQs",
  description: "Answers about Dairy Classic: our history since 1996, formats, ingredients, new flavours, opening hours, bulk orders and becoming a distributor.",
  alternates: { canonical: "/ask-us" },
};

export default function AskUsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.filter((f) => !f.a.startsWith("[")).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section className="px-4 pb-28 pt-32 md:px-8 md:pt-40" data-flood="#E7DEFF">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <InflatedHeading as="h1" text="Ask Us" inflated color={["#FF4F7B", "#6A4CFF"]} className="text-mega" />
        <p className="mt-4 text-xl text-plum/75">Questions? We&apos;ve got answers (and ice cream).</p>
      </div>
      <ChatFAQ />
    </section>
  );
}
