FROM node:18-bullseye-slim AS build

RUN apt-get update && apt-get install -y \
      build-essential python3 gcc autoconf automake \
      libvips-dev git curl rustc cargo \
    && rm -rf /var/lib/apt/lists/*
    
WORKDIR /app
COPY package*.json ./
RUN npm ci           

RUN npm rebuild @swc/core

COPY . .
ENV NODE_OPTIONS=--max_old_space_size=6144
RUN npm run build

FROM node:18-bullseye-slim
RUN apt-get update && apt-get install -y libvips-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=build /app /app

ENV NODE_ENV=production
EXPOSE 1337
CMD ["npm","run","start"]
