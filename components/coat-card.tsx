import type { Coat } from "@/lib/coats";

// Карточка одной шубы в каталоге. Цвета и размеры текста — только из токенов (app/globals.css).
export function CoatCard({ coat }: { coat: Coat }) {
  const inStock = coat.sizes.length > 0;
  const price = new Intl.NumberFormat("ru-RU").format(coat.price);

  return (
    <article className="rounded-card border border-line bg-surface p-6 shadow-card">
      <p className="text-caption text-secondary">{coat.color}</p>
      <h2 className="mt-2 text-title font-semibold">{coat.name}</h2>
      <p className="mt-3 text-body font-semibold">{price} ₽</p>
      <p className="mt-3 text-caption text-secondary">
        {`Размеры: ${coat.sizes.join(", ")}`}
      </p>
    </article>
  );
}
