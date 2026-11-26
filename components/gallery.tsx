"use client";
import Image from "next/image";
import { useState } from "react";
import type { Coat } from "@/lib/coats";
import { useSwipe } from "@/lib/use-swipe";

// Фото в центре карточки. Внизу тонкие стрелки и счётчик. Листается свайпом и клавишами ← →.
export function Gallery({ coat }: { coat: Coat }) {
  const [i, setI] = useState(0);
  const total = coat.photos.length;
  const photo = coat.photos[i];
  const go = (step: number) => setI((n) => (n + step + total) % total);
  const swipe = useSwipe(go);

  return (
    <div className="flex h-full flex-col">
      <div
        {...swipe}
        tabIndex={total > 1 ? 0 : undefined}
        aria-roledescription="галерея"
        aria-label={`Фото шубы ${coat.name}`}
        className="relative min-h-0 flex-1 touch-pan-y select-none"
      >
        <Image key={photo.src} src={photo.src} alt={`${coat.name}: ${photo.label}`} width={900} height={1200} priority draggable={false} className="mx-auto aspect-3/4 h-full max-h-[70svh] w-auto animate-fade object-contain mix-blend-multiply brightness-102 lg:max-h-none" />
      </div>
      {total > 1 && (
        <div className="flex items-center justify-center gap-4 pt-4">
          <button type="button" onClick={() => go(-1)} aria-label="Предыдущее фото" className="flex size-11 items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          </button>
          <span aria-live="polite" className="w-28 text-center text-caption">{i + 1} / {total} · {photo.label}</span>
          <button type="button" onClick={() => go(1)} aria-label="Следующее фото" className="flex size-11 items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
