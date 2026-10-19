#!/bin/sh
# Astro bakes absolute URLs into the output — canonical links, hreflang
# alternates, og:url, both sitemaps, both feeds and robots.txt. The host is
# therefore fixed at build time, which would mean rebuilding to change domain.
#
# Coolify knows the domain but only exposes it at runtime (COOLIFY_URL and
# COOLIFY_FQDN are injected into the container, not into the image build), so
# this rewrites the baked origin to the real one before nginx starts. The
# nginx image runs every executable script in /docker-entrypoint.d first.
set -eu

ROOT=/usr/share/nginx/html
STAMP=/etc/site-origin

baked=$(cat "$STAMP")

# An explicit SITE_URL wins; otherwise take whatever Coolify provides. Both
# COOLIFY_ variables hold a comma-separated list when several domains are
# attached, so keep the first.
if [ -n "${SITE_URL:-}" ]; then
    origin=$SITE_URL
elif [ -n "${COOLIFY_URL:-}" ]; then
    origin=${COOLIFY_URL%%,*}
elif [ -n "${COOLIFY_FQDN:-}" ]; then
    origin=https://${COOLIFY_FQDN%%,*}
else
    origin=
fi

origin=$(printf '%s' "$origin" | tr -d '[:space:]' | sed 's#/$##')

if [ -z "$origin" ]; then
    echo "site-origin: no SITE_URL or COOLIFY_URL set, keeping $baked"
    exit 0
fi

if [ "$origin" = "$baked" ]; then
    echo "site-origin: already $baked"
    exit 0
fi

echo "site-origin: rewriting $baked -> $origin"

# `&` and `\` are special on the replacement side of s///.
escaped=$(printf '%s' "$origin" | sed 's#[&\\]#\\&#g')

find "$ROOT" -type f \( -name '*.html' -o -name '*.xml' -o -name 'robots.txt' \) \
    -exec sed -i "s#$baked#$escaped#g" {} +

# Record what the files now contain, so a restart on the same writable layer
# rewrites from the right starting point if the domain changes again.
printf '%s' "$origin" > "$STAMP"
