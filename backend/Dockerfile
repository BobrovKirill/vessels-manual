FROM node:18-slim AS build

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      build-essential \
      python3 \
      git \
      libvips-dev \
 && npm install -g yarn \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
ENV NODE_OPTIONS=--max_old_space_size=6144
RUN yarn build

RUN yarn install --production --ignore-scripts

FROM node:18-slim AS runtime

RUN apt-get update \
 && apt-get install -y --no-install-recommends libvips-dev \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=build /app ./

ENV NODE_ENV=production
EXPOSE 1337

CMD ["yarn", "start"]
