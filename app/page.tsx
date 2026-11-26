import { Lineup } from "@/components/lineup";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-header";
import { EmptyState, ErrorState, LoadingState } from "@/components/states";
import { coats, readState } from "@/lib/coats";

// Главная: обложка по референсу sure (фото на весь экран, VORS, кнопка «Выбрать шубу»),
// сразу под ней каталог-подиум.
export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const state = readState((await searchParams).state);

  return (
    <>
      <Hero />
      {/* 2. Каталог-подиум */}
      <section id="collection" aria-label="Коллекции" className="mx-auto max-w-360 scroll-mt-4 px-4 py-16 md:px-8 md:py-24">
        {state === "ready" || state === "success" ? (
          <Lineup coats={coats} />
        ) : (
          <>
            <h2 className="text-center font-brand text-h2">Коллекции</h2>
            <div className="mt-10">
              {state === "loading" && <LoadingState />}
              {state === "empty" && <EmptyState />}
              {state === "error" && <ErrorState retryHref="/" />}
            </div>
          </>
        )}
      </section>
      <SiteFooter />
    </>
  );
}
