export const site = {
  name: "Dairy Classic",
  company: "Foreign Company Singapore Samarkand",
  url: "https://dairyclassic.uz",
  founded: 1996,
  email: "support@dairyclassic.uz",
  address: { line: "БУТ 5, 65M6+H9", city: "Tashkent", country: "Uzbekistan", plusCode: "65M6+H9 Tashkent" },
  phones: ["+998 78 120 33 77", "+998 78 120 33 78", "+998 90 992 29 99"],
  whatsapp: [
    { city: "Tashkent", number: "+998 90 998 20 19" },
    { city: "Samarkand", number: "+998 90 502 92 92" },
  ],
  hours: "Mon–Sat 09:00–20:00 · Sun closed",
  socials: [
    { name: "Instagram", href: "https://www.instagram.com/dairyclassic.uz/" },
    { name: "Facebook", href: "https://www.facebook.com/DairyClassicsIceCream/" },
    { name: "X", href: "https://x.com/dairyclassicUz" },
    { name: "Pinterest", href: "https://www.pinterest.com/dairyclassic_1990" },
    { name: "TikTok", href: "https://www.tiktok.com/@dairyclassic.uz" },
    { name: "YouTube", href: "https://www.youtube.com/@dairyclassic.uz.official" },
  ],
};

export const tel = (n: string) => "tel:" + n.replace(/\s/g, "");
export const wa = (n: string) => "https://wa.me/" + n.replace(/\D/g, "");

export const pastel = {
  cloud: "#FFFDFB",
  strawberry: "#FFD9E1",
  butter: "#FFF0B5",
  lilac: "#E7DEFF",
  mint: "#CDF2E2",
  sky: "#D5E9FF",
  peach: "#FFDCC8",
};
