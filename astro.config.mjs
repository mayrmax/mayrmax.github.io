// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://mayrmax.github.io',
  trailingSlash: 'never',
  build: {
    // Emit `/about.html` instead of `/about/index.html` so the existing
    // extension-less URLs keep working on GitHub Pages.
    format: 'file',
  },
  // Astro's HTML minifier drops the newline between a word and a following
  // inline element, which silently glues sentences together.
  compressHTML: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de'],
    routing: {
      // English keeps its existing unprefixed URLs; German lives under /de.
      prefixDefaultLocale: false,
    },
  },
  // Downloaded at build time and served from this origin — no Google Fonts request.
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Abel',
      cssVariable: '--font-display',
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Lato',
      cssVariable: '--font-body',
      weights: [400, 700],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Roboto Mono',
      cssVariable: '--font-mono',
      fallbacks: ['monospace'],
    },
  ],
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', de: 'de' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
