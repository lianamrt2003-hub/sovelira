import { expect, test } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { CoatCard } from "@/components/coat-card";
import { coats, formatPrice, readState, type Coat } from "@/lib/coats";

const base: Coat = {
  id: "t", name: "Тест", color: "белый", price: 40000, sizes: ["42", "44"],
  description: "", photos: [{ src: "/shuby/elizzia.jpg", label: "спереди" }], length: 100, details: [],
};

test("плашка показывает название, цену и ссылку на карточку", () => {
  const html = renderToStaticMarkup(createElement(CoatCard, { coat: base }));
  expect(html).toContain("Тест");
  expect(html).toMatch(/40\s000\s₽/);
  expect(html).toContain('href="/coats/t"');
});

test("шуба без размеров помечена «Нет в наличии» вместо цены", () => {
  expect(formatPrice({ ...base, sizes: [] })).toBe("Нет в наличии");
});

test("в коллекции 7 шуб, у каждой есть фото", () => {
  expect(coats).toHaveLength(7);
  for (const c of coats) expect(c.photos.length).toBeGreaterThan(0);
});

test("состояние экрана читается из адреса, мусор = обычный экран", () => {
  expect(readState("loading")).toBe("loading");
  expect(readState("error")).toBe("error");
  expect(readState("abc")).toBe("ready");
  expect(readState(undefined)).toBe("ready");
});
