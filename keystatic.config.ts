import { collection, config, fields, singleton } from '@keystatic/core';

/**
 * Keystatic runs in local mode: the admin UI is available at /keystatic while
 * `npm run dev` is running, and every save writes markdown straight into
 * src/content. Commit and push as usual to publish.
 *
 * Content is duplicated per language, since Keystatic has no notion of locales.
 * Everything is grouped by language in the sidebar (see `ui.navigation`).
 */

const LOCALES = [
  { id: 'en', label: 'English' },
  { id: 'de', label: 'Deutsch' },
] as const;

type LocaleId = (typeof LOCALES)[number]['id'];

/**
 * Keystatic writes `.mdoc` for markdoc fields by default. The content here is
 * plain markdown that Astro renders with its built-in pipeline, so keep the
 * `.md` extension.
 */
function markdown(label: string, description?: string) {
  return {
    ...fields.markdoc({
      label,
      description,
      options: {
        image: false,
        codeBlock: false,
        table: false,
        blockquote: false,
      },
    }),
    contentExtension: '.md' as const,
  };
}

const durationFields = (startLabel: string, endLabel: string) =>
  fields.object(
    {
      start: fields.text({ label: startLabel, validation: { isRequired: true } }),
      end: fields.text({ label: endLabel, validation: { isRequired: true } }),
    },
    { label: 'Duration' },
  );

const technologyList = (label: string) =>
  fields.array(fields.text({ label: 'Technology' }), {
    label,
    itemLabel: (props) => props.value,
  });

function blogCollection(locale: LocaleId) {
  return collection({
    label: `Blog posts (${locale.toUpperCase()})`,
    path: `src/content/${locale}/blog/*`,
    slugField: 'title',
    format: { contentField: 'content' },
    entryLayout: 'content',
    columns: ['title', 'date'],
    schema: {
      title: fields.slug({ name: { label: 'Title' } }),
      description: fields.text({
        label: 'Description',
        description: 'Shown under the title, in search results and in the feed.',
        multiline: true,
      }),
      date: fields.datetime({ label: 'Published', validation: { isRequired: true } }),
      updated: fields.datetime({
        label: 'Updated',
        description: 'Set when the post is revised.',
      }),
      tags: fields.array(fields.text({ label: 'Tag' }), {
        label: 'Tags',
        itemLabel: (props) => props.value,
      }),
      note: fields.text({
        label: 'Note',
        description: 'Optional boxed remark above the text.',
        multiline: true,
      }),
      content: markdown('Post'),
    },
  });
}

function projectsCollection(locale: LocaleId) {
  return collection({
    label: `University projects (${locale.toUpperCase()})`,
    path: `src/content/${locale}/projects/*`,
    slugField: 'name',
    format: { contentField: 'content' },
    columns: ['order', 'name'],
    schema: {
      order: fields.integer({
        label: 'Order',
        description: 'Lower numbers appear first on the page.',
        validation: { isRequired: true },
      }),
      name: fields.slug({ name: { label: 'Name' } }),
      anchor: fields.text({
        label: 'Anchor',
        description: 'The #fragment other pages link to. Keep it identical across languages.',
        validation: { isRequired: true },
      }),
      github: fields.url({ label: 'GitHub URL' }),
      youtube: fields.url({ label: 'YouTube URL' }),
      technologies: technologyList('Technologies'),
      duration: durationFields('From', 'Until'),
      content: markdown('Description'),
    },
  });
}

function experienceCollection(locale: LocaleId) {
  return collection({
    label: `Work experience (${locale.toUpperCase()})`,
    path: `src/content/${locale}/experience/*`,
    slugField: 'position',
    format: { contentField: 'content' },
    columns: ['order', 'position'],
    schema: {
      order: fields.integer({
        label: 'Order',
        description: 'Lower numbers appear first on the page.',
        validation: { isRequired: true },
      }),
      position: fields.slug({ name: { label: 'Position' } }),
      company: fields.object(
        {
          name: fields.text({ label: 'Company', validation: { isRequired: true } }),
          url: fields.url({
            label: 'Company URL',
            description: 'Optional — leave empty for self-employment.',
          }),
        },
        { label: 'Company' },
      ),
      duration: durationFields('From', 'Until'),
      main_technologies: technologyList('Main technologies'),
      content: markdown('Description'),
    },
  });
}

function educationCollection(locale: LocaleId) {
  return collection({
    label: `Education (${locale.toUpperCase()})`,
    path: `src/content/${locale}/education/*`,
    slugField: 'name',
    format: { contentField: 'content' },
    columns: ['order', 'name'],
    schema: {
      order: fields.integer({
        label: 'Order',
        description: 'Lower numbers appear first on the page.',
        validation: { isRequired: true },
      }),
      name: fields.slug({
        name: { label: 'Entry name', description: 'Shown in this list only, not on the site.' },
      }),
      place: fields.object(
        {
          name: fields.text({ label: 'Institution', validation: { isRequired: true } }),
          url: fields.url({ label: 'Institution URL', validation: { isRequired: true } }),
        },
        { label: 'Place' },
      ),
      details: fields.array(fields.text({ label: 'Detail' }), {
        label: 'Details',
        itemLabel: (props) => props.value,
      }),
      duration: durationFields('From', 'Until'),
      content: markdown('Description'),
    },
  });
}

function publicationsCollection(locale: LocaleId) {
  return collection({
    label: `Publications (${locale.toUpperCase()})`,
    path: `src/content/${locale}/publications/*`,
    slugField: 'title',
    format: { contentField: 'content' },
    columns: ['order', 'title'],
    schema: {
      order: fields.integer({
        label: 'Order',
        description: 'Lower numbers appear first on the page.',
        validation: { isRequired: true },
      }),
      title: fields.slug({ name: { label: 'Title' } }),
      subtitle: fields.text({ label: 'Kind', validation: { isRequired: true } }),
      year: fields.integer({ label: 'Year', validation: { isRequired: true } }),
      tags: fields.array(fields.text({ label: 'Tag' }), {
        label: 'Tags',
        itemLabel: (props) => props.value,
      }),
      content: markdown('Abstract'),
    },
  });
}

function servicesCollection(locale: LocaleId) {
  return collection({
    label: `Services (${locale.toUpperCase()})`,
    path: `src/content/${locale}/services/*`,
    slugField: 'title',
    format: { contentField: 'content' },
    columns: ['order', 'title'],
    schema: {
      order: fields.integer({
        label: 'Order',
        description: 'Lower numbers appear first on the page.',
        validation: { isRequired: true },
      }),
      flag: fields.text({
        label: 'Flag',
        description: 'Shown beside the service as a command-line flag, e.g. --backend.',
      }),
      title: fields.slug({ name: { label: 'Title' } }),
      items: technologyList('Bullet points'),
      content: markdown('Description'),
    },
  });
}

function referencesCollection(locale: LocaleId) {
  return collection({
    label: `Work (${locale.toUpperCase()})`,
    path: `src/content/${locale}/references/*`,
    slugField: 'name',
    format: { contentField: 'content' },
    columns: ['order', 'name'],
    schema: {
      order: fields.integer({
        label: 'Order',
        description: 'Lower numbers appear first on the page.',
        validation: { isRequired: true },
      }),
      featured: fields.checkbox({
        label: 'Featured',
        description: 'Shown large with its description. Unticked entries form the compact list.',
        defaultValue: false,
      }),
      name: fields.slug({ name: { label: 'Name' } }),
      url: fields.url({ label: 'URL', description: 'Optional.' }),
      role: fields.text({ label: 'What it is', validation: { isRequired: true } }),
      duration: durationFields('From', 'Until'),
      technologies: technologyList('Technologies'),
      content: markdown('Description'),
    },
  });
}

function servicesPageSingleton(locale: LocaleId) {
  return singleton({
    label: `Services page (${locale.toUpperCase()})`,
    path: `src/content/${locale}/sections/services`,
    format: { contentField: 'content' },
    schema: {
      heading: fields.text({ label: 'Heading', validation: { isRequired: true } }),
      subtitle: fields.text({ label: 'Subtitle', validation: { isRequired: true } }),
      partnerHeading: fields.text({ label: 'Partner heading' }),
      partnerName: fields.text({ label: 'Partner name' }),
      partnerUrl: fields.url({ label: 'Partner URL' }),
      partnerText: fields.text({ label: 'Partner text', multiline: true }),
      content: markdown('Intro'),
    },
  });
}

function homeSingleton(locale: LocaleId) {
  return singleton({
    label: `Home page (${locale.toUpperCase()})`,
    path: `src/content/${locale}/sections/home`,
    format: { contentField: 'content' },
    schema: {
      command: fields.text({
        label: 'Prompt command',
        description: 'Typed after the powerline prompt. Words starting with -- are shown muted.',
        validation: { isRequired: true },
      }),
      headline: fields.text({ label: 'Headline', validation: { isRequired: true } }),
      contactLabel: fields.text({
        label: 'Contact button label',
        description: 'Jumps to the contact block at the end of the page.',
        validation: { isRequired: true },
      }),
      ctaLabel: fields.text({
        label: 'Services link label',
        description: 'Links to the services page. Leave empty to hide the link.',
      }),
      seoTitle: fields.text({
        label: 'SEO title',
        description: 'Browser tab and search result title; "— Max Mayr" is appended.',
      }),
      content: markdown('Introduction'),
    },
  });
}

function contactSingleton(locale: LocaleId) {
  return singleton({
    label: `Contact block (${locale.toUpperCase()})`,
    path: `src/content/${locale}/sections/contact`,
    format: { contentField: 'content' },
    schema: {
      heading: fields.text({ label: 'Heading', validation: { isRequired: true } }),
      ctaLabel: fields.text({ label: 'Button label', validation: { isRequired: true } }),
      email: fields.text({ label: 'Email address', validation: { isRequired: true } }),
      emailSubject: fields.text({
        label: 'Email subject',
        description: 'Filled in when a visitor clicks the button.',
      }),
      content: markdown('Text'),
    },
  });
}

function aboutBioSingleton(locale: LocaleId) {
  return singleton({
    label: `About — intro (${locale.toUpperCase()})`,
    path: `src/content/${locale}/sections/about-bio`,
    format: { contentField: 'content' },
    schema: {
      seoTitle: fields.text({
        label: 'SEO title',
        description: 'Browser tab and search result title; "— Max Mayr" is appended.',
      }),
      heading: fields.text({ label: 'Heading', validation: { isRequired: true } }),
      photo: fields.text({ label: 'Photo path', validation: { isRequired: true } }),
      photoAlt: fields.text({ label: 'Photo alt text', validation: { isRequired: true } }),
      links: fields.array(
        fields.object({ url: fields.url({ label: 'URL', validation: { isRequired: true } }) }),
        { label: 'Profile links', itemLabel: (props) => props.fields.url.value ?? '' },
      ),
      content: markdown('Bio'),
    },
  });
}

function aboutInterestsSingleton(locale: LocaleId) {
  return singleton({
    label: `About — interests (${locale.toUpperCase()})`,
    path: `src/content/${locale}/sections/about-interests`,
    format: { contentField: 'content' },
    schema: {
      heading: fields.text({ label: 'Heading', validation: { isRequired: true } }),
      content: markdown('Interests', 'An intro sentence followed by a bullet list.'),
    },
  });
}

function aboutSkillsSingleton(locale: LocaleId) {
  return singleton({
    label: `About — skills (${locale.toUpperCase()})`,
    path: `src/content/${locale}/sections/about-skills`,
    format: { contentField: 'content' },
    schema: {
      heading: fields.text({ label: 'Heading', validation: { isRequired: true } }),
      groups: fields.array(
        fields.object({
          level: fields.text({ label: 'Level', validation: { isRequired: true } }),
          items: technologyList('Skills'),
        }),
        { label: 'Skill groups', itemLabel: (props) => props.fields.level.value },
      ),
      content: markdown('Intro'),
    },
  });
}

function pageIntrosSingleton(locale: LocaleId) {
  return singleton({
    label: `Page intros (${locale.toUpperCase()})`,
    path: `src/content/${locale}/sections/page-intros`,
    format: { contentField: 'content' },
    schema: {
      servicesSeoTitle: fields.text({
        label: 'Services SEO title',
        description: 'Search result title; "— Max Mayr" is appended. Falls back to the heading.',
      }),
      blogSeoTitle: fields.text({
        label: 'Blog SEO title',
        description: 'Search result title; "— Max Mayr" is appended. Falls back to the heading.',
      }),
      servicesHeading: fields.text({ label: 'Services heading', validation: { isRequired: true } }),
      servicesSubtitle: fields.text({
        label: 'Services subtitle',
        validation: { isRequired: true },
      }),
      workSeoTitle: fields.text({
        label: 'Work SEO title',
        description: 'Search result title; "— Max Mayr" is appended. Falls back to the heading.',
      }),
      workHeading: fields.text({ label: 'Work heading', validation: { isRequired: true } }),
      workSubtitle: fields.text({ label: 'Work subtitle', validation: { isRequired: true } }),
      blogHeading: fields.text({ label: 'Blog heading', validation: { isRequired: true } }),
      blogSubtitle: fields.text({ label: 'Blog subtitle', validation: { isRequired: true } }),
      notFoundHeading: fields.text({ label: '404 heading', validation: { isRequired: true } }),
      notFoundSubtitle: fields.text({ label: '404 subtitle', validation: { isRequired: true } }),
      content: markdown('404 body'),
    },
  });
}

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'maxmayr' },
    navigation: {
      English: [
        'homeEn',
        'servicesPageEn',
        'servicesEn',
        'referencesEn',
        'aboutBioEn',
        'aboutInterestsEn',
        'aboutSkillsEn',
        'pageIntrosEn',
        'contactEn',
        'blogEn',
        'projectsEn',
        'experienceEn',
        'educationEn',
        'publicationsEn',
      ],
      Deutsch: [
        'homeDe',
        'servicesPageDe',
        'servicesDe',
        'referencesDe',
        'aboutBioDe',
        'aboutInterestsDe',
        'aboutSkillsDe',
        'pageIntrosDe',
        'contactDe',
        'blogDe',
        'projectsDe',
        'experienceDe',
        'educationDe',
        'publicationsDe',
      ],
      'Both languages': ['impressum', 'datenschutz'],
    },
  },
  collections: {
    servicesEn: servicesCollection('en'),
    referencesEn: referencesCollection('en'),
    blogEn: blogCollection('en'),
    projectsEn: projectsCollection('en'),
    experienceEn: experienceCollection('en'),
    educationEn: educationCollection('en'),
    publicationsEn: publicationsCollection('en'),
    servicesDe: servicesCollection('de'),
    referencesDe: referencesCollection('de'),
    blogDe: blogCollection('de'),
    projectsDe: projectsCollection('de'),
    experienceDe: experienceCollection('de'),
    educationDe: educationCollection('de'),
    publicationsDe: publicationsCollection('de'),
  },
  singletons: {
    homeEn: homeSingleton('en'),
    servicesPageEn: servicesPageSingleton('en'),
    aboutBioEn: aboutBioSingleton('en'),
    aboutInterestsEn: aboutInterestsSingleton('en'),
    aboutSkillsEn: aboutSkillsSingleton('en'),
    pageIntrosEn: pageIntrosSingleton('en'),
    contactEn: contactSingleton('en'),
    homeDe: homeSingleton('de'),
    servicesPageDe: servicesPageSingleton('de'),
    aboutBioDe: aboutBioSingleton('de'),
    aboutInterestsDe: aboutInterestsSingleton('de'),
    aboutSkillsDe: aboutSkillsSingleton('de'),
    pageIntrosDe: pageIntrosSingleton('de'),
    contactDe: contactSingleton('de'),
    datenschutz: singleton({
      label: 'Datenschutz (German, both languages)',
      path: 'src/content/shared/datenschutz',
      format: { contentField: 'content' },
      schema: {
        heading: fields.text({ label: 'Heading', validation: { isRequired: true } }),
        content: markdown('Datenschutzerklärung'),
      },
    }),
    impressum: singleton({
      label: 'Impressum (German, both languages)',
      path: 'src/content/shared/impressum',
      format: { contentField: 'content' },
      schema: {
        heading: fields.text({ label: 'Heading', validation: { isRequired: true } }),
        content: markdown('Impressum'),
      },
    }),
  },
});
