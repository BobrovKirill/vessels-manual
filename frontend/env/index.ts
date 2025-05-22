import process from 'node:process'

export const envDefine = {
  'import.meta.env.MODE': JSON.stringify(process.env.MODE || 'development'),
  'import.meta.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:1337/api'),
  'import.meta.env.API_URL_SERVER': JSON.stringify(process.env.API_URL_SERVER || 'http://localhost:1337'),
  'import.meta.env.HOST_URL': JSON.stringify(process.env.HOST_URL || 'http://localhost:3000'),
  'import.meta.env.BUILD_TIMESTAMP': JSON.stringify(process.env.BUILD_TIMESTAMP || Date.now().toString()),
}
