import { site } from '../data/site.ts';
import { products } from '../data/products.ts';
import { faqItems, faqGroups } from '../data/faq.ts';

export function GET() {
  const base = site.siteUrl.replace(/\/$/, '');
  const faqText = faqGroups.map((g) => {
    const items = faqItems.filter((i) => i.group === g.id);
    return `## ${g.title}\n\n` + items.map((i) => `Питання: ${i.q}\nВідповідь: ${i.a}`).join('\n\n');
  }).join('\n\n');
  const productsText = products.map((p) => `- ${p.name}: ${p.shortDesc} Ціна: 1 л — ${p.price1L} грн, 3 л — ${p.price3L} грн.`).join('\n');
  const body = `# Медова Банка — повний текстовий опис

${site.siteName} — сімейна пасіка родини Кривцових із Сумської області, Україна. Головний бджоляр — Сергій Олександрович Кривцов (понад 25 років досвіду). 15 вуликів, мед лише власного виробництва, свіжий урожай 2026 року.

## Продукти

${productsText}

Фасування на вибір: скло або харчовий пластик. Кристалізація меду — природна властивість, не недолік.

## Доставка і оплата

Відправляємо Новою поштою й Укрпоштою по Україні; вартість за тарифами перевізника (оплачує покупець). Самовивіз у м. ${site.addressLocality} безкоштовно. Працюємо за передплатою, можлива часткова оплата. Пакуємо надійно.

## Контакти

Телефон: ${site.phone}. Email: ${site.email}. Telegram: ${site.telegramBot} (${site.telegramUrl}). Графік: ${site.workingHours}. Регіон: ${site.addressLocality}, ${site.addressRegion}, ${site.country}.

## Питання та відповіді

${faqText}

## Сторінки

- Головна: ${base}/
- Товари: ${base}/#products
- Ціни: ${base}/#prices
- Про пасіку: ${base}/pro-pasiku/
- Доставка і оплата: ${base}/dostavka-ta-oplata/
- Контакти: ${base}/kontakty/
- FAQ: ${base}/pytannya-vidpovidi/
- Карта сайту: ${base}/karta-saitu/
- Політика конфіденційності: ${base}/polityka-konfidentsiinosti/
- Договір публічної оферти: ${base}/publichna-oferta/
- Політика cookie: ${base}/polityka-cookie/
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}