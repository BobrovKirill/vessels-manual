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

    {
      method: 'GET',
      path: '/parser/filling-answers',
      handler: 'parser.fillingAnswers',
      config: {
        policies: ['global::is-super-admin'],
        type: 'content-api'
      },
    },

    {
      method: 'GET',
      path: '/parser/filling-description',
      handler: 'parser.fillingDescription',
      config: {
        policies: [],
        type: 'content-api'
      },
    },
  ]
}