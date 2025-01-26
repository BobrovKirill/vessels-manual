const { NODE_ENV = 'development' } = process.env
const generalEnv = require('./env')
const currentEnv = require(`./env.${NODE_ENV}`)
let localDev = {}

// Try to get local development config
if (NODE_ENV === 'development') {
  try {
    localDev = require(`./env.${NODE_ENV}.local`)
  } catch {}
}

export default {
  ...generalEnv,
  ...process.env,
  ...currentEnv,
  ...localDev,
}
