FROM node:16.13.2-alpine

ARG FRONT_WORKDIR
ARG NUXT_PORT

# create destination directory
RUN mkdir -p /var/www/${FRONT_WORKDIR}
WORKDIR /var/www/${FRONT_WORKDIR}

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /var/www/${FRONT_WORKDIR}/
RUN npm install

# Build
RUN echo ${NUXT_PORT}
RUN npm run build

ENV HOST 0.0.0.0
EXPOSE 3000

#ENTRYPOINT [ "npm", "run", "test" ]
CMD [ "npm", "start" ]
#CMD [ "bash" ]
