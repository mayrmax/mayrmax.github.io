import { locales, localeParam, type Locale } from './config';

/**
 * The rest-parameter values that fan a single page file out into one route per
 * language: `undefined` for English (`/about`) and `de` for German (`/de/about`).
 */
export function localeRoutes() {
  return locales.map((locale) => ({
    params: { locale: localeParam(locale) },
    props: { locale } satisfies { locale: Locale },
  }));
}
