FROM node:18-bullseye-slim AS build

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      build-essential \
      python3 \
      git \
      libvips-dev \
      curl \
      ca-certificates \
      pkg-config \
      clang \
      libssl-dev \
    && rm -rf /var/lib/apt/lists/*

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps

COPY . .
ENV NODE_OPTIONS="--max_old_space_size=6144"
RUN npm run build

FROM node:18-bullseye-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends libvips-dev && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=build /app /app

ENV NODE_ENV=production
EXPOSE 1337
CMD ["npm", "run", "start"]
