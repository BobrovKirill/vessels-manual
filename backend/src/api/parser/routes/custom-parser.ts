module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/parser/parse',
      handler: 'parser.parse',
      config: {
        auth: false, // можно true если хочешь только для авторизованных
        policies: [],
        middlewares: [],
        type: 'content-api'
      },
    },
  ]
}