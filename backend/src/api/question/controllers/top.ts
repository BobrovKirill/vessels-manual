// const { createCoreController } = require('@strapi/strapi').factories;
//
// module.exports = createCoreController('api::question.top', ({ strapi }) => ({
//   async topTen(ctx) {
//     console.log('topTen', ctx);
//     try {
//       const questions = await strapi.entityService.findMany('api::question.question', {
//         populate: ['answers'], // Загружаем связанные ответы
//         sort: { createdAt: 'desc' }, // Сортируем по дате создания (сначала новые)
//         limit: 10, // Ограничиваем результат 10 вопросами
//       });
//
//       return ctx.send(questions);
//     } catch (err) {
//       ctx.throw(500, 'Ошибка при получении топ-10 вопросов');
//     }
//   },
// }));