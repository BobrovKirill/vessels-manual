import { v4 as uuidv4 } from 'uuid';

interface requestBody {
  certificate: boolean
    regions: string[]
    vessels: string[]
}

type UserAnswer = {
  id: number;
  answer: {
    id: number;
    is_correct: boolean;
  };
};

type Session = {
  type: 'quiz' | 'exam';
  questions: UserAnswer[];
  timer?: number;
  timeLimit: number;
};

const sessions: Record<string, Session> = {};

function getDataCounts({certificate, regions, vessels} : requestBody) {
  const regionCount = regions.length;
  const vesselCount = vessels.length;

  if (certificate && regionCount < 2 && vesselCount < 2) {
    return regionCount ? {questionsCount: 10, timeLimit: 15 } : vesselCount ? {questionsCount: 15, timeLimit: 20 } : null
  }

  const total = regionCount + vesselCount

  switch (true) {
    case total === 2:
      return { questionsCount: 25, timeLimit: 40 };
    case total >= 3 && total <= 6:
      return { questionsCount: 30, timeLimit: 40 };
    case total > 6:
      return { questionsCount: 35, timeLimit: 45 };
    default:
      return null;
  }
}

function isCorrectExamTime(startTime: number, examTime: number, endTime: number): boolean {
  console.log('startTime - ', startTime)
  console.log('examTime - ', examTime)
  console.log('endTime - ', endTime)
  return (endTime - startTime) <  examTime;
}

function shuffle(array) {
  const result = array.slice(); // создаем копию
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default {
  async getQuestions(type: 'quiz' | 'exam', requestBody: requestBody) {
    const dataCounts = getDataCounts(requestBody)
    if (dataCounts === null) {
      throw new Error(`Поля с типами регион и судно выбраны с ошибкой, отсутсвуют нужные поля`);
    }

    const { questionsCount, timeLimit } = dataCounts
    const allTypes = [...requestBody.regions, ...requestBody.vessels]
    const limit = Math.floor(questionsCount / allTypes.length)

    const allQuestions = await Promise.all(
      allTypes.map(type =>
        strapi.entityService.findMany('api::question.question', {
          // @ts-ignore
          filters: { type },
          populate: { answers: { fields: ['is_correct', 'text'] } },
          limit,
        })
      )
    );

    const shuffledQuestions = shuffle(allQuestions.flat());

    const sessionId = uuidv4();

    sessions[sessionId] = {
      type,
      questions: [],
      timeLimit: timeLimit * 60 * 1000
    };

    return { success: true, sessionId, questions: shuffledQuestions };
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
      return {  success: true, is_correct: answer.is_correct };
    } else {
      return { success: true };
    }
  },

  async launchExam(sessionId: string) {
    const session = sessions[sessionId];
    if (!session) throw new Error('Сессия не найдена');

    session.timer = Date.now();

    return { success: true };
  },

  async finishExam(sessionId: string) {
    const session = sessions[sessionId];
    const finishTime = Date.now();
    if (!session) throw new Error('Сессия не найдена');

    const currentQuestion = session.questions;
    const total = session.questions.length;
    const isCorrectTime = isCorrectExamTime(session.timer, finishTime, session.timeLimit);

    delete sessions[sessionId];

    return { type: session.type, currentQuestion, total, isTimer: isCorrectTime, success: isCorrectTime };
  },
};