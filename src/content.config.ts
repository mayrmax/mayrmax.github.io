import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { locales } from './i18n/config';

const localeUnion = z.enum(locales);

/**
 * Content is stored one directory per language: `src/content/<locale>/<collection>`.
 * Entry ids therefore carry their locale — `en/decentralized-1` — and the helpers
 * in `src/i18n/content.ts` split that back apart.
 *
 * Display order comes from an explicit `order` field rather than the filename,
 * because Keystatic renames files when an entry's title changes.
 */
function localizedGlob(directory: string) {
  return glob({
    base: './src/content',
    pattern: `{${locales.join(',')}}/${directory}/**/*.md`,
    generateId: ({ entry }) => entry.replace(/\.md$/, '').replace(`/${directory}/`, '/'),
  });
}

// Durations are written either as text ("February 2021") or as a bare year (2017),
// so coerce both into a string.
const duration = z.object({
  start: z.coerce.string(),
  end: z.coerce.string(),
});

/**
 * Keystatic's datetime field stores a bare `YYYY-MM-DDTHH:mm`, which JavaScript
 * would read in the build machine's timezone. Pin it to UTC so a local build and
 * CI produce the same dates.
 */
const publishedAt = z.preprocess((value) => {
  if (typeof value !== 'string') return value;
  return new Date(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value) ? `${value}:00Z` : value);
}, z.date());

const blog = defineCollection({
  loader: localizedGlob('blog'),
  schema: z.object({
    title: z.string(),
    // Lede under the title, meta description and feed summary.
    description: z.string().optional(),
    date: publishedAt,
    // Set when a post is revised; shown beside the date and sent as dateModified.
    updated: publishedAt.optional(),
    tags: z.array(z.string()).default([]),
    // A boxed remark above the text, e.g. that a post is kept as written years ago.
    note: z.string().optional(),
  }),
});

const experience = defineCollection({
  loader: localizedGlob('experience'),
  schema: z.object({
    order: z.number(),
    position: z.string(),
    // Self-employment has no company page, so the link is optional.
    company: z.object({ name: z.string(), url: z.url().optional() }),
    duration,
    main_technologies: z.array(z.string()).default([]),
  }),
});

const education = defineCollection({
  loader: localizedGlob('education'),
  schema: z.object({
    order: z.number(),
    // Used for the filename and the Keystatic entry list; not rendered.
    name: z.string(),
    place: z.object({ name: z.string(), url: z.url() }),
    details: z.array(z.string()).default([]),
    duration,
  }),
});

const projects = defineCollection({
  loader: localizedGlob('projects'),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    anchor: z.string(),
    github: z.url().optional(),
    youtube: z.url().optional(),
    technologies: z.array(z.string()).default([]),
    duration,
  }),
});

const publications = defineCollection({
  loader: localizedGlob('publications'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    subtitle: z.string(),
    tags: z.array(z.string()).default([]),
    year: z.number(),
  }),
});

/** What I offer, listed on the services page. */
const services = defineCollection({
  loader: localizedGlob('services'),
  schema: z.object({
    order: z.number(),
    // Shown beside the service as a command-line flag, matching the hero prompt.
    flag: z.string().optional(),
    title: z.string(),
    items: z.array(z.string()).default([]),
  }),
});

/**
 * Work worth pointing at, listed under the services. Featured entries get the
 * full treatment; the rest form a compact list, so recent client work shows
 * without burying the flagships.
 */
const references = defineCollection({
  loader: localizedGlob('references'),
  schema: z.object({
    order: z.number(),
    featured: z.boolean().default(false),
    name: z.string(),
    url: z.url().optional(),
    role: z.string(),
    duration,
    technologies: z.array(z.string()).default([]),
  }),
});

/**
 * Editable copy for the parts of a page that are not a list of entries: the
 * home hero, the three blocks of the about page, the page intros and the
 * contact block.
 * Every field is optional because each section uses a different subset.
 */
const sections = defineCollection({
  loader: localizedGlob('sections'),
  schema: z.object({
    // home
    command: z.string().optional(),
    headline: z.string().optional(),
    ctaLabel: z.string().optional(),
    contactLabel: z.string().optional(),
    // <title> override where the visible heading is too terse for search results;
    // the site name is still appended. Used by home and about-bio.
    seoTitle: z.string().optional(),
    // about-bio
    heading: z.string().optional(),
    photo: z.string().optional(),
    photoAlt: z.string().optional(),
    links: z.array(z.object({ url: z.url() })).optional(),
    // about-skills
    groups: z.array(z.object({ level: z.string(), items: z.array(z.string()) })).optional(),
    // services
    subtitle: z.string().optional(),
    partnerHeading: z.string().optional(),
    partnerName: z.string().optional(),
    partnerUrl: z.url().optional(),
    partnerText: z.string().optional(),
    // page-intros
    servicesSeoTitle: z.string().optional(),
    workSeoTitle: z.string().optional(),
    blogSeoTitle: z.string().optional(),
    servicesHeading: z.string().optional(),
    servicesSubtitle: z.string().optional(),
    workHeading: z.string().optional(),
    workSubtitle: z.string().optional(),
    blogHeading: z.string().optional(),
    blogSubtitle: z.string().optional(),
    notFoundHeading: z.string().optional(),
    notFoundSubtitle: z.string().optional(),
    // contact
    email: z.email().optional(),
    emailSubject: z.string().optional(),
  }),
});

/** The Impressum is legal boilerplate and stays German for both languages. */
const shared = defineCollection({
  loader: glob({ base: './src/content/shared', pattern: '**/*.md' }),
  schema: z.object({ heading: z.string() }),
});

export const collections = {
  blog,
  services,
  references,
  experience,
  education,
  projects,
  publications,
  sections,
  shared,
};

export type ContentLocale = z.infer<typeof localeUnion>;
