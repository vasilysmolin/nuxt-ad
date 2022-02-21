FROM nginx:stable-alpine

ARG DOMAIN_HOME
ARG JOBS
ARG HUB
ARG ENV
ARG NGINX_WORKDIR
ARG FRONT_WORKDIR
ARG NUXT_PORT

COPY /home.conf /etc/nginx/conf.d/
COPY /jobs.conf /etc/nginx/conf.d/
COPY /hub.conf /etc/nginx/conf.d/
COPY /default.conf /etc/nginx/conf.d/

ENV DOMAIN_HOME=${DOMAIN_HOME}
ENV JOBS=${JOBS}
ENV HUB=${HUB}
ENV ENV=${ENV}
ENV NGINX_WORKDIR=${NGINX_WORKDIR}
ENV FRONT_WORKDIR=${FRONT_WORKDIR}
ENV NUXT_PORT=${NUXT_PORT}

RUN echo ${DOMAIN_HOME}

RUN apk update \
    && apk add openssl \
    && mkdir /etc/nginx/ssl \
    && openssl req -x509 -nodes -days 365 \
        -subj '/C=CA/ST=QC/O=Company, Inc./CN=${DOMAIN_HOME}' \
        -addext 'subjectAltName=DNS:'${DOMAIN_HOME} \
        -newkey rsa:4096 \
        -keyout /etc/nginx/ssl/${DOMAIN_HOME}.key -out /etc/nginx/ssl/${DOMAIN_HOME}.crt

RUN mkdir -p /var/lib/nginx/cache \
    && chmod 700 /var/lib/nginx/cache

COPY /nginx.conf /etc/nginx/
COPY /ssl /etc/nginx/ssl/
COPY /nginx-entrypoint.sh /nginx-entrypoint.sh

RUN chmod +x /nginx-entrypoint.sh

ENTRYPOINT ["sh", "/nginx-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]

