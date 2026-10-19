export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** The `lang` attribute and `og:locale` value for each language. */
export const htmlLang: Record<Locale, string> = { en: 'en', de: 'de-AT' };
export const ogLocale: Record<Locale, string> = { en: 'en_US', de: 'de_AT' };

/** Label shown in the language switcher. */
export const localeName: Record<Locale, string> = { en: 'EN', de: 'DE' };

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

/**
 * Prefix a path with its locale. The default locale stays unprefixed so the
 * English URLs are unchanged from the previous site.
 */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path === '/' ? '' : path.replace(/^\/+/, '/');
  if (locale === defaultLocale) return clean || '/';
  return `/${locale}${clean}`;
}

/**
 * The rest-parameter value that produces a locale's routes. `undefined` yields
 * the unprefixed default-locale route.
 */
export function localeParam(locale: Locale): string | undefined {
  return locale === defaultLocale ? undefined : locale;
}
