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
      subtitle: fields.text({ label: 'Subtitle' }),
      date: fields.datetime({ label: 'Published', validation: { isRequired: true } }),
      categories: fields.array(fields.text({ label: 'Category' }), {
        label: 'Categories',
        itemLabel: (props) => props.value,
      }),
      content: markdown('Post'),
    },
  });
}

function projectsCollection(locale: LocaleId) {
  return collection({
    label: `Projects (${locale.toUpperCase()})`,
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
          url: fields.url({ label: 'Company URL', validation: { isRequired: true } }),
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

function homeSingleton(locale: LocaleId) {
  return singleton({
    label: `Home page (${locale.toUpperCase()})`,
    path: `src/content/${locale}/sections/home`,
    format: { contentField: 'content' },
    schema: {
      greeting: fields.text({ label: 'Greeting', validation: { isRequired: true } }),
      name: fields.text({ label: 'Name', validation: { isRequired: true } }),
      content: markdown('Tagline'),
    },
  });
}

function aboutBioSingleton(locale: LocaleId) {
  return singleton({
    label: `About — intro (${locale.toUpperCase()})`,
    path: `src/content/${locale}/sections/about-bio`,
    format: { contentField: 'content' },
    schema: {
      sectionHeading: fields.text({ label: 'Section heading', validation: { isRequired: true } }),
      heading: fields.text({ label: 'Heading', validation: { isRequired: true } }),
      photo: fields.text({ label: 'Photo path', validation: { isRequired: true } }),
      photoAlt: fields.text({ label: 'Photo alt text', validation: { isRequired: true } }),
      links: fields.array(
        fields.object({
          platform: fields.select({
            label: 'Platform',
            options: [
              { label: 'GitHub', value: 'github' },
              { label: 'LinkedIn', value: 'linkedin' },
              { label: 'Twitter', value: 'twitter' },
              { label: 'YouTube', value: 'youtube' },
            ],
            defaultValue: 'github',
          }),
          url: fields.url({ label: 'URL', validation: { isRequired: true } }),
        }),
        { label: 'Social links', itemLabel: (props) => props.fields.platform.value },
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
      blogHeading: fields.text({ label: 'Blog heading', validation: { isRequired: true } }),
      blogSubtitle: fields.text({ label: 'Blog subtitle', validation: { isRequired: true } }),
      projectsHeading: fields.text({ label: 'Projects heading', validation: { isRequired: true } }),
      projectsSubtitle: fields.text({
        label: 'Projects subtitle',
        validation: { isRequired: true },
      }),
      publicationsHeading: fields.text({
        label: 'Publications heading',
        validation: { isRequired: true },
      }),
      publicationsSubtitle: fields.text({
        label: 'Publications subtitle',
        validation: { isRequired: true },
      }),
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
        'aboutBioEn',
        'aboutInterestsEn',
        'aboutSkillsEn',
        'pageIntrosEn',
        'blogEn',
        'projectsEn',
        'experienceEn',
        'educationEn',
        'publicationsEn',
      ],
      Deutsch: [
        'homeDe',
        'aboutBioDe',
        'aboutInterestsDe',
        'aboutSkillsDe',
        'pageIntrosDe',
        'blogDe',
        'projectsDe',
        'experienceDe',
        'educationDe',
        'publicationsDe',
      ],
      'Both languages': ['impressum'],
    },
  },
  collections: {
    blogEn: blogCollection('en'),
    projectsEn: projectsCollection('en'),
    experienceEn: experienceCollection('en'),
    educationEn: educationCollection('en'),
    publicationsEn: publicationsCollection('en'),
    blogDe: blogCollection('de'),
    projectsDe: projectsCollection('de'),
    experienceDe: experienceCollection('de'),
    educationDe: educationCollection('de'),
    publicationsDe: publicationsCollection('de'),
  },
  singletons: {
    homeEn: homeSingleton('en'),
    aboutBioEn: aboutBioSingleton('en'),
    aboutInterestsEn: aboutInterestsSingleton('en'),
    aboutSkillsEn: aboutSkillsSingleton('en'),
    pageIntrosEn: pageIntrosSingleton('en'),
    homeDe: homeSingleton('de'),
    aboutBioDe: aboutBioSingleton('de'),
    aboutInterestsDe: aboutInterestsSingleton('de'),
    aboutSkillsDe: aboutSkillsSingleton('de'),
    pageIntrosDe: pageIntrosSingleton('de'),
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
