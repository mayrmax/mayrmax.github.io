/**
 * Former employers are linked for context, not endorsed: links to these hosts
 * carry rel="nofollow". Templates call isNofollow directly; links written in
 * markdown get it in Prose.astro, which all rendered markdown passes through.
 */
export const NOFOLLOW_HOSTS = ['tributech.io', 'eurofunk.com'];

/**
 * @param {string | undefined} href
 * @returns {boolean}
 */
export function isNofollow(href) {
  if (!href) return false;
  let host;
  try {
    host = new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return false;
  }
  return NOFOLLOW_HOSTS.some((candidate) => host === candidate || host.endsWith(`.${candidate}`));
}
