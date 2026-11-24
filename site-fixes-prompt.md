# Task: UI fixes, photos and FAQ expansion for the honey landing page ("Медова Банка")

Project: Astro site, runs locally on `http://localhost:4321`. Site language is Ukrainian. All photos are already in the project (find them first, e.g. `rg --files | rg -i "photo-"`, and check `public/` and `src/assets/`). Do not break the existing lead-form logic (`lead-form.ts`, `/api/lead`, `StickyContact.astro`).

Work through the tasks in order. After each one, check it in the browser at desktop and mobile widths (360px, 768px, 1280px+). Do not change anything not listed here.

---

## 1. Fix the SVG icons in the "features" strip

The strip sits right below the hero and has 4 items: "Власна пасіка", "Свіжий мед 2026", "Чистий мед", "Доставка по Україні".

Problems now:
- The icons look inconsistent: different visual weight, size, stroke width and alignment. The "Чистий мед" (drop) icon looks broken or off-center. The "Свіжий мед 2026" icon is an unclear diagonal stroke.
- The drop icon renders with a strange mark inside.

What to do:
- Replace all 4 icons with one consistent set of inline SVGs: same `viewBox="0 0 24 24"`, same rendered size (about 40–48px), same `stroke-width` (about 1.5–2), `stroke="currentColor"`, `fill="none"`, round line caps and joins.
- Suggested meanings: hexagon or honeycomb for the apiary, calendar-check or leaf for fresh honey 2026, a clean droplet for pure honey, a truck for delivery. Lucide-style paths are fine; write them inline, no new dependency.
- Use the site's accent color (the same orange as the buttons). Center each icon horizontally above its title with equal spacing.
- Check that no icon is clipped or distorted at any width. Add `aria-hidden="true"` to each.

## 2. Inverted-color contact block (the lead form section "Хочете замовити мед?")

Make this section stand out as an inverted block, in the style of the site's palette:
- Section background: dark brown (reuse the footer/heading brown from the existing CSS variables; do not hardcode a new brown if one exists).
- Heading and subheading text: white (or a very light cream).
- Field labels: white. Inputs and select: white background, dark brown text, a visible placeholder, a clear focus ring in light yellow.
- Buttons (the submit button "Отримати консультацію"): light yellow background (for example `#FFE08A`, or the nearest existing palette color) with dark brown text. Add a hover state that is a bit stronger and a visible `:focus-visible` outline.
- Consent checkbox: clearly visible on the dark background (light border, light-yellow checked state). The consent text is white, the "Політика конфіденційності" link is light yellow and underlined.
- Error and success messages must stay readable on the dark background (use light tints, not dark red on brown).
- Keep spacing and layout as they are. Check text contrast against WCAG AA (4.5:1 for body text).
- The section sits next to the beige features strip above it and the other sections below it. Make sure it looks intentional and does not merge with the brown footer (add spacing or a different section order only if it truly collides; do not reorder sections otherwise).
- Apply the same inverted style to the sticky contact widget form (`StickyContact.astro`) if it shares these form styles, so the two forms stay visually consistent. Do not change their submit logic.

## 3. Make the floating contact button (bottom right) bigger

- Increase the round phone button from about 68px to about 84–88px on desktop and about 72–76px on mobile, with the phone icon scaled in proportion (about 40px).
- Keep it fixed bottom-right, with `bottom`/`right` offsets of about 24px and `env(safe-area-inset-bottom)` respected.
- Keep its z-index above the content and make sure it does not overlap the cookie banner or the footer text in a way that blocks reading. Keep the existing click behavior.
- Slightly stronger shadow, and a visible focus state.

## 4. Real photos in the "Про нашу пасіку" block

- Replace the placeholder "TODO: фото пасіки" with `photo-4` (use the actual file extension found in the project, e.g. `.webp`/`.jpg`).
- Use Astro's `<Image />` or `<picture>` if the project already does that for other images; otherwise a plain `<img>` is fine.
- The image must fill the card (`object-fit: cover`), keep the rounded corners and the current block proportions. Use `loading="lazy"`, explicit `width` and `height` to avoid layout shift, and a meaningful Ukrainian `alt`, for example: "Пасіка родини Кривцових на Сумщині".

## 5. Real photos in the "Пасіка, мед і наші будні" gallery

- Replace the 6 "TODO: замінити реальним фото" placeholders with the photos `photo-5` to `photo-11` (that is 7 photos, a range inclusive on both ends).
- The grid currently has 6 slots, so adjust the layout so all 7 photos fit without an empty cell (for example 4 + 3 centered, or a responsive grid where the first photo is larger). Keep the 3-column desktop feel, 2 columns on tablet, 1 on small mobile.
- Each image: `object-fit: cover`, a fixed aspect ratio (for example 4/3), rounded corners as now, `loading="lazy"`, `width`/`height`, and an individual Ukrainian `alt` that describes what is in the photo (look at each photo to write it; do not use "photo-5"-style alt text).
- Remove the dashed placeholder border and the TODO text.
- Optional, only if it is cheap and the project has no lightbox yet: skip it. Do not add new dependencies.

## 6. FAQ: expand to 15 questions

Find where the FAQ data lives (the "Питання та відповіді" block on the home page shows the first 6, and the button "Усі питання" leads to the full FAQ page). Make the total exactly **15** questions and answers, keeping the 6 existing ones unchanged.

Rules:
- Write in Ukrainian, in the same friendly, short style as the existing answers (2–4 sentences each).
- Use only facts that already exist on the site: family apiary of the Kryvtsov family in Sumy region, 15 hives, honey of the 2026 harvest, 3 kinds (липовий, соняшниковий, мед з різнотрав'я), jars of 1 L and buckets of 3 L (glass or food-grade plastic by the client's choice), prices as shown on the product cards, orders by the form, by phone +38 (099) 701-12-56 or via Telegram bot @medovabanka_bot, schedule daily 7:00–21:00, delivery by Нова пошта and Укрпошта, self-pickup in Sumy, no sugar and no additives.
- Do not invent facts you cannot verify (laboratory certificates, exact delivery prices, exact payment terms, prepayment amounts, discounts, wholesale conditions). If an answer needs such a fact and it is not already in the project, write a safe general answer and add a `TODO: confirm with the owner` comment in the code, not in the visible text.
- Suggested new topics (9 more): why honey crystallizes and that it is natural; how to store honey; how to tell natural honey from fake; differences between linden, sunflower and mixed-flower honey; which jar size to choose; can honey be given to children (general note: not for infants under 1 year, consult a doctor if needed); can I order several kinds in one order; how to contact you and working hours; what to do if the package arrives damaged.
- Keep the FAQ structured data (JSON-LD `FAQPage`) in sync if the project already generates it. It must include all 15 items, built from the same data source, with no duplicated text.
- Make sure the home page still shows only the first 6 plus the "Усі питання" button, and the full page shows all 15.

---

## Definition of done

- `npm run build` (or the project's build command) passes with no new warnings or errors.
- No "TODO" placeholder text is visible anywhere on the page in the blocks above.
- Icons, the inverted form block, the bigger floating button, the photos and the 15 FAQ items look right at 360px, 768px and 1280px+.
- Both lead forms still submit successfully with the same logic as before.
- At the end, give a short summary: the files changed, and anything you could not verify or had to assume (especially FAQ facts marked TODO and the 7th photo layout choice).
