import { site } from '../data/site.ts';
import { products } from '../data/products.ts';

export function GET() {
  const base = site.siteUrl.replace(/\/$/, '');
  const prices = products.flatMap((p) => [p.price1L, p.price3L]);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const body = `# Медова Банка

> Сімейна пасіка родини Кривцових у Сумській області (Україна): натуральний мед урожаю 2026 року (липовий, соняшниковий, з різнотрав'я), фасування 1 л і 3 л, доставка по Україні, самовивіз у Сумах.

## Короткі факти

- Продукти: ${products.map((p) => p.name).join(', ')}.
- Фасування: 1 л (банка) і 3 л (відро); пакування — скло або харчовий пластик за вибором клієнта.
- Ціни: від ${min} до ${max} грн (актуальні ціни на сторінці товарів).
- Як замовити: форма на сайті, телефон ${site.phone} або Telegram-бот ${site.telegramBot}.
- Графік роботи: ${site.workingHours}.
- Контакти: ${site.email}, ${site.phone}, ${site.telegramUrl}.
- Доставка: Нова пошта і Укрпошта по Україні (за рахунок покупця), самовивіз у Сумах безкоштовно.
- Мед натуральний, без цукру й добавок; кристалізація — природна властивість.

## Розділи

- [Товари](${base}/#products)
- [Ціни](${base}/#prices)
- [Про пасіку](${base}/pro-pasiku/)
- [Доставка і оплата](${base}/dostavka-ta-oplata/)
- [Контакти](${base}/kontakty/)
- [Питання та відповіді](${base}/pytannya-vidpovidi/)
- [Карта сайту](${base}/karta-saitu/)
- [Політика конфіденційності](${base}/polityka-konfidentsiinosti/)
- [Договір публічної оферти](${base}/publichna-oferta/)
- [Політика використання cookie](${base}/polityka-cookie/)
- [Повний текст](${base}/llms-full.txt)

## Optional

- [Карта сайту](${base}/sitemap-index.xml)
- [robots.txt](${base}/robots.txt)
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}