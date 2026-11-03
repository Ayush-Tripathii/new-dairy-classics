"use client";

import Image from "next/image";
import { useState } from "react";
import { imgUrl, type Product } from "@/data/products";

// Product cutout with a soft colour-matched drop shadow. Missing images render a
// clay placeholder flagged for the client.
export default function ProductImage({ product, sizes = "(max-width: 768px) 50vw, 25vw", priority, className = "", shadow = true }: { product: Pick<Product, "image" | "name">; sizes?: string; priority?: boolean; className?: string; shadow?: boolean }) {
  const [err, setErr] = useState(false);
  const src = imgUrl(product);
  if (!src || err) {
    return (
      <div className={`grid h-full w-full place-items-center [container-type:size] ${className}`}>
        <div className="clay grid aspect-square h-auto max-h-[85%] w-[80%] max-w-[85%] place-content-center place-items-center rounded-[36%] p-3 text-center" style={{ width: "min(80%, 85cqh)" }}>
          <span className="text-4xl" aria-hidden>🍨</span>
          <span className="text-[10px] font-semibold uppercase tracking-wide text-plum/50">{src ? "Image unavailable" : "[Client to provide image]"}</span>
        </div>
      </div>
    );
  }
  return (
    <div className={`relative h-full w-full ${className}`}>
      <Image
        src={src}
        alt={product.name}
        fill
        sizes={sizes}
        priority={priority}
        draggable={false}
        onError={() => setErr(true)}
        className={`pointer-events-none select-none object-contain ${shadow ? "float-shadow" : ""}`}
      />
    </div>
  );
}
