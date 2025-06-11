// /**
//  * question controller
//  */

import { factories } from '@strapi/strapi';
import  questionService  from '../services/question'

module.exports = factories.createCoreController('api::question.question', ({ strapi }) => ({

  // Поинт для пробных тестов
  async quiz(ctx) {
    try {
      const { certificate, regions, vessels } = ctx.request.body;

      // @ts-ignore
      const result = await questionService.getQuestions('quiz', { certificate, regions, vessels });
      return ctx.send(result);
    } catch (err) {
      console.error('❌ Ошибка запуска квиза:', err);
      ctx.throw(500, 'Ошибка запуска квиза');
    }
  },

  // Поинт для пробного экзамена
  async exam(ctx) {
    try {
      const { certificate, regions, vessels } = ctx.request.body;

      // @ts-ignore
      const result = await questionService.getQuestions('exam', { certificate, regions, vessels });

      const cleanerResult = {
        ...result,
        questions: result.questions.map(question => ({
          ...question,
          description: null,
          answers: question.answers?.map(({ is_correct, ...rest }) => rest) || null,
        }))
      };

      return ctx.send(cleanerResult);
    } catch (err) {
      console.error('❌ Ошибка запуска экзамена:', err);
      ctx.throw(500, 'Ошибка запуска экзамена');
    }
  },

  // Получить ответ
  async answer(ctx) {
    try {
      const { session, question, answer } = ctx.request.body;

      const result = await questionService.sendAnswer(session, question, answer);
      return ctx.send(result);
    } catch (err) {
      console.error('❌ Ошибка при отправке ответа:', err);
      ctx.throw(500, 'Ошибка отправки ответа');
    }
  },

  // Поинт для показа результата тестирования
  async launch(ctx) {
    try {
      const { session } = ctx.request.body;
      const result = await questionService.launchExam(session);
      return ctx.send(result);
    } catch (err) {
      console.error('❌ Ошибка завершения экзамена:', err);
      ctx.throw(500, 'Ошибка завершения экзамена');
    }
  },

  async info(ctx) {
    try {
      const { type, certificate, regions, vessels } = ctx.request.body;

      const result = await questionService.getInfo(type, certificate, regions, vessels);
      return ctx.send(result);
    } catch (err) {
      console.error('❌ Ошибка завершения экзамена:', err);
      ctx.throw(500, 'Ошибка завершения экзамена');
    }
  },

  // Поинт для показа результата тестирования
  async finish(ctx) {
    try {
      const { session } = ctx.request.body;
      const result = await questionService.finishExam(session);
      if (result.type === 'exam' && !result.success && !result.isTimer) {
        return ctx.send({ success: result.success, message: 'Время на экзамен истекло, вы не успели'});
      }

      return ctx.send(result);
    } catch (err) {
      console.error('❌ Ошибка завершения экзамена:', err);
      ctx.throw(500, 'Ошибка завершения экзамена');
    }
  },

  // Очистить выбранный ответ
  async clear(ctx) {
    try {
      const { session } = ctx.request.body;

      if (!session) {
        return ctx.badRequest('session обязателен');
      }

      await strapi.service('api::question.question').clearSession(session);

      return ctx.send({ message: 'Сессия очищена' });
    } catch (err) {
      console.error('❌ Ошибка при очистке сессии:', err);
      ctx.throw(500, 'Ошибка очистки');
    }
  },

}));