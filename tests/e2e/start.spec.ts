import { test, expect } from "@playwright/test";

test("главная: подиум из 7 шуб листается", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Зима 2026", level: 1 })).toBeVisible();
  await expect(page.getByText("01 / 07")).toBeVisible();
  await page.getByRole("button", { name: "Следующая модель" }).click();
  await expect(page.getByText("02 / 07")).toBeVisible();
  await expect(page.getByRole("link", { name: "Открыть Милерт" })).toBeVisible();
});

test("состояния главной: loading, empty, error", async ({ page }) => {
  await page.goto("/?state=loading");
  await expect(page.getByRole("status", { name: "Загружаем коллекцию" })).toBeVisible();
  await page.goto("/?state=empty");
  await expect(page.getByText("Коллекция скоро появится")).toBeVisible();
  await page.goto("/?state=error");
  await expect(page.getByText("Не удалось загрузить")).toBeVisible();
});

test("запись на примерку: без размера ошибка, с размером успех", async ({ page }) => {
  await page.goto("/coats/elizzia");
  await page.getByRole("button", { name: /Записаться на примерку/ }).click();
  await expect(page.getByRole("alert").filter({ hasText: "Выберите размер" })).toBeVisible();
  await page.getByRole("button", { name: "44", exact: true }).click();
  await page.getByRole("button", { name: /Записаться на примерку/ }).click();
  await expect(page.getByText("Вы записаны на примерку")).toBeVisible();
});

test("карточка: таблица размеров", async ({ page }) => {
  await page.goto("/coats/elizzia");
  await page.getByRole("button", { name: "Таблица размеров" }).click();
  await expect(page.getByRole("table")).toContainText("Грудь");
});

test("серверный маршрут отвечает без ключей", async ({ page }) => {
  await page.goto("/api/health");
  await expect(page.locator("body")).toContainText('"ok":true');
});
