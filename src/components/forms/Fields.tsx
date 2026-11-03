"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { categories } from "@/data/products";
import { play } from "@/lib/sound";

// Re-triggers the gentle shake whenever `error` (or the submit attempt) changes.
function useShake(error: string | undefined, attempt: number) {
  const [k, setK] = useState(0);
  useEffect(() => { if (error) setK((x) => x + 1); }, [error, attempt]);
  return k;
}

const inputCls = "w-full rounded-[22px] border-2 bg-white px-5 py-4 text-lg outline-none transition-colors placeholder:text-plum/35 focus:border-grape";

export function Field({ id, label, error, attempt, textarea, ...rest }: { id: string; label: string; error?: string; attempt: number; textarea?: boolean } & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const k = useShake(error, attempt);
  const props = { id, name: id, "aria-invalid": !!error, "aria-describedby": error ? `${id}-err` : undefined, className: `${inputCls} ${error ? "border-berry" : "border-transparent shadow-[inset_0_2px_6px_rgba(42,26,60,.06)]"}`, ...rest };
  return (
    <div key={k} className={error ? "shake" : ""}>
      <label htmlFor={id} className="mb-2 block font-display text-lg font-bold">{label}</label>
      {textarea ? <textarea rows={5} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} /> : <input {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />}
      {error && <p id={`${id}-err`} className="mt-1.5 text-sm font-semibold text-berry">{error}</p>}
    </div>
  );
}

export function PillChoice({ name, label, options, value, onChange, error, attempt }: { name: string; label: string; options: string[]; value: string; onChange: (v: string) => void; error?: string; attempt: number }) {
  const k = useShake(error, attempt);
  return (
    <fieldset key={k} className={error ? "shake" : ""} aria-describedby={error ? `${name}-err` : undefined}>
      <legend className="mb-2 font-display text-lg font-bold">{label}</legend>
      <div className="flex flex-wrap gap-2 rounded-[26px] bg-white p-1.5 shadow-[inset_0_2px_6px_rgba(42,26,60,.06)]">
        {options.map((o) => {
          const on = value === o;
          return (
            <label key={o} className="relative cursor-pointer">
              <input type="radio" name={name} value={o} checked={on} onChange={() => { onChange(o); play("pop"); }} className="peer sr-only" />
              {on && <motion.span layoutId={`pill-${name}`} className="absolute inset-0 rounded-full bg-plum" transition={{ type: "spring", stiffness: 500, damping: 30 }} />}
              <span className={`relative block rounded-full px-4 py-2.5 font-semibold transition-colors peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-grape ${on ? "text-white" : "text-plum/75 hover:text-plum"}`}>{o}</span>
            </label>
          );
        })}
      </div>
      {error && <p id={`${name}-err`} className="mt-1.5 text-sm font-semibold text-berry">{error}</p>}
    </fieldset>
  );
}

export function CategoryStickers({ value, onChange, label }: { value: string[]; onChange: (v: string[]) => void; label: string }) {
  return (
    <fieldset>
      <legend className="mb-2 font-display text-lg font-bold">{label}</legend>
      <div className="flex flex-wrap gap-3">
        {categories.map((c, i) => {
          const on = value.includes(c.name);
          return (
            <label key={c.slug} className="cursor-pointer">
              <input type="checkbox" className="peer sr-only" checked={on} onChange={() => { onChange(on ? value.filter((v) => v !== c.name) : [...value, c.name]); play("pop"); }} />
              <motion.span
                animate={on ? { rotate: i % 2 ? 3 : -3, scale: 1.06 } : { rotate: 0, scale: 1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 500, damping: 12 }}
                className={`block rounded-[18px] border-4 px-4 py-2.5 font-display font-bold peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-grape ${on ? "border-white shadow-[0_10px_18px_-8px_rgba(42,26,60,.35)]" : "border-transparent opacity-70"}`}
                style={{ background: c.color }}
              >
                {on ? "✓ " : ""}{c.name}
              </motion.span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export const countries = [
  { code: "+998", name: "Uzbekistan", flag: "🇺🇿" },
  { code: "+7", name: "Kazakhstan", flag: "🇰🇿" },
  { code: "+996", name: "Kyrgyzstan", flag: "🇰🇬" },
  { code: "+992", name: "Tajikistan", flag: "🇹🇯" },
  { code: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+993", name: "Turkmenistan", flag: "🇹🇲" },
  { code: "+90", name: "Türkiye", flag: "🇹🇷" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+1", name: "USA / Canada", flag: "🇺🇸" },
];

export function PhoneField({ error, attempt, label, required, country = true }: { error?: string; attempt: number; label: string; required?: boolean; country?: boolean }) {
  const k = useShake(error, attempt);
  return (
    <div key={k} className={error ? "shake" : ""}>
      <label htmlFor="phone" className="mb-2 block font-display text-lg font-bold">{label}</label>
      <div className="flex gap-2">
        {country ? (
          <select name="cc" aria-label="Country code" defaultValue="Uzbekistan" className={`${inputCls} w-[44%] max-w-[190px] border-transparent shadow-[inset_0_2px_6px_rgba(42,26,60,.06)]`}>
            {countries.map((c) => <option key={c.name} value={c.name}>{c.flag} {c.code} {c.name}</option>)}
          </select>
        ) : (
          <span className={`${inputCls} w-auto shrink-0 border-transparent`}>🇺🇿 +998</span>
        )}
        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="90 123 45 67" required={required} aria-invalid={!!error} aria-describedby={error ? "phone-err" : undefined} className={`${inputCls} ${error ? "border-berry" : "border-transparent shadow-[inset_0_2px_6px_rgba(42,26,60,.06)]"}`} />
      </div>
      {error && <p id="phone-err" className="mt-1.5 text-sm font-semibold text-berry">{error}</p>}
    </div>
  );
}

export const ccFor = (name: string) => countries.find((c) => c.name === name)?.code ?? "+998";
