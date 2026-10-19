import { defaultLocale, type Locale } from '../i18n/config';

/**
 * Where a page's social preview image lives. Shared by the endpoint that
 * renders the images and the layout that points at them, so the two cannot
 * drift apart.
 */
export function ogImagePath(locale: Locale, path: string): string {
  const prefix = locale === defaultLocale ? '' : `${locale}/`;
  const name = path === '/' ? 'index' : path.replace(/^\//, '');
  return `/og/${prefix}${name}.jpg`;
}
