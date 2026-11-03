"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// 3D flip card: hover (desktop) or tap / Enter (everyone) to flip. The back face may
// contain links, so flipping uses separate buttons rather than one wrapping button.
export default function FlipCard({ front, back, className = "", label }: { front: React.ReactNode; back: React.ReactNode; className?: string; label: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className={`[perspective:1400px] ${className}`} onMouseEnter={() => matchMedia("(hover: hover)").matches && setFlipped(true)} onMouseLeave={() => setFlipped(false)}>
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 16 }}
      >
        <div className="absolute inset-0 [backface-visibility:hidden]" aria-hidden={flipped}>
          {front}
          <button type="button" onClick={() => setFlipped(true)} tabIndex={flipped ? -1 : 0} className="absolute inset-0 rounded-[40px]" aria-label={`${label}: flip to see more`} data-cursor="button" />
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]" aria-hidden={!flipped}>
          {back}
          <button type="button" onClick={() => setFlipped(false)} tabIndex={flipped ? 0 : -1} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-plum/5 text-lg" aria-label={`${label}: flip back`}>↺</button>
        </div>
      </motion.div>
    </div>
  );
}
