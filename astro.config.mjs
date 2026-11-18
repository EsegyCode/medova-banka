import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://medova-banka.shop',
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory' },
  integrations: [sitemap()],
});
