FROM node:18-alpine AS build

RUN apk add --no-cache build-base python3 gcc autoconf automake zlib-dev libpng-dev vips-dev git

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

COPY . .
ENV NODE_OPTIONS=--max_old_space_size=2048
RUN npm run build

FROM node:18-alpine
RUN apk add --no-cache vips-dev

WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/. ./ 

ENV NODE_ENV=production
EXPOSE 1337

CMD ["npm", "run", "start"]
