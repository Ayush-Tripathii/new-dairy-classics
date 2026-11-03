"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CategoryStickers, Field, PhoneField, PillChoice, ccFor } from "./Fields";
import JellyButton from "../JellyButton";
import { validate, type FormKind } from "@/lib/validate";
import { burst, rain } from "@/lib/sprinkles";

export async function submitForm(kind: FormKind, form: HTMLFormElement, extra: Record<string, unknown>) {
  const fd = new FormData(form);
  const data: Record<string, string | string[]> = {};
  fd.forEach((v, k) => (data[k] = String(v)));
  if (data.phone) data.phone = `${ccFor(data.cc as string)} ${data.phone}`;
  Object.assign(data, extra);
  const errors = validate(kind, data);
  if (Object.keys(errors).length) return { ok: false as const, errors };
  try {
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind, ...data }) });
    const json = await res.json();
    return json.ok ? { ok: true as const } : { ok: false as const, errors: json.errors ?? { form: "Something went wrong. Please try again." } };
  } catch {
    return { ok: false as const, errors: { form: "Couldn't reach us — check your connection and try again." } };
  }
}

const roles = ["Retail Store", "Café or Parlour", "Food Chain", "Distributor", "Bulk Order"];

export default function PartnerForm() {
  const [role, setRole] = useState("");
  const [cats, setCats] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const ref = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttempt((a) => a + 1);
    setState("sending");
    const r = await submitForm("partner", e.currentTarget, { role, categories: cats.join(", ") });
    if (r.ok) {
      setState("done");
      rain(160);
      const b = ref.current?.getBoundingClientRect();
      if (b) burst(b.left + b.width / 2, b.top + 200, { count: 60, power: 14 });
    } else {
      setErrors(r.errors);
      setState("idle");
      ref.current?.querySelector<HTMLElement>("[aria-invalid=true], fieldset.shake input")?.focus();
    }
  };

  return (
    <div className="clay rounded-[48px] p-6 md:p-12">
      <AnimatePresence mode="wait">
        {state === "done" ? (
          <motion.div key="ok" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 14 }} className="py-16 text-center" role="status">
            <p className="text-7xl" aria-hidden>🤝</p>
            <p className="mt-4 font-display text-5xl font-extrabold">Sweet! We&apos;re on it.</p>
            <p className="mt-3 text-lg text-plum/75">Our partnerships team will get back to you soon.</p>
          </motion.div>
        ) : (
          <motion.form key="form" ref={ref} onSubmit={onSubmit} noValidate className="grid gap-7" exit={{ opacity: 0, scale: 0.95 }}>
            <PillChoice name="role" label="I am a…" options={roles} value={role} onChange={setRole} error={errors.role} attempt={attempt} />
            <div className="grid gap-6 md:grid-cols-2">
              <Field id="name" label="Name" autoComplete="name" error={errors.name} attempt={attempt} placeholder="Your name" />
              <Field id="company" label="Company" autoComplete="organization" attempt={attempt} placeholder="Shop, café or company" />
              <Field id="city" label="City" autoComplete="address-level2" error={errors.city} attempt={attempt} placeholder="Tashkent, Samarkand…" />
              <PhoneField label="Phone" error={errors.phone} attempt={attempt} required />
            </div>
            <CategoryStickers label="Categories you're interested in" value={cats} onChange={setCats} />
            <Field id="message" label="Message" textarea error={errors.message} attempt={attempt} placeholder="Volumes, locations, questions — anything helps." />
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            {errors.form && <p className="font-semibold text-berry" role="alert">{errors.form}</p>}
            <div><JellyButton type="submit" size="lg" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Let's partner up"}</JellyButton></div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
