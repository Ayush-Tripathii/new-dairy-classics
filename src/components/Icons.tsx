"use client";

import { useId } from "react";

// Soft "clay" icons: rounded shapes, gradient body, inner highlight.
type P = { className?: string };

const Clay = ({ id, from, to }: { id: string; from: string; to: string }) => (
  <defs>
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor={from} />
      <stop offset="1" stopColor={to} />
    </linearGradient>
  </defs>
);

export const IconHome = ({ className }: P) => { const u = useId().replace(/[^a-zA-Z0-9]/g, ""); return (
  <svg viewBox="0 0 48 48" className={className} aria-hidden>
    <Clay id={u + "ih"} from="#FFB3C4" to="#FF4F7B" />
    <path d="M8 22 24 9l16 13v15a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4Z" fill={`url(#${u}ih)`} />
    <rect x="19" y="27" width="10" height="14" rx="4" fill="#FFF0B5" />
    <path d="M13 20 24 11" stroke="#fff" strokeOpacity=".6" strokeWidth="3" strokeLinecap="round" />
  </svg>
); };

export const IconCone = ({ className }: P) => { const u = useId().replace(/[^a-zA-Z0-9]/g, ""); return (
  <svg viewBox="0 0 48 48" className={className} aria-hidden>
    <Clay id={u + "ic1"} from="#FFE9A0" to="#F5B94A" />
    <Clay id={u + "ic2"} from="#FFC6D3" to="#FF6F92" />
    <path d="M14 22h20L25.6 43a2 2 0 0 1-3.2 0Z" fill={`url(#${u}ic1)`} />
    <path d="M18 27l9 9M22 24l8 8M17 31l5 5" stroke="#E29A2E" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="24" cy="17" r="10" fill={`url(#${u}ic2)`} />
    <ellipse cx="20" cy="13" rx="4" ry="2.4" fill="#fff" opacity=".7" />
  </svg>
); };

export const IconStory = ({ className }: P) => { const u = useId().replace(/[^a-zA-Z0-9]/g, ""); return (
  <svg viewBox="0 0 48 48" className={className} aria-hidden>
    <Clay id={u + "is"} from="#C8B8FF" to="#6A4CFF" />
    <path d="M6 12c6-3 12-3 18 1 6-4 12-4 18-1v26c-6-3-12-3-18 1-6-4-12-4-18-1Z" fill={`url(#${u}is)`} />
    <path d="M24 13v26" stroke="#fff" strokeOpacity=".7" strokeWidth="2" />
    <path d="M11 17c3-1 6-1 9 1M28 18c3-2 6-2 9-1" stroke="#fff" strokeOpacity=".7" strokeWidth="2.4" strokeLinecap="round" />
  </svg>
); };

export const IconRecipes = ({ className }: P) => { const u = useId().replace(/[^a-zA-Z0-9]/g, ""); return (
  <svg viewBox="0 0 48 48" className={className} aria-hidden>
    <Clay id={u + "ir"} from="#FFD0B8" to="#FF8A5B" />
    <path d="M7 22h34a17 17 0 0 1-34 0Z" fill={`url(#${u}ir)`} />
    <circle cx="17" cy="16" r="6" fill="#FFF0B5" />
    <circle cx="27" cy="14" r="7" fill="#FFD9E1" />
    <circle cx="33" cy="18" r="4" fill="#CDF2E2" />
    <path d="M13 26c2 4 5 6 9 7" stroke="#fff" strokeOpacity=".6" strokeWidth="3" strokeLinecap="round" />
  </svg>
); };

export const IconPartner = ({ className }: P) => { const u = useId().replace(/[^a-zA-Z0-9]/g, ""); return (
  <svg viewBox="0 0 48 48" className={className} aria-hidden>
    <Clay id={u + "ip"} from="#A8EFD0" to="#2FB98A" />
    <rect x="6" y="16" width="36" height="24" rx="7" fill={`url(#${u}ip)`} />
    <path d="M18 16v-3a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3" stroke="#2FB98A" strokeWidth="3.4" fill="none" />
    <rect x="20" y="24" width="8" height="6" rx="2" fill="#FFF0B5" />
    <path d="M10 21h10" stroke="#fff" strokeOpacity=".6" strokeWidth="3" strokeLinecap="round" />
  </svg>
); };

export const IconHello = ({ className }: P) => { const u = useId().replace(/[^a-zA-Z0-9]/g, ""); return (
  <svg viewBox="0 0 48 48" className={className} aria-hidden>
    <Clay id={u + "ihl"} from="#C2DEFF" to="#4E95F0" />
    <path d="M8 22c0-8 7-14 16-14s16 6 16 14-7 14-16 14c-2 0-4 0-5-1l-7 4 1-6c-3-3-5-7-5-11Z" fill={`url(#${u}ihl)`} />
    <circle cx="17" cy="22" r="2.4" fill="#fff" /><circle cx="24" cy="22" r="2.4" fill="#fff" /><circle cx="31" cy="22" r="2.4" fill="#fff" />
    <path d="M14 13c3-2 6-3 9-3" stroke="#fff" strokeOpacity=".6" strokeWidth="3" strokeLinecap="round" />
  </svg>
); };

export const IconWhatsApp = ({ className }: P) => (
  <svg viewBox="0 0 32 32" className={className} aria-hidden fill="currentColor">
    <path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3Zm0 23.6c-2 0-4-.5-5.6-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6Zm5.8-7.9c-.3-.2-1.9-1-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.3-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.6l-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.4 3.7 5.9 5.2 2.2.9 3 1 4.1.8.7-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5l-.6-.4Z" />
  </svg>
);

export const IconSound = ({ on, className }: P & { on: boolean }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9.5h3l4.5-4v13L7 14.5H4z" fill="currentColor" />
    {on ? (<><path d="M15.5 9a4 4 0 0 1 0 6" /><path d="M18 6.5a7.5 7.5 0 0 1 0 11" /></>) : (<><path d="m16 9.5 5 5" /><path d="m21 9.5-5 5" /></>)}
  </svg>
);

const socialPaths: Record<string, string> = {
  Instagram: "M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2Zm5-8.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 4.6c2.4 0 2.7 0 3.6.1 2.4.1 3.6 1.3 3.7 3.7v7.2c-.1 2.4-1.3 3.6-3.7 3.7H8.4c-2.4-.1-3.6-1.3-3.7-3.7V8.4c.1-2.4 1.3-3.6 3.7-3.7h3.6Zm0-1.6H8.3C5 3.1 3.1 5 3 8.3v7.4c.1 3.3 2 5.2 5.3 5.3h7.4c3.3-.1 5.2-2 5.3-5.3V8.3c-.1-3.3-2-5.2-5.3-5.3H12Z",
  Facebook: "M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z",
  X: "M17.8 3h3l-6.6 7.6L22 21h-6.1l-4.8-6.2L5.6 21h-3l7-8.1L2.2 3h6.2l4.3 5.7L17.8 3Zm-1 16.2h1.7L7.3 4.7H5.5l11.3 14.5Z",
  Pinterest: "M12 2.5a9.5 9.5 0 0 0-3.5 18.3c-.1-.8-.2-2 0-2.8l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.7 1.3 1.4 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.9 1.6 1.9 1.9 0 3.3-2 3.3-4.9 0-2.5-1.8-4.3-4.4-4.3-3 0-4.8 2.3-4.8 4.6 0 .9.4 1.9.8 2.4.1.1.1.2.1.3l-.3 1.2c0 .2-.2.3-.4.2-1.3-.6-2.2-2.6-2.2-4.2 0-3.4 2.5-6.6 7.2-6.6 3.8 0 6.7 2.7 6.7 6.3 0 3.8-2.4 6.8-5.7 6.8-1.1 0-2.2-.6-2.5-1.3l-.7 2.6c-.3 1-.9 2.2-1.4 2.9A9.5 9.5 0 1 0 12 2.5Z",
  TikTok: "M16.6 3h-3v12.2a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.5h-.8a5.8 5.8 0 1 0 5.8 5.8V9.1a7.3 7.3 0 0 0 4.3 1.4v-3a4.3 4.3 0 0 1-4.4-4.5Z",
  YouTube: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.5.4 7.8.4 7.8.4s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z",
};

export const IconSocial = ({ name, className }: P & { name: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
    <path d={socialPaths[name]} />
  </svg>
);
