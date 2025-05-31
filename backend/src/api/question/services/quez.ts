// import { factories } from '@strapi/strapi';
//
// module.exports = factories.createCoreService('api::question.question', ({ strapi }) => ({
//   async getRandomQuestions(type = '') {
//     const questions = await strapi.entityService.findMany('api::question.question', {
//       filters: { type },
//       populate: {
//         answers: {
//           fields: ['is_correct', 'text', 'comment'],
//         },
//       },
//     });
//
//     const shuffled = questions.sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, 10);
//   },
//
//   async getQuestionByAnswer(answerId) {
//     const answer = await strapi.entityService.findOne('api::answer.answer', answerId, {
//       populate: { question: true },
//     });
//
//     if (!answer || !('question' in answer) || !answer.question) {
//       throw new Error('Вопрос не найден');
//     }
//
//     const question = await strapi.entityService.findOne('api::question.question', answer.question.id, {
//       populate: {
//         answers: {
//           fields: ['text', 'is_correct'],
//         },
//       },
//     });
//
//     return question;
//   }
// }));