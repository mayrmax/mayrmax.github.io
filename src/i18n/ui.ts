import type { Locale } from './config';

/**
 * Strings that are tied to the page structure rather than to editable content.
 * Everything a reader would think of as "the text of the site" lives in
 * src/content and is edited through Keystatic instead.
 */
export const ui = {
  en: {
    'nav.services': 'services',
    'nav.about': 'about',
    'nav.projects': 'projects',
    'nav.publications': 'publications',
    'nav.blog': 'blog',
    'nav.menu': 'menu',
    'title.home': 'Home',
    'title.about': 'About',
    'title.impressum': 'Impressum',
    'nav.language': 'Change language',
    'about.experience': 'WORK EXPERIENCE',
    'about.education': 'EDUCATION',
    'footer.madeWith': 'Made with ☕ and 🍺',
    'footer.by': 'by',
    'footer.sourceLicense': 'The source code is licensed',
    'footer.contentLicense': 'The website content is licensed',
    'footer.impressum': 'Impressum',
    'meta.description':
      'AI Solution Architect in Innsbruck — C# / .NET, Astro, Angular, AI integration and IoT.',
    'meta.keywords':
      'Max Mayr, AI Solution Architect, C#, .NET, Astro, Angular, LLM, RAG, IoT, Fractional CTO, Innsbruck',
    'link.github': 'GitHub',
    'link.linkedin': 'LinkedIn',
    'link.twitter': 'Twitter',
    'link.youtube': 'YouTube',
    'link.website': 'Website',
  },
  de: {
    'nav.services': 'leistungen',
    'nav.about': 'über mich',
    'nav.projects': 'projekte',
    'nav.publications': 'publikationen',
    'nav.blog': 'blog',
    'nav.menu': 'Menü',
    'title.home': 'Startseite',
    'title.about': 'Über mich',
    'title.impressum': 'Impressum',
    'nav.language': 'Sprache wechseln',
    'about.experience': 'BERUFSERFAHRUNG',
    'about.education': 'AUSBILDUNG',
    'footer.madeWith': 'Gemacht mit ☕ und 🍺',
    'footer.by': 'von',
    'footer.sourceLicense': 'Der Quellcode steht unter der Lizenz',
    'footer.contentLicense': 'Die Inhalte der Website stehen unter der Lizenz',
    'footer.impressum': 'Impressum',
    'meta.description':
      'AI Solution Architect in Innsbruck — C# / .NET, Astro, Angular, KI-Integration und IoT.',
    'meta.keywords':
      'Max Mayr, AI Solution Architect, C#, .NET, Astro, Angular, LLM, RAG, IoT, Fractional CTO, Innsbruck',
    'link.github': 'GitHub',
    'link.linkedin': 'LinkedIn',
    'link.twitter': 'Twitter',
    'link.youtube': 'YouTube',
    'link.website': 'Website',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UiKey = keyof (typeof ui)['en'];

export function useTranslations(locale: Locale) {
  return function t(key: UiKey): string {
    return ui[locale][key];
  };
}

/** Route segments, shared across locales so /de/about mirrors /about. */
export const navigation = [
  { key: 'nav.services', path: '/services' },
  { key: 'nav.about', path: '/about' },
  { key: 'nav.projects', path: '/projects' },
  { key: 'nav.publications', path: '/publications' },
  { key: 'nav.blog', path: '/blog' },
] as const satisfies ReadonlyArray<{ key: UiKey; path: string }>;
