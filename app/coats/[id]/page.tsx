import Link from "next/link";
import { notFound } from "next/navigation";
import { CoatCard } from "@/components/coat-card";
import { FittingForm } from "@/components/fitting-form";
import { Gallery } from "@/components/gallery";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { ErrorState } from "@/components/states";
import { CARE, MATERIAL, coats, findCoat, formatPrice, readState } from "@/lib/coats";

export function generateStaticParams() {
  return coats.map((c) => ({ id: c.id }));
}

// Раскрывающийся раздел: по умолчанию свёрнут, чтобы не вываливать всё сразу.
function Section({ title, open, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details open={open} className="group border-t border-line py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between font-label text-label uppercase">
        {title}
        <span aria-hidden className="text-body transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="mt-3 text-body">{children}</div>
    </details>
  );
}

// Карточка шубы по референсу ACW: один экран, три колонки с тонкими линиями.
// Слева: путь, название, цена, внизу свёрнутые разделы. По центру фото. Справа размер и кнопка.
export default async function CoatPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = await params;
  const coat = findCoat(id);
  if (!coat) notFound();
  const state = readState((await searchParams).state);
  const more = coats.filter((c) => c.id !== coat.id).slice(0, 4);

  return (
    <>
      <SiteHeader />
      <main>
        {state === "error" ? (
          <div className="mx-auto max-w-360 px-4 py-10 md:px-8"><ErrorState retryHref={`/coats/${coat.id}`} /></div>
        ) : state === "loading" ? (
          <div role="status" aria-label="Загружаем модель" className="mx-auto h-[70svh] max-w-360 animate-pulse bg-tile" />
        ) : (
          <div className="mx-auto grid max-w-360 lg:h-[calc(100svh-4rem)] lg:min-h-150 lg:grid-cols-[1fr_1.6fr_1fr] lg:grid-rows-[auto_1fr]">
            {/* слева */}
            <div className="order-2 px-4 pt-6 md:px-8 lg:col-start-1 lg:row-start-1 lg:border-r lg:border-line lg:pt-8">
              <nav aria-label="Путь" className="text-caption text-muted">
                <Link href="/#collection" className="hover:text-ink">Коллекция</Link> / <span>{coat.name}</span>
              </nav>
              <h1 className="mt-4 font-label text-h1 uppercase">{coat.name}</h1>
              <p className="mt-3 text-title">{formatPrice(coat)}</p>
            </div>

            {/* свёрнутые разделы: на телефоне после кнопки, на компьютере внизу левой колонки */}
            <div className="order-4 flex flex-col justify-end px-4 pt-8 pb-4 md:px-8 lg:col-start-1 lg:row-start-2 lg:border-r lg:border-line lg:pb-8">
              <div>
                <Section title="Описание" open>
                  <p>{coat.description}</p>
                  <p className="mt-2 text-muted">Цвет: {coat.color}. Длина по спинке {coat.length}&nbsp;см.</p>
                </Section>
                <Section title="Детали и состав">
                  <ul className="flex flex-col gap-1">{coat.details.map((d) => <li key={d}>{d}</li>)}</ul>
                  <p className="mt-2">{MATERIAL}</p>
                  <p className="mt-2 text-muted">{CARE}</p>
                </Section>
                <Section title="Примерка">
                  <p>Примерка в шоуруме бесплатная и занимает около получаса. После примерки отложим шубу на три дня. Платить нужно, только если шуба подошла.</p>
                </Section>
              </div>
            </div>

            {/* по центру */}
            <div className="order-1 px-4 pt-6 md:px-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-h-0 lg:py-8">
              <Gallery coat={coat} />
            </div>

            {/* справа */}
            <div className="order-3 px-4 pt-8 md:px-8 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:border-l lg:border-line lg:py-8">
              <FittingForm coat={coat} initialSuccess={state === "success"} />
            </div>
          </div>
        )}

        <section aria-labelledby="more-title" className="mx-auto max-w-360 border-t border-line px-4 py-12 md:px-8 md:py-16">
          <h2 id="more-title" className="font-label text-h2 uppercase">Ещё</h2>
          {state === "empty" ? (
            <p className="mt-6 text-body text-muted">Других моделей пока нет.</p>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
              {more.map((c) => <CoatCard key={c.id} coat={c} />)}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
