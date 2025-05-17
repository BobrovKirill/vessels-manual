FROM node:22-alpine AS build

RUN apk update \
 && apk add --no-cache \
      build-base \
      gcc \
      autoconf \
      automake \
      zlib-dev \
      libpng-dev \
      vips-dev \
      git > /dev/null 2>&1

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/

COPY package.json yarn.lock ./
RUN yarn global add node-gyp \
 && yarn config set network-timeout 600000 -g \
 && yarn install --production

ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .
RUN yarn build

FROM node:22-alpine
RUN apk add --no-cache vips-dev

WORKDIR /opt/app

COPY --from=build /opt/node_modules ./node_modules
COPY --from=build /opt/app ./

RUN chown -R node:node /opt/app
USER node

ENV NODE_ENV=production
EXPOSE 1337

CMD ["yarn", "start"]
