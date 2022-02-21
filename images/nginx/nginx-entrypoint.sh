#!/usr/bin/env sh
set -e

HOMECONF=/etc/nginx/conf.d/home.conf;
JOBSCONF=/etc/nginx/conf.d/jobs.conf;
HUBCONF=/etc/nginx/conf.d/hub.conf;
DEFAULTCONF=/etc/nginx/conf.d/default.conf;

if test -f "$HOMECONF"; then
    sed -i "s#%DOMAIN_HOME%#${DOMAIN_HOME}#g" "$HOMECONF";
    sed -i "s#%NUXT_PORT%#${NUXT_PORT}#g" "$HOMECONF";
    sed -i "s#%FRONT_WORKDIR%#${FRONT_WORKDIR}#g" "$HOMECONF";
    sed -i "s#%ENV%#${ENV}#g" "$HOMECONF";
    sed -i "s#%NGINX_WORKDIR%#${NGINX_WORKDIR}#g" "$HOMECONF";
fi

if test -f "$JOBSCONF"; then
    sed -i "s#%JOBS%#${JOBS}#g" "$JOBSCONF";
    sed -i "s#%NUXT_PORT%#${NUXT_PORT}#g" "$JOBSCONF";
    sed -i "s#%FRONT_WORKDIR%#${FRONT_WORKDIR}#g" "$JOBSCONF";
    sed -i "s#%ENV%#${ENV}#g" "$JOBSCONF";
    sed -i "s#%NGINX_WORKDIR%#${NGINX_WORKDIR}#g" "$JOBSCONF";
fi

if test -f "$HUBCONF"; then
    sed -i "s#%HUB%#${HUB}#g" "$HUBCONF";
    sed -i "s#%NUXT_PORT%#${NUXT_PORT}#g" "$HUBCONF";
    sed -i "s#%FRONT_WORKDIR%#${FRONT_WORKDIR}#g" "$HUBCONF";
    sed -i "s#%ENV%#${ENV}#g" "$HUBCONF";
    sed -i "s#%NGINX_WORKDIR%#${NGINX_WORKDIR}#g" "$HUBCONF";
fi

if test -f "$DEFAULTCONF"; then
    sed -i "s#%DOMAIN_HOME%#${DOMAIN_HOME}#g" "$DEFAULTCONF";
    sed -i "s#%NUXT_PORT%#${NUXT_PORT}#g" "$DEFAULTCONF";
    sed -i "s#%FRONT_WORKDIR%#${FRONT_WORKDIR}#g" "$DEFAULTCONF";
    sed -i "s#%ENV%#${ENV}#g" "$DEFAULTCONF";
    sed -i "s#%NGINX_WORKDIR%#${NGINX_WORKDIR}#g" "$DEFAULTCONF";
fi

exec "$@";
