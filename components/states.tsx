import Link from "next/link";

// Состояния экрана: загрузка, пусто, ошибка. Открываются через ?state=...
export function LoadingState({ count = 4 }: { count?: number }) {
  return (
    <div role="status" aria-label="Загружаем коллекцию" className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {Array.from({ length: count }, (_, i) => <div key={i} className="aspect-3/4 animate-pulse bg-tile" />)}
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="mx-auto max-w-md text-center">
      <p className="font-label text-title uppercase">Коллекция скоро появится</p>
      <p className="mt-3 text-body text-muted">Сейчас все шубы на пошиве. Приходите в шоурум посмотреть образцы меха.</p>
      <Link href="#showroom" className="mt-6 inline-flex h-11 items-center bg-ink px-5 font-label text-label uppercase text-paper">Адрес шоурума</Link>
    </div>
  );
}

export function ErrorState({ retryHref }: { retryHref: string }) {
  return (
    <div role="alert" className="mx-auto max-w-md text-center">
      <p className="font-label text-title uppercase">Не удалось загрузить</p>
      <p className="mt-3 text-body text-muted">Проверьте интернет и обновите страницу.</p>
      <Link href={retryHref} className="mt-6 inline-flex h-11 items-center bg-ink px-5 font-label text-label uppercase text-paper">Обновить</Link>
    </div>
  );
}
