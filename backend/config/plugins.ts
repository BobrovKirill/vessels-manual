// config/plugins.js
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 256 * 1024 * 1024, // 256MB
        localServer: {
          maxage: 300000 // Кэширование
        }
      }
    }
  }
});