import type { Locale } from './config';

/**
 * Strings that are tied to the page structure rather than to editable content.
 * Everything a reader would think of as "the text of the site" lives in
 * src/content and is edited through Keystatic instead.
 */
export const ui = {
  en: {
    'nav.label': 'Main navigation',
    'nav.services': 'Services',
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.menu': 'Menu',
    'nav.language': 'Change language',
    'site.name': 'Max Mayr',
    'title.home': 'AI Solution Architect in Innsbruck',
    'title.about': 'About',
    'title.impressum': 'Impressum',
    'title.datenschutz': 'Datenschutz',
    'about.skills': 'Technical skills',
    'about.experience': 'Work experience',
    'about.education': 'Education',
    'about.theses': 'Theses',
    'work.more': 'More projects',
    'work.studies': 'Projects from university',
    'work.all': 'All projects',
    'footer.impressum': 'Impressum',
    'footer.datenschutz': 'Datenschutz',
    'footer.code': 'Code',
    'footer.content': 'content',
    'footer.hosting': 'Hosted by Hetzner in Nuremberg',
    'meta.description':
      'AI Solution Architect in Innsbruck — C# / .NET, Astro, Angular, AI integration and IoT.',
    'meta.home':
      'Max Mayr builds .NET backends, fast Astro and Angular frontends, and the AI that ties them together. Freelance architect and fractional CTO based in Innsbruck, Austria.',
    'meta.about':
      'Max Mayr, AI solution architect in Innsbruck: C# / .NET, Astro and Angular, LLM integration and IoT. Roles at SweetPopcorn.Studio, malsati, Tributech and eurofunk.',
    'meta.impressum':
      'Impressum und Offenlegung nach § 5 ECG für mayrmax.com — Maximilian Mayr, Einzelunternehmen, Innsbruck.',
    'meta.datenschutz':
      'Datenschutzerklärung für mayrmax.com: keine Cookies, kein Tracking, keine Einbindungen Dritter. Verarbeitung von Server-Logs und Betroffenenrechte nach DSGVO.',
    'meta.keywords':
      'Max Mayr, AI Solution Architect, C#, .NET, Astro, Angular, LLM, RAG, IoT, Technical SEO, Fractional CTO, Innsbruck',
  },
  de: {
    'nav.label': 'Hauptnavigation',
    'nav.services': 'Leistungen',
    'nav.work': 'Arbeit',
    'nav.about': 'Über mich',
    'nav.blog': 'Blog',
    'nav.menu': 'Menü',
    'nav.language': 'Sprache wechseln',
    'site.name': 'Max Mayr',
    'title.home': 'AI Solution Architect in Innsbruck',
    'title.about': 'Über mich',
    'title.impressum': 'Impressum',
    'title.datenschutz': 'Datenschutz',
    'about.skills': 'Technische Fähigkeiten',
    'about.experience': 'Berufserfahrung',
    'about.education': 'Ausbildung',
    'about.theses': 'Abschlussarbeiten',
    'work.more': 'Weitere Projekte',
    'work.studies': 'Projekte aus dem Studium',
    'work.all': 'Alle Projekte',
    'footer.impressum': 'Impressum',
    'footer.datenschutz': 'Datenschutz',
    'footer.code': 'Code',
    'footer.content': 'Inhalte',
    'footer.hosting': 'Gehostet bei Hetzner in Nürnberg',
    'meta.description':
      'AI Solution Architect in Innsbruck — C# / .NET, Astro, Angular, KI-Integration und IoT.',
    'meta.home':
      'Max Mayr baut .NET-Backends, schnelle Astro- und Angular-Frontends und die KI, die beides verbindet. Freiberuflicher Architekt und Fractional CTO in Innsbruck.',
    'meta.about':
      'Max Mayr, AI Solution Architect in Innsbruck: C# / .NET, Astro und Angular, LLM-Integration und IoT. Stationen bei SweetPopcorn.Studio, malsati, Tributech und eurofunk.',
    'meta.impressum':
      'Impressum und Offenlegung nach § 5 ECG für mayrmax.com — Maximilian Mayr, Einzelunternehmen, Innsbruck.',
    'meta.datenschutz':
      'Datenschutzerklärung für mayrmax.com: keine Cookies, kein Tracking, keine Einbindungen Dritter. Verarbeitung von Server-Logs und Betroffenenrechte nach DSGVO.',
    'meta.keywords':
      'Max Mayr, AI Solution Architect, C#, .NET, Astro, Angular, LLM, RAG, IoT, Technical SEO, Fractional CTO, Innsbruck',
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
  { key: 'nav.work', path: '/work' },
  { key: 'nav.about', path: '/about' },
  { key: 'nav.blog', path: '/blog' },
] as const satisfies ReadonlyArray<{ key: UiKey; path: string }>;
