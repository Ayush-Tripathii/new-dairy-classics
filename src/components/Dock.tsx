"use client";

import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import TLink from "./TLink";
import { useApp } from "./AppProvider";
import { IconCone, IconHello, IconHome, IconPartner, IconRecipes, IconStory } from "./Icons";
import { categories } from "@/data/products";
import type { DictKey } from "@/i18n/dictionaries";

const items: { href: string; key: DictKey; Icon: (p: { className?: string }) => React.ReactElement }[] = [
  { href: "/", key: "nav.home", Icon: IconHome },
  { href: "/flavours", key: "nav.flavours", Icon: IconCone },
  { href: "/story", key: "nav.story", Icon: IconStory },
  { href: "/recipes", key: "nav.recipes", Icon: IconRecipes },
  { href: "/partner", key: "nav.partner", Icon: IconPartner },
  { href: "/say-hello", key: "nav.hello", Icon: IconHello },
];

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));

function DockItem({ item, mouseX, active, onEnter }: { item: (typeof items)[number]; mouseX: MotionValue<number>; active: boolean; onEnter: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useApp();
  const dist = useTransform(mouseX, (x) => {
    const r = ref.current?.getBoundingClientRect();
    return r ? x - (r.left + r.width / 2) : Infinity;
  });
  const sizeRaw = useTransform(dist, [-160, 0, 160], [52, 84, 52]);
  const size = useSpring(sizeRaw, { stiffness: 320, damping: 16, mass: 0.4 });
  const [hover, setHover] = useState(false);

  return (
    <motion.div ref={ref} style={{ width: size, height: size }} className="relative flex items-end justify-center" onMouseEnter={() => { setHover(true); onEnter(); }} onMouseLeave={() => setHover(false)}>
      <AnimatePresence>
        {hover && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            className="pointer-events-none absolute -top-10 whitespace-nowrap rounded-full bg-plum px-3 py-1 text-xs font-semibold text-white"
          >
            {t(item.key)}
          </motion.span>
        )}
      </AnimatePresence>
      <TLink href={item.href} aria-label={t(item.key)} aria-current={active ? "page" : undefined} className="grid h-full w-full place-items-center rounded-[30%] bg-white/70 shadow-[inset_0_2px_4px_#fff,0_6px_14px_-6px_rgba(42,26,60,0.3)]">
        <item.Icon className="h-[62%] w-[62%]" />
      </TLink>
      {active && (
        <motion.span
          layoutId="dock-dot"
          className="absolute -bottom-2.5 h-1.5 w-1.5 rounded-full bg-berry"
          animate={{ y: [0, -5, 0] }}
          transition={{ y: { repeat: Infinity, duration: 0.9, ease: "easeInOut" } }}
        />
      )}
    </motion.div>
  );
}

export default function Dock() {
  const path = usePathname();
  const { t } = useApp();
  const mouseX = useMotionValue(Infinity);
  const [tray, setTray] = useState(false);

  return (
    <>
      {/* Desktop: macOS-style dock */}
      <nav aria-label="Main" className="fixed bottom-5 left-1/2 z-50 hidden -translate-x-1/2 md:block" onMouseLeave={() => { mouseX.set(Infinity); setTray(false); }}>
        <AnimatePresence>
          {tray && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className="glass absolute bottom-[calc(100%+14px)] left-1/2 grid w-[520px] -translate-x-1/2 grid-cols-3 gap-3 rounded-[32px] p-4"
              onMouseEnter={() => setTray(true)}
            >
              {categories.map((c, i) => (
                <motion.div key={c.slug} initial={{ opacity: 0, y: 14, rotate: -6 }} animate={{ opacity: 1, y: 0, rotate: i % 2 ? 2 : -2 }} transition={{ delay: i * 0.035, type: "spring", stiffness: 500, damping: 18 }} whileHover={{ rotate: 0, scale: 1.06 }}>
                  <TLink href={`/flavours/${c.slug}`} className="sticker block rounded-[22px] px-4 py-4 text-center font-display text-lg font-bold" style={{ background: c.color }}>
                    {c.name}
                  </TLink>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="glass flex h-[78px] items-end gap-3 rounded-[30px] px-4 pb-3" onMouseMove={(e) => mouseX.set(e.clientX)}>
          {items.map((it) => (
            <DockItem key={it.href} item={it} mouseX={mouseX} active={isActive(path, it.href)} onEnter={() => setTray(it.href === "/flavours")} />
          ))}
        </div>
      </nav>

      {/* Mobile: bottom tab bar */}
      <nav aria-label="Main" className="glass fixed inset-x-2 bottom-2 z-50 flex justify-between rounded-[26px] px-2 py-1.5 md:hidden" style={{ paddingBottom: "max(6px, env(safe-area-inset-bottom))" }}>
        {items.map((it) => {
          const active = isActive(path, it.href);
          return (
            <TLink key={it.href} href={it.href} aria-current={active ? "page" : undefined} className="relative flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-1">
              <motion.span whileTap={{ scale: 0.8 }} animate={active ? { y: [0, -4, 0] } : { y: 0 }} transition={{ y: { duration: 0.45, ease: "easeOut" }, scale: { type: "spring", stiffness: 500, damping: 12 } }}>
                <it.Icon className="h-7 w-7" />
              </motion.span>
              <span className={`text-[10px] font-semibold ${active ? "text-berry" : "text-plum/70"}`}>{t(it.key)}</span>
            </TLink>
          );
        })}
      </nav>
    </>
  );
}
