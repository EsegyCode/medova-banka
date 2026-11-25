# Medova Banka (Українська)

Сайт продажу меду з власної пасіки: липовий, соняшниковий та з різнотрав'я. Інтерфейс українською, статична збірка Astro, деплой на Cloudflare Pages, форми згоди/honeypot і SERVERLESS `/api/lead` для Telegram.

## Запуск

Вимоги: Node.js >= 22.23.4.

```sh
npm install
npm run dev
npm run build
npm run preview
```

Збірка генерує OG-зображення у `prebuild`. Змінні: `PUBLIC_LEAD_MOCK`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (встановлюються в dashboard). URL продакшену в Astro config: `https://medova-banka.shop`.

## Документація

- [English README](README.md)
- [Архітектура](docs/ARCHITECTURE.md)
- [Потік даних](docs/DATA-FLOW.md)
- [Деплой](docs/DEPLOYMENT.md)
- [FAQ](docs/FAQ.md)