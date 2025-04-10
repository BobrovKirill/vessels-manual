module.exports = {
  routes: [
    {
      "method": "GET",
      "path": "/questions/quiz",
      "handler": "question.quiz",
      "config": {
        "policies": [],
        "middlewares": [],
        "type": 'content-api'
      }
    },
    {
      "method": "GET",
      "path": "/questions/exam",
      "handler": "question.exam",
      "config": {
        "policies": [],
        "middlewares": [],
        "type": 'content-api'
      }
    },
    {
      "method": "POST",
      "path": "/questions/answer",
      "handler": "question.answer",
      "config": {
        "policies": [],
        "middlewares": []
      }
    },
    {
      "method": "POST",
      "path": "/questions/finish",
      "handler": "question.finish",
      "config": {
        "policies": [],
        "middlewares": [],
        "type": 'content-api'
      }
    }
  ]
}