// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Change this to your real domain once it's connected in Netlify.
export default defineConfig({
  site: 'https://sameolcre.netlify.app',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'min-light' },
  },
});
