import { defineConfig } from 'astro/config';
import image from "@astrojs/image";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site:'https://master--verdant-medovik-e9bb32.netlify.app/',
  integrations: [image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), sitemap({
    filter: (page) => page !== 'https://master--verdant-medovik-e9bb32.netlify.app/about/'
  })]
});