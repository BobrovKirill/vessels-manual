module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/parser/parse',
      handler: 'parser.parse',
      config: {
        policies: ['global::is-super-admin'],
        type: 'content-api'
      },
    },
  ]
}