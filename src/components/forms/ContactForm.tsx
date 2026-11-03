"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CategoryStickers, Field, PhoneField } from "./Fields";
import { submitForm } from "./PartnerForm";
import JellyButton from "../JellyButton";
import { rain } from "@/lib/sprinkles";
import { play } from "@/lib/sound";

// Success: a scoop drops onto a cone, bounces, sprinkles fall.
function ScoopOnCone() {
  return (
    <div className="relative mx-auto h-56 w-40" aria-hidden>
      <motion.div
        className="absolute left-[calc(50%-48px)] top-0 h-24 w-24 rounded-full"
        style={{ background: "radial-gradient(circle at 34% 28%, #fff 0%, #FFB3C4 30%, #FF4F7B 75%)" }}
        initial={{ y: -320, scaleX: 1, scaleY: 1 }}
        animate={{ y: [-320, 34, 10, 30, 26], scaleX: [0.9, 1.3, 0.9, 1.08, 1], scaleY: [1.15, 0.7, 1.1, 0.95, 1] }}
        transition={{ duration: 1.1, times: [0, 0.45, 0.65, 0.85, 1], ease: "easeOut" }}
      />
      <svg viewBox="0 0 100 120" className="absolute bottom-0 left-[calc(50%-40px)] h-36 w-20">
        <path d="M6 10h88L54 116a4 4 0 0 1-8 0Z" fill="#F5C66A" />
        <path d="M20 22l40 40M40 14l38 38M16 46l26 26M60 14L26 48M84 18L40 62M80 40L50 70" stroke="#E29A2E" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function ContactForm() {
  const [cats, setCats] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const ref = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttempt((a) => a + 1);
    setState("sending");
    const r = await submitForm("contact", e.currentTarget, { interested: cats.join(", ") });
    if (r.ok) {
      setState("done");
      setTimeout(() => { rain(180); play("pop"); }, 500);
    } else {
      setErrors(r.errors);
      setState("idle");
      setTimeout(() => ref.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus(), 0);
    }
  };

  return (
    <div className="clay rounded-[48px] p-6 md:p-12">
      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-center" role="status">
            <ScoopOnCone />
            <p className="mt-6 font-display text-4xl font-extrabold md:text-5xl">Thank you for getting in touch!</p>
            <p className="mt-3 text-xl text-plum/75">Have a delicious day.</p>
          </motion.div>
        ) : (
          <motion.form key="form" ref={ref} onSubmit={onSubmit} noValidate className="grid gap-7" exit={{ opacity: 0, scale: 0.95 }}>
            <h2 className="font-display text-big font-extrabold">Talk to Us — Let&apos;s Discuss</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Field id="name" label="Name" autoComplete="name" error={errors.name} attempt={attempt} placeholder="Your name" />
              <Field id="email" label="Email" type="email" autoComplete="email" error={errors.email} attempt={attempt} placeholder="you@example.com" />
            </div>
            <PhoneField label="Phone (optional)" error={errors.phone} attempt={attempt} />
            <CategoryStickers label="Interested in" value={cats} onChange={setCats} />
            <Field id="message" label="Message" textarea error={errors.message} attempt={attempt} placeholder="Cravings, questions, compliments…" />
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            {errors.form && <p className="font-semibold text-berry" role="alert">{errors.form}</p>}
            <div><JellyButton type="submit" size="lg" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send it 💌"}</JellyButton></div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
