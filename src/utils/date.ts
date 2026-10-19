import type { Locale } from '../i18n/config';

const MONTHS: Record<Locale, readonly string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  de: ['Jän', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
};

/** `08 Oct 2018` in English (matching the previous site) and `08. Okt 2018` in German. */
export function formatDate(date: Date, locale: Locale): string {
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = MONTHS[locale][date.getUTCMonth()];
  const separator = locale === 'de' ? '. ' : ' ';
  return `${day}${separator}${month} ${date.getUTCFullYear()}`;
}

/** Machine-readable date for the `datetime` attribute. */
export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
