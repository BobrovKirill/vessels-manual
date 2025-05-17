FROM node:20-alpine AS build

RUN apk add --no-cache \
    build-base \
    python3 \
    git \
    libpng-dev \
    zlib-dev \
    vips-dev \
    nasm \
    bash \
    autoconf \
    automake

WORKDIR /opt/app

COPY package.json yarn.lock ./
RUN npm install -g yarn node-gyp \
    && yarn config set network-timeout 600000 -g \
    && yarn install --frozen-lockfile

COPY . .
ENV NODE_OPTIONS="--max_old_space_size=6144"
RUN yarn build

FROM node:20-alpine
RUN apk add --no-cache vips-dev

WORKDIR /opt/app

COPY --from=build /opt/app ./

ENV NODE_ENV=production
EXPOSE 1337

CMD ["yarn", "start"]
