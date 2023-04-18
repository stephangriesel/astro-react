import { defineConfig } from 'astro/config';
import image from "@astrojs/image";
import NetlifyCMS from 'astro-netlify-cms';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site:'https://master--verdant-medovik-e9bb32.netlify.app/',
  integrations: [
    NetlifyCMS({
      config: {
        backend: {
          name: 'git-gateway',
          branch: 'master',
        },
        publish_mode: 'editorial_workflow',
        media_folder: 'static/images/uploads',
        public_folder: '/images',
        collections: [
          {
            name: 'blog',
            label: 'Blog',
            folder: 'src/pages/blog',
            create: true,
            slug: '{{slug}}',
            fields: [
              {
                label: 'Layout',
                name: 'layout',
                widget: 'hidden',
                default: '../../layouts/BlogPostLayout.astro',
              },
              {
                label: 'Title',
                name: 'title',
                widget: 'string',
              },
              {
                label: 'Date',
                name: 'date',
                widget: 'datetime',
              },
              {
                label: 'Author',
                name: 'author',
                widget: 'string',
              },
              {
                label: 'Image',
                name: 'image',
                widget: 'object',
                fields: [
                  { label: 'Source', name: 'src', widget: 'image' },
                  { label: 'Alt Text', name: 'alt', widget: 'string' },
                ],
              },
              {
                label: 'Description',
                name: 'body',
                widget: 'markdown',
              },
              {
                label: 'Draft',
                name: 'draft',
                widget: 'boolean',
              },
              {
                label: 'Category',
                name: 'category',
                widget: 'string',
              },
            ],
          },
        ],
        previewStyles: [
          // Path to a local CSS file, relative to your project’s root directory
          '/src/styles/global.css',
          // An npm module identifier
          '@fontsource/roboto',
          // A URL to an externally hosted CSS file
          'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap',
          // Raw CSS!
          ['p { color: red; }', { raw: true }],
        ],
        disableIdentityWidgetInjection: true,
      },
    }),
    image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), sitemap({
    filter: (page) => page !== 'https://master--verdant-medovik-e9bb32.netlify.app/about/'
  })]
});