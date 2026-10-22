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

/**
 * Where an app's privacy policy lives, without the locale prefix. The last
 * segment is in the page's own language, since the store listings link to it.
 */
export function appPrivacyPath(locale: Locale, app: string): string {
  return `/apps/${app}/${locale === 'de' ? 'datenschutz' : 'privacy'}`;
}
