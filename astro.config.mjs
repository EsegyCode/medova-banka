import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://medova-banka.shop',
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory' },
  integrations: [sitemap({
    filter: (page) => !page.includes('/oferta/') && !page.includes('/polityka-konfidentsiinosti/'),
    serialize: (item) => {
      if (/(privacy|terms|cookies)\/$/.test(item.url)) {
        item.lastmod = new Date('2026-11-24').toISOString();
      }
      return item;
    },
  })],
});
