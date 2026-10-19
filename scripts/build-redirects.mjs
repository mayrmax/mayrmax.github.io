/**
 * Builds the stand-in site that stays on GitHub Pages after the real site moves
 * to Coolify, so every old mayrmax.github.io URL points at its counterpart on
 * the new domain.
 *
 * GitHub Pages is a static host and cannot issue a 301, so each page becomes a
 * stub carrying `rel="canonical"` (which passes the ranking signal on) and a
 * `meta refresh` (which moves the reader). The stubs are generated from the
 * real build output, so they cannot drift out of sync with the routes.
 *
 * Run after `npm run build`.
 */
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative, sep } from 'node:path';

const SOURCE = 'dist';
const OUTPUT = 'dist-redirect';
const TARGET = (process.env.REDIRECT_TARGET ?? 'https://mayrmax.com').replace(/\/$/, '');

/** Every file under `dir` with the given extension, recursively. */
async function walk(dir, extension) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(path, extension)));
    else if (entry.name.endsWith(extension)) found.push(path);
  }
  return found;
}

/** `dist/de/about.html` -> `/de/about`, `dist/index.html` -> `/` */
function publicPath(file) {
  const withoutRoot = relative(SOURCE, file).split(sep).join('/');
  const withoutExtension = withoutRoot.replace(/\.html$/, '');
  if (withoutExtension === 'index') return '/';
  return `/${withoutExtension.replace(/\/index$/, '')}`;
}

async function write(relativePath, contents) {
  const destination = join(OUTPUT, relativePath);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, contents, 'utf8');
}

const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function redirectPage(path) {
  const url = escape(`${TARGET}${path}`);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Moved to mayrmax.com</title>
    <link rel="canonical" href="${url}" />
    <meta http-equiv="refresh" content="0; url=${url}" />
  </head>
  <body>
    <p>This page has moved to <a href="${url}">${url}</a>.</p>
  </body>
</html>
`;
}

/**
 * GitHub Pages serves this for anything without its own stub — old Jekyll
 * permalinks, trailing-slash variants, hand-typed URLs. It keeps the path so a
 * URL that still exists on the new domain lands on the right page.
 */
function catchAllPage() {
  const root = escape(`${TARGET}/`);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Moved to mayrmax.com</title>
    <meta http-equiv="refresh" content="0; url=${root}" />
    <script>
      location.replace(
        ${JSON.stringify(TARGET)} + location.pathname + location.search + location.hash,
      );
    </script>
  </head>
  <body>
    <p>This site has moved to <a href="${root}">${root}</a>.</p>
  </body>
</html>
`;
}

/**
 * Feed readers do not follow a meta refresh, so the old feed stays valid XML
 * and carries one entry telling whoever is subscribed where to go.
 */
function movedFeed(path) {
  const feed = `${TARGET}${path}`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Max Mayr</title>
    <link>${escape(feed)}</link>
    <description>This feed has moved to ${escape(feed)}</description>
    <item>
      <title>This feed has moved to ${escape(TARGET)}</title>
      <link>${escape(feed)}</link>
      <guid isPermaLink="false">mayrmax-feed-moved</guid>
      <description>Max Mayr's site now lives at ${escape(TARGET)}. Please point your reader at ${escape(feed)}.</description>
    </item>
  </channel>
</rss>
`;
}

const pages = await walk(SOURCE, '.html');
let count = 0;

for (const file of pages) {
  const relativePath = relative(SOURCE, file).split(sep).join('/');
  if (relativePath === '404.html') continue;
  await write(relativePath, redirectPage(publicPath(file)));
  count += 1;
}

await write('404.html', catchAllPage());

for (const feed of await walk(SOURCE, 'feed.xml')) {
  const relativePath = relative(SOURCE, feed).split(sep).join('/');
  await write(relativePath, movedFeed(`/${relativePath}`));
  count += 1;
}

// Pages the redesign retired no longer exist in the build, so they get stubs
// pointing straight at their replacements rather than a detour via the 404.
const retired = {
  '/projects': '/work',
  '/de/projects': '/de/work',
  '/publications': '/about#theses',
  '/de/publications': '/de/about#theses',
  '/blog/decentralized-1': '/blog/journey-into-the-decentralised-web',
  '/blog/decentralized-2': '/blog/journey-into-the-decentralised-web#data-pods',
  '/blog/decentralized-3': '/blog/journey-into-the-decentralised-web#a-personal-api',
  '/blog/decentralized-4': '/blog/journey-into-the-decentralised-web#a-digital-soul',
  '/blog/decentralized-5': '/blog/journey-into-the-decentralised-web#autonomous-agents',
  '/de/blog/decentralized-1': '/de/blog/reise-ins-dezentrale-web',
  '/de/blog/decentralized-2': '/de/blog/reise-ins-dezentrale-web#datapods',
  '/de/blog/decentralized-3': '/de/blog/reise-ins-dezentrale-web#eine-pers%C3%B6nliche-api',
  '/de/blog/decentralized-4': '/de/blog/reise-ins-dezentrale-web#eine-digitale-seele',
  '/de/blog/decentralized-5': '/de/blog/reise-ins-dezentrale-web#autonome-agenten',
};
for (const [from, to] of Object.entries(retired)) {
  await write(`${from.slice(1)}.html`, redirectPage(to));
  count += 1;
}

// Crawlers have to be allowed in, or they never see the canonical tags.
await write('robots.txt', `User-agent: *\nAllow: /\n`);

console.log(`Wrote ${count} redirect stubs plus a catch-all to ${OUTPUT}/ (target ${TARGET})`);
