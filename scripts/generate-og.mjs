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
const logoBuf = await sharp(path.join(root, 'public', 'logo-medova-banka.jpg')).resize(128,128).png().toBuffer();
const honeyBuf = await sharp(path.join(root, 'public', 'photo-2.webp')).resize(520,520, { fit:'cover' }).png().toBuffer();
const logo = logoBuf.toString('base64');
const honey = honeyBuf.toString('base64');

const pages = [
  { file: 'og-default.png', title: 'Мед з власної пасіки', subtitle: 'Свіжий мед урожаю 2026 з Сумщини. Доставка по Україні.' },
  { file: 'og-home.png', title: 'Медова Банка', subtitle: 'Липовий, соняшниковий, з різнотрав\'я. Замовити мед з доставкою.' },
  { file: 'og-prices.png', title: 'Ціни на мед', subtitle: 'Банки 1 л і відра 3 л. Три сорти натурального меду.' },
  { file: 'og-about.png', title: 'Про пасіку', subtitle: 'Родина Кривцових, 15 вуликів, понад 25 років досвіду.' },
  { file: 'og-faq.png', title: 'Питання та відповіді', subtitle: 'Все про натуральний мед, замовлення і доставку.' },
  { file: 'og-privacy.png', title: 'Політика конфіденційності', subtitle: 'Як ми захищаємо ваші персональні дані.' },
  { file: 'og-terms.png', title: 'Договір публічної оферти', subtitle: 'Умови купівлі меду з нашої пасіки.' },
  { file: 'og-cookies.png', title: 'Політика cookie', subtitle: 'Які cookie використовує сайт.' },
];

async function render(p) {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px', height: '630px', display: 'flex', flexDirection: 'column',
          background: '#F5EFE6', padding: '60px', position: 'relative',
          fontFamily: 'Noto Sans', color: '#3E2723',
        },
        children: [
          {
            type: 'img',
            props: { src: `data:image/png;base64,${honey}`, width: 520, height: 520, style: { position: 'absolute', right: 60, bottom: 60, borderRadius: 24, objectFit: 'cover', opacity: 0.9 } },
          },
          { type: 'div', props: { style: { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }, children: [
            { type: 'img', props: { src: `data:image/png;base64,${logo}`, width: 64, height: 64, style: { borderRadius: 12 } } },
            { type: 'span', props: { style: { fontSize: 30, fontWeight: 700, fontFamily: 'Lora', color: '#7B4A1E' }, children: 'Медова Банка' } },
          ] } },
          { type: 'div', props: { style: { fontSize: 72, lineHeight: 1.1, fontWeight: 700, fontFamily: 'Lora', color: '#3E2723', maxWidth: 720, marginBottom: 24 }, children: p.title } },
          { type: 'div', props: { style: { fontSize: 28, lineHeight: 1.4, color: '#5D4037', maxWidth: 640 }, children: p.subtitle } },
          { type: 'div', props: { style: { position: 'absolute', bottom: 60, left: 60, fontSize: 22, color: '#F28C00', fontWeight: 700 }, children: 'Мед з власної пасіки на Сумщині' } },
        ],
      },
    },
    {
      width: 1200, height: 630,
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
