// Structured product content. Swap this module for a Sanity/Strapi fetch later —
// every consumer goes through the helpers at the bottom of the file.

export const IMG_BASE = "https://dairyclassics.com/wp-content/uploads/";

export type CategorySlug = "cones" | "sticks" | "cups" | "biscuit" | "tubs" | "cassatta";
export type Taste = "chocolate" | "vanilla" | "fruity" | "coffee" | "nutty" | "biscuit";
export type Ingredient = "peanuts" | "raspberry" | "berries" | "blueberry" | "orange" | "papaya" | "chocolate" | "cookies" | "wafer" | "hazelnut" | "pistachio" | "coffee" | "honey" | "pecan" | "mango" | "vanilla" | "rose" | "biscuit";

export interface Category {
  slug: CategorySlug;
  name: string;
  singular: string;
  intro: string;
  color: string; // pastel token value
  colorName: string;
  countLabel: string; // e.g. "sticks to love" — shown as "10 sticks to love"
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  description: string | null; // null => client to provide
  image: string | null; // relative to IMG_BASE; null => client to provide
  isNew?: boolean;
  format?: string;
  tastes: Taste[];
  inside: Ingredient[]; // only ingredients named in the description
  notes: string[];
}

export const categories: Category[] = [
  { slug: "cones", name: "Cones", singular: "cone", intro: "Crunchy, chocolatey, cone-tastic.", color: "#FFF0B5", colorName: "Butter", countLabel: "cones to crunch" },
  { slug: "sticks", name: "Sticks", singular: "stick", intro: "Grab one. Grab two. We won't tell.", color: "#E7DEFF", colorName: "Lilac Cream", countLabel: "sticks to love" },
  { slug: "cups", name: "Cups", singular: "cup", intro: "Little cups, big happy.", color: "#FFD9E1", colorName: "Strawberry Milk", countLabel: "cups to spoon" },
  { slug: "biscuit", name: "Biscuit", singular: "biscuit", intro: "Crunch on the outside. Joy on the inside.", color: "#FFDCC8", colorName: "Peach Fizz", countLabel: "biscuits to bite" },
  { slug: "tubs", name: "Tubs", singular: "tub", intro: "One litre of happiness. Spoons ready.", color: "#CDF2E2", colorName: "Mint Sorbet", countLabel: "tubs to share" },
  { slug: "cassatta", name: "Cassatta", singular: "cassatta", intro: "Layered for celebrations.", color: "#D5E9FF", colorName: "Sky Sherbet", countLabel: "cassattas to slice" },
];

const P = (p: Product) => p;

export const products: Product[] = [
  // CONES
  P({ slug: "golden-fantasy", name: "Golden Fantasy", category: "cones", description: "Two flavours, vanilla and chocolate, in a crunchy chocolate-coated wafer cone with roasted peanuts. Surprisingly divine.", image: "2025/03/golden-f.webp", tastes: ["vanilla", "chocolate", "nutty"], inside: ["vanilla", "chocolate", "wafer", "peanuts"], notes: ["Two-tone", "Crunchy", "Nutty"] }),
  P({ slug: "choco-boom", name: "Choco Boom", category: "cones", description: "Chocolate ice cream in a crunchy chocolate-coated wafer cone, with crispy roasted peanuts for a distinctive taste.", image: "2025/03/boom-c.webp", tastes: ["chocolate", "nutty"], inside: ["chocolate", "wafer", "peanuts"], notes: ["Chocolatey", "Crunchy", "Nutty"] }),
  P({ slug: "super-twist", name: "Super Twist", category: "cones", description: "Vanilla ice cream with a raspberry sauce centre in a crunchy chocolate-coated wafer cone. A true favourite.", image: "2025/03/twist-x.webp", tastes: ["vanilla", "fruity"], inside: ["vanilla", "raspberry", "chocolate", "wafer"], notes: ["Fruity", "Saucy", "Crunchy"] }),
  P({ slug: "dice-n-slice", name: "Dice n Slice", category: "cones", description: "A seriously premium, gourmet pairing of hazelnut and rose in a waffle cone.", image: "2025/03/dice-s.webp", tastes: ["nutty"], inside: ["hazelnut", "rose", "wafer"], notes: ["Gourmet", "Floral", "Nutty"] }),
  P({ slug: "twin-cone", name: "Twin Cone", category: "cones", description: "A premium twist of honey and vanilla pecan, double the flavour, in a waffle cone.", image: "2025/03/twin-c.webp", tastes: ["vanilla", "nutty"], inside: ["honey", "vanilla", "pecan", "wafer"], notes: ["Double flavour", "Honeyed", "Nutty"] }),
  P({ slug: "top-fun-big", name: "Top Fun (Big)", category: "cones", description: "Premium ice cream in a big wafer cone, filled with a fruity, tangy orange sauce.", image: "2025/03/top-f.webp", format: "Big cone", tastes: ["fruity"], inside: ["orange", "wafer"], notes: ["Tangy", "Fruity", "Big"] }),
  P({ slug: "capicon-big", name: "Capicon (Big)", category: "cones", description: "Real cappuccino ice cream in a big cone. Big cone, big fun.", image: "2025/03/copico.webp", format: "Big cone", tastes: ["coffee"], inside: ["coffee", "wafer"], notes: ["Coffee", "Creamy", "Big"] }),
  // STICKS
  P({ slug: "super-choc", name: "Super Choc", category: "sticks", description: "Premium chocolate ice cream, smooth and creamy, coated in crunchy rich chocolate with crispy peanut pieces.", image: "2025/03/super-choco.webp", tastes: ["chocolate", "nutty"], inside: ["chocolate", "peanuts"], notes: ["Rich", "Crunchy", "Nutty"] }),
  P({ slug: "vega", name: "Vega", category: "sticks", description: "Premium vanilla ice cream in luscious crunchy chocolate with crispy roasted peanuts.", image: "2025/03/bera-n.webp", tastes: ["vanilla", "chocolate", "nutty"], inside: ["vanilla", "chocolate", "peanuts"], notes: ["Creamy", "Crunchy", "Nutty"] }),
  P({ slug: "classic-vega", name: "Classic Vega", category: "sticks", description: "Sensational milky vanilla ice cream coated in silky chocolate.", image: "2025/03/bera-class.webp", tastes: ["vanilla", "chocolate"], inside: ["vanilla", "chocolate"], notes: ["Milky", "Silky", "Classic"] }),
  P({ slug: "new-classic", name: "New Classic", category: "sticks", description: "Half creamy vanilla, half chocolate, coated in rich chocolate. Double satisfaction.", image: "2025/03/new-classic.webp", tastes: ["vanilla", "chocolate"], inside: ["vanilla", "chocolate"], notes: ["Half & half", "Rich", "Classic"] }),
  P({ slug: "koffee-mokko", name: "Koffee Mokko", category: "sticks", description: "A delectable combination of coffee and cocoa.", image: "2025/03/mokko.webp", tastes: ["coffee", "chocolate"], inside: ["coffee", "chocolate"], notes: ["Coffee", "Cocoa", "Smooth"] }),
  P({ slug: "delizia", name: "Delizia", category: "sticks", isNew: true, description: "A triple-layer stick, with crispy chocolate inside and out and luscious mixed berry in between.", image: "2025/03/delizia.webp", tastes: ["fruity", "chocolate"], inside: ["chocolate", "berries"], notes: ["Triple layer", "Berry", "Crispy"] }),
  P({ slug: "royal-fun", name: "Royal Fun", category: "sticks", isNew: true, description: "A triple-layer stick with a tangy orange layer between crispy chocolate layers.", image: "2025/03/royal-f.webp", tastes: ["fruity", "chocolate"], inside: ["orange", "chocolate"], notes: ["Triple layer", "Tangy", "Crispy"] }),
  P({ slug: "pango", name: "Pango", category: "sticks", isNew: true, description: "The ultimate mixed-berry refreshment.", image: "2025/03/pango-n.webp", tastes: ["fruity"], inside: ["berries"], notes: ["Berry", "Refreshing"] }),
  P({ slug: "frutonia", name: "Frutonia", category: "sticks", isNew: true, description: "A tropical fruity delight; a creamy adventure.", image: "2025/03/frutonia.webp", tastes: ["fruity"], inside: [], notes: ["Tropical", "Creamy"] }),
  P({ slug: "tapo", name: "Tapo", category: "sticks", isNew: true, description: null, image: "2025/03/tapo.webp", tastes: [], inside: [], notes: [] }),
  // CUPS
  P({ slug: "creamica-cheesecake", name: "Creamica Cheesecake", category: "cups", description: "Premium blueberry cheesecake ice cream with luscious blueberry sauce.", image: "2024/10/Layer-1.webp", tastes: ["fruity"], inside: ["blueberry"], notes: ["Cheesecake", "Berry", "Saucy"] }),
  P({ slug: "creamica-vanilla", name: "Creamica Vanilla", category: "cups", description: "Creamy vanilla topped with chocolate and roasted peanuts.", image: "2024/10/Cremica-Vanilla.webp", tastes: ["vanilla", "chocolate", "nutty"], inside: ["vanilla", "chocolate", "peanuts"], notes: ["Creamy", "Topped", "Nutty"] }),
  P({ slug: "creamica-biscuiti", name: "Creamica Biscuiti", category: "cups", description: "A creamy biscuit-flavoured treat.", image: "2024/10/Cremica-Biscuit.webp", tastes: ["biscuit"], inside: ["biscuit"], notes: ["Biscuity", "Creamy"] }),
  P({ slug: "ambroziya-mini-cup", name: "Ambroziya Mini Cup", category: "cups", description: "Premium ice cream with papaya chunks.", image: "2025/03/AMBROZIYA.webp", tastes: ["fruity"], inside: ["papaya"], notes: ["Fruity", "Chunky"] }),
  P({ slug: "orange-mini-cup", name: "Orange Mini Cup", category: "cups", description: "Premium orange ice cream with tangy orange sauce.", image: "2025/03/orange.webp", tastes: ["fruity"], inside: ["orange"], notes: ["Tangy", "Zesty"] }),
  P({ slug: "choco-chips-mini-cup", name: "Choco Chips Mini Cup", category: "cups", description: "Velvety vanilla with chocolate chips.", image: "2025/03/choco.webp", tastes: ["vanilla", "chocolate"], inside: ["vanilla", "chocolate"], notes: ["Velvety", "Chippy"] }),
  P({ slug: "cappuccino-mini-cup", name: "Cappuccino Mini Cup", category: "cups", description: "The richness of cappuccino in a perfect little moment.", image: "2025/03/cappu.webp", tastes: ["coffee"], inside: ["coffee"], notes: ["Coffee", "Rich"] }),
  // BISCUIT
  P({ slug: "sandwich", name: "Sandwich", category: "biscuit", description: "Vanilla and chocolate ice cream, half sandwiched between crunchy biscuits and half dipped in chocolate with roasted peanuts.", image: "2024/10/sandwich.webp", tastes: ["biscuit", "vanilla", "chocolate", "nutty"], inside: ["vanilla", "chocolate", "biscuit", "peanuts"], notes: ["Crunchy", "Half-dipped", "Nutty"] }),
  P({ slug: "bricket", name: "Bricket", category: "biscuit", description: "Vanilla and chocolate ice cream between crunchy premium biscuits. The perfect treat on the go.", image: "2024/10/bricket.webp", tastes: ["biscuit", "vanilla", "chocolate"], inside: ["vanilla", "chocolate", "biscuit"], notes: ["On the go", "Crunchy"] }),
  P({ slug: "olino", name: "Olino", category: "biscuit", description: "Round biscuit-flavoured ice cream with premium cookies, coated in chocolate.", image: "2024/10/olino.webp", tastes: ["biscuit", "chocolate"], inside: ["biscuit", "cookies", "chocolate"], notes: ["Cookie", "Coated"] }),
  P({ slug: "round-pie", name: "Round Pie", category: "biscuit", description: "Perfectly round vanilla ice cream with premium cookies, coated in chocolate.", image: "2024/10/round.webp", tastes: ["biscuit", "vanilla", "chocolate"], inside: ["vanilla", "cookies", "chocolate"], notes: ["Perfectly round", "Cookie"] }),
  // TUBS
  P({ slug: "french-vanilla", name: "French Vanilla", category: "tubs", format: "1 Litre", description: "The ultimate premium vanilla, perfectly creamy.", image: "2024/10/White-Tub-French-Vanilla.webp", tastes: ["vanilla"], inside: ["vanilla"], notes: ["Premium", "Creamy"] }),
  P({ slug: "ambroziya", name: "Ambroziya", category: "tubs", format: "1 Litre", description: "Colourful papaya chunks in a medley of flavours.", image: null, tastes: ["fruity"], inside: ["papaya"], notes: ["Colourful", "Chunky"] }),
  P({ slug: "choco-chips", name: "Choco Chips", category: "tubs", format: "1 Litre", description: "Rich creamy vanilla with chocolate chips.", image: null, tastes: ["vanilla", "chocolate"], inside: ["vanilla", "chocolate"], notes: ["Rich", "Chippy"] }),
  P({ slug: "coffee-frenzy", name: "Coffee Frenzy", category: "tubs", format: "1 Litre", description: "Extraordinarily rich, creamy coffee ice cream.", image: "2024/10/Classic-Black-Tub-Coffee-Frenzy.webp", tastes: ["coffee"], inside: ["coffee"], notes: ["Rich", "Coffee"] }),
  P({ slug: "super-vanilla", name: "Super Vanilla", category: "tubs", format: "1 Litre", description: "Refreshing vanilla with a silky sweet-cream finish.", image: "2024/10/Classic-Black-Tub-Super-Vanilla.webp", tastes: ["vanilla"], inside: ["vanilla"], notes: ["Refreshing", "Silky"] }),
  P({ slug: "chocolate-dream", name: "Chocolate Dream", category: "tubs", format: "1 Litre", description: "Scrumptious chocolate ice cream.", image: "2024/10/Classic-Black-Tub-Chocolate-Dreams.webp", tastes: ["chocolate"], inside: ["chocolate"], notes: ["Scrumptious"] }),
  P({ slug: "pistachio", name: "Pistachio", category: "tubs", format: "1 Litre", description: "Your favourite pistachio, to the very last scoop.", image: "2024/10/White-Tub-Pistachio.webp", tastes: ["nutty"], inside: ["pistachio"], notes: ["Nutty", "Classic"] }),
  P({ slug: "premium-chocolate", name: "Premium Chocolate", category: "tubs", format: "1 Litre", description: "A truly luxurious blend of chocolate and cocoa.", image: "2025/03/premium.webp", tastes: ["chocolate"], inside: ["chocolate"], notes: ["Luxurious", "Cocoa"] }),
  P({ slug: "mango", name: "Mango", category: "tubs", format: "1 Litre", description: "A symphony of taste from the king of fruits.", image: "2024/10/White-Tub-Mango.webp", tastes: ["fruity"], inside: ["mango"], notes: ["Fruity", "Tropical"] }),
  P({ slug: "heart-delight", name: "Heart Delight", category: "tubs", format: "1 Litre", description: null, image: "2024/10/White-Tub-Heart-Delight.webp", tastes: [], inside: [], notes: [] }),
  P({ slug: "classic-delight", name: "Classic Delight", category: "tubs", format: "1 Litre", description: "Three classic flavours in one great combination.", image: "2024/10/White-Tub-Classic-Delight.webp", tastes: ["vanilla"], inside: [], notes: ["Three-in-one", "Classic"] }),
  P({ slug: "raspberry-swirl", name: "Raspberry Swirl", category: "tubs", format: "1 Litre", description: "Premium vanilla with a raspberry ribbon.", image: "2024/10/Swirls-Raspberry.webp", tastes: ["fruity", "vanilla"], inside: ["vanilla", "raspberry"], notes: ["Swirled", "Fruity"] }),
  P({ slug: "orange-swirl", name: "Orange Swirl", category: "tubs", format: "1 Litre", description: "Premium ice cream swirled with sweet orange sauce.", image: "2024/10/Swirls-Orange.webp", tastes: ["fruity"], inside: ["orange"], notes: ["Swirled", "Sweet"] }),
  P({ slug: "chocolate-curls", name: "Chocolate Curls", category: "tubs", format: "1 Litre", description: "Premium vanilla with a chocolate sauce ribbon.", image: "2024/10/Swirls-Chocolate-Curls.webp", tastes: ["vanilla", "chocolate"], inside: ["vanilla", "chocolate"], notes: ["Swirled", "Chocolatey"] }),
  // CASSATTA
  P({ slug: "classic-cassatta", name: "Classic Cassatta", category: "cassatta", format: "1 Litre", description: "Premium layered ice cream in a medley of flavours, topped with roasted peanuts. A slice of great fascination.", image: "2024/10/Classic-Cassata.png", tastes: ["nutty"], inside: ["peanuts"], notes: ["Layered", "Celebration", "Nutty"] }),
  P({ slug: "galaxy-cassatta", name: "Galaxy Cassatta", category: "cassatta", format: "1 Litre", description: "Premium layered ice cream for celebrating anytime, anywhere, topped with roasted peanuts.", image: "2024/10/Cassata-Cookies-N-Icre-Cream.webp", tastes: ["nutty"], inside: ["peanuts"], notes: ["Layered", "Party-ready"] }),
];

export const ingredientInfo: Record<Ingredient, { label: string; emoji: string; color: string }> = {
  peanuts: { label: "Roasted peanuts", emoji: "🥜", color: "#FFDCC8" },
  raspberry: { label: "Raspberry", emoji: "🍓", color: "#FFD9E1" },
  berries: { label: "Mixed berry", emoji: "🫐", color: "#E7DEFF" },
  blueberry: { label: "Blueberry", emoji: "🫐", color: "#D5E9FF" },
  orange: { label: "Orange", emoji: "🍊", color: "#FFDCC8" },
  papaya: { label: "Papaya", emoji: "🥭", color: "#FFF0B5" },
  chocolate: { label: "Chocolate", emoji: "🍫", color: "#FFDCC8" },
  cookies: { label: "Premium cookies", emoji: "🍪", color: "#FFF0B5" },
  wafer: { label: "Wafer", emoji: "🧇", color: "#FFF0B5" },
  hazelnut: { label: "Hazelnut", emoji: "🌰", color: "#FFDCC8" },
  pistachio: { label: "Pistachio", emoji: "💚", color: "#CDF2E2" },
  coffee: { label: "Coffee", emoji: "☕", color: "#FFDCC8" },
  honey: { label: "Honey", emoji: "🍯", color: "#FFF0B5" },
  pecan: { label: "Pecan", emoji: "🌰", color: "#FFDCC8" },
  mango: { label: "Mango", emoji: "🥭", color: "#FFF0B5" },
  vanilla: { label: "Vanilla", emoji: "🍦", color: "#FFFDFB" },
  rose: { label: "Rose", emoji: "🌹", color: "#FFD9E1" },
  biscuit: { label: "Biscuit", emoji: "🍪", color: "#FFF0B5" },
};

export const imgUrl = (p: Pick<Product, "image">) => (p.image ? IMG_BASE + p.image : null);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsIn = (slug: string) => products.filter((p) => p.category === slug);
export const getProduct = (cat: string, slug: string) => products.find((p) => p.category === cat && p.slug === slug);
export const byName = (name: string) => products.find((p) => p.name === name) ?? products.find((p) => p.name.startsWith(name + " ("));
export const productHref = (p: Product) => `/flavours/${p.category}/${p.slug}`;

// Flavour Match mapping (brief §7.4) — names resolve against the catalogue above.
export const matchMap: Record<Taste, string[]> = {
  chocolate: ["Super Choc", "Choco Boom", "Chocolate Dream", "Premium Chocolate", "Chocolate Curls"],
  fruity: ["Super Twist", "Delizia", "Royal Fun", "Pango", "Frutonia", "Mango", "Orange Mini Cup", "Raspberry Swirl", "Ambroziya"],
  nutty: ["Dice n Slice", "Twin Cone", "Pistachio", "Vega", "Golden Fantasy"],
  coffee: ["Capicon", "Koffee Mokko", "Cappuccino Mini Cup", "Coffee Frenzy"],
  vanilla: ["Classic Vega", "French Vanilla", "Super Vanilla", "Creamica Vanilla"],
  biscuit: ["Sandwich", "Bricket", "Olino", "Round Pie", "Creamica Biscuiti"],
};
