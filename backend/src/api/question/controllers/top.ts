const { factories } = require('@strapi/strapi');

module.exports = factories.createCoreController('api::question.question', ({ strapi }) => ({
  async quez(ctx) {
    console.log('topTen', ctx.query);
    try {
      const questions = await strapi.entityService.findMany('api::question.question', {
        populate: {
          answers: {
            fields: ['is_correct', 'text', 'comment'],
          }
        },
        sort: { createdAt: 'desc' }, // Сортируем по дате создания (сначала новые)
        limit: 10, // Ограничиваем результат 10 вопросами
      });

      return ctx.send(questions);
    } catch (err) {
      ctx.throw(500, 'Ошибка при получении топ-10 вопросов');
    }
  },

  async exam(ctx) {
    console.log('topTen', ctx.query);
    try {
      const questions = await strapi.entityService.findMany('api::question.question', {
        populate: {
          answers: {
            fields: ['text'],
          }
        },
        sort: { createdAt: 'desc' }, // Сортируем по дате создания (сначала новые)
        limit: 10, // Ограничиваем результат 10 вопросами
      });

      return ctx.send(questions);
    } catch (err) {
      ctx.throw(500, 'Ошибка при получении топ-10 вопросов');
    }
  },
}));
