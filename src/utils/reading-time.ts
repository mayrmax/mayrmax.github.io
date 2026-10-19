/**
 * Minutes to read a markdown body at 200 words a minute, the pace commonly
 * assumed for German and English non-fiction. Never less than one.
 */
export function readingMinutes(markdown: string | undefined): number {
  const words = (markdown ?? '')
    .replace(/[#>*_`[\]()-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  return Math.max(1, Math.round(words.length / 200));
}
