#!/usr/bin/env sh
set -e

HOMECONF=/etc/nginx/conf.d/home.conf;
JOBSCONF=/etc/nginx/conf.d/jobs.conf;
HUBCONF=/etc/nginx/conf.d/hub.conf;
OFFICECONF=/etc/nginx/conf.d/office.conf;
CATALOGCONF=/etc/nginx/conf.d/catalog.conf;
USLUGICONF=/etc/nginx/conf.d/uslugi.conf;
FOODCONF=/etc/nginx/conf.d/food.conf;
TRAVELCONF=/etc/nginx/conf.d/travel.conf;
MEDCONF=/etc/nginx/conf.d/med.conf;
PETCONF=/etc/nginx/conf.d/pet.conf;
AVIACONF=/etc/nginx/conf.d/avia.conf;
HOTELSCONF=/etc/nginx/conf.d/hotels.conf;
REALTYCONF=/etc/nginx/conf.d/realty.conf;
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

if test -f "$OFFICECONF"; then
    sed -i "s#%OFFICE%#${OFFICE}#g" "$OFFICECONF";
    sed -i "s#%NUXT_PORT%#${NUXT_PORT}#g" "$OFFICECONF";
    sed -i "s#%FRONT_WORKDIR%#${FRONT_WORKDIR}#g" "$OFFICECONF";
    sed -i "s#%ENV%#${ENV}#g" "$OFFICECONF";
    sed -i "s#%NGINX_WORKDIR%#${NGINX_WORKDIR}#g" "$OFFICECONF";
fi

if test -f "$CATALOGCONF"; then
    sed -i "s#%CATALOG%#${CATALOG}#g" "$CATALOGCONF";
    sed -i "s#%NUXT_PORT%#${NUXT_PORT}#g" "$CATALOGCONF";
    sed -i "s#%FRONT_WORKDIR%#${FRONT_WORKDIR}#g" "$CATALOGCONF";
    sed -i "s#%ENV%#${ENV}#g" "$CATALOGCONF";
    sed -i "s#%NGINX_WORKDIR%#${NGINX_WORKDIR}#g" "$CATALOGCONF";
fi

if test -f "$USLUGICONF"; then
    sed -i "s#%USLUGI%#${USLUGI}#g" "$USLUGICONF";
    sed -i "s#%NUXT_PORT%#${NUXT_PORT}#g" "$USLUGICONF";
    sed -i "s#%FRONT_WORKDIR%#${FRONT_WORKDIR}#g" "$USLUGICONF";
    sed -i "s#%ENV%#${ENV}#g" "$USLUGICONF";
    sed -i "s#%NGINX_WORKDIR%#${NGINX_WORKDIR}#g" "$USLUGICONF";
fi

if test -f "$FOODCONF"; then
    sed -i "s#%FOOD%#${FOOD}#g" "$FOODCONF";
    sed -i "s#%NUXT_PORT%#${NUXT_PORT}#g" "$FOODCONF";
    sed -i "s#%FRONT_WORKDIR%#${FRONT_WORKDIR}#g" "$FOODCONF";
    sed -i "s#%ENV%#${ENV}#g" "$FOODCONF";
    sed -i "s#%NGINX_WORKDIR%#${NGINX_WORKDIR}#g" "$FOODCONF";
fi

if test -f "$MEDCONF"; then
    sed -i "s#%MED%#${MED}#g" "$MEDCONF";
    sed -i "s#%NUXT_PORT%#${NUXT_PORT}#g" "$MEDCONF";
    sed -i "s#%FRONT_WORKDIR%#${FRONT_WORKDIR}#g" "$MEDCONF";
    sed -i "s#%ENV%#${ENV}#g" "$MEDCONF";
    sed -i "s#%NGINX_WORKDIR%#${NGINX_WORKDIR}#g" "$MEDCONF";
fi

if test -f "$PETCONF"; then
    sed -i "s#%PET%#${PET}#g" "$PETCONF";
    sed -i "s#%NUXT_PORT%#${NUXT_PORT}#g" "$PETCONF";
    sed -i "s#%FRONT_WORKDIR%#${FRONT_WORKDIR}#g" "$PETCONF";
    sed -i "s#%ENV%#${ENV}#g" "$PETCONF";
    sed -i "s#%NGINX_WORKDIR%#${NGINX_WORKDIR}#g" "$PETCONF";
fi

if test -f "$TRAVELCONF"; then
    sed -i "s#%TRAVEL%#${TRAVEL}#g" "$TRAVELCONF";
    sed -i "s#%NUXT_PORT%#${NUXT_PORT}#g" "$TRAVELCONF";
    sed -i "s#%FRONT_WORKDIR%#${FRONT_WORKDIR}#g" "$TRAVELCONF";
    sed -i "s#%ENV%#${ENV}#g" "$TRAVELCONF";
    sed -i "s#%NGINX_WORKDIR%#${NGINX_WORKDIR}#g" "$TRAVELCONF";
fi

if test -f "$AVIACONF"; then
    sed -i "s#%AVIA%#${AVIA}#g" "$AVIACONF";
    sed -i "s#%NUXT_PORT%#${NUXT_PORT}#g" "$AVIACONF";
    sed -i "s#%FRONT_WORKDIR%#${FRONT_WORKDIR}#g" "$AVIACONF";
    sed -i "s#%ENV%#${ENV}#g" "$AVIACONF";
    sed -i "s#%NGINX_WORKDIR%#${NGINX_WORKDIR}#g" "$AVIACONF";
fi

if test -f "$HOTELSCONF"; then
    sed -i "s#%HOTELS%#${HOTELS}#g" "$HOTELSCONF";
    sed -i "s#%NUXT_PORT%#${NUXT_PORT}#g" "$HOTELSCONF";
    sed -i "s#%FRONT_WORKDIR%#${FRONT_WORKDIR}#g" "$HOTELSCONF";
    sed -i "s#%ENV%#${ENV}#g" "$HOTELSCONF";
    sed -i "s#%NGINX_WORKDIR%#${NGINX_WORKDIR}#g" "$HOTELSCONF";
fi

if test -f "$REALTYCONF"; then
    sed -i "s#%REALTY%#${REALTY}#g" "$REALTYCONF";
    sed -i "s#%NUXT_PORT%#${NUXT_PORT}#g" "$REALTYCONF";
    sed -i "s#%FRONT_WORKDIR%#${FRONT_WORKDIR}#g" "$REALTYCONF";
    sed -i "s#%ENV%#${ENV}#g" "$REALTYCONF";
    sed -i "s#%NGINX_WORKDIR%#${NGINX_WORKDIR}#g" "$REALTYCONF";
fi

if test -f "$DEFAULTCONF"; then
    sed -i "s#%DOMAIN_HOME%#${DOMAIN_HOME}#g" "$DEFAULTCONF";
    sed -i "s#%NUXT_PORT%#${NUXT_PORT}#g" "$DEFAULTCONF";
    sed -i "s#%FRONT_WORKDIR%#${FRONT_WORKDIR}#g" "$DEFAULTCONF";
    sed -i "s#%ENV%#${ENV}#g" "$DEFAULTCONF";
    sed -i "s#%NGINX_WORKDIR%#${NGINX_WORKDIR}#g" "$DEFAULTCONF";
fi

exec "$@";
