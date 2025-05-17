FROM node:18-slim AS build

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      build-essential \
      python3 \
      git \
      libvips-dev \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci \
    && npm update @swc/core \
    && npm install --no-save @rollup/rollup-linux-x64-gnu

COPY . .
ENV NODE_OPTIONS=--max_old_space_size=6144
RUN npm run build \
    && npm prune --production

FROM node:18-slim AS runtime

RUN apt-get update \
 && apt-get install -y --no-install-recommends libvips-dev \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=build /app ./

ENV NODE_ENV=production
EXPOSE 1337

CMD ["npm", "run", "start"]
