// i18n-ready UI strings. English ships at launch; uz/ru fall back to English per key
// until translations are approved. Page copy moves here (or to the CMS) as it is translated.

export type Locale = "en" | "uz" | "ru";
export const locales: { code: Locale; label: string }[] = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

const en = {
  "nav.home": "Home",
  "nav.flavours": "Flavours",
  "nav.story": "Story",
  "nav.recipes": "Recipes",
  "nav.partner": "Partner",
  "nav.hello": "Say Hello",
  "nav.ask": "Ask Us",
  "nav.findUs": "Find Us",
  "sound.on": "Sound on",
  "sound.off": "Sound off",
  "skip": "Skip to content",
  "whatsapp.title": "Chat with us",
  "whatsapp.sub": "We usually reply with a smile.",
};

export type DictKey = keyof typeof en;

const uz: Partial<Record<DictKey, string>> = {
  "nav.home": "Bosh sahifa",
  "nav.flavours": "Ta'mlar",
  "nav.story": "Tarix",
  "nav.recipes": "Retseptlar",
  "nav.partner": "Hamkorlik",
  "nav.hello": "Aloqa",
};

const ru: Partial<Record<DictKey, string>> = {
  "nav.home": "Главная",
  "nav.flavours": "Вкусы",
  "nav.story": "История",
  "nav.recipes": "Рецепты",
  "nav.partner": "Партнёрам",
  "nav.hello": "Контакты",
};

export const dictionaries: Record<Locale, Partial<Record<DictKey, string>>> = { en, uz, ru };
export const translate = (locale: Locale, key: DictKey) => dictionaries[locale][key] ?? en[key];
