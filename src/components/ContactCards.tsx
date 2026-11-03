"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { site, tel, wa } from "@/data/site";
import { play } from "@/lib/sound";

function CopyChip({ text, children }: { text: string; children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={async () => { try { await navigator.clipboard.writeText(text); setDone(true); play("pop"); setTimeout(() => setDone(false), 1600); } catch {} }}
      className="group/chip mt-1 flex w-full items-center justify-between gap-3 rounded-2xl bg-white/70 px-4 py-3 text-left font-semibold hover:bg-white"
      aria-label={`Copy ${text}`}
    >
      <span>{children}</span>
      <span className="shrink-0 text-xs font-bold uppercase text-grape" aria-live="polite">{done ? "Copied ✓" : "Copy"}</span>
    </button>
  );
}

const Row = ({ href, children, ext }: { href: string; children: React.ReactNode; ext?: boolean }) => (
  <a href={href} target={ext ? "_blank" : undefined} rel={ext ? "noopener noreferrer" : undefined} className="mt-1 flex items-center justify-between gap-3 rounded-2xl bg-white/70 px-4 py-3 font-semibold hover:bg-white">
    <span>{children}</span><span aria-hidden className="text-grape">→</span>
  </a>
);

export default function ContactCards() {
  const cards = [
    { title: "Visit", emoji: "📍", color: "#FFF0B5", body: <><CopyChip text={`${site.address.line}, ${site.address.city}, ${site.address.country}`}>{site.address.line}, {site.address.city}, {site.address.country}</CopyChip><p className="mt-2 text-sm text-plum/60">Factory</p></> },
    { title: "Call", emoji: "📞", color: "#FFD9E1", body: <>{site.phones.map((p) => <Row key={p} href={tel(p)}>{p}</Row>)}</> },
    { title: "WhatsApp", emoji: "💬", color: "#CDF2E2", body: <>{site.whatsapp.map((w) => <Row key={w.city} href={wa(w.number)} ext><span className="block text-xs uppercase text-plum/60">{w.city}</span>{w.number}</Row>)}</> },
    { title: "Email", emoji: "✉️", color: "#D5E9FF", body: <><Row href={`mailto:${site.email}`}>{site.email}</Row><CopyChip text={site.email}>Copy address</CopyChip></> },
    { title: "Hours", emoji: "🕘", color: "#E7DEFF", body: <><p className="mt-1 rounded-2xl bg-white/70 px-4 py-3 font-semibold">Mon–Sat 09:00–20:00</p><p className="mt-1 rounded-2xl bg-white/40 px-4 py-3 font-semibold text-plum/60">Sunday: closed (we&apos;re eating ice cream)</p></> },
  ];
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c, i) => (
        <motion.li
          key={c.title}
          initial={{ opacity: 0, y: 40, rotate: i % 2 ? 4 : -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1 : -1 }}
          viewport={{ once: true }}
          whileHover={{ rotate: [i % 2 ? 1 : -1, -2, 2, -1, 0], scale: 1.02, transition: { duration: 0.5 } }}
          transition={{ delay: i * 0.07, type: "spring", stiffness: 300, damping: 16 }}
          className="sticker rounded-[36px] p-6"
          style={{ background: c.color }}
        >
          <p className="flex items-center gap-2 font-display text-3xl font-extrabold"><span aria-hidden>{c.emoji}</span>{c.title}</p>
          <div className="mt-3">{c.body}</div>
        </motion.li>
      ))}
    </ul>
  );
}
