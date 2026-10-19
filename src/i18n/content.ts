import {
  getCollection,
  getEntry,
  render,
  type CollectionEntry,
  type CollectionKey,
} from 'astro:content';

import type { Locale } from './config';

/** Collections that are stored per language. */
type LocalizedKey = Exclude<CollectionKey, 'shared'>;

/** Strips the `<locale>/` prefix that `localizedGlob` puts on every entry id. */
export function entrySlug(id: string): string {
  return id.slice(id.indexOf('/') + 1);
}

/** Entries without an `order` field fall back to sorting by id. */
function sortKey(entry: { id: string; data: Record<string, unknown> }): [number, string] {
  const order = typeof entry.data.order === 'number' ? entry.data.order : Number.MAX_SAFE_INTEGER;
  return [order, entry.id];
}

/**
 * All entries of a collection for one language, in display order.
 */
export async function getLocalized<K extends LocalizedKey>(
  collection: K,
  locale: Locale,
): Promise<CollectionEntry<K>[]> {
  const entries = await getCollection(collection, ({ id }: { id: string }) =>
    id.startsWith(`${locale}/`),
  );
  return entries.sort((a, b) => {
    const [orderA, idA] = sortKey(a);
    const [orderB, idB] = sortKey(b);
    return orderA - orderB || idA.localeCompare(idB);
  });
}

/** Same as `getLocalized`, but each entry also carries its rendered `Content`. */
export async function getLocalizedRendered<K extends LocalizedKey>(collection: K, locale: Locale) {
  const entries = await getLocalized(collection, locale);
  return Promise.all(
    entries.map(async (entry) => ({
      ...entry,
      slug: entrySlug(entry.id),
      Content: (await render(entry)).Content,
    })),
  );
}

/**
 * One page section (`home`, `about-bio`, …) for a language, with its prose
 * rendered. Sections are required, so a missing file is a build error.
 */
export async function getSection(name: string, locale: Locale) {
  const entry = await getEntry('sections', `${locale}/${name}`);
  if (!entry) {
    throw new Error(`Missing content section: src/content/${locale}/sections/${name}.md`);
  }
  const { Content } = await render(entry);
  return { ...entry.data, Content };
}

/** A language-independent document, such as the Impressum. */
export async function getShared(name: string) {
  const entry = await getEntry('shared', name);
  if (!entry) {
    throw new Error(`Missing shared content: src/content/shared/${name}.md`);
  }
  const { Content } = await render(entry);
  return { ...entry.data, Content };
}
