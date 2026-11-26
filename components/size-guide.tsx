import { SIZE_CHART } from "@/lib/coats";

// Таблица обхватов. Показывается по ссылке «Таблица размеров» рядом с размерами.
export function SizeTable() {
  return (
    <div className="mt-4 border-t border-line pt-4">
      <table className="w-full text-left text-caption tabular-nums">
        <caption className="mb-2 text-left text-caption text-muted">Обхваты тела, см</caption>
        <thead className="text-muted">
          <tr><th scope="col" className="py-1 font-normal">Размер</th><th scope="col" className="py-1 font-normal">Грудь</th><th scope="col" className="py-1 font-normal">Талия</th><th scope="col" className="py-1 font-normal">Бёдра</th></tr>
        </thead>
        <tbody>
          {SIZE_CHART.map((r) => (
            <tr key={r.size}><th scope="row" className="py-1 font-normal">{r.size}</th><td className="py-1">{r.chest}</td><td className="py-1">{r.waist}</td><td className="py-1">{r.hips}</td></tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-caption text-muted">Шубы сидят свободно. Если вы между размерами, берите меньший.</p>
    </div>
  );
}
