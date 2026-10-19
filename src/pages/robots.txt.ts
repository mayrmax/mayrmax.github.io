import type { APIRoute } from 'astro';

/**
 * Generated rather than kept in public/, so the sitemap URL follows whatever
 * host the site was built for (see SITE_URL in astro.config.mjs).
 */
export const GET: APIRoute = ({ site }) => {
  const body = `User-agent: *
Allow: /

Sitemap: ${new URL('sitemap-index.xml', site).href}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
