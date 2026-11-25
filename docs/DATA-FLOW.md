# Data Flow (Medova Banka)

Purpose: explain how content data, SEO files and leads move through the site.

## Content to page and schema

- `src/data/site.ts` feeds `BaseLayout.astro` and visible contact fields.
- `site.lastUpdated` appears in UI and legal sections.
- `products.ts` is imported by product cards/pages.
- `faq.ts` structures three FAQ groups and 25 questions.
- Client `LeadForm` posts name, phone, sort, source, product, page_url, company and consent.

## FAQ data to JSON-LD

FAQ data is rendered on `pytannya-vidpovidi.astro`; FAQ schema details are handled in page/template code. Fact: FAQ data groups exist and can be used by generated llms files.

AI-facing files flow:

```text
src/data/site/products/faq/gallery -> llms.txt.ts and llms-full.txt.ts -> /llms.txt and /llms-full.txt
```

Static output places them under `dist/` and makes them public.

## Lead request flow

```text
visitor form -> validation in browser -> POST /api/lead
  -> JSON parse and fields -> honeypot check
  -> name/phone/consent validation
  -> Telegram sendMessage -> JSON { ok: true }
```

In mock mode (`PUBLIC_LEAD_MOCK=true`), the form skips network fetch and reports success.

## Route and SEO data flow

- `astro.config.mjs` sets canonical `site` and sitemap filter.
- `SEO.astro` constructs canonical, OG and image URLs using `site.siteUrl` and `?v=3`.
- BaseLayout supplies `organization` and `webSite` JSON-LD.

## Cache and asset notes

- OG image responses and assets are subject to file name and query cache-busting.
- Typical output: `og-default.png`, `og-home.png`, etc., generated before build.