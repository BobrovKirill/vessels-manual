module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/parser/parse',
      handler: 'parser.parse',
      config: {
        auth: true,
        policies: ['global::is-super-admin'],
        middlewares: [],
        type: 'content-api'
      },
    },
  ]
}