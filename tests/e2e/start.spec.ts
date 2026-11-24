import { test, expect } from "@playwright/test";
test("главная показывает каталог из 6 шуб", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "SOVELIRA", level: 1 }),
  ).toBeVisible();
  await expect(page.locator("article")).toHaveCount(6);
  await expect(page.getByText("Нет в наличии")).toBeVisible();
});
test("серверный маршрут отвечает без ключей", async ({ page }) => {
  await page.goto("/api/health");
  await expect(page.locator("body")).toContainText('"ok":true');
});
