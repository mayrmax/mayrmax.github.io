import rss from '@astrojs/rss';
import type { APIRoute, GetStaticPaths } from 'astro';

import { localePath } from '../../i18n/config';
import { entrySlug, getLocalized } from '../../i18n/content';
import { localeRoutes } from '../../i18n/routes';
import { useTranslations } from '../../i18n/ui';

export const getStaticPaths = (() => localeRoutes()) satisfies GetStaticPaths;

export const GET: APIRoute = async (context) => {
  const { locale } = context.props;
  const t = useTranslations(locale);

  const posts = (await getLocalized('blog', locale)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  return rss({
    title: 'Max Mayr',
    description: t('meta.description'),
    // Each language's feed points at its own section of the site.
    site: new URL(localePath(locale, '/'), context.site!),
    // Match the site's extension-less, slash-free URLs.
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.subtitle,
      pubDate: post.data.date,
      categories: post.data.categories,
      link: localePath(locale, `/blog/${entrySlug(post.id)}`),
    })),
  });
};
