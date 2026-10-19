import type { APIRoute } from 'astro';

import { faviconSvg } from '../og/favicon';

export const GET: APIRoute = async () =>
  new Response(await faviconSvg(), { headers: { 'Content-Type': 'image/svg+xml' } });
