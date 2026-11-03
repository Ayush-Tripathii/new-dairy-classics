"use client";

import { motion } from "framer-motion";
import TLink from "./TLink";
import { useApp } from "./AppProvider";
import { locales } from "@/i18n/dictionaries";
import { IconSound } from "./Icons";
import JellyButton from "./JellyButton";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-display sm:gap-2 font-extrabold tracking-tight ${className}`}>
      <svg viewBox="0 0 40 40" className="h-7 w-7 shrink-0 sm:h-9 sm:w-9" aria-hidden>
        <defs>
          <radialGradient id="lg-s" cx="35%" cy="30%" r="75%"><stop offset="0" stopColor="#FFE4EA" /><stop offset="1" stopColor="#FF4F7B" /></radialGradient>
        </defs>
        <path d="M12 19h16l-6.6 17.2a1.5 1.5 0 0 1-2.8 0Z" fill="#F5C66A" />
        <circle cx="20" cy="15" r="10" fill="url(#lg-s)" />
        <ellipse cx="16" cy="11" rx="3.6" ry="2" fill="#fff" opacity=".7" />
      </svg>
      <span className="whitespace-nowrap text-base leading-none sm:text-xl">Dairy<span className="text-berry"> Classic</span></span>
    </span>
  );
}

export default function Header() {
  const { sound, toggleSound, locale, setLocale, t } = useApp();
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 md:px-8">
      <a href="#main" className="sr-only rounded-full bg-grape px-4 py-2 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4">{t("skip")}</a>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between">
        <TLink href="/" aria-label="Dairy Classic — home" className="glass shrink-0 rounded-full px-3 py-2 sm:px-4">
          <Logo />
        </TLink>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div role="group" aria-label="Language" className="glass hidden items-center rounded-full p-1 sm:flex">
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => setLocale(l.code)}
                aria-pressed={locale === l.code}
                className="relative h-9 rounded-full px-3 text-sm font-semibold"
              >
                {locale === l.code && <motion.span layoutId="lang-pill" className="absolute inset-0 rounded-full bg-plum" transition={{ type: "spring", stiffness: 500, damping: 30 }} />}
                <span className={`relative ${locale === l.code ? "text-white" : "text-plum/70"}`}>{l.label}</span>
              </button>
            ))}
          </div>
          <select
            aria-label="Language"
            value={locale}
            onChange={(e) => setLocale(e.target.value as typeof locale)}
            className="glass h-11 w-[58px] rounded-full pl-2 text-sm font-semibold sm:hidden"
          >
            {locales.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
          </select>
          <motion.button
            onClick={toggleSound}
            whileTap={{ scale: 0.85 }}
            aria-pressed={sound}
            aria-label={sound ? t("sound.on") : t("sound.off")}
            title={sound ? t("sound.on") : t("sound.off")}
            className={`glass grid h-11 w-11 place-items-center rounded-full ${sound ? "text-berry" : "text-plum/60"}`}
          >
            <IconSound on={sound} className="h-5 w-5" />
          </motion.button>
          <JellyButton href="/partner#where" size="sm" className="!h-11 whitespace-nowrap !px-3.5 sm:!px-5">{t("nav.findUs")}</JellyButton>
        </div>
      </div>
    </header>
  );
}
