"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  /** revealed underneath when the corner peels */
  hidden?: React.ReactNode;
  color?: string;
  rotate?: number;
  className?: string;
  shape?: "squircle" | "circle" | "pill";
}

// Die-cut sticker: thick white outline, soft shadow, and a bottom-right corner that
// peels up on hover/focus to reveal a hidden line underneath.
export default function StickerCard({ children, hidden, color = "#fff", rotate = 0, className = "", shape = "squircle" }: Props) {
  const radius = shape === "circle" ? "rounded-full" : shape === "pill" ? "rounded-full" : "rounded-[36px]";
  return (
    <motion.div
      className={`group relative [filter:drop-shadow(0_16px_18px_rgba(42,26,60,0.16))] ${className}`}
      style={{ rotate }}
      whileHover={{ rotate: rotate * 0.3, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 14 }}
      tabIndex={hidden ? 0 : undefined}
    >
      {hidden && (
        <div className={`absolute inset-0 ${radius} flex items-end justify-end bg-white/60 p-5 text-right`} aria-hidden={false}>
          <span className="max-w-[52%] text-sm font-semibold leading-snug text-plum/80">{hidden}</span>
        </div>
      )}
      <div
        className={`sticker relative h-full ${hidden ? "shadow-none!" : ""} ${radius} transition-[clip-path] duration-500 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] ${hidden ? "[clip-path:polygon(0_0,100%_0,100%_100%,100%_100%,0_100%)] group-hover:[clip-path:polygon(0_0,100%_0,100%_30%,40%_100%,0_100%)] group-focus-visible:[clip-path:polygon(0_0,100%_0,100%_30%,40%_100%,0_100%)]" : ""}`}
        style={{ background: color }}
      >
        {children}
      </div>
      {hidden && (
        // the peeled flap
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-0 h-[70%] w-[60%] origin-bottom-right scale-0 opacity-0 transition-all duration-500 [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        >
          <div
            className="absolute inset-0 shadow-[-8px_-8px_18px_-6px_rgba(42,26,60,0.25)]"
            style={{ background: "linear-gradient(135deg, #fff 0%, #f1edf5 60%, #e4dcec 100%)", clipPath: "polygon(100% 0, 0 100%, 100% 100%)", transform: "rotate(180deg)", transformOrigin: "center" }}
          />
        </div>
      )}
    </motion.div>
  );
}
