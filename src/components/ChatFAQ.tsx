"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs, type FaqTopic } from "@/data/content";
import { play } from "@/lib/sound";

type Msg = { id: number; from: "me" | "dc"; text: string } | { id: number; from: "typing" };
const topics: FaqTopic[] = ["General", "Products", "Partnership", "Distributors"];

// FAQs as a messenger: tap a suggested question, watch the dots, get the answer.
export default function ChatFAQ() {
  const [topic, setTopic] = useState<FaqTopic | "All">("All");
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, from: "dc", text: "Hi! 👋 Ask us anything — pick a question below." }]);
  const [asked, setAsked] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  const ask = (q: string, a: string) => {
    if (busy) return;
    setBusy(true);
    setAsked((x) => [...x, q]);
    const me = nextId.current++, typing = nextId.current++, ans = nextId.current++;
    setMsgs((m) => [...m, { id: me, from: "me", text: q }]);
    play("boop");
    setTimeout(() => setMsgs((m) => [...m, { id: typing, from: "typing" }]), 350);
    setTimeout(() => {
      setMsgs((m) => [...m.filter((x) => x.id !== typing), { id: ans, from: "dc", text: a }]);
      play("pop");
      setBusy(false);
    }, 1300);
  };

  const suggestions = faqs.filter((f) => (topic === "All" || f.topic === topic) && !asked.includes(f.q));

  return (
    <div className="clay mx-auto flex h-[min(78vh,760px)] max-w-3xl flex-col overflow-hidden rounded-[44px]">
      <div className="flex items-center gap-3 border-b border-plum/5 bg-white px-6 py-4">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-strawberry text-2xl" aria-hidden>🍦</span>
        <div>
          <p className="font-display text-lg font-bold leading-none">Dairy Classic</p>
          <p className="text-sm text-plum/60"><span className="mr-1 inline-block h-2 w-2 rounded-full bg-whatsapp" />Online · replies instantly</p>
        </div>
      </div>

      <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto bg-cloud px-4 py-6 md:px-6" role="log" aria-live="polite" aria-label="Conversation">
        <AnimatePresence initial={false}>
          {msgs.map((m) => (
            <motion.div
              key={m.id}
              layout
              initial={{ opacity: 0, scale: 0.6, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 500, damping: 26 }}
              className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
              style={{ transformOrigin: m.from === "me" ? "bottom right" : "bottom left" }}
            >
              {m.from === "typing" ? (
                <span className="flex gap-1.5 rounded-[22px] rounded-bl-md bg-white px-5 py-4 shadow-sm" aria-label="Dairy Classic is typing">
                  {[0, 1, 2].map((i) => (
                    <motion.span key={i} className="h-2.5 w-2.5 rounded-full bg-plum/40" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.12 }} />
                  ))}
                </span>
              ) : (
                <p className={`max-w-[80%] rounded-[22px] px-5 py-3 text-[17px] leading-snug ${m.from === "me" ? "rounded-br-md bg-grape text-white" : "rounded-bl-md bg-white shadow-sm"}`}>
                  {m.text}
                </p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t border-plum/5 bg-white px-4 py-4 md:px-6">
        <div role="group" aria-label="Filter questions" className="no-scrollbar mb-3 flex gap-2 overflow-x-auto">
          {(["All", ...topics] as const).map((t) => (
            <button key={t} onClick={() => setTopic(t)} aria-pressed={topic === t} className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold ${topic === t ? "bg-plum text-white" : "bg-plum/5 text-plum/70 hover:bg-plum/10"}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex max-h-36 flex-wrap gap-2 overflow-y-auto">
          {suggestions.length ? suggestions.map((f) => (
            <motion.button key={f.q} layout whileTap={{ scale: 0.92 }} disabled={busy} onClick={() => ask(f.q, f.a)} className="rounded-[18px] rounded-br-md bg-lilac px-4 py-2 text-left font-semibold text-plum hover:bg-[#d9ccff] disabled:opacity-60">
              {f.q}
            </motion.button>
          )) : (
            <p className="text-sm text-plum/60">You&apos;ve asked everything here! Still curious? <a className="font-semibold text-grape underline" href="/say-hello">Say hello</a>.</p>
          )}
        </div>
      </div>
    </div>
  );
}
