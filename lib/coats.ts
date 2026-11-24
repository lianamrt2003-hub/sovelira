// Тестовые (моковые) данные каталога. База появится на паре 5.
export interface Coat {
  id: string;
  name: string;
  price: number; // цена в рублях
  color: string;
  sizes: number[]; // размеры в наличии; пустой список — нет в наличии
}

export const coats: Coat[] = [
  { id: "elizzia", name: "Элиззия", price: 48900, color: "Молочный", sizes: [42, 44, 46] },
  { id: "milert", name: "Милерт", price: 52900, color: "Графит", sizes: [44, 46, 48] },
  { id: "nordis", name: "Нордис", price: 39900, color: "Карамель", sizes: [42, 44] },
  { id: "velia", name: "Велия", price: 45900, color: "Шоколад", sizes: [] },
  { id: "aurel", name: "Аурель", price: 56900, color: "Песочный", sizes: [46, 48, 50] },
  { id: "selin", name: "Селин", price: 34900, color: "Чёрный", sizes: [42] },
];
