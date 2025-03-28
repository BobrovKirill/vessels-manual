/**
 * question controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::question.question', ({strapi}) => ({
  async find(ctx) {
    console.log(ctx.query)
    const {meta, data} = await super.find(ctx);

    return {meta, data}
  },

  async topTen(ctx) {
    try {
      const questions = await strapi.entityService.findMany('api::question.question', {
        populate: ['answers'], // Загружаем связанные ответы
        sort: { createdAt: 'desc' }, // Сортируем по дате создания (сначала новые)
        limit: 10, // Ограничиваем результат 10 вопросами
      });

      const sanitizedQuestions = questions.map(question => ({
        ...question,
        answers: question.answers.map(({ is_correct, comment, ...rest }) => rest), // Убираем `correct`
      }));

      return ctx.send(sanitizedQuestions);
    } catch (err) {
      ctx.throw(500, 'Ошибка при получении топ-10 вопросов');
    }
  },
}));

//    "region_type": {
//      "type": "relation",
//      "relation": "manyToOne",
//      "target": "api::region-type.region-type",
//      "inversedBy": "questions"
//    },
//    "watercraft_type": {
//      "type": "relation",
//      "relation": "manyToOne",
//      "target": "api::watercraft-type.watercraft-type",
//      "inversedBy": "questions"
//    }