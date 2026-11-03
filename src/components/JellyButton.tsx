"use client";

import { motion, useAnimationControls } from "framer-motion";
import { burstFrom } from "@/lib/sprinkles";
import { play } from "@/lib/sound";
import TLink from "./TLink";

type Variant = "primary" | "secondary" | "ghost" | "white";

interface Props {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  variant?: Variant;
  size?: "sm" | "md" | "lg" | "xl";
  sprinkles?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

const variants: Record<Variant, string> = {
  primary: "bg-berry text-white shadow-[inset_0_-6px_0_rgba(0,0,0,0.12),inset_0_4px_8px_rgba(255,255,255,0.45),0_14px_30px_-10px_rgba(255,79,123,0.65)]",
  secondary: "bg-grape text-white shadow-[inset_0_-6px_0_rgba(0,0,0,0.14),inset_0_4px_8px_rgba(255,255,255,0.35),0_14px_30px_-10px_rgba(106,76,255,0.6)]",
  white: "bg-white text-plum shadow-[inset_0_-5px_0_rgba(42,26,60,0.06),0_12px_28px_-12px_rgba(42,26,60,0.3)]",
  ghost: "bg-white/60 text-plum ring-2 ring-plum/10 backdrop-blur",
};
const sizes = { sm: "h-10 px-5 text-sm", md: "h-13 px-7 text-base", lg: "h-16 px-9 text-lg", xl: "h-28 px-14 text-3xl md:h-36 md:px-20 md:text-5xl" };

// Puffy pill: wobbles on hover, squishes on press, springs back.
export default function JellyButton({ children, href, external, onClick, variant = "primary", size = "md", sprinkles, type = "button", disabled, className = "", ariaLabel }: Props) {
  const controls = useAnimationControls();
  const cls = `jelly relative inline-flex select-none items-center justify-center gap-2 rounded-full font-display font-bold tracking-tight ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50" : ""} ${className}`;

  const handlers = {
    onHoverStart: () => controls.start({ scaleX: [1, 1.06, 0.97, 1.02, 1], scaleY: [1, 0.94, 1.03, 0.99, 1], transition: { duration: 0.55 } }),
    whileTap: { scaleX: 1.12, scaleY: 0.84, transition: { type: "spring" as const, stiffness: 600, damping: 15 } },
    animate: controls,
    transition: { type: "spring" as const, stiffness: 400, damping: 10 },
  };

  const click = (e: React.MouseEvent) => {
    play("pop");
    if (sprinkles || variant === "primary") burstFrom(e.currentTarget, { count: 18, power: 7 });
    onClick?.(e);
  };

  const inner = <span className="relative z-10 inline-flex items-center gap-2">{children}</span>;
  const shine = <span aria-hidden className="pointer-events-none absolute inset-x-[12%] top-[10%] h-[30%] rounded-full bg-white/35 blur-[2px]" />;

  if (href && !external) {
    return (
      <motion.span className="inline-flex" {...handlers}>
        <TLink href={href} className={cls} onClick={click} aria-label={ariaLabel} data-cursor="button">
          {shine}{inner}
        </TLink>
      </motion.span>
    );
  }
  if (href) {
    return (
      <motion.a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={click} aria-label={ariaLabel} data-cursor="button" {...handlers}>
        {shine}{inner}
      </motion.a>
    );
  }
  return (
    <motion.button type={type} disabled={disabled} className={cls} onClick={click} aria-label={ariaLabel} data-cursor="button" {...handlers}>
      {shine}{inner}
    </motion.button>
  );
}
