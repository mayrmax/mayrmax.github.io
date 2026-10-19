# mayrmax.github.io

Personal website of Max Mayr, built with [Astro](https://astro.build/) and
[Tailwind CSS](https://tailwindcss.com/), published in English and German.

Nothing third-party is loaded at runtime: Tailwind is the only styling layer,
the three typefaces are downloaded at build time and served from this origin,
and the icons are inlined SVG.

## Commands

```bash
npm install      # install dependencies
npm run dev      # dev server on http://localhost:4321
npm run build    # build the static site into ./dist
npm run preview  # serve ./dist locally
npm run check    # type-check .astro/.ts files and validate content frontmatter
npm run format   # run Prettier over the repo
```

## Languages

English is the default and keeps unprefixed URLs (`/about`); German lives under
`/de` (`/de/about`). Both share the same path segments, so the language switcher
in the navigation can swap between them on any page.

Adding a language means adding it to `src/i18n/config.ts`, adding its strings to
`src/i18n/ui.ts`, and creating `src/content/<locale>/`. Every page route fans
out across locales automatically via `src/i18n/routes.ts`.

The Impressum is legal boilerplate and stays German in both languages; it lives
in `src/content/shared/`.

## Project structure

```
astro.config.mjs      i18n routing, self-hosted fonts, Tailwind
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
explicit `order` field rather than by filename, so renaming a file never
reorders a page. Blog posts are ordered by `date`, newest first.

## Deployment

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to GitHub Pages. This requires **Settings → Pages → Build
and deployment → Source** to be set to **GitHub Actions**.
