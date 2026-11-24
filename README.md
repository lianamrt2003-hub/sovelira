# Стартовый проект · Техническая грамотность

Это содержимое GitHub template для индивидуального проекта по силлабусу. Работает без базы и ключей. Здесь намеренно нет готовой фичи, авторизации и LLM: их вы создаёте на занятиях.

## Первые пять минут
Node 24 LTS и git. Нажмите Use this template → создайте свой репозиторий. Склонируйте его, перейдите в папку:

```text
npm ci
npm run dev
```

Откройте адрес из терминала (обычно http://localhost:3000). PowerShell: при блокировке npm.ps1 используйте npm.cmd. Для Git откройте второй терминал. Измените заголовок в app/page.tsx и цвет --color-primary в app/globals.css руками.

## Запуск на Windows: что пришлось сделать
Проверено 24.11.2026 на Windows 11, Node 24.22.3.

1. Склонировать репозиторий: `git clone https://github.com/lianamrt2003-hub/sovelira.git`, затем `cd sovelira`.
2. В PowerShell вместо `npm` писать `npm.cmd`: `npm.cmd ci`, затем `npm.cmd run dev`.
3. Если `npm.cmd ci` падает с ошибкой `ECONNRESET` (обрыв сети), переключить источник пакетов и повторить:
   `npm.cmd config set registry https://registry.npmmirror.com`, затем снова `npm.cmd ci`. Установка заняла около 5 минут.
4. Открыть http://localhost:3000. Ссылка про telemetry в терминале не нужна — это сообщение Next.js о статистике.

## Проверки
```text
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

CI запускает эти же проверки на push/PR. E2E поднимает свой сервер на 3100. Smoke-тест — пример инструмента, не закрывает будущий сценарий КТ-4.

## Карта
- app/page.tsx — старт; app/api/health/route.ts — серверный маршрут для Network.
- components/course-card.tsx — компонент с props для МЗ-2, не button.tsx.
- components/ui/button.tsx — локальная адаптация shadcn/ui на Radix с asChild.
- app/globals.css — токены Tailwind 4 через @theme.
- PRODUCT.md, CLAUDE.md, DESIGN.md, DECISIONS.md — заполнить под свой продукт.
- tests/unit и tests/e2e, .github/workflows/ci.yml — работающие примеры проверок.
- docs и supabase/migrations — заготовки следующей работы.

Не коммитить реальные .env, ключи и тестовые пароли. .env.example содержит только имена. Публикация репозитория на GitHub не заменяет деплой на Vercel. Баллы и сроки — по выданному силлабусу.

[Карта пяти пар](docs/course-map.md) · [Результат проверки исходной заготовки](docs/verification.md).
