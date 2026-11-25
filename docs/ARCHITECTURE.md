# Architecture (Medova Banka)

Purpose: explain project organization and rendering model.

## Rendering model

Static Astro site with `output: 'static'` and directory build format. Cloudflare Pages serves generated files plus the Pages Function for leads.

## Layout and component map

- `src/layouts/BaseLayout.astro`: global styles, SEO, LD JSON, header, footer, sticky call button, cookie banner and modal script.
- `src/components/*.astro`: page sections such as Hero, HoneySorts, FAQ, ProductCards, Offer cards.
- `src/components/SEO.astro`: title, description, canonical, OG, Twitter and robots tags.
- `src/components/JsonLd.astro`: structured data script injection.
- Pages under `src/pages/` map to routes, mostly `.astro`.

## Data sources

- `src/data/site.ts`: site name, URL, phone, email, Telegram, seller fields with TODOs and lastUpdated.
- `src/data/products.ts`: three honey products and price pairs.
- `src/data/faq.ts`: groups order/quality/storage and question items.
- `src/data/gallery.ts`: six gallery image URLs/alt text.
- `src/data/reviews.ts`: empty review list placeholder.

## Scripts and build pipeline

1. `npm prebuild` runs `scripts/generate-og.mjs`.
2. OG generator reads photos/fonts, produces ten PNGs to `public/og/`.
3. Astro builds static pages to `dist/`.

`scripts/generate-og.mjs` uses Lora/Noto Sans fonts from `scripts/fonts/`, a logo JPEG and photo files.

## Lead pipeline

Cloudflare Pages Function at `functions/api/lead.ts` receives JSON, validates it and sends Telegram messages. See `docs/DATA-FLOW.md`.