import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const root = process.cwd();
const outDir = path.join(root, 'public', 'og');
fs.mkdirSync(outDir, { recursive: true });

const lora = fs.readFileSync(path.join(root, 'scripts', 'fonts', 'Lora-Variable.ttf'));
const noto = fs.readFileSync(path.join(root, 'scripts', 'fonts', 'NotoSans-Regular.ttf'));

const logoBuf = await sharp(path.join(root, 'public', 'logo-medova-banka.jpg'))
  .resize(128, 128, { fit: 'cover' })
  .png()
  .toBuffer();
const logo = logoBuf.toString('base64');

const PHOTO_W = 542;
const PHOTO_H = 574;

const photoCache = new Map();
async function loadPhoto(filename) {
  if (photoCache.has(filename)) return photoCache.get(filename);
  const buf = await sharp(path.join(root, 'public', filename))
    .resize(PHOTO_W, PHOTO_H, { fit: 'cover', position: 'centre' })
    .png()
    .toBuffer();
  const b64 = buf.toString('base64');
  photoCache.set(filename, b64);
  return b64;
}

const pages = [
  {
    file: 'og-default.png',
    photo: 'photo-11.webp',
    title: 'Мед з власної пасіки',
    subtitle: 'Свіжий мед урожаю 2026 з Сумщини. Без цукру й добавок.',
  },
  {
    file: 'og-home.png',
    photo: 'photo-7.webp',
    title: 'Медова Банка',
    subtitle: 'Липовий, соняшниковий, різнотрав\'я. Свіжий мед з доставкою по Україні.',
  },
  {
    file: 'og-delivery.png',
    photo: 'photo-2.webp',
    title: 'Доставка і оплата',
    subtitle: 'Нова пошта, Укрпошта, самовивіз на Сумщині. Банки 1 л і відра 3 л.',
  },
  {
    file: 'og-about.png',
    photo: 'photo-10.webp',
    title: 'Про пасіку',
    subtitle: 'Родина Кривцових, 15 вуликів на Сумщині, понад 25 років досвіду.',
  },
  {
    file: 'og-faq.png',
    photo: 'photo-1.webp',
    title: 'Питання та відповіді',
    subtitle: 'Все про натуральний мед, зберігання, замовлення і доставку.',
  },
  {
    file: 'og-contacts.png',
    photo: 'photo-5.webp',
    title: 'Контакти',
    subtitle: 'Сумський район, телефон і Telegram для швидкого замовлення меду.',
  },
  {
    file: 'og-sitemap.png',
    photo: 'photo-11.webp',
    title: 'Карта сайту',
    subtitle: 'Усі розділи та сторінки сайту пасіки «Медова Банка».',
  },
  {
    file: 'og-privacy.png',
    photo: 'photo-6.webp',
    title: 'Політика конфіденційності',
    subtitle: 'Як ми збираємо та захищаємо ваші персональні дані.',
  },
  {
    file: 'og-terms.png',
    photo: 'photo-3.webp',
    title: 'Договір публічної оферти',
    subtitle: 'Умови замовлення, оплати та купівлі меду з нашої пасіки.',
  },
  {
    file: 'og-cookies.png',
    photo: 'photo-8.webp',
    title: 'Політика cookie',
    subtitle: 'Які файли cookie використовує сайт для зручності замовлень.',
  },
];

function getTitleFontSize(title) {
  if (title.length <= 15) return 62;
  if (title.length <= 22) return 52;
  return 44;
}

async function render(p) {
  const photo = await loadPhoto(p.photo);
  const titleFontSize = getTitleFontSize(p.title);

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'row',
          background: '#FFF8EB',
          fontFamily: 'Noto Sans',
          color: '#2D1B12',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                width: '630px',
                height: '630px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '52px 40px 48px 56px',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                    },
                    children: [
                      {
                        type: 'img',
                        props: {
                          src: `data:image/png;base64,${logo}`,
                          width: 52,
                          height: 52,
                          style: { borderRadius: 12, border: '2px solid #F3D9A4' },
                        },
                      },
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontSize: 28,
                            fontWeight: 700,
                            fontFamily: 'Lora',
                            color: '#7B4A1E',
                          },
                          children: 'Медова Банка',
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 20,
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: titleFontSize,
                            lineHeight: 1.12,
                            fontWeight: 700,
                            fontFamily: 'Lora',
                            color: '#2D1B12',
                          },
                          children: p.title,
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: 25,
                            lineHeight: 1.42,
                            fontWeight: 400,
                            fontFamily: 'Noto Sans',
                            color: '#5D4037',
                          },
                          children: p.subtitle,
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            width: 32,
                            height: 4,
                            background: '#F28C00',
                            borderRadius: 2,
                          },
                        },
                      },
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontSize: 21,
                            fontWeight: 700,
                            fontFamily: 'Lora',
                            color: '#B45309',
                          },
                          children: 'Власна пасіка на Сумщині • medovabanka.com.ua',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                width: '570px',
                height: '630px',
                boxSizing: 'border-box',
                padding: '28px 28px 28px 0',
                display: 'flex',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '542px',
                      height: '574px',
                      borderRadius: 28,
                      overflow: 'hidden',
                      display: 'flex',
                      border: '3px solid #F3D9A4',
                      background: '#FDE9BF',
                    },
                    children: [
                      {
                        type: 'img',
                        props: {
                          src: `data:image/png;base64,${photo}`,
                          width: PHOTO_W,
                          height: PHOTO_H,
                          style: { objectFit: 'cover' },
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Lora', data: lora, weight: 700, style: 'normal' },
        { name: 'Noto Sans', data: noto, weight: 400, style: 'normal' },
      ],
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  const png = resvg.render().asPng();
  fs.writeFileSync(path.join(outDir, p.file), png);
  console.log('generated', p.file);
}

for (const p of pages) await render(p);
console.log('done');
