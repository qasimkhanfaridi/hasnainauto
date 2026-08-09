"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, Play } from "lucide-react";

export default function ProductGallery({ images, name, videoUrl }: { images: string[]; name: string; videoUrl?: string }) {
  const [selected, setSelected] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-xl overflow-hidden bg-grey-light cursor-zoom-in" onClick={() => setZoomed(!zoomed)}>
        <Image
          src={images[selected]}
          alt={name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-cover transition-transform duration-300 ${zoomed ? "scale-150" : "scale-100"}`}
          priority
        />
        <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
          <ZoomIn className="w-5 h-5 text-navy" />
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => { setSelected(i); setZoomed(false); }}
            className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 ${selected === i ? "border-gold" : "border-transparent"}`}
          >
            <Image src={img} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
        {videoUrl && (
          <button className="relative w-20 h-20 flex-shrink-0 rounded-lg bg-navy flex items-center justify-center">
            <Play className="w-6 h-6 text-gold" />
          </button>
        )}
      </div>
    </div>
  );
}
