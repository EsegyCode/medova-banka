# Content Guide (Medova Banka)

Purpose: map content and data locations.

## Data files

- `src/data/site.ts`: name, URL, contact phone, email, Telegram, hours, region, seller fields, lastUpdated.
- `src/data/products.ts`: product slug-like ID, name, description and prices.
- `src/data/faq.ts`: `FaqGroup` and `FaqItem`.
- `src/data/gallery.ts`: gallery image paths and alt text.
- `src/data/reviews.ts`: currently empty; TODO owner for real reviews.

## Product data shape

```ts
{
  id: 'lypovyi',
  name: 'Липовий мед',
  shortDesc: 'text',
  price1L: 380,
  price3L: 1100
}
```

Prices are numbers. The UI displays them in UAH.

## FAQ group shape

```ts
{ group: 'order', title: 'Замовлення, доставка та оплата' }
```

Each FAQ item has `group`, `q` and `a`. Reviews stay empty unless the owner supplies real review text with permission.