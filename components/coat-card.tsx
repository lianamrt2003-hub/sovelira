import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Coat } from "@/lib/coats";

// Плитка шубы в блоке «Ещё»: фото на светлом фоне, под ним название и цена.
export function CoatCard({ coat }: { coat: Coat }) {
  const inStock = coat.sizes.length > 0;
  return (
    <article>
      <Link href={`/coats/${coat.id}`} className="group block">
        <div className="bg-tile p-4">
          <Image
            src={coat.photos[0].src}
            alt={`Шуба ${coat.name}, ${coat.color}`}
            width={600}
            height={800}
            className={`aspect-3/4 w-full object-contain mix-blend-multiply brightness-102 transition-transform duration-500 group-hover:scale-[1.02] ${inStock ? "" : "opacity-50"}`}
          />
        </div>
        <h3 className="mt-3 font-label text-label uppercase">{coat.name}</h3>
        <p className={`mt-1 text-caption ${inStock ? "" : "text-muted"}`}>{formatPrice(coat)}</p>
      </Link>
    </article>
  );
}
