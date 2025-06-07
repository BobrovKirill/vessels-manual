module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/parser/parse',
      handler: 'parser.parse',
      config: {
        policies: ['global::is-super-admin'],
        type: 'admin'
      },
    },

    {
      method: 'GET',
      path: '/parser/filling',
      handler: 'parser.filling',
      config: {
        policies: ['global::is-super-admin'],
        type: 'content-api'
      },
    },
  ]
}