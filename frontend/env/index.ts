import process from 'node:process'

const {
  MODE,
  API_URL,
  HOST_URL,
  BUILD_TIMESTAMP = Date.now(),
} = process.env

/**
 * Сихронизаци переменных окружения для доступа через import.meta.env без префикса VITE_
 * @see {@link https://vite.dev/config/shared-options.html#define}
 */
export default {
  'import.meta.env.MODE': JSON.stringify(MODE),
  'import.meta.env.API_URL': JSON.stringify(API_URL),
  'import.meta.env.HOST_URL': JSON.stringify(HOST_URL),
  'import.meta.env.BUILD_TIMESTAMP': JSON.stringify(BUILD_TIMESTAMP),
}
