# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Build
# ---------------------------------------------------------------------------
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies in their own layer so they are only reinstalled when the
# lockfile changes, not on every content edit.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

# Astro bakes canonical URLs, hreflang links, the sitemaps, robots.txt and the
# RSS feeds into the static output, so a host has to be chosen here. It does not
# have to be the final one: docker-entrypoint.d/10-site-origin.sh rewrites it on
# startup from Coolify's COOLIFY_URL, so the domain follows Coolify by itself.
ARG SITE_URL=https://mayrmax.com
ENV SITE_URL=$SITE_URL

RUN npm run build

# ---------------------------------------------------------------------------
# Runtime
# ---------------------------------------------------------------------------
FROM nginx:1.29-alpine AS runtime

ARG SITE_URL=https://mayrmax.com

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# What the output currently says, so the startup hook knows what to replace.
RUN printf '%s' "$SITE_URL" > /etc/site-origin

# The nginx image runs every executable script in here before starting.
COPY docker-entrypoint.d/10-site-origin.sh /docker-entrypoint.d/10-site-origin.sh
RUN chmod +x /docker-entrypoint.d/10-site-origin.sh

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -q --spider http://127.0.0.1/ || exit 1
