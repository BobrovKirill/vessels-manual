#!/bin/sh

echo "📦 Проверка .env файла..."
node ./generate-env.js

echo "🚀 Запуск Strapi..."
exec yarn run start