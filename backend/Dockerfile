FROM node:18-bullseye-slim AS build

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      build-essential \
      python3 \
      libvips-dev \
      git && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

COPY . .
ENV NODE_OPTIONS=--max_old_space_size=6144
RUN npm run build

FROM node:18-bullseye-slim
RUN apt-get update && \
    apt-get install -y --no-install-recommends libvips-dev && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/. .

ENV NODE_ENV=production
EXPOSE 1337

CMD ["npm", "run", "start"]
