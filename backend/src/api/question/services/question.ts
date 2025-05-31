import { v4 as uuidv4 } from 'uuid';

const sessions: Record<string, {
  type: 'quiz' | 'exam',
  questions: Array<{ id: number, answer: { id: number, is_correct: boolean } }>,
  category: string
}> = {};

export default {
  async getQuestions(type: 'quiz' | 'exam', category: string) {
    const questions = await strapi.entityService.findMany('api::question.question', {
      // @ts-ignore
      filters: { type: category },
      populate: { answers: { fields: ['is_correct', 'text'] } },
      limit: 25,
    });

    const sessionId = uuidv4();

    sessions[sessionId] = {
      type,
      questions: [],
      category
    };

    return { sessionId, questions };
  },

  async sendAnswer(sessionId: string, questionId: number, answerId: number) {
    const session = sessions[sessionId];
    if (!session) throw new Error('Сессия не найдена');

    const question = await strapi.entityService.findOne('api::question.question', questionId, {
      populate: { answers: true }
    });
    if (!question) throw new Error('Вопрос не найден');

    // @ts-ignore
    const answer = question.answers?.find(asnwer => asnwer.id === Number(answerId));
    if (!answer) throw new Error('Ответ не найден');

    session.questions.push({ id: questionId, answer: { id: answerId, is_correct: answer.is_correct } });

    if (session.type === 'quiz') {
      return { is_correct: answer.is_correct };
    } else {
      return { success: true };
    }
  },

  async finishExam(sessionId: string) {
    const session = sessions[sessionId];
    if (!session) throw new Error('Сессия не найдена');

    const currentQuestion = session.questions;
    const total = session.questions.length;

    delete sessions[sessionId];

    return { currentQuestion, total };
  },
};