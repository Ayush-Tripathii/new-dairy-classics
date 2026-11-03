import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/AppProvider";
import Header from "@/components/Header";
import Dock from "@/components/Dock";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import GooeyCursor from "@/components/GooeyCursor";
import Preloader from "@/components/Preloader";
import FloodBackground from "@/components/FloodBackground";
import { site } from "@/data/site";

const bricolage = Bricolage_Grotesque({ subsets: ["latin", "latin-ext"], variable: "--font-bricolage", axes: ["opsz", "wdth"], display: "swap" });
const instrument = Instrument_Sans({ subsets: ["latin", "latin-ext"], variable: "--font-instrument", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Dairy Classic — Uzbekistan's Favourite Ice Cream since 1996", template: "%s · Dairy Classic" },
  description: "Thirty years of rich, creamy ice cream made with the finest ingredients. Cones, sticks, cups, biscuits, tubs and cassatta from Dairy Classic, since 1996.",
  openGraph: { type: "website", siteName: "Dairy Classic", locale: "en_US", images: ["https://dairyclassics.com/wp-content/uploads/2025/03/golden-f.webp"] },
  twitter: { card: "summary_large_image", site: "@dairyclassicUz" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#FFFDFB", colorScheme: "light" };

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dairy Classic",
    legalName: site.company,
    url: site.url,
    foundingDate: "1996",
    email: site.email,
    slogan: "Healthy Living",
    sameAs: site.socials.map((s) => s.href),
    contactPoint: site.phones.map((p) => ({ "@type": "ContactPoint", telephone: p.replace(/\s/g, ""), contactType: "customer service", areaServed: "UZ" })),
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Dairy Classic — Factory",
    url: site.url,
    telephone: site.phones[0].replace(/\s/g, ""),
    email: site.email,
    address: { "@type": "PostalAddress", streetAddress: site.address.line, addressLocality: "Tashkent", addressCountry: "UZ" },
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "20:00" }],
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        {/* hide the preloader before first paint for returning visitors */}
        <script dangerouslySetInnerHTML={{ __html: `try{if(localStorage.getItem('dc-seen'))document.documentElement.classList.add('dc-seen')}catch(e){}` }} />
        <style>{`.dc-seen #preloader{display:none}`}</style>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <AppProvider>
          <FloodBackground />
          <Preloader />
          <Header />
          <main id="main" className="overflow-x-clip">{children}</main>
          <Footer />
          <Dock />
          <WhatsAppButton />
          <GooeyCursor />
        </AppProvider>
      </body>
    </html>
  );
}
