// Бегущая строка над шапкой, как у khy. Текст повторён дважды, чтобы лента шла без разрыва.
// При «уменьшить движение» в системе анимация отключается (правило в globals.css).
const ITEMS = ["Примерка в шоуруме бесплатно", "Москва, Большая Никитская, 12", "Зима 2026", "Шубы из искусственного меха", "Отложим шубу на три дня"];

export function Marquee() {
  const line = ITEMS.map((t) => (
    <span key={t} className="flex items-center gap-8 pr-8">
      {t}
      <span aria-hidden className="size-1 rounded-full bg-paper" />
    </span>
  ));
  return (
    <div className="overflow-hidden bg-ink text-paper">
      <p className="sr-only">{ITEMS.join(". ")}</p>
      <div aria-hidden className="flex w-max animate-marquee py-2 font-label text-caption uppercase tracking-[0.08em]">
        {line}
        {line}
      </div>
    </div>
  );
}
