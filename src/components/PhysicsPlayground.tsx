"use client";

import { useEffect, useRef, useState } from "react";
import type Matter from "matter-js";

export interface PhysicsItem {
  id: string;
  w: number;
  h: number;
  shape?: "rect" | "circle";
  content: React.ReactNode;
  label?: string; // accessible name
}

interface Props {
  items: PhysicsItem[];
  className?: string;
  /** max bodies on narrow screens */
  mobileCount?: number;
  /** DOM elements to collide with (e.g. the headline) */
  obstacles?: React.RefObject<HTMLElement | null>[];
  /** cursor pushes bodies away instead of grabbing */
  repel?: boolean;
  /** ms between spawns */
  stagger?: number;
  /** listen to device tilt for gravity */
  tilt?: boolean;
  /** start immediately vs. when scrolled into view */
  startOnView?: boolean;
  gravity?: number;
  /** scale bodies down below this container width */
  scaleBelow?: number;
  onReady?: () => void;
}

// 2D physics sandbox with DOM-rendered bodies (transform-only updates). Products drop
// in, pile up, and can be grabbed, dragged and thrown. Lazy-loads Matter.js, pauses
// off-screen, honours reduced motion with a static fallback.
export default function PhysicsPlayground({ items, className = "", mobileCount = 6, obstacles = [], repel = false, stagger = 140, tilt = true, startOnView = true, gravity = 1.1, scaleBelow = 768 }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const nodes = useRef<Map<string, HTMLDivElement>>(new Map());
  const [mode, setMode] = useState<"idle" | "live" | "static">("idle");
  const [count, setCount] = useState(items.length);
  const [needsTiltPermission, setNeedsTiltPermission] = useState(false);

  useEffect(() => {
    const el = box.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setMode("static"); return; }
    const narrow = el.clientWidth < scaleBelow;
    const n = narrow ? Math.min(mobileCount, items.length) : items.length;
    setCount(n);

    let engine: Matter.Engine | null = null;
    let raf = 0;
    let visible = false;
    let started = false;
    let disposed = false;
    const cleanups: (() => void)[] = [];

    const boot = async () => {
      started = true;
      const M = (await import("matter-js")).default;
      if (disposed) return;
      const { Engine, Bodies, Composite, Body, Constraint, Events, Vector } = M;
      engine = Engine.create({ gravity: { x: 0, y: gravity } });
      engine.positionIterations = 8;
      const W = el.clientWidth, H = el.clientHeight;
      const k = narrow ? 0.62 : 1;
      const wallOpts = { isStatic: true, friction: 0.4, restitution: 0.2 };
      const walls = [
        Bodies.rectangle(W / 2, H + 50, W * 3, 100, wallOpts),
        Bodies.rectangle(-50, H / 2 - 2000, 100, H + 4000, wallOpts),
        Bodies.rectangle(W + 50, H / 2 - 2000, 100, H + 4000, wallOpts),
      ];
      Composite.add(engine.world, walls);

      // obstacles from DOM (headline etc.)
      const elRect = el.getBoundingClientRect();
      for (const o of narrow ? [] : obstacles) {
        const r = o.current?.getBoundingClientRect();
        if (!r || !r.width) continue;
        Composite.add(engine.world, Bodies.rectangle(r.left - elRect.left + r.width / 2, r.top - elRect.top + r.height / 2, r.width, r.height * 0.8, { isStatic: true, chamfer: { radius: Math.min(40, r.height / 3) }, restitution: 0.5 }));
      }

      const bodies = new Map<string, Matter.Body>();
      const sizes = new Map<string, { w: number; h: number }>();
      const list = items.slice(0, n);
      list.forEach((it, i) => {
        setTimeout(() => {
          if (disposed || !engine) return;
          const w = it.w * k, h = it.h * k;
          const x = w / 2 + 20 + Math.random() * Math.max(1, W - w - 40);
          const y = -h - Math.random() * 200;
          const opts = { restitution: 0.45, friction: 0.25, frictionAir: 0.012, density: 0.0016, angle: (Math.random() - 0.5) * 0.8 };
          const b = it.shape === "circle" ? Bodies.circle(x, y, w / 2, opts) : Bodies.rectangle(x, y, w * 0.9, h * 0.94, { ...opts, chamfer: { radius: Math.min(w, h) * 0.22 } });
          Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.15);
          bodies.set(it.id, b);
          sizes.set(it.id, { w, h });
          Composite.add(engine.world, b);
          const node = nodes.current.get(it.id);
          if (node) { node.style.width = `${w}px`; node.style.height = `${h}px`; }
        }, i * stagger);
      });

      // drag & throw with pointer events
      let drag: { c: Matter.Constraint; id: number; last: Matter.Vector; t: number; v: Matter.Vector } | null = null;
      const local = (e: PointerEvent) => { const r = el.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
      const pointer = { x: -9999, y: -9999 };
      const onDown = (e: PointerEvent) => {
        const target = (e.target as HTMLElement).closest<HTMLElement>("[data-body]");
        if (!target || repel || !engine) return;
        const b = bodies.get(target.dataset.body!);
        if (!b) return;
        e.preventDefault();
        target.setPointerCapture(e.pointerId);
        const p = local(e);
        const c = Constraint.create({ pointA: p, bodyB: b, pointB: Vector.sub(p, b.position), stiffness: 0.2, damping: 0.1, length: 0 });
        Composite.add(engine.world, c);
        drag = { c, id: e.pointerId, last: p, t: performance.now(), v: { x: 0, y: 0 } };
        target.style.zIndex = "5";
      };
      const onMove = (e: PointerEvent) => {
        const p = local(e);
        pointer.x = p.x; pointer.y = p.y;
        if (!drag || e.pointerId !== drag.id) return;
        const now = performance.now();
        const dt = Math.max(1, now - drag.t);
        drag.v = { x: ((p.x - drag.last.x) / dt) * 16, y: ((p.y - drag.last.y) / dt) * 16 };
        drag.last = p; drag.t = now;
        drag.c.pointA = p;
      };
      const onUp = (e: PointerEvent) => {
        if (!drag || e.pointerId !== drag.id || !engine) return;
        const b = drag.c.bodyB!;
        Composite.remove(engine.world, drag.c);
        Body.setVelocity(b, { x: Math.max(-40, Math.min(40, drag.v.x)), y: Math.max(-40, Math.min(40, drag.v.y)) });
        drag = null;
        nodes.current.forEach((n) => (n.style.zIndex = ""));
      };
      const onLeave = () => { pointer.x = -9999; pointer.y = -9999; };
      el.addEventListener("pointerdown", onDown);
      addEventListener("pointermove", onMove, { passive: true });
      el.addEventListener("pointerup", onUp);
      el.addEventListener("pointercancel", onUp);
      el.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("pointerdown", onDown);
        removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", onUp);
        el.removeEventListener("pointercancel", onUp);
        el.removeEventListener("pointerleave", onLeave);
      });

      if (repel) {
        Events.on(engine, "beforeUpdate", () => {
          bodies.forEach((b) => {
            const d = Vector.sub(b.position, pointer);
            const dist = Vector.magnitude(d);
            if (dist < 160 && dist > 0) Body.applyForce(b, b.position, Vector.mult(Vector.normalise(d), 0.0025 * b.mass * (1 - dist / 160) * 30));
          });
        });
      }

      // keyboard: shake the pile (space/enter on the container)
      const onKey = (e: KeyboardEvent) => {
        if (e.target !== el || (e.key !== " " && e.key !== "Enter")) return;
        e.preventDefault();
        bodies.forEach((b) => Body.setVelocity(b, { x: (Math.random() - 0.5) * 24, y: -10 - Math.random() * 14 }));
      };
      el.addEventListener("keydown", onKey);
      cleanups.push(() => el.removeEventListener("keydown", onKey));

      if (tilt && "DeviceOrientationEvent" in window) {
        const onTilt = (e: DeviceOrientationEvent) => {
          if (!engine || e.gamma == null || e.beta == null) return;
          engine.gravity.x = Math.max(-1, Math.min(1, e.gamma / 35));
          engine.gravity.y = gravity * Math.max(0.3, Math.min(1, e.beta / 60));
        };
        const D = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
        if (typeof D.requestPermission === "function") { if (matchMedia("(pointer: coarse)").matches) setNeedsTiltPermission(true); }
        else addEventListener("deviceorientation", onTilt);
        const onGrant = () => addEventListener("deviceorientation", onTilt);
        el.addEventListener("dc:tilt-granted", onGrant);
        cleanups.push(() => { removeEventListener("deviceorientation", onTilt); el.removeEventListener("dc:tilt-granted", onGrant); });
      }

      let last = performance.now();
      const step = (t: number) => {
        raf = 0;
        if (!engine || !visible) return;
        const dt = Math.min(1000 / 30, t - last);
        last = t;
        Engine.update(engine, dt);
        bodies.forEach((b, id) => {
          const node = nodes.current.get(id);
          if (!node) return;
          const { w, h } = sizes.get(id)!;
          node.style.transform = `translate3d(${b.position.x - w / 2}px, ${b.position.y - h / 2}px, 0) rotate(${b.angle}rad)`;
          // recover anything that escaped the box
          if (b.position.y > H + 300 || b.position.x < -300 || b.position.x > W + 300) Body.setPosition(b, { x: W / 2, y: -100 });
        });
        raf = requestAnimationFrame(step);
      };
      const resume = () => { if (!raf && visible) { last = performance.now(); raf = requestAnimationFrame(step); } };
      (el as HTMLElement & { _resume?: () => void })._resume = resume;
      setMode("live");
      resume();
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !started) boot();
      else if (visible) (el as HTMLElement & { _resume?: () => void })._resume?.();
    }, { threshold: startOnView ? 0.25 : 0 });
    io.observe(el);

    return () => {
      disposed = true;
      io.disconnect();
      cancelAnimationFrame(raf);
      cleanups.forEach((c) => c());
      if (engine) import("matter-js").then((M) => engine && M.default.Engine.clear(engine));
    };
  }, [items, mobileCount, repel, stagger, tilt, startOnView, gravity, scaleBelow]); // eslint-disable-line react-hooks/exhaustive-deps

  const askTilt = async () => {
    const D = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
    if ((await D.requestPermission?.()) === "granted") box.current?.dispatchEvent(new Event("dc:tilt-granted"));
    setNeedsTiltPermission(false);
  };

  return (
    <div
      ref={box}
      tabIndex={mode === "live" ? 0 : -1}
      aria-label={mode === "live" ? "Physics playground. Drag items to throw them, or press Space to shake the pile." : undefined}
      className={`relative overflow-hidden ${className}`}
    >
      {mode === "static" ? (
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-center gap-4 p-4">
          {items.slice(0, count).map((it) => (
            <div key={it.id} style={{ width: it.w * 0.7, height: it.h * 0.7 }}>{it.content}</div>
          ))}
        </div>
      ) : (
        items.slice(0, count).map((it) => (
          <div
            key={it.id}
            ref={(n) => { if (n) nodes.current.set(it.id, n); else nodes.current.delete(it.id); }}
            data-body={it.id}
            data-cursor={repel ? undefined : "grab"}
            role="img"
            aria-label={it.label}
            className="absolute left-0 top-0 select-none will-change-transform"
            style={{ width: it.w, height: it.h, transform: "translate3d(-9999px,-9999px,0)", touchAction: repel ? "auto" : "none", pointerEvents: repel ? "none" : "auto" }}
          >
            {it.content}
          </div>
        ))
      )}
      {needsTiltPermission && (
        <button onClick={askTilt} className="pointer-events-auto absolute bottom-3 left-3 z-10 rounded-full bg-white/80 px-3 py-1.5 text-xs font-semibold shadow">
          Enable tilt 📱
        </button>
      )}
    </div>
  );
}
