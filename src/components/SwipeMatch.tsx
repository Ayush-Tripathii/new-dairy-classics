"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { byName, matchMap, productHref, type Product, type Taste } from "@/data/products";
import ProductImage from "./ProductImage";
import JellyButton from "./JellyButton";
import TLink from "./TLink";
import { burst, rain } from "@/lib/sprinkles";
import { play } from "@/lib/sound";

const cards: { taste: Taste; q: string; emoji: string[]; color: string }[] = [
  { taste: "chocolate", q: "Chocolate lover?", emoji: ["🍫", "🤎", "🍫"], color: "#FFDCC8" },
  { taste: "fruity", q: "Fruity & tangy?", emoji: ["🍓", "🍊", "🫐"], color: "#FFD9E1" },
  { taste: "nutty", q: "Nuts about nuts?", emoji: ["🥜", "🌰", "🥜"], color: "#FFF0B5" },
  { taste: "coffee", q: "Coffee person?", emoji: ["☕", "🫘", "☕"], color: "#E7DEFF" },
  { taste: "vanilla", q: "Classic vanilla?", emoji: ["🍦", "🤍", "🍦"], color: "#D5E9FF" },
  { taste: "biscuit", q: "Crunchy biscuit?", emoji: ["🍪", "😋", "🍪"], color: "#CDF2E2" },
];

function pickMatches(liked: Taste[]): Product[] {
  const pools = (liked.length ? liked : (["vanilla", "chocolate", "fruity"] as Taste[])).map((t) => [...matchMap[t]].sort(() => Math.random() - 0.5));
  const out: Product[] = [];
  for (let round = 0; out.length < 3 && round < 10; round++) {
    for (const pool of pools) {
      const name = pool[round];
      const p = name && byName(name);
      if (p && !out.includes(p)) out.push(p);
      if (out.length === 3) break;
    }
  }
  return out;
}

export default function SwipeMatch() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [liked, setLiked] = useState<Taste[]>([]);
  const [result, setResult] = useState<Product[] | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const decide = (like: boolean) => {
    if (idx >= cards.length) return;
    play(like ? "pop" : "boop");
    setDir(like ? 1 : -1);
    const nextLiked = like ? [...liked, cards[idx].taste] : liked;
    setLiked(nextLiked);
    const n = idx + 1;
    setIdx(n);
    if (n >= cards.length) finish(nextLiked);
  };
  const finish = (l = liked) => {
    setResult(pickMatches(l));
    setTimeout(() => { rain(160); const r = resultRef.current?.getBoundingClientRect(); if (r) burst(r.left + r.width / 2, r.top + 80, { count: 60, power: 14 }); }, 150);
  };
  const reset = () => { setIdx(0); setLiked([]); setResult(null); };

  const share = async () => {
    if (!result) return;
    const text = `My Dairy Classic flavour match: ${result.map((p) => p.name).join(", ")} 🍦`;
    try {
      if (navigator.share) await navigator.share({ title: "My Dairy Classic match", text, url: location.origin });
      else { await navigator.clipboard.writeText(`${text} ${location.origin}`); alert("Copied! Paste it anywhere 💌"); }
    } catch {}
  };

  return (
    <section className="px-4 py-28 md:py-36" data-flood="#E7DEFF" aria-labelledby="match-title">
      <div className="mx-auto max-w-[1100px] text-center">
        <h2 id="match-title" className="font-display text-big font-extrabold">Flavour Match</h2>
        <p className="mt-4 text-lg text-plum/75 md:text-xl">Not sure what to pick? Let&apos;s find your match.</p>

        <div className="relative mx-auto mt-12 min-h-[500px]">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div key="deck" exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center">
                <div className="relative h-[400px] w-[300px] md:h-[440px] md:w-[340px]" role="group" aria-label={`Question ${Math.min(idx + 1, 6)} of 6`}>
                  <AnimatePresence custom={dir}>
                  {cards.map((c, i) => i >= idx && i < idx + 3 && (
                    <SwipeCard key={c.taste} card={c} depth={i - idx} onDecide={decide} />
                  )).reverse()}
                  </AnimatePresence>
                </div>
                <div className="mt-8 flex items-center gap-5">
                  <motion.button whileTap={{ scale: 0.85 }} onClick={() => decide(false)} aria-label="Skip" className="clay grid h-16 w-16 place-items-center rounded-full text-2xl" data-cursor="button">✕</motion.button>
                  <span className="min-w-14 font-display text-lg font-bold tabular-nums text-plum/60" aria-live="polite">{Math.min(idx + 1, 6)}/6</span>
                  <motion.button whileTap={{ scale: 0.85 }} onClick={() => decide(true)} aria-label="Love it" className="grid h-16 w-16 place-items-center rounded-full bg-berry text-2xl text-white shadow-[inset_0_-5px_0_rgba(0,0,0,.12),0_12px_24px_-8px_rgba(255,79,123,.6)]" data-cursor="button">💗</motion.button>
                </div>
                <p className="mt-4 text-sm text-plum/60">Swipe right for 💗, left to skip — or use ← → keys.</p>
                {idx >= 4 && idx < cards.length && (
                  <button onClick={() => finish()} className="mt-3 text-sm font-semibold text-grape underline underline-offset-4">Show my match now</button>
                )}
              </motion.div>
            ) : (
              <motion.div key="result" ref={resultRef} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16 }}>
                <p className="inflated font-display text-[clamp(48px,8vw,110px)] font-extrabold leading-none">It&apos;s a match!</p>
                <ul className="mt-10 grid gap-5 sm:grid-cols-3">
                  {result.map((p, i) => (
                    <motion.li key={p.slug} initial={{ y: 60, opacity: 0, rotate: (i - 1) * 8 }} animate={{ y: 0, opacity: 1, rotate: (i - 1) * 3 }} transition={{ delay: 0.2 + i * 0.12, type: "spring", stiffness: 300, damping: 14 }}>
                      <TLink href={productHref(p)} className="sticker block rounded-[36px] bg-white p-5 transition-transform hover:-translate-y-1">
                        <div className="relative mx-auto h-44 w-44"><ProductImage product={p} sizes="180px" /></div>
                        <p className="mt-3 font-display text-xl font-bold">{p.name}</p>
                      </TLink>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <JellyButton onClick={share}>Share my match</JellyButton>
                  <JellyButton href="/partner#where" variant="white">Where to buy</JellyButton>
                  <JellyButton onClick={reset} variant="ghost">Play again</JellyButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <KeyHandler active={!result} onKey={decide} />
    </section>
  );
}

function KeyHandler({ active, onKey }: { active: boolean; onKey: (like: boolean) => void }) {
  const cb = useRef(onKey);
  cb.current = onKey;
  useEffect(() => {
    if (!active) return;
    const h = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest?.("[aria-labelledby=match-title]")) return;
      if (e.key === "ArrowRight") { e.preventDefault(); cb.current(true); }
      if (e.key === "ArrowLeft") { e.preventDefault(); cb.current(false); }
    };
    addEventListener("keydown", h);
    return () => removeEventListener("keydown", h);
  }, [active]);
  return null;
}

function SwipeCard({ card, depth, onDecide }: { card: (typeof cards)[number]; depth: number; onDecide: (like: boolean) => void }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-22, 22]);
  const likeOpacity = useTransform(x, [20, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -20], [1, 0]);
  const top = depth === 0;
  const floaties = useMemo(() => card.emoji.map((e, i) => ({ e, x: [18, 62, 40][i], y: [20, 30, 58][i], s: [64, 52, 80][i] })), [card]);

  return (
    <motion.div
      className="absolute inset-0 touch-pan-y"
      style={{ x, rotate, zIndex: 10 - depth }}
      initial={{ scale: 0.9, y: 30 }}
      animate={{ scale: 1 - depth * 0.05, y: depth * 16 }}
      variants={{ gone: (d: number) => ({ x: d * 600, opacity: 0, rotate: d * 30, transition: { duration: 0.35 } }) }}
      exit="gone"
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      drag={top ? "x" : false}
      dragSnapToOrigin={false}
      onDragEnd={(_, info) => {
        const fling = info.offset.x + info.velocity.x * 0.2;
        if (Math.abs(fling) > 130) {
          animate(x, fling > 0 ? 700 : -700, { duration: 0.3 });
          onDecide(fling > 0);
        } else animate(x, 0, { type: "spring", stiffness: 500, damping: 20 });
      }}
      data-cursor={top ? "grab" : undefined}
    >
      <div className="sticker relative flex h-full flex-col justify-end overflow-hidden rounded-[44px] p-7 text-left" style={{ background: card.color }}>
        {floaties.map((f, i) => (
          <motion.span key={i} aria-hidden className="absolute select-none" style={{ left: `${f.x}%`, top: `${f.y}%`, fontSize: f.s }} animate={{ y: [0, -10, 0], rotate: [0, i % 2 ? 8 : -8, 0] }} transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut" }}>
            {f.e}
          </motion.span>
        ))}
        <p className="relative font-display text-4xl font-extrabold leading-[0.95] tracking-tight md:text-5xl">{card.q}</p>
        <motion.span style={{ opacity: likeOpacity }} className="absolute left-6 top-6 -rotate-12 rounded-2xl border-4 border-berry px-3 py-1 font-display text-2xl font-extrabold text-berry">YUM 💗</motion.span>
        <motion.span style={{ opacity: nopeOpacity }} className="absolute right-6 top-6 rotate-12 rounded-2xl border-4 border-plum/50 px-3 py-1 font-display text-2xl font-extrabold text-plum/60">NAH</motion.span>
      </div>
    </motion.div>
  );
}
