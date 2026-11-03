"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconWhatsApp } from "./Icons";
import { site, wa } from "@/data/site";
import { useApp } from "./AppProvider";
import { play } from "@/lib/sound";

// Puffy floating WhatsApp bubble, parked above the dock / tab bar.
export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const { t } = useApp();

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [open]);

  return (
    <div className="fixed bottom-[96px] right-4 z-50 md:bottom-28 md:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={t("whatsapp.title")}
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 10 }}
            transition={{ type: "spring", stiffness: 420, damping: 22 }}
            style={{ transformOrigin: "bottom right" }}
            className="clay absolute bottom-20 right-0 w-72 rounded-[28px] p-4"
          >
            <p className="font-display text-xl font-bold">{t("whatsapp.title")} 👋</p>
            <p className="mb-3 text-sm text-plum/70">{t("whatsapp.sub")}</p>
            <div className="space-y-2">
              {site.whatsapp.map((w, i) => (
                <motion.a
                  key={w.city}
                  href={wa(w.number)}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.08 }}
                  className="block rounded-[20px] rounded-bl-md bg-mint px-4 py-3 hover:bg-[#b7ecd4]"
                >
                  <span className="block text-xs font-semibold uppercase tracking-wide text-plum/60">{w.city}</span>
                  <span className="font-display text-lg font-bold">{w.number}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="bob"><motion.button
        onClick={() => { setOpen((o) => !o); play("boop"); }}
        aria-expanded={open}
        aria-label="WhatsApp us"
        data-cursor="button"
        className="grid h-16 w-16 place-items-center rounded-full bg-whatsapp text-white shadow-[inset_0_-6px_0_rgba(0,0,0,0.12),inset_0_4px_10px_rgba(255,255,255,0.5),0_16px_30px_-10px_rgba(37,211,102,0.7)]"
        whileHover={{ scaleX: 1.12, scaleY: 0.9 }}
        whileTap={{ scaleX: 1.2, scaleY: 0.8 }}
        transition={{ type: "spring", stiffness: 500, damping: 12 }}
      >
        <IconWhatsApp className="h-8 w-8" />
      </motion.button></div>
    </div>
  );
}
