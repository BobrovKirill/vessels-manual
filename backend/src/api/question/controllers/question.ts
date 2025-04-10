// /**
//  * question controller
//  */

import { factories } from '@strapi/strapi';
import  questionService  from '../services/question'

module.exports = factories.createCoreController('api::question.question', ({ strapi }) => ({

  async quiz(ctx) {
    try {
      const { category } = ctx.query;

      // @ts-ignore
      const result = await questionService.getQuestions('quiz', category);
      return ctx.send(result);
    } catch (err) {
      console.error('❌ Ошибка запуска квиза:', err);
      ctx.throw(500, 'Ошибка запуска квиза');
    }
  },

  async exam(ctx) {
    try {
      const { category = ''} = ctx.query;
      // @ts-ignore
      const result = await questionService.getQuestions('exam', category);
      return ctx.send(result);
    } catch (err) {
      console.error('❌ Ошибка запуска экзамена:', err);
      ctx.throw(500, 'Ошибка запуска экзамена');
    }
  },

  async answer(ctx) {
    try {
      const { session, question, answer } = ctx.request.body;
      console.log(question);
      const result = await questionService.sendAnswer(session, question, answer);
      return ctx.send(result);
    } catch (err) {
      console.error('❌ Ошибка при отправке ответа:', err);
      ctx.throw(500, 'Ошибка отправки ответа');
    }
  },

  async finish(ctx) {
    try {
      const { sessionId } = ctx.request.body;
      const result = await questionService.finishExam(sessionId);
      return ctx.send(result);
    } catch (err) {
      console.error('❌ Ошибка завершения экзамена:', err);
      ctx.throw(500, 'Ошибка завершения экзамена');
    }
  },

  // Очистить выбранный ответ
  async clear(ctx) {
    try {
      const { sessionId } = ctx.request.body;

      if (!sessionId) {
        return ctx.badRequest('sessionId обязателен');
      }

      await strapi.service('api::question.question').clearSession(sessionId);

      return ctx.send({ message: 'Сессия очищена' });
    } catch (err) {
      console.error('❌ Ошибка при очистке сессии:', err);
      ctx.throw(500, 'Ошибка очистки');
    }
  },

}));