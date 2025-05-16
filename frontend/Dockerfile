FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app
COPY --from=build /app/.output       ./.output
COPY --from=build /app/node_modules  ./node_modules
COPY --from=build /app/package*.json ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
