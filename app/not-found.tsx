import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/site-header";

// Страница 404: шуба или адрес не найдены.
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[60svh] max-w-md flex-col items-center justify-center px-4 py-16 text-center">
        <p className="font-brand text-h2">404</p>
        <p className="mt-4 font-label text-title uppercase">Такой страницы нет</p>
        <p className="mt-3 text-body text-muted">Возможно, шубу уже убрали из коллекции. Посмотрите другие модели.</p>
        <Link href="/#collection" className="mt-6 inline-flex h-11 items-center bg-ink px-5 font-label text-label uppercase text-paper">К коллекции</Link>
      </main>
      <SiteFooter />
    </>
  );
}
