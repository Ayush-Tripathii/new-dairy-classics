// Tiny synthesized UI sounds (no audio files to download). Off unless enabled.
let ctx: AudioContext | null = null;
let enabled = false;

export const setSoundEnabled = (v: boolean) => {
  enabled = v;
  if (v && !ctx && typeof window !== "undefined") ctx = new AudioContext();
};

type Kind = "pop" | "crunch" | "whoosh" | "boop";

export function play(kind: Kind) {
  if (!enabled || !ctx) return;
  const t = ctx.currentTime;
  const gain = ctx.createGain();
  gain.connect(ctx.destination);

  if (kind === "pop" || kind === "boop") {
    const o = ctx.createOscillator();
    o.type = "sine";
    const [a, b] = kind === "pop" ? [520, 1100] : [300, 520];
    o.frequency.setValueAtTime(a, t);
    o.frequency.exponentialRampToValueAtTime(b, t + 0.06);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.18, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
    o.connect(gain);
    o.start(t);
    o.stop(t + 0.15);
    return;
  }

  // noise-based: crunch (short, bright) or whoosh (long, filtered)
  const len = kind === "crunch" ? 0.08 : 0.45;
  const buf = ctx.createBuffer(1, ctx.sampleRate * len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (kind === "crunch" ? Math.random() : 1);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const filter = ctx.createBiquadFilter();
  filter.type = kind === "crunch" ? "highpass" : "bandpass";
  filter.frequency.setValueAtTime(kind === "crunch" ? 2000 : 400, t);
  if (kind === "whoosh") filter.frequency.exponentialRampToValueAtTime(1800, t + len);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(kind === "crunch" ? 0.12 : 0.06, t + len * 0.3);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + len);
  src.connect(filter).connect(gain);
  src.start(t);
}
