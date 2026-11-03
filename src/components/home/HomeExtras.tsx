"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import FlipCard from "../FlipCard";
import JellyButton from "../JellyButton";
import UzMap from "./UzMap";
import TLink from "../TLink";
import { recipes } from "@/data/content";
import { IMG_BASE, byName } from "@/data/products";
import { burstFrom } from "@/lib/sprinkles";

export function FindUs() {
  return (
    <section className="px-4 py-28 md:px-8 md:py-36" data-flood="#CDF2E2" aria-labelledby="find-title">
      <div className="mx-auto max-w-[1400px] text-center">
        <h2 id="find-title" className="font-display text-big font-extrabold">Find Us Everywhere</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-plum/75 md:text-xl">Bringing smiles with every scoop, one indulgence at a time. Find us in leading stores, parlours and cafés.</p>
        <div className="mt-10"><UzMap /></div>
        <JellyButton href="/partner#where" variant="white">Where to buy</JellyButton>
      </div>
    </section>
  );
}

export function RecipeCard({ r }: { r: (typeof recipes)[number] }) {
  return (
    <FlipCard
      label={r.title}
      className="h-[420px]"
      front={
        <div className="sticker flex h-full flex-col rounded-[40px] p-6" style={{ background: r.color }}>
          <span className="w-fit rounded-full bg-white px-3 py-1 text-sm font-bold">⏱ {r.prep}</span>
          <div className="relative my-4 flex-1">{r.image && <Image src={IMG_BASE + r.image} alt="" fill sizes="300px" className="float-shadow object-contain" />}</div>
          <p className="font-display text-3xl font-extrabold leading-none">{r.title}</p>
          <p className="mt-2 text-sm text-plum/60">Tap or hover for ingredients</p>
        </div>
      }
      back={
        <div className="sticker flex h-full flex-col rounded-[40px] bg-white p-6">
          <p className="font-display text-2xl font-extrabold">You&apos;ll need</p>
          <ul className="mt-3 flex-1 space-y-2 text-plum/80">
            {r.ingredients.map((i) => <li key={i} className="flex gap-2"><span className="text-berry">●</span>{i}</li>)}
          </ul>
          <TLink href={`/recipes/${r.slug}`} className="font-semibold text-grape" onClick={(e) => e.stopPropagation()}>Full recipe →</TLink>
        </div>
      }
    />
  );
}

export function HomeRecipes() {
  return (
    <section className="px-4 py-28 md:px-8 md:py-36" data-flood="#FFDCC8" aria-labelledby="rec-title">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 id="rec-title" className="font-display text-big font-extrabold">Recipes</h2>
          <JellyButton href="/recipes" variant="white">All recipes</JellyButton>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {recipes.map((r) => <RecipeCard key={r.slug} r={r} />)}
        </div>
      </div>
    </section>
  );
}

// Polaroid wall: drag photos around the board; each tilts when picked up.
const polaroids = [
  { p: "Golden Fantasy", cap: "Golden hour, golden cone", c: "#FFF0B5" },
  { p: "Delizia", cap: "New drop, who dis?", c: "#FFD9E1" },
  { p: "Creamica Cheesecake", cap: "Cheesecake? In a cup?!", c: "#D5E9FF" },
  { p: "Sandwich", cap: "Lunch, technically", c: "#FFDCC8" },
  { p: "Classic Cassatta", cap: "Party starter", c: "#E7DEFF" },
  { p: "Mango", cap: "Mango season, always", c: "#CDF2E2" },
];

export function PolaroidWall() {
  const board = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number | null>(null);
  return (
    <section className="px-4 py-28 md:px-8 md:py-36" data-flood="#FFD9E1" aria-labelledby="share-title">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 text-center">
          <h2 id="share-title" className="font-display text-big font-extrabold">Share Your Moment</h2>
          <p className="mt-3 text-lg text-plum/75">Tag <a href="https://www.instagram.com/dairyclassic.uz/" target="_blank" rel="noopener noreferrer" className="font-bold text-berry">@dairyclassic.uz</a> — and go on, rearrange the board.</p>
        </div>
        <div ref={board} className="clay relative h-[620px] overflow-hidden rounded-[48px] bg-white/60 md:h-[560px]">
          {polaroids.map((x, i) => {
            const prod = byName(x.p)!;
            const col = i % 3, row = Math.floor(i / 3);
            const rot = [-7, 5, -3, 8, -5, 4][i];
            return (
              <motion.figure
                key={x.p}
                drag
                dragConstraints={board}
                dragElastic={0.2}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 15, power: 0.3 }}
                onPointerDown={() => setTop(i)}
                initial={{ rotate: rot }}
                whileDrag={{ scale: 1.08, rotate: rot * -1.4, boxShadow: "0 40px 50px -20px rgba(42,26,60,.35)" }}
                whileHover={{ scale: 1.03 }}
                className="absolute w-[150px] touch-none bg-white p-3 pb-10 shadow-[0_14px_24px_-10px_rgba(42,26,60,.3)] md:w-[210px]"
                style={{ left: `${6 + col * 31}%`, top: `${8 + row * 46}%`, zIndex: top === i ? 20 : i }}
                data-cursor="grab"
              >
                <div className="relative aspect-square" style={{ background: x.c }}>
                  {prod.image && <Image src={IMG_BASE + prod.image} alt={prod.name} fill sizes="210px" className="pointer-events-none object-contain p-3" draggable={false} />}
                </div>
                <figcaption className="absolute inset-x-3 bottom-2 truncate text-center font-display text-sm font-semibold">{x.cap}</figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="px-4 py-32 text-center md:px-8 md:py-44" data-flood="#FFF0B5" aria-labelledby="cta-title">
      <h2 id="cta-title" className="font-display text-big font-extrabold">Got a Craving or a Question?</h2>
      <p className="mx-auto mt-4 max-w-xl text-lg text-plum/75 md:text-xl">We&apos;d love to hear from you. Let&apos;s make every moment delicious.</p>
      <div className="mt-12" onMouseEnter={(e) => { const b = e.currentTarget.querySelector("a"); if (b) burstFrom(b, { count: 24, power: 9 }); }}>
        <JellyButton href="/say-hello" size="xl" sprinkles>SAY HELLO 👋</JellyButton>
      </div>
    </section>
  );
}
