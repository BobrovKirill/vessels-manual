const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const generateKey = () => crypto.randomBytes(32).toString('hex');

const envPath = path.join(__dirname, '.env');

if (!fs.existsSync(envPath)) {
    const envContent = `
        APP_KEYS=${generateKey()},${generateKey()}
        API_TOKEN_SALT=${generateKey()}
        ADMIN_JWT_SECRET=${generateKey()}
        JWT_SECRET=${generateKey()}
        DATABASE_CLIENT=sqlite
        DATABASE_FILENAME=./data.db;
        `.trim()

    fs.writeFileSync(envPath, envContent, 'utf8');
    console.log('.env файл создан ✅');
} else {
    console.log('.env уже существует, не перезаписываю ⏭️');
}