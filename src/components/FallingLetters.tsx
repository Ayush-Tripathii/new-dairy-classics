"use client";

import { useMemo, useState } from "react";
import PhysicsPlayground, { type PhysicsItem } from "./PhysicsPlayground";

const colors = ["#FF4F7B", "#6A4CFF", "#FF8FAB", "#8E78FF", "#FF6F92", "#5B3FE6"];

// Giant D-A-I-R-Y C-L-A-S-S-I-C letters that rain into the footer and pile up.
export default function FallingLetters() {
  const [run, setRun] = useState(0);
  const items = useMemo<PhysicsItem[]>(
    () =>
      Array.from("DAIRYCLASSIC").map((ch, i) => ({
        id: `${ch}${i}-${run}`,
        w: ch === "I" ? 64 : 120,
        h: 140,
        label: ch,
        content: (
          <span className="inflated grid h-full w-full place-items-center font-display text-[150px] font-extrabold leading-none" style={{ "--puff": colors[i % colors.length] } as React.CSSProperties}>
            {ch}
          </span>
        ),
      })),
    [run]
  );

  return (
    <div className="relative">
      <PhysicsPlayground key={run} items={items} mobileCount={12} stagger={110} className="h-[340px] md:h-[420px]" scaleBelow={900} />
      <button
        onClick={() => setRun((r) => r + 1)}
        className="absolute right-0 top-0 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold shadow-sm hover:bg-white"
        data-cursor="button"
      >
        ↻ Reset
      </button>
      <span className="sr-only">Dairy Classic</span>
    </div>
  );
}
