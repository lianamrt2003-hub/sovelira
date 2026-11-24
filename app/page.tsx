import { CoatCard } from "@/components/coat-card";
import { coats } from "@/lib/coats";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <p className="text-caption font-semibold text-primary">
        ШУБЫ ИЗ ИСКУССТВЕННОГО МЕХА
      </p>
      <h1 className="mt-5 text-display font-semibold">SOVELIRA</h1>
      <p className="mt-5 max-w-2xl text-body text-secondary">
        Каталог моделей сезона. Выберите шубу, чтобы примерить её в шоуруме.
      </p>
      <section
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Каталог шуб"
      >
        {coats.map((coat) => (
          <CoatCard key={coat.id} coat={coat} />
        ))}
      </section>
    </main>
  );
}
