# Medova Banka

Purpose: Ukrainian-language honey sales site for honey from the owner's own apiary, with product descriptions, FAQ, legal pages, SEO markup, lead capture and dynamically generated Open Graph images.

Live URL: `https://medova-banka.shop` (from `astro.config.mjs`). Status: static Astro site. The `.env.example` says `PUBLIC_LEAD_MOCK` and Cloudflare secrets are used for lead handling. License: TODO (owner).

## Key features

- Three honey products: linden, sunflower and mixed flower.
- Lead form with consent validation and honeypot field; posts to `/api/lead`.
- Portfolio FAQ grouped by order, quality and storage.
- Legal pages: privacy, public offer, cookie policy, plus delivery/payment and contact pages.
- LocalBusiness and WebSite JSON-LD, sitemap, robots, `llms.txt` and `llms-full.txt`.
- 10 dynamic Open Graph images generated before each build.
- Cookie banner, skip link and modal confirmation.
- Cache-busting query `?v=3` on OG images.

## Tech stack

| Area | Technology | Notes |
| --- | --- | --- |
| Framework | Astro 7.4 | static output, directory build format |
| Language | TypeScript | `src/data/*.ts`, Astro components |
| Styling | Custom CSS | `src/styles/global.css` |
| OG images | Satori, Resvg, Sharp | `scripts/generate-og.mjs` |
| SEO | `@astrojs/sitemap`, llms endpoints, JSON-LD | config in `astro.config.mjs` |
| Hosting | Cloudflare Pages | `.env.example`, `.dev.vars.example` |
| Build checks | `npm run check` | Astro TypeScript check |

## Quick start

Prerequisites: Node.js >= 22.23.4 (`engines`).

```sh
npm install
npm run dev
```

Build after regenerating OG images:

```sh
npm run build
npm run preview
```

Test after a change:

```sh
npm run check
```

## Environment variables

Names and purposes only:

- `PUBLIC_LEAD_MOCK` (`.env.example`): `true` submits the lead form without network requests.
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (Cloudflare Pages secrets): Telegram delivery for leads.
- `PUBLIC_SITE_URL` (optional override referenced in code): production domain.

## Project structure

```text
medova-banka/
├── src/components, layouts, pages, data, styles
├── functions/api/lead.ts   # serverless lead handler
├── scripts/generate-og.mjs # dynamic OG images
├── public/                 # logos, photos, robots.txt, llms*.txt if generated
└── astro.config.mjs
```

## Documentation

- [Features](docs/FEATURES.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Data flow](docs/DATA-FLOW.md)
- [Deployment](docs/DEPLOYMENT.md)
- [Maintainer FAQ](docs/FAQ.md)
- [Content guide](docs/CONTENT-GUIDE.md)
- [SEO and AI readiness](docs/SEO.md)
- [Changelog](docs/CHANGELOG.md)
- [Ukrainian version](README.uk.md)

## Deployment

Static build to `dist/`. OG images are generated during `prebuild`; ensure fonts and photos remain available at build time. Lead function secrets must be configured in Cloudflare Pages. Detailed notes are in [Deployment](docs/DEPLOYMENT.md).

## Source privacy note

Seller data in `src/data/site.ts` still contains `TODO` placeholders. Do not add real private data except through owner-approved content. License and contact authority: TODO (owner).