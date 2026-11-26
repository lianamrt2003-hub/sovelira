"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Обложка главной по референсу sure: фото на весь экран, светлое меню поверх,
// огромный VORS слева внизу, справа продающий текст и светлая кнопка «Выбрать шубу» с ценой.
const LINKS = [
  { href: "/#collection", label: "Новинки" },
  { href: "#showroom", label: "Шоурум" },
  { href: "/coats/elizzia#size", label: "Как выбрать размер" },
  { href: "#showroom", label: "Контакты" },
];

export function Hero() {
  const [open, setOpen] = useState(false);
  return (
    <section aria-label="Обложка" className="relative h-svh min-h-140 overflow-hidden bg-ink text-paper">
      {/* Телефон: вертикальное фото во весь рост, чтобы была видна шуба. Компьютер: горизонтальное. */}
      <Image
        src="/shuby/hero-model-mobile.jpg"
        alt="Девушка в коричневой шубе с огромным меховым капюшоном, во весь рост"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_20%] brightness-[0.85] md:hidden"
      />
      <Image
        src="/shuby/hero-model.jpg"
        alt="Девушка в коричневой шубе с огромным меховым капюшоном и в серебристых очках"
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-[50%_35%] brightness-[0.8] md:block"
      />
      {/* затемнение снизу, чтобы белый текст читался на светлом фоне фото */}
      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-ink/30"
      />

      <header className="relative z-10 flex h-18 items-center justify-between px-4 text-caption md:px-10 md:text-label md:normal-case">
        <div className="flex items-center gap-10">
          <Link href="/" className="font-brand text-logo">VORS</Link>
          <nav aria-label="Разделы" className="hidden gap-7 opacity-85 md:flex">
            {LINKS.map((l) => <Link key={l.label} href={l.href} className="hover:opacity-100">{l.label}</Link>)}
          </nav>
        </div>
        <div className="flex items-center gap-1">
          <Link href="#collection" className="mr-3 hidden md:inline">Каталог</Link>
          <Link href="#showroom" aria-label="Мои примерки" className="flex size-11 items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
          </Link>
          <button type="button" aria-label="Меню" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="flex size-11 items-center justify-center md:hidden">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 9h16M4 15h16" /></svg>
          </button>
        </div>
      </header>
      {open && (
        <nav aria-label="Меню" className="relative z-10 mx-4 flex flex-col gap-4 bg-ink/90 p-5 text-body md:hidden">
          {LINKS.map((l) => <Link key={l.label} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>)}
          <Link href="#collection" onClick={() => setOpen(false)}>Каталог</Link>
        </nav>
      )}

      <div className="absolute inset-x-4 bottom-5 z-10 flex flex-col gap-3 md:inset-x-10 md:bottom-10 md:flex-row md:items-end md:justify-between md:gap-12">
        <h1 className="font-brand text-[clamp(4.5rem,17vw,15rem)] leading-[0.8]">VORS</h1>
        <div className="max-w-md md:mb-3">
          <p className="text-body md:text-[1.375rem] md:leading-snug">
            Мех, в который хочется спрятаться.{" "}
            <span className="opacity-60">Бесплатная примерка в шоуруме и бронь шубы на три дня</span>
          </p>
          {/* Кнопка под текстом: светлая, с ценой — сразу видно, куда нажать и сколько стоит */}
          <Link
            href="#collection"
            className="group mt-4 flex h-14 md:mt-6 items-center justify-between bg-paper pr-2 pl-6 text-ink transition-colors hover:bg-tile"
          >
            <span className="font-label text-label uppercase">Выбрать шубу</span>
            <span className="flex items-center gap-4">
              <span className="text-caption text-muted">от 36 900 ₽</span>
              <span className="flex size-10 items-center justify-center bg-accent text-paper transition-transform duration-300 group-hover:translate-x-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
