FROM node:22-alpine AS build

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM node:22-alpine AS runtime

RUN apk add --no-cache curl

WORKDIR /app
COPY --from=build /app/.output       ./.output
COPY --from=build /app/node_modules  ./node_modules
COPY --from=build /app/package*.json ./

COPY --from=build /app/.env.production .env.production

ENV NODE_ENV=production
EXPOSE 3000

CMD ["yarn", "start"]