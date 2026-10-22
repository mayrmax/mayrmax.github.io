// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { existsSync, readdirSync, readFileSync } from 'node:fs';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import { localePath } from './src/i18n/config';
import { appPrivacyPath } from './src/i18n/routes';

// Keystatic runs in local mode: its admin UI is an SSR route, so it is loaded
// only while the dev server is up. The production build therefore stays fully
// static (no adapter, no React in the output) and keeps deploying to GitHub Pages.
const isDevServer = process.argv.includes('dev') || process.env.npm_lifecycle_event === 'dev';

const keystaticIntegrations = isDevServer
  ? await Promise.all([
      import('@astrojs/react').then((m) => m.default()),
      import('@keystatic/astro').then((m) => m.default()),
    ])
  : [];

// Canonical URLs, hreflang links, the sitemaps and the RSS feeds are baked into
// the static output, so a host has to be picked at build time. The container
// rewrites it on startup from Coolify's COOLIFY_URL, so this is only the
// default — see docker-entrypoint.d/10-site-origin.sh.
const site = process.env.SITE_URL ?? 'https://mayrmax.com';

/** Blog posts grouped by translationKey: `[{ en: '/blog/x', de: '/de/blog/y' }]`. */
const blogTranslations = Object.values(
  ['en', 'de'].reduce((groups, locale) => {
    const dir = `src/content/${locale}/blog`;
    if (!existsSync(dir)) return groups;
    for (const file of readdirSync(dir).filter((name) => name.endsWith('.md'))) {
      const slug = file.replace(/\.md$/, '');
      const key =
        readFileSync(`${dir}/${file}`, 'utf8').match(/^translationKey:\s*["']?([^"'\n]+)/m)?.[1] ??
        slug;
      groups[key] = { ...groups[key], [locale]: `${locale === 'en' ? '' : '/de'}/blog/${slug}` };
    }
    return groups;
  }, {}),
);

/** App privacy policies that are not `listed` yet: reachable by link, not in the sitemap. */
const unlistedPaths = new Set(
  ['en', 'de'].flatMap((locale) => {
    const dir = `src/content/${locale}/privacy`;
    if (!existsSync(dir)) return [];
    return readdirSync(dir)
      .filter((name) => name.endsWith('.md'))
      .filter((name) => !/^listed:\s*true\b/m.test(readFileSync(`${dir}/${name}`, 'utf8')))
      .map((name) => localePath(locale, appPrivacyPath(locale, name.replace(/\.md$/, ''))));
  }),
);

// https://astro.build/config
export default defineConfig({
  site,
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
      name: 'Hanken Grotesk',
      cssVariable: '--font-hanken',
      weights: [400, 500, 700],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains',
      weights: [400, 600],
      fallbacks: ['monospace'],
    },
  ],
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', de: 'de' },
      },
      filter: (page) => !unlistedPaths.has(new URL(page).pathname),
      // The i18n option pairs pages by identical path, but blog posts have a
      // slug per language; pair those by their translationKey instead.
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        const group = blogTranslations.find((paths) => Object.values(paths).includes(pathname));
        if (group) {
          item.links = Object.entries(group).map(([lang, path]) => ({
            lang,
            url: new URL(path, site).href,
          }));
        }
        return item;
      },
    }),
    ...keystaticIntegrations,
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
