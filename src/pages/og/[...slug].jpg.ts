import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

import { isLocale, locales, type Locale } from '../../i18n/config';
import { entrySlug, getSection, getShared } from '../../i18n/content';
import { renderCard, type CardContent } from '../../og/card';
import { ogImagePath } from '../../og/paths';

/** One preview image per page, in both languages, including every blog post. */
export const getStaticPaths = (async () => {
  const cards: Array<{ path: string; locale: Locale; card: CardContent }> = [];
  const [impressum, datenschutz] = await Promise.all([
    getShared('impressum'),
    getShared('datenschutz'),
  ]);

  for (const locale of locales) {
    const de = locale === 'de';
    const role = 'AI Solution Architect';
    const [home, intros, bio] = await Promise.all([
      getSection('home', locale),
      getSection('page-intros', locale),
      getSection('about-bio', locale),
    ]);

    cards.push(
      {
        path: '/',
        locale,
        card: { command: home.command ?? '', headline: home.headline ?? '', role },
      },
      {
        path: '/services',
        locale,
        card: {
          command: `ls ${de ? 'leistungen' : 'services'}`,
          headline: intros.servicesSeoTitle ?? '',
          role,
        },
      },
      {
        path: '/work',
        locale,
        card: {
          command: `ls ${de ? 'arbeit' : 'work'}`,
          headline: intros.workSeoTitle ?? '',
          role,
        },
      },
      { path: '/about', locale, card: { command: 'whoami', headline: bio.seoTitle ?? '', role } },
      {
        path: '/blog',
        locale,
        card: { command: 'ls blog', headline: intros.blogSeoTitle ?? '', role },
      },
      {
        path: '/impressum',
        locale,
        card: { command: 'cat impressum', headline: impressum.heading, role },
      },
      {
        path: '/datenschutz',
        locale,
        card: { command: 'cat datenschutz', headline: datenschutz.heading, role },
      },
    );
  }

  for (const post of await getCollection('blog')) {
    const locale = post.id.slice(0, post.id.indexOf('/'));
    if (!isLocale(locale)) continue;
    const slug = entrySlug(post.id);
    cards.push({
      path: `/blog/${slug}`,
      locale,
      card: {
        command: `cat blog/${slug}`,
        headline: post.data.title,
        role: 'AI Solution Architect',
      },
    });
  }

  return cards.map(({ path, locale, card }) => ({
    params: {
      slug: ogImagePath(locale, path)
        .replace(/^\/og\//, '')
        .replace(/\.jpg$/, ''),
    },
    props: { card },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const image = await renderCard((props as { card: CardContent }).card);
  return new Response(new Uint8Array(image), { headers: { 'Content-Type': 'image/jpeg' } });
};
