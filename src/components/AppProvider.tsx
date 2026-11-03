"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { animate, motion, useAnimationControls } from "framer-motion";
import { setSoundEnabled, play } from "@/lib/sound";
import { translate, type DictKey, type Locale } from "@/i18n/dictionaries";
import { getCategory } from "@/data/products";
import { pastel } from "@/data/site";

interface AppCtx {
  sound: boolean;
  toggleSound: () => void;
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (k: DictKey) => string;
  navigate: (href: string) => void;
}

const Ctx = createContext<AppCtx | null>(null);
export const useApp = () => useContext(Ctx)!;

// Destination pastel for the scoop transition.
export function pastelFor(href: string) {
  const seg = href.split("?")[0].split("/").filter(Boolean);
  if (seg[0] === "flavours" && seg[1]) return getCategory(seg[1])?.color ?? pastel.butter;
  const map: Record<string, string> = { "": pastel.strawberry, flavours: pastel.butter, story: pastel.lilac, recipes: pastel.peach, partner: pastel.mint, "say-hello": pastel.sky, "ask-us": pastel.lilac };
  return map[seg[0] ?? ""] ?? pastel.strawberry;
}

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sound, setSound] = useState(false);
  const [locale, setLocaleState] = useState<Locale>("en");
  const [blobColor, setBlobColor] = useState(pastel.strawberry);
  const controls = useAnimationControls();
  const busy = useRef(false);
  const pending = useRef<string | null>(null);

  useEffect(() => {
    try {
      const l = localStorage.getItem("dc-locale") as Locale | null;
      if (l) setLocaleState(l);
    } catch {}
  }, []);

  useEffect(() => { document.documentElement.lang = locale; }, [locale]);

  const toggleSound = useCallback(() => {
    setSound((s) => {
      setSoundEnabled(!s);
      if (!s) setTimeout(() => play("pop"), 30);
      return !s;
    });
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try { localStorage.setItem("dc-locale", l); } catch {}
  }, []);

  const t = useCallback((k: DictKey) => translate(locale, k), [locale]);

  const navigate = useCallback(async (href: string) => {
    if (busy.current || href === pathname) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { router.push(href); return; }
    busy.current = true;
    pending.current = href.split("#")[0].split("?")[0];
    setBlobColor(pastelFor(href));
    play("whoosh");
    await controls.start({ y: "0%", scaleX: [1, 1.08, 1], transition: { y: { type: "spring", stiffness: 120, damping: 18, mass: 0.9 }, scaleX: { duration: 0.6, ease: "easeOut" } } });
    router.push(href);
    // safety release if pathname effect never fires (e.g. same-page hash)
    setTimeout(() => { if (busy.current) reveal(); }, 1500);
  }, [pathname, router, controls]); // eslint-disable-line react-hooks/exhaustive-deps

  const reveal = useCallback(async () => {
    window.scrollTo(0, 0);
    await controls.start({ y: "-115%", scaleX: [1, 0.94, 1.04, 1], transition: { y: { type: "spring", stiffness: 90, damping: 16 }, scaleX: { duration: 0.7, ease: "easeOut" } } });
    controls.set({ y: "115%" });
    busy.current = false;
    pending.current = null;
  }, [controls]);

  useEffect(() => {
    if (busy.current && pending.current === pathname) reveal();
  }, [pathname, reveal]);

  return (
    <Ctx.Provider value={{ sound, toggleSound, locale, setLocale, t, navigate }}>
      {children}
      {/* scoop-shaped transition blob */}
      <motion.div
        aria-hidden
        initial={{ y: "115%" }}
        animate={controls}
        className="pointer-events-none fixed inset-x-[-10vw] top-[-12vh] z-[9990] h-[124vh]"
        style={{ willChange: "transform" }}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
          <path d="M0 14 C 12 0, 26 0, 36 8 C 46 -2, 62 -2, 70 8 C 80 0, 94 2, 100 12 L100 88 C 90 100, 74 100, 64 92 C 54 100, 40 100, 30 92 C 20 100, 6 98, 0 88 Z" fill={blobColor} />
        </svg>
      </motion.div>
    </Ctx.Provider>
  );
}

// Utility for imperative springy wobble of an element (used by a few components).
export const wobble = (el: HTMLElement) =>
  animate(el, { scaleX: [1, 1.12, 0.94, 1.03, 1], scaleY: [1, 0.88, 1.06, 0.98, 1] }, { duration: 0.6 });
