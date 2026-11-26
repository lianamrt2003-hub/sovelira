"use client";
import { useState } from "react";
import { SIZE_RANGE, type Coat } from "@/lib/coats";
import { SizeTable } from "@/components/size-guide";

// Правая колонка карточки: размер сверху, кнопка записи внизу. Оплаты и корзины нет.
export function FittingForm({ coat, initialSuccess = false }: { coat: Coat; initialSuccess?: boolean }) {
  const [size, setSize] = useState<string | null>(initialSuccess ? coat.sizes[0] ?? null : null);
  const [error, setError] = useState("");
  const [done, setDone] = useState(initialSuccess);
  const [showTable, setShowTable] = useState(false);
  const inStock = coat.sizes.length > 0;

  return (
    <form
      className="flex h-full flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        if (!size) return setError("Выберите размер");
        setDone(true);
      }}
    >
      <fieldset id="size" className="scroll-mt-20">
        <div className="flex items-baseline justify-between">
          <legend className="font-label text-label uppercase">Размер</legend>
          <button type="button" aria-expanded={showTable} onClick={() => setShowTable((v) => !v)} className="text-caption text-muted underline underline-offset-4">
            Таблица размеров
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {SIZE_RANGE.map((s) => {
            const available = coat.sizes.includes(s);
            const selected = size === s;
            return (
              <button
                key={s}
                type="button"
                disabled={!available || done}
                aria-pressed={selected}
                onClick={() => { setSize(s); setError(""); }}
                className={`h-11 min-w-12 px-3 text-label tabular-nums ${!available ? "bg-surface text-disabled line-through" : selected ? "bg-ink text-paper" : "bg-surface"}`}
              >
                {s}
              </button>
            );
          })}
        </div>
        {error && <p role="alert" className="mt-3 text-caption text-danger">{error}</p>}
        {showTable && <SizeTable />}
      </fieldset>

      <div className="mt-8 lg:mt-auto">
        {done ? (
          <div role="status" className="bg-tile p-5">
            <p className="font-label text-label uppercase">Вы записаны на примерку</p>
            <p className="mt-2 text-body">{coat.name}{size ? `, размер ${size}` : ""}. Позвоним, чтобы выбрать время.</p>
          </div>
        ) : (
          <>
            <button type="submit" disabled={!inStock} className="h-13 w-full bg-ink px-5 font-label text-label uppercase text-paper disabled:bg-disabled">
              {inStock ? "Записаться на примерку" : "Нет в наличии"}
            </button>
            <p className="mt-3 text-caption text-muted">Примерка в шоуруме бесплатная.</p>
          </>
        )}
      </div>
    </form>
  );
}
