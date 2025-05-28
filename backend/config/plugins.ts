// config/plugins.js
module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'local',
      sizeLimit: 256 * 1024 * 1024,
      providerOptions: {
        localServer: {
          maxage: 300000
        }
      }
    }
  }
});