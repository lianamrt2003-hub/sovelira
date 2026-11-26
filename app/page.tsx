import Image from "next/image";
import Link from "next/link";
import { Lineup } from "@/components/lineup";
import { Marquee } from "@/components/marquee";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { EmptyState, ErrorState, LoadingState } from "@/components/states";
import { coats, findCoat, formatPrice, readState } from "@/lib/coats";

// Главная по референсу khy: бегущая строка, шапка, большое фото шубы на первый экран,
// под ним две плитки (вся коллекция и одна модель), тёмная полоса с логотипом и каталог-подиум.
export default async function Home({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const state = readState((await searchParams).state);
  const featured = findCoat("selin")!;
  const heroCoat = findCoat("nordis")!;
  const trio = ["milert", "elizzia", "aurel"].map((id) => findCoat(id)!);

  return (
    <>
      <Marquee />
      <SiteHeader />
      <main className="flex flex-col gap-4 px-4 pt-4 md:px-8">
        {/* 1. Первый экран: мех крупным планом */}
        <section aria-label="Обложка" className="relative h-[calc(100svh-7rem)] min-h-120 overflow-hidden bg-tile">
          <Image src={heroCoat.photos[0].src} alt={`Шуба ${heroCoat.name}, ${heroCoat.color}`} fill priority sizes="100vw" className="object-contain object-[50%_60%] p-6 mix-blend-multiply brightness-102 md:p-10" />
          <div className="absolute bottom-0 left-0 p-5 md:p-8">
            <h1 className="font-label text-h2 uppercase">Зима 2026</h1>
            <p className="mt-2 max-w-72 text-body">Шубы из искусственного меха. Сначала примерьте в шоуруме, потом решайте.</p>
            <Link href="#collection" className="mt-4 inline-flex h-11 items-center bg-ink px-5 font-label text-label uppercase text-paper">Смотреть коллекцию</Link>
          </div>
        </section>

        {/* 2. Две плитки: вся коллекция и одна модель */}
        <section aria-label="Подборка" className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <Link href="#collection" className="group relative flex min-h-80 items-end justify-center gap-1 bg-tile px-3 pt-14 pb-6 md:min-h-130 md:gap-2 md:px-6 md:pt-16">
            <span className="absolute top-5 left-5 font-label text-label uppercase">Вся коллекция</span>
            <span className="absolute top-5 right-5 text-caption">{coats.length} моделей</span>
            {trio.map((c, i) => (
              <Image key={c.id} src={c.photos[0].src} alt="" width={400} height={640} className={`h-auto mix-blend-multiply brightness-102 transition-transform duration-500 group-hover:-translate-y-1 ${i === 1 ? "w-[36%] md:w-1/3" : "w-[30%] md:w-1/4"}`} />
            ))}
          </Link>
          <Link href={`/coats/${featured.id}`} className="group relative flex min-h-100 flex-col bg-tile p-5 md:min-h-130">
            <span className="self-start bg-paper px-2 py-1 text-caption">Последние размеры</span>
            <span className="flex flex-1 items-center justify-center py-6">
              <Image src={featured.photos[0].src} alt={`Шуба ${featured.name}`} width={500} height={560} className="h-auto w-4/5 mix-blend-multiply brightness-102 transition-transform duration-500 group-hover:scale-[1.02]" />
            </span>
            <span className="flex items-baseline justify-between">
              <span className="font-label text-label uppercase">{featured.name}</span>
              <span className="text-caption">{formatPrice(featured)}</span>
            </span>
          </Link>
        </section>

        {/* 3. Тёмная полоса с логотипом */}
        <section aria-label="VORS" className="flex h-60 items-center justify-center bg-ink text-paper md:h-80">
          <p className="font-brand text-hero">VORS</p>
        </section>
      </main>

      {/* 4. Каталог-подиум */}
      <section id="collection" aria-label="Коллекции" className="mx-auto max-w-360 scroll-mt-4 px-4 py-16 md:px-8 md:py-24">
        {state === "ready" || state === "success" ? (
          <Lineup coats={coats} />
        ) : (
          <>
            <h2 className="text-center font-label text-h2 uppercase">Коллекции</h2>
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
