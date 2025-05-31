const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const dbPath = isProd ? '/database/strapi.db' : '.tmp/data.db';

const generateKey = () => crypto.randomBytes(32).toString('hex');

const envPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath)) {
    const envContent = `
        HOST=0.0.0.0
        PORT=1337
        DATABASE_CLIENT=sqlite
        DATABASE_PATH=${dbPath}
        APP_KEYS=${generateKey()},${generateKey()}
        API_TOKEN_SALT=${generateKey()}
        ADMIN_JWT_SECRET=${generateKey()}
        JWT_SECRET=${generateKey()}
        `.trim()

    fs.writeFileSync(envPath, envContent, 'utf8');
    console.log('.env файл создан ✅');
} else {
    console.log('.env уже существует, не перезаписываю ⏭️');
}