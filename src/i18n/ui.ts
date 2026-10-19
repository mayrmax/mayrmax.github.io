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
    'site.name': 'Max Mayr',
    'title.home': 'AI Solution Architect in Innsbruck',
    'title.about': 'About',
    'title.impressum': 'Impressum',
    'title.datenschutz': 'Datenschutz',
    'nav.language': 'Change language',
    'about.experience': 'WORK EXPERIENCE',
    'about.education': 'EDUCATION',
    'services.moreProjects': 'More projects',
    'footer.madeWith': 'Made with ☕ and 🍺',
    'footer.by': 'by',
    'footer.sourceLicense': 'The source code is licensed',
    'footer.contentLicense': 'The website content is licensed',
    'footer.impressum': 'Impressum',
    'footer.datenschutz': 'Datenschutz',
    'meta.description':
      'AI Solution Architect in Innsbruck — C# / .NET, Astro, Angular, AI integration and IoT.',
    'meta.home':
      'Max Mayr builds .NET backends, fast Astro and Angular frontends, and the AI that ties them together. Freelance architect and fractional CTO based in Innsbruck, Austria.',
    'meta.about':
      'Max Mayr, AI solution architect in Innsbruck: C# / .NET, Astro and Angular, LLM integration and IoT. Roles at SweetPopcorn.Studio, Malsati, Tributech and eurofunk.',
    'meta.impressum':
      'Impressum und Offenlegung nach § 5 ECG für mayrmax.com — Maximilian Mayr, Einzelunternehmen, Innsbruck.',
    'meta.datenschutz':
      'Datenschutzerklärung für mayrmax.com: keine Cookies, kein Tracking, keine Einbindungen Dritter. Verarbeitung von Server-Logs und Betroffenenrechte nach DSGVO.',
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
    'site.name': 'Max Mayr',
    'title.home': 'AI Solution Architect in Innsbruck',
    'title.about': 'Über mich',
    'title.impressum': 'Impressum',
    'title.datenschutz': 'Datenschutz',
    'nav.language': 'Sprache wechseln',
    'about.experience': 'BERUFSERFAHRUNG',
    'about.education': 'AUSBILDUNG',
    'services.moreProjects': 'Weitere Projekte',
    'footer.madeWith': 'Gemacht mit ☕ und 🍺',
    'footer.by': 'von',
    'footer.sourceLicense': 'Der Quellcode steht unter der Lizenz',
    'footer.contentLicense': 'Die Inhalte der Website stehen unter der Lizenz',
    'footer.impressum': 'Impressum',
    'footer.datenschutz': 'Datenschutz',
    'meta.description':
      'AI Solution Architect in Innsbruck — C# / .NET, Astro, Angular, KI-Integration und IoT.',
    'meta.home':
      'Max Mayr baut .NET-Backends, schnelle Astro- und Angular-Frontends und die KI, die beides verbindet. Freiberuflicher Architekt und Fractional CTO in Innsbruck.',
    'meta.about':
      'Max Mayr, AI Solution Architect in Innsbruck: C# / .NET, Astro und Angular, LLM-Integration und IoT. Stationen bei SweetPopcorn.Studio, Malsati, Tributech und eurofunk.',
    'meta.impressum':
      'Impressum und Offenlegung nach § 5 ECG für mayrmax.com — Maximilian Mayr, Einzelunternehmen, Innsbruck.',
    'meta.datenschutz':
      'Datenschutzerklärung für mayrmax.com: keine Cookies, kein Tracking, keine Einbindungen Dritter. Verarbeitung von Server-Logs und Betroffenenrechte nach DSGVO.',
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
