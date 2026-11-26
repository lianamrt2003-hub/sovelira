"use client";
import Link from "next/link";
import { useState } from "react";

// Шапка как у IMAKE: слева разделы, по центру логотип, справа профиль.
// На телефоне: кнопка меню, логотип по центру, «Войти».
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-30 border-b border-line bg-paper font-label text-label uppercase">
      <div className="mx-auto grid h-16 max-w-360 grid-cols-[1fr_auto_1fr] items-center px-4 md:px-8">
        <nav aria-label="Разделы" className="flex items-center gap-7">
          <button
            type="button"
            aria-label="Меню"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="-ml-2 flex size-11 items-center justify-center md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 9h16M4 15h16" /></svg>
          </button>
          <Link href="/#collection" className="hidden md:inline">Коллекция</Link>
          <Link href="#showroom" className="hidden md:inline">Шоурум</Link>
        </nav>
        <Link href="/" className="font-brand text-logo normal-case tracking-normal">VORS</Link>
        <nav aria-label="Профиль" className="flex items-center justify-end gap-7">
          <Link href="#showroom" className="hidden md:inline">Мои примерки</Link>
          <Link href="#showroom" className="flex min-h-11 items-center">Войти</Link>
        </nav>
      </div>
      {open && (
        <nav aria-label="Меню" className="absolute inset-x-0 top-full flex flex-col gap-5 border-b border-line bg-paper px-4 py-6 md:hidden">
          <Link href="/#collection" onClick={() => setOpen(false)}>Коллекция</Link>
          <Link href="#showroom" onClick={() => setOpen(false)}>Шоурум</Link>
          <Link href="#showroom" onClick={() => setOpen(false)}>Мои примерки</Link>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="showroom" className="border-t border-line">
      <div className="mx-auto grid max-w-360 gap-6 px-4 py-10 md:grid-cols-4 md:gap-8 md:px-8">
        <p className="font-brand text-logo">VORS</p>
        <div>
          <p className="font-label text-caption uppercase text-muted">Шоурум</p>
          <p className="mt-1.5 text-caption">Москва, Большая Никитская, 12<br />Каждый день, <span className="whitespace-nowrap">11:00–21:00</span></p>
        </div>
        <div>
          <p className="font-label text-caption uppercase text-muted">Примерка</p>
          <p className="mt-1.5 text-caption">Бесплатно, по записи.<br />Шубу отложим на три дня.</p>
        </div>
        <div>
          <p className="font-label text-caption uppercase text-muted">Связаться</p>
          <p className="mt-1.5 text-caption"><a href="tel:+74950000000" className="whitespace-nowrap underline underline-offset-2">+7 495 000-00-00</a></p>
        </div>
      </div>
    </footer>
  );
}
