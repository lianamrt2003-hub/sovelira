// Тестовые (моковые) данные каталога VORS. База появится на паре 5.
export interface Coat {
  id: string;
  name: string;
  color: string;
  price: number; // цена в рублях
  sizes: string[]; // размеры в наличии; пустой список — нет в наличии
  description: string;
  photos: { src: string; label: string }[]; // фото на чисто белом фоне, без теней и бирок
  length: number; // длина изделия по спинке, см
  details: string[]; // крой, застёжка, карманы — то, что видно на примерке
}

// Состав и уход одинаковые для всей коллекции.
export const MATERIAL = "Мех: 70% модакрил, 30% полиэстер. Подклад: 100% вискоза.";
export const CARE = "Только химчистка. Сушить на плечиках вдали от батареи.";

// Все размеры, которые шьёт бренд. Каких нет у модели — показываем зачёркнутыми.
export const SIZE_RANGE = ["42", "44", "46", "48", "50"];

// Таблица размеров: обхваты тела в сантиметрах.
export const SIZE_CHART = [
  { size: "42", chest: 84, waist: 66, hips: 92 },
  { size: "44", chest: 88, waist: 70, hips: 96 },
  { size: "46", chest: 92, waist: 74, hips: 100 },
  { size: "48", chest: 96, waist: 78, hips: 104 },
  { size: "50", chest: 100, waist: 82, hips: 108 },
];

const photo = (id: string) => [{ src: `/shuby/${id}.jpg`, label: "спереди" }];

export const coats: Coat[] = [
  {
    id: "elizzia", name: "Элиззия", color: "белый", price: 49900, sizes: ["42", "44", "46"],
    description: "Белая шуба оверсайз с широкими лацканами, отворотами на рукавах и леопардовой подкладкой.",
    photos: photo("elizzia"), length: 85,
    details: ["Свободный крой", "Широкие лацканы", "Отвороты на рукавах", "Леопардовая подкладка"],
  },
  {
    id: "milert", name: "Милерт", color: "чёрный с белым воротником", price: 54900, sizes: ["42", "44", "46"],
    description: "Жакет-кимоно с рукавами-фонариками, широким белым меховым воротником и длинным поясом.",
    photos: photo("milert"), length: 70,
    details: ["Объёмные рукава", "Широкий меховой воротник", "Пояс в комплекте", "Запах без застёжки"],
  },
  {
    id: "nordis", name: "Нордис", color: "снежная рысь", price: 58900, sizes: ["44", "46", "48"],
    description: "Длинная прямая шуба с пятнистым принтом под снежную рысь и отложным воротником.",
    photos: photo("nordis"), length: 115,
    details: ["Прямой крой", "Отложной воротник", "Потайные крючки", "Два боковых кармана"],
  },
  {
    id: "velia", name: "Велия", color: "коричневый с малиновым", price: 46900, sizes: [],
    description: "Укороченный жакет с двойным воротником: тёплый лисий оттенок и яркая малиновая полоса.",
    photos: photo("velia"), length: 60,
    details: ["Укороченный крой", "Двойной воротник", "Без застёжки", "Широкие рукава"],
  },
  {
    id: "selin", name: "Селин", color: "небесно-голубой", price: 39900, sizes: ["42", "44", "46", "48"],
    description: "Шуба до середины бедра с длинным мягким ворсом и большими лацканами.",
    photos: photo("selin"), length: 80,
    details: ["Длинный ворс", "Большие лацканы", "Потайная застёжка", "Два кармана"],
  },
  {
    id: "aurel", name: "Аурель", color: "пэчворк", price: 44900, sizes: ["44", "46"],
    description: "Короткая шуба из лоскутов меха кремового, рыжего и серого оттенков.",
    photos: photo("aurel"), length: 65,
    details: ["Лоскутный мех", "Отложной воротник", "Застёжка на крючки", "Свободный крой"],
  },
  {
    id: "lanna", name: "Ланна", color: "рыжий в пятнах", price: 36900, sizes: ["42", "44"],
    description: "Укороченный меховой пуловер с принтом «оленёнок», воротником и молнией.",
    photos: photo("lanna"), length: 58,
    details: ["Пуловер", "Воротник-стойка", "Молния до груди", "Два кармана"],
  },
];

export function formatPrice(coat: Coat): string {
  if (coat.sizes.length === 0) return "Нет в наличии";
  return new Intl.NumberFormat("ru-RU").format(coat.price) + " ₽";
}

export function findCoat(id: string): Coat | undefined {
  return coats.find((c) => c.id === id);
}

// Состояния экрана открываются по адресу: ?state=loading | empty | error | success
export type ScreenState = "ready" | "loading" | "empty" | "error" | "success";
export function readState(value: string | string[] | undefined): ScreenState {
  const v = Array.isArray(value) ? value[0] : value;
  return v === "loading" || v === "empty" || v === "error" || v === "success" ? v : "ready";
}
