// Sprinkle confetti on a single shared full-screen canvas. Transform-free, GPU-cheap.
const COLORS = ["#FF4F7B", "#6A4CFF", "#FFD9E1", "#FFF0B5", "#CDF2E2", "#D5E9FF", "#FFDCC8", "#E7DEFF"];

interface Bit { x: number; y: number; vx: number; vy: number; r: number; vr: number; c: string; life: number; len: number }

let canvas: HTMLCanvasElement | null = null;
let bits: Bit[] = [];
let raf = 0;

function ensureCanvas() {
  if (canvas) return canvas;
  canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, { position: "fixed", inset: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "9998" });
  document.body.appendChild(canvas);
  return canvas;
}

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function burst(x: number, y: number, opts: { count?: number; spread?: number; power?: number; gravity?: number } = {}) {
  if (typeof window === "undefined" || reduced()) return;
  const { count = 28, spread = Math.PI * 2, power = 9 } = opts;
  for (let i = 0; i < count; i++) {
    const a = -Math.PI / 2 + (Math.random() - 0.5) * spread;
    const s = power * (0.4 + Math.random() * 0.8);
    bits.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.4, c: COLORS[(Math.random() * COLORS.length) | 0], life: 1, len: 8 + Math.random() * 8 });
  }
  start(opts.gravity ?? 0.35);
}

export function rain(count = 140) {
  if (typeof window === "undefined" || reduced()) return;
  for (let i = 0; i < count; i++) {
    bits.push({ x: Math.random() * innerWidth, y: -20 - Math.random() * innerHeight * 0.6, vx: (Math.random() - 0.5) * 2, vy: 2 + Math.random() * 4, r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3, c: COLORS[(Math.random() * COLORS.length) | 0], life: 1.6, len: 8 + Math.random() * 10 });
  }
  start(0.12);
}

export const burstFrom = (el: Element, opts?: Parameters<typeof burst>[2]) => {
  const r = el.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, opts);
};

function start(g: number) {
  const c = ensureCanvas();
  const dpr = Math.min(devicePixelRatio, 2);
  c.width = innerWidth * dpr;
  c.height = innerHeight * dpr;
  const ctx = c.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (raf) return;
  const tick = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    bits = bits.filter((b) => b.life > 0 && b.y < innerHeight + 40);
    for (const b of bits) {
      b.vy += g;
      b.vx *= 0.985;
      b.x += b.vx;
      b.y += b.vy;
      b.r += b.vr;
      b.life -= 0.008;
      ctx.save();
      ctx.globalAlpha = Math.min(1, b.life * 2);
      ctx.translate(b.x, b.y);
      ctx.rotate(b.r);
      ctx.fillStyle = b.c;
      ctx.beginPath();
      ctx.roundRect(-b.len / 2, -2.5, b.len, 5, 2.5);
      ctx.fill();
      ctx.restore();
    }
    if (bits.length) raf = requestAnimationFrame(tick);
    else { raf = 0; ctx.clearRect(0, 0, innerWidth, innerHeight); }
  };
  raf = requestAnimationFrame(tick);
}
