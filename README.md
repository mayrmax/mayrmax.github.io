# mayrmax.github.io

Personal website of Max Mayr, built with [Astro](https://astro.build/) and
[Tailwind CSS](https://tailwindcss.com/), edited through
[Keystatic](https://keystatic.com/), and published in English and German.

Nothing third-party is loaded at runtime: Tailwind is the only styling layer,
the three typefaces are downloaded at build time and served from this origin,
and the icons are inlined SVG.

## Commands

```bash
npm install      # install dependencies
npm run dev      # dev server on http://localhost:4321, CMS on http://localhost:4321/keystatic
npm run build    # build the static site into ./dist
npm run preview  # serve ./dist locally
npm run check    # type-check .astro/.ts files and validate content frontmatter
npm run format   # run Prettier over everything except src/content
```

## Editing content

Run `npm run dev` and open <http://localhost:4321/keystatic>. Keystatic runs in
**local mode**: every save writes markdown straight into `src/content`, so
publishing is just `git add`, `git commit`, `git push`.

The admin UI is an SSR route, so `astro.config.mjs` loads Keystatic (and React)
only when the dev server is running. The production build stays fully static —
no adapter, no React in the output — which is what keeps GitHub Pages viable.

The sidebar is grouped by language. Each language has its own copy of every
collection and singleton, because Keystatic has no built-in notion of locales.

## Languages

English is the default and keeps unprefixed URLs (`/about`); German lives under
`/de` (`/de/about`). Both share the same path segments, so the language switcher
in the navigation can swap between them on any page.

Adding a language means adding it to `src/i18n/config.ts`, adding its strings to
`src/i18n/ui.ts`, creating `src/content/<locale>/`, and registering the
collections in `keystatic.config.ts`. Every page route fans out across locales
automatically via `src/i18n/routes.ts`.

The Impressum is legal boilerplate and stays German in both languages; it lives
in `src/content/shared/`.

## Project structure

```
keystatic.config.ts   CMS schema — collections and singletons, per language
astro.config.mjs      i18n routing, self-hosted fonts, Tailwind, dev-only CMS
src/
├── components/       shared markup (navigation, footer, icons, small helpers)
├── content/
│   ├── en/           English content
│   │   ├── blog/         posts        → /blog/<filename>
│   │   ├── education/    about page   → ordered by the `order` field
│   │   ├── experience/   about page
│   │   ├── projects/     /projects
│   │   ├── publications/ /publications
│   │   └── sections/     editable copy for the home and about pages
│   ├── de/           German content, same shape
│   └── shared/       language-independent documents (Impressum)
├── content.config.ts collection schemas — frontmatter is validated at build time
├── i18n/             locales, URL helpers, UI strings, content accessors
├── layouts/          BaseLayout — <head>, navigation, footer
├── pages/            routes; `[...locale]/` emits both languages from one file
├── scripts/          client-side JS (navbar toggle, typewriter)
├── styles/           global.css — the Tailwind entry point and theme tokens
└── utils/            date formatting
public/               copied verbatim to the site root (images, robots.txt)
```

### Ordering

`education`, `experience`, `projects` and `publications` are sorted by an
explicit `order` field rather than by filename, because Keystatic renames files
when an entry's title changes. Blog posts are ordered by `date`, newest first.

## Deployment

The site is hosted on [Coolify](https://coolify.io/). GitHub Pages still answers
on `mayrmax.github.io`, but only to redirect to the new domain.

### Coolify

`Dockerfile` builds the site and serves it with nginx. In Coolify:

1. New resource → **Public/Private Repository** → this repo, branch `master`.
2. **Build Pack: Dockerfile** (not Nixpacks, not Static — see below).
3. Set the domain under **Domains**, e.g. `https://mayrmax.com`.
4. Add an environment variable `SITE_URL` with that same URL and tick
   **Build Variable**, so it reaches the build rather than just the container.
5. Deploy. The exposed port is 80 and the image has a healthcheck, so Coolify
   can gate the rollover on nginx actually answering.

Astro bakes absolute URLs into the output — canonical links, hreflang
alternates, `og:url`, both sitemaps, both feeds and `robots.txt` — so changing
the domain means redeploying, not just editing the variable.

**Why not Coolify's Static build pack:** `astro.config.mjs` sets
`build.format: 'file'`, so the page at `/about` is `about.html` on disk. A
server that only tries `$uri` and `$uri/index.html` returns 404 for every page
except the home page. `nginx.conf` adds the `$uri.html` step that makes those
URLs resolve, and points `error_page 404` at the site's own 404 page. It also
caches `/_astro/*` (content-hashed, so immutable) forever while keeping HTML on
`no-cache`, so a redeploy is visible on the next request.

To build and run it locally the way Coolify will:

```bash
docker build --build-arg SITE_URL=http://localhost:8080 -t mayrmax-site .
docker run --rm -p 8080:80 mayrmax-site
```

### GitHub Pages, as a redirect only

`.github/workflows/github-pages-redirect.yml` builds the site, runs
`scripts/build-redirects.mjs` over the output, and publishes the result — a stub
for every page carrying `rel="canonical"` and a `meta refresh` to the same path
on the new domain, plus a catch-all `404.html` that preserves whatever path it
was given. The stubs come from the real build, so a new page cannot be forgotten.

GitHub Pages is a static host and cannot issue a 301, so this is a client-side
redirect. Readers land on the right page; search engines treat it as a soft
redirect and follow the canonical. Feed readers do not follow a meta refresh, so
the old feeds stay valid XML with one entry saying where to subscribe instead.

This requires **Settings → Pages → Build and deployment → Source** set to
**GitHub Actions**, and `mayrmax.com` must _not_ be added as a custom domain
there — it belongs to Coolify. The workflow is also the project's only CI, so it
still runs `npm run check` and the full build.
