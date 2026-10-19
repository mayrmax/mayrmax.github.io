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

const socialPlatform = z.enum(['github', 'linkedin', 'twitter', 'youtube']);

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
    subtitle: z.string().optional(),
    date: publishedAt,
    categories: z.array(z.string()).default([]),
  }),
});

const experience = defineCollection({
  loader: localizedGlob('experience'),
  schema: z.object({
    order: z.number(),
    position: z.string(),
    company: z.object({ name: z.string(), url: z.url() }),
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

/**
 * Editable copy for the parts of a page that are not a list of entries: the
 * home hero, the three blocks of the about page, and the page intros.
 * Every field is optional because each section uses a different subset.
 */
const sections = defineCollection({
  loader: localizedGlob('sections'),
  schema: z.object({
    // home
    greeting: z.string().optional(),
    name: z.string().optional(),
    // about-bio
    sectionHeading: z.string().optional(),
    heading: z.string().optional(),
    photo: z.string().optional(),
    photoAlt: z.string().optional(),
    links: z.array(z.object({ platform: socialPlatform, url: z.url() })).optional(),
    // about-skills
    groups: z.array(z.object({ level: z.string(), items: z.array(z.string()) })).optional(),
    // page-intros
    blogHeading: z.string().optional(),
    blogSubtitle: z.string().optional(),
    projectsHeading: z.string().optional(),
    projectsSubtitle: z.string().optional(),
    publicationsHeading: z.string().optional(),
    publicationsSubtitle: z.string().optional(),
    notFoundHeading: z.string().optional(),
    notFoundSubtitle: z.string().optional(),
  }),
});

/** The Impressum is legal boilerplate and stays German for both languages. */
const shared = defineCollection({
  loader: glob({ base: './src/content/shared', pattern: '**/*.md' }),
  schema: z.object({ heading: z.string() }),
});

export const collections = {
  blog,
  experience,
  education,
  projects,
  publications,
  sections,
  shared,
};

export type ContentLocale = z.infer<typeof localeUnion>;
