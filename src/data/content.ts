// Recipes and FAQs. Structured so a headless CMS can replace this module 1:1.

export interface Recipe {
  slug: string;
  title: string;
  intro: string;
  image: string | null;
  color: string;
  prep: string;
  serves: string;
  draft: boolean;
  ingredients: string[];
  steps: string[];
  madeWith: string[]; // product names
}

export const recipes: Recipe[] = [
  {
    slug: "creamica-milkshake",
    title: "Creamica Milkshake",
    intro: "An iconic summer recipe with just a few ingredients — the creamy taste of Dairy Classic Creamica in your milkshake.",
    image: "2024/10/Cremica-Vanilla.webp",
    color: "#FFD9E1",
    prep: "5 min",
    serves: "2 glasses",
    draft: true,
    ingredients: ["2 Creamica Vanilla cups", "300 ml cold milk", "1 tbsp sugar (optional)", "A handful of ice cubes", "Chocolate sauce, to drizzle"],
    steps: [
      "Chill two tall glasses in the freezer for a few minutes.",
      "Drizzle chocolate sauce around the inside of each glass.",
      "Add the Creamica, cold milk, sugar and ice to a blender.",
      "Blend for 30–45 seconds until thick, smooth and frothy.",
      "Pour into the glasses, top with a little extra Creamica and serve straight away.",
    ],
    madeWith: ["Creamica Vanilla"],
  },
  {
    slug: "cassatta-party-stack",
    title: "Cassatta Party Stack",
    intro: "Slices of Classic Cassatta stacked with fresh fruit and a crunchy topping — a centrepiece that disappears fast.",
    image: "2024/10/Classic-Cassata.png",
    color: "#D5E9FF",
    prep: "15 min",
    serves: "6–8 guests",
    draft: true,
    ingredients: ["1 Classic Cassatta (1 litre)", "200 g fresh berries", "2 tbsp crushed biscuits", "Whipped cream, to finish", "Mint leaves, to garnish"],
    steps: [
      "Let the Cassatta rest out of the freezer for 3–4 minutes so it slices cleanly.",
      "Dip a sharp knife in hot water and cut into 2 cm slices.",
      "Layer the slices on a chilled platter, alternating with berries.",
      "Pipe small swirls of whipped cream on top and sprinkle with crushed biscuits.",
      "Garnish with mint and serve immediately.",
    ],
    madeWith: ["Classic Cassatta"],
  },
  {
    slug: "super-vanilla-affogato",
    title: "Super Vanilla Affogato",
    intro: "Hot espresso meets a cold scoop of Super Vanilla. Two ingredients, zero effort, maximum smug.",
    image: "2024/10/Classic-Black-Tub-Super-Vanilla.webp",
    color: "#FFF0B5",
    prep: "3 min",
    serves: "1 cup",
    draft: true,
    ingredients: ["1 generous scoop of Super Vanilla", "1 shot of hot espresso (30–40 ml)", "Cocoa powder, to dust (optional)"],
    steps: [
      "Place a scoop of Super Vanilla in a small glass or cup.",
      "Brew a fresh shot of espresso.",
      "Pour the hot espresso over the ice cream at the table.",
      "Dust with cocoa and eat with a spoon before it all melts.",
    ],
    madeWith: ["Super Vanilla"],
  },
];

export type FaqTopic = "General" | "Products" | "Partnership" | "Distributors";

export const faqs: { q: string; a: string; topic: FaqTopic }[] = [
  { topic: "General", q: "How long have you been making ice cream?", a: "Since 1996, which makes 30 years! 🎉" },
  { topic: "General", q: "Where is it made?", a: "At our modern factory in Tashkent, Uzbekistan." },
  { topic: "General", q: "What are your opening hours?", a: "Monday–Saturday 09:00–20:00. Closed on Sunday." },
  { topic: "General", q: "Where do you operate?", a: "Across Uzbekistan, with contacts in Tashkent and Samarkand." },
  { topic: "Products", q: "What formats do you have?", a: "Cones, Sticks, Cups, Biscuit, 1-litre Tubs and Cassatta." },
  { topic: "Products", q: "What ingredients do you use?", a: "Only the finest, natural ingredients." },
  { topic: "Products", q: "What's new?", a: "Delizia, Royal Fun, Pango, Frutonia and Tapo." },
  { topic: "Products", q: "Do you have sugar-free options?", a: "[CLIENT TO CONFIRM]" },
  { topic: "Partnership", q: "Can I order in bulk?", a: "Yes! Use the Partner form, call us or WhatsApp us." },
  { topic: "Partnership", q: "Do you supply cafés, parlours and food chains?", a: "Yes." },
  { topic: "Distributors", q: "How do I become a distributor?", a: "Fill in the Partner form or call our sales line." },
];
