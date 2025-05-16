FROM node:18-slim AS build

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      build-essential \
      python3 \
      git \
      libvips-dev \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
ENV NODE_OPTIONS=--max_old_space_size=6144
RUN npm run build

FROM node:18-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends libvips-dev \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app ./

ENV NODE_ENV=production
EXPOSE 1337

CMD ["npm", "run", "start"]
