"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";

// Spring-up bottom sheet; drag the handle (or anywhere) down to dismiss, Esc to close.
export default function BottomSheet({ open, onClose, children, label, color = "#fff" }: { open: boolean; onClose: () => void; children: React.ReactNode; label: string; color?: string }) {
  const controls = useDragControls();
  const panel = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement as HTMLElement;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    addEventListener("keydown", esc);
    document.documentElement.style.overflow = "hidden";
    setTimeout(() => panel.current?.focus(), 50);
    return () => {
      removeEventListener("keydown", esc);
      document.documentElement.style.overflow = "";
      lastFocus.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80]">
          <motion.div className="absolute inset-0 bg-plum/25 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            className="absolute inset-x-0 bottom-0 mx-auto max-h-[88vh] max-w-3xl overflow-y-auto rounded-t-[44px] px-6 pb-10 pt-3 shadow-[0_-20px_60px_-20px_rgba(42,26,60,.35)] outline-none md:px-10"
            style={{ background: color }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="y"
            dragControls={controls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.9 }}
            onDragEnd={(_, i) => { if (i.offset.y > 120 || i.velocity.y > 600) onClose(); }}
          >
            <div className="flex cursor-grab touch-none justify-center pb-4 pt-1 active:cursor-grabbing" onPointerDown={(e) => controls.start(e)}>
              <span className="h-1.5 w-14 rounded-full bg-plum/20" />
            </div>
            <button onClick={onClose} aria-label="Close" className="absolute right-5 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-lg">✕</button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
