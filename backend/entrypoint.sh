#!/bin/sh

echo "📦 Проверка .env файла..."
if [ ! -f .env ]; then
  echo "⚠️ .env не найден, генерируем..."
  node ./generate-env.js
else
  echo ".env уже существует, пропускаем генерацию ✅"
fi

echo "🚀 Запуск Strapi..."
exec yarn start