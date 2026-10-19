/** "Personal Data Stores" → "#personal-data-stores", as tags are shown on the blog. */
export function hashtag(tag: string): string {
  return `#${tag.toLowerCase().replaceAll(' ', '-')}`;
}
