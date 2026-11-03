"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import FlipCard from "../FlipCard";
import { JellyNumber } from "../home/BigNumbers";
import { IMG_BASE } from "@/data/products";
import { rain } from "@/lib/sprinkles";
import { play } from "@/lib/sound";

const STOPS = 6;

function FounderSticker() {
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 12 }), sry = useSpring(ry, { stiffness: 150, damping: 12 });
  return (
    <div
      style={{ perspective: 800 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 24);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 24);
      }}
      onPointerLeave={() => { rx.set(0); ry.set(0); }}
    >
      <motion.div style={{ rotateX: srx, rotateY: sry }} className="relative mx-auto aspect-[4/5] w-56 rotate-[-3deg] overflow-hidden rounded-[40px] border-[8px] border-white bg-lilac shadow-[0_24px_40px_-16px_rgba(42,26,60,.4)] md:w-64">
        <Image src={IMG_BASE + "2025/03/founder.webp"} alt="Dairy Classic Founder & President" fill sizes="256px" className="object-cover" />
      </motion.div>
    </div>
  );
}

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex gap-3"><span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-berry" />{children}</li>
);

const stops: { year: string; title: string; color: string; body: React.ReactNode }[] = [
  {
    year: "1996", title: "It All Began", color: "#FFF0B5",
    body: (
      <>
        <p>We at Foreign Company Singapore Samarkand, under the brand Dairy Classic, have been delighting taste buds for 30 years.</p>
        <ul className="mt-5 space-y-2">
          <Bullet><b>Our Motto:</b> &ldquo;Healthy Living,&rdquo; from the very beginning.</Bullet>
          <Bullet><b>Our Drive:</b> quality, passion and the joy of ice cream.</Bullet>
          <Bullet><b>Our Reach:</b> bringing happiness to millions.</Bullet>
        </ul>
      </>
    ),
  },
  {
    year: "Leadership", title: "Founder's Vision", color: "#E7DEFF",
    body: (
      <>
        <FounderSticker />
        <p className="mt-6">Under the visionary leadership and expertise of our Founder &amp; President, Dairy Classic has built a trusted reputation over three decades.</p>
        <ul className="mt-5 space-y-2">
          <Bullet>Integrity &amp; Quality</Bullet>
          <Bullet>Innovation &amp; Growth</Bullet>
          <Bullet>Strong Presence across Uzbekistan&apos;s leading supermarkets and stores</Bullet>
        </ul>
        <p className="mt-5 rounded-2xl bg-white/70 p-4 text-sm font-semibold text-plum/60">[CLIENT TO PROVIDE: founder name and quote]</p>
      </>
    ),
  },
  {
    year: "Growth", title: "Bigger & Better", color: "#CDF2E2",
    body: (
      <>
        <ul className="space-y-2">
          <Bullet>Modernisation of our plant.</Bullet>
          <Bullet>Advanced technology for world-class production.</Bullet>
        </ul>
        <p className="inflated mt-6 font-display text-[clamp(56px,8vw,96px)] font-extrabold leading-none tabular-nums">
          <JellyNumber value={80000} format={(n) => n.toLocaleString("en-US")} suffix=" L" />
        </p>
        <div className="relative mt-4 aspect-[1024/560] overflow-hidden rounded-[28px] border-[6px] border-white">
          <Image src={IMG_BASE + "2025/03/developments-1024x560.webp"} alt="Dairy Classic's modernised production plant" fill sizes="(max-width: 768px) 90vw, 480px" className="object-cover" />
        </div>
        <p className="mt-5">Our 80,000-litre daily production capacity ensures we deliver nothing but the finest, most flavourful ice cream to our loyal customers.</p>
      </>
    ),
  },
  {
    year: "#1", title: "Loved by Uzbekistan", color: "#FFD9E1",
    body: <p className="font-display text-3xl font-bold leading-tight">Awarded #1 choice by our consumers. <span aria-hidden>💗</span></p>,
  },
  {
    year: "Purpose", title: "What Drives Us", color: "#D5E9FF",
    body: (
      <div className="grid gap-4 sm:grid-cols-2">
        <FlipCard
          label="Mission"
          className="h-[300px]"
          front={<div className="sticker flex h-full flex-col justify-end rounded-[32px] bg-berry p-6 text-white"><span className="text-5xl" aria-hidden>🎯</span><p className="mt-3 font-display text-4xl font-extrabold">Mission</p><p className="text-sm opacity-80">Flip me</p></div>}
          back={<div className="sticker h-full rounded-[32px] bg-white p-6"><p className="font-display text-2xl font-extrabold">Mission</p><ul className="mt-3 space-y-2 text-[15px]"><Bullet>Spreading the love for ice cream.</Bullet><Bullet>Bringing joy with every scoop.</Bullet><Bullet>Promoting healthy living through quality and innovation.</Bullet></ul></div>}
        />
        <FlipCard
          label="Vision"
          className="h-[300px]"
          front={<div className="sticker flex h-full flex-col justify-end rounded-[32px] bg-grape p-6 text-white"><span className="text-5xl" aria-hidden>🔭</span><p className="mt-3 font-display text-4xl font-extrabold">Vision</p><p className="text-sm opacity-80">Flip me</p></div>}
          back={<div className="sticker h-full rounded-[32px] bg-white p-6"><p className="font-display text-2xl font-extrabold">Vision</p><ul className="mt-3 space-y-1.5 text-[14px]"><Bullet>Deliver world-class flavours and quality.</Bullet><Bullet>Use cutting-edge manufacturing and technology.</Bullet><Bullet>Create value for customers, employees and society.</Bullet><Bullet>Achieve sustainable growth across all markets.</Bullet></ul></div>}
        />
      </div>
    ),
  },
];

export default function SweetRoad() {
  const wrap = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const ball = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 1000, h: 6000, mobile: false });
  const [reached, setReached] = useState(-1);
  const [len, setLen] = useState(1);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 55%", "end 70%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const dash = useTransform(progress, (p) => len * (1 - p));
  const squash = useMotionValue(1);

  useLayoutEffect(() => {
    const measure = () => {
      if (!wrap.current) return;
      setDims({ w: wrap.current.clientWidth, h: wrap.current.clientHeight, mobile: innerWidth < 768 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, []);

  // S-curve through each stop, alternating sides
  const { w, h, mobile } = dims;
  const seg = h / STOPS;
  const xAt = (i: number) => (i === STOPS ? 0.5 * w : mobile ? (i % 2 ? 0.16 : 0.06) * w : (i % 2 ? 0.7 : 0.3) * w);
  let d = `M ${xAt(0)} 0`;
  for (let i = 0; i < STOPS; i++) {
    const y0 = i * seg, y1 = (i + 1) * seg;
    d += ` C ${xAt(i)} ${y0 + seg * 0.5}, ${xAt(i + 1)} ${y1 - seg * 0.5}, ${xAt(i + 1)} ${y1}`;
  }

  useEffect(() => { if (pathRef.current) setLen(pathRef.current.getTotalLength()); }, [d]);

  const lastAngle = useRef(0);
  useMotionValueEvent(progress, "change", (p) => {
    const path = pathRef.current;
    if (!path || !ball.current) return;
    const L = path.getTotalLength();
    const at = Math.max(0, Math.min(1, p)) * L;
    const pt = path.getPointAtLength(at);
    const ahead = path.getPointAtLength(Math.min(L, at + 4));
    const ang = Math.atan2(ahead.y - pt.y, ahead.x - pt.x);
    const turn = Math.min(1, Math.abs(ang - lastAngle.current) * 12);
    lastAngle.current = ang;
    squash.set(1 + turn * 0.25);
    const s = squash.get();
    ball.current.style.transform = `translate3d(${pt.x - 28}px, ${pt.y - 28}px, 0) rotate(${p * 2400}deg) scale(${s}, ${2 - s})`;
    const stop = Math.floor(p * STOPS + 0.15) - 1;
    if (stop > reached) {
      setReached(stop);
      play("pop");
      animate(ball.current, { scale: [1, 1.35, 0.85, 1.1, 1] }, { duration: 0.5 });
      if (stop >= STOPS - 1) rain(200);
    }
  });

  return (
    <div ref={wrap} className="relative mx-auto max-w-[1300px] px-4" style={{ height: `${STOPS * (mobile ? 110 : 95)}vh` }}>
      <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
        <path d={d} fill="none" stroke="#2A1A3C" strokeOpacity=".07" strokeWidth={mobile ? 22 : 46} strokeLinecap="round" />
        <motion.path ref={pathRef} d={d} fill="none" stroke="#FF4F7B" strokeWidth={mobile ? 8 : 14} strokeLinecap="round" strokeDasharray={len} style={{ strokeDashoffset: dash }} />
        <motion.path d={d} fill="none" stroke="#fff" strokeWidth={mobile ? 2 : 4} strokeLinecap="round" strokeDasharray="1 26" style={{ strokeDashoffset: 0 }} />
      </svg>

      <div ref={ball} className="absolute left-0 top-0 z-20 h-14 w-14 rounded-full" aria-hidden
        style={{ background: "radial-gradient(circle at 34% 28%, #fff 0%, #FFB3C4 28%, #FF4F7B 72%, #D93A63 100%)", boxShadow: "0 14px 24px -8px rgba(255,79,123,.6)" }}>
        <span className="absolute left-3 top-3 h-1 w-3 rotate-45 rounded bg-butter" /><span className="absolute bottom-3 right-4 h-1 w-3 -rotate-12 rounded bg-grape" /><span className="absolute right-3 top-5 h-1 w-3 rotate-90 rounded bg-mint" />
      </div>

      {stops.map((s, i) => {
        const y = ((i + 1) / STOPS) * 100;
        const right = mobile ? true : i % 2 === 0;
        return (
          <div key={s.title} className="absolute z-10" style={{ top: `calc(${y}% - ${mobile ? 30 : 34}vh)`, left: mobile ? "22%" : right ? "40%" : "4%", right: mobile ? "0" : right ? "4%" : "40%" }}>
            <motion.article
              initial={false}
              animate={reached >= i ? { opacity: 1, scale: 1, y: 0, rotate: right ? 1.5 : -1.5 } : { opacity: 0, scale: 0.6, y: 60, rotate: right ? 8 : -8 }}
              transition={{ type: "spring", stiffness: 260, damping: 15 }}
              className="sticker rounded-[40px] p-6 md:p-9"
              style={{ background: s.color }}
            >
              <p className="font-display text-lg font-bold text-berry">Stop {i + 1} · {s.year}</p>
              <h2 className="font-display text-[clamp(32px,4.4vw,60px)] font-extrabold leading-[0.95] tracking-tight">{s.title}</h2>
              <div className="mt-5 text-lg leading-relaxed text-plum/85">{s.body}</div>
            </motion.article>
          </div>
        );
      })}

      {/* Finale */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex translate-y-1/2 flex-col items-center text-center">
        <motion.p
          initial={false}
          animate={reached >= STOPS - 1 ? { scale: 1, rotate: 0, opacity: 1 } : { scale: 0.3, rotate: -20, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 9 }}
          className="inflated font-display text-[clamp(160px,30vw,380px)] font-extrabold leading-[0.8]"
          style={{ "--puff": "#6A4CFF" } as React.CSSProperties}
        >
          30
        </motion.p>
      </div>
    </div>
  );
}
