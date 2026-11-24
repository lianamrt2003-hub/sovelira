import { expect, test } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { CoatCard } from "@/components/coat-card";

test("карточка показывает название и размеры шубы", () => {
  const html = renderToStaticMarkup(
    createElement(CoatCard, {
      coat: { id: "t", name: "Тест", price: 40000, color: "Белый", sizes: [42, 44] },
    }),
  );
  expect(html).toContain("Тест");
  expect(html).toContain("Размеры: 42, 44");
});

test("шуба без размеров помечена «Нет в наличии»", () => {
  const html = renderToStaticMarkup(
    createElement(CoatCard, {
      coat: { id: "t", name: "Тест", price: 40000, color: "Белый", sizes: [] },
    }),
  );
  expect(html).toContain("Нет в наличии");
  expect(html).not.toContain("Размеры");
});
