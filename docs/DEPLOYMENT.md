# Deployment (Medova Banka)

Purpose: build, host and configuration notes based on repository files.

## Build

```sh
npm install
npm run build
npm run preview
```

`npm run build` includes `prebuild` (`npm run og`). `npm run og` writes ten OG PNGs to `public/og/`. `npm run check` runs Astro type checking separately and is not part of build.

## Hosting output

Output folder is `dist/`. Hosting is evidenced by Cloudflare Pages secrets and `dev:cf` script (`npm run build && npx wrangler pages dev dist`). Domain is `https://medova-banka.shop` according to `astro.config.mjs`.

## Environment variables

Names and purposes only:

- `PUBLIC_LEAD_MOCK`: set `true` to make forms return success without calling `/api/lead`.
- `TELEGRAM_BOT_TOKEN`: Telegram bot access for lead notifications.
- `TELEGRAM_CHAT_ID`: recipient chat for lead messages.
- `PUBLIC_SITE_URL`: referenced in code as optional production domain override.

## OG cache-busting

`src/components/SEO.astro` appends `?v=3` to OG image URLs. Regenerate images with `npm run og` or `npm run build` after changing photo/font/title data.

## Post-deploy checklist

- Home, contact, FAQ, product and legal pages load.
- At least one `/og/og-*.png` URL returns an image.
- `robots.txt`, sitemap and `llms*.txt` are available.
- Lead form succeeds or is mocked according to environment.
- JSON-LD validates on home page.
- Phone formatting produces `+380XXXXXXXXX`.
- Skip link and cookie banner appear.