# Maintainer FAQ (Medova Banka)

Purpose: practical maintenance answers for the honey site.

## How do I run the site locally?

Install Node.js >= 22.23.4 and run `npm install`; then `npm run dev`. Use `npm run build` and `npm run preview` before release.

## Where do I edit site contacts and working hours?

Edit `src/data/site.ts`. It contains phone, email, Telegram, city, region and seller TODO fields.

## Where are honey products and prices?

`src/data/products.ts`; each product has prices for 1 L and 3 L. SKU quantities in the UI may reference those prices.

## Where is FAQ content?

`src/data/faq.ts` exports `faqGroups` and `faqItems`; each item has `group`, `q`, `a`.

## Where are gallery images?

`src/data/gallery.ts`. Images are referenced from `public/`; maintain alt text when replacing.

## How does the lead form work?

Forms submit JSON to `/api/lead`. The Cloudflare function validates name, phone format and consent, returns fake success for honeypot, and sends Telegram. `PUBLIC_LEAD_MOCK=true` skips network and pretends success.

## How do I regenerate OG images?

Run `npm run og`. It regenerates ten `public/og/*.png` files from photos and Lora/Noto fonts. Increase page titles slowly to keep title lengths within OH wrapping.

## How do I update `llms.txt`?

Astro routes `/llms.txt` and `/llms-full.txt` build from site/product/FAQ/gallery data. Rebuild to update.

## What is missing from legal/seller data?

`src/data/site.ts` contains `TODO` values for seller legal name, tax ID, registration status and legal address. Do not commit guessed values.

## What should I check after deploy?

Home page, phone formatting, lead form or mock, consent checkbox, OG image 200, JSON-LD, sitemap, robots, llms and phone/email links. Run `npm run check`.