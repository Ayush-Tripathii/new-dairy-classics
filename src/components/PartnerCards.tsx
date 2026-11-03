"use client";

import { motion } from "framer-motion";

const cards = [
  { emoji: "🏪", text: "In leading stores, parlours and cafés.", color: "#FFF0B5" },
  { emoji: "📦", text: "Retail and wholesale availability.", color: "#FFD9E1" },
  { emoji: "🤝", text: "Partnering with top food chains.", color: "#E7DEFF" },
];

export default function PartnerCards() {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {cards.map((c, i) => (
        <motion.li
          key={c.text}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 260, damping: 16 }}
          whileHover={{ y: -12, scaleX: 1.03, scaleY: 0.98, transition: { type: "spring", stiffness: 400, damping: 8 } }}
          className="clay rounded-[40px] p-8"
          style={{ background: c.color }}
        >
          <span className="clay grid h-20 w-20 place-items-center rounded-[28px] text-5xl" aria-hidden>{c.emoji}</span>
          <p className="mt-6 font-display text-3xl font-bold leading-tight">{c.text}</p>
        </motion.li>
      ))}
    </ul>
  );
}
