"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice, type Coat } from "@/lib/coats";
import { useSwipe } from "@/lib/use-swipe";

// Каталог-подиум по референсу JUUN.J «Our collections»:
// заголовок по центру, выбранная шуба крупно в цвете, остальные в ряд одинаковые и приглушённые,
// слева от главной — подписи, внизу маленький счётчик со стрелками.
export function Lineup({ coats }: { coats: Coat[] }) {
  const [active, setActive] = useState(0);
  const n = coats.length;
  const go = (step: number) => setActive((i) => (i + step + n) % n);
  const swipe = useSwipe(go);
  const cur = coats[active];
  const pad = (v: number) => String(v).padStart(2, "0");

  const side = (offset: number) => {
    const i = (active + offset + n) % n;
    const c = coats[i];
    const far = Math.abs(offset) > 1;
    return (
      <button
        key={`slot${offset}`}
        type="button"
        onClick={() => go(offset)}
        aria-label={`Показать ${c.name}`}
        className={`${far ? "hidden xl:block" : "block"} group h-[34svh] w-[9vw] max-w-36 min-w-16 flex-none`}
      >
        <Image key={c.id} src={c.photos[0].src} alt="" draggable={false} width={300} height={500} className="size-full animate-fade object-contain object-center opacity-35 grayscale mix-blend-multiply brightness-102 transition group-hover:opacity-80 group-hover:grayscale-0" />
      </button>
    );
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-center font-brand text-h2">Коллекции</h2>

      <div
        {...swipe}
        tabIndex={0}
        aria-roledescription="подиум"
        aria-label="Подиум: листайте стрелками или свайпом"
        className="mt-8 flex touch-pan-y select-none items-center justify-center gap-4 md:mt-12 lg:gap-8"
      >
        {[-2, -1].map(side)}

        {/* подписи слева от главной шубы, как в референсе */}
        <dl className="mb-1 hidden w-32 flex-none flex-col gap-5 lg:flex">
            <div><dt className="font-label text-label uppercase">Коллекция</dt><dd className="mt-1 text-caption text-muted">Зима 2026</dd></div>
            <div><dt className="font-label text-label uppercase">Цвет</dt><dd className="mt-1 text-caption text-muted">{cur.color}</dd></div>
            <div><dt className="font-label text-label uppercase">Размеры</dt><dd className="mt-1 text-caption text-muted">{cur.sizes.length ? cur.sizes.join(", ") : "нет в наличии"}</dd></div>
        </dl>
        <div className="flex-none">
          <Link href={`/coats/${cur.id}`} aria-label={`Открыть ${cur.name}`} className="block">
            <Image key={cur.id} src={cur.photos[0].src} alt={`Шуба ${cur.name}`} draggable={false} width={500} height={800} priority className="h-[52svh] w-[56vw] max-w-80 animate-fade object-contain object-bottom mix-blend-multiply brightness-102 md:h-[56svh] md:w-[26vw]" />
          </Link>
        </div>

        {[1, 2, 3].map(side)}
      </div>

      <div className="mt-6 flex flex-col items-center gap-1 text-center">
        <Link href={`/coats/${cur.id}`} className="font-label text-title uppercase">{cur.name}</Link>
        <p className="text-caption text-muted">{formatPrice(cur)}</p>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button type="button" onClick={() => go(-1)} aria-label="Предыдущая модель" className="flex size-11 items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
        </button>
        <span aria-live="polite" className="w-16 text-center text-caption tabular-nums">{pad(active + 1)} / {pad(n)}</span>
        <button type="button" onClick={() => go(1)} aria-label="Следующая модель" className="flex size-11 items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  );
}
