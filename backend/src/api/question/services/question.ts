import { v4 as uuidv4 } from 'uuid';
import {fillingImgUrl} from "../../../tools/fillingImgUrl";

interface requestBody {
  certificate: boolean
    regions: string[]
    vessels: string[]
}

type UserAnswer = {
  id: number;
  description?: string;
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
  wrongLimit?: number;
};

const sessions: Record<string, Session> = {};
const timeForCleanSession = 8.64e7;

function getDataCounts({certificate, regions, vessels} : requestBody) {
  const regionCount = regions.length;
  const vesselCount = vessels.length;

  if (certificate && regionCount < 2 && vesselCount < 2) {
    return regionCount ? {questionsCount: 10, timeLimit: 15, wrongLimit: 1 } : vesselCount ? {questionsCount: 15, timeLimit: 20, wrongLimit: 1 } : null
  }

  const total = regionCount + vesselCount

  switch (true) {
    case total === 2:
      return { questionsCount: 25, timeLimit: 40, wrongLimit: 1 };
    case total >= 3 && total <= 6:
      return { questionsCount: 30, timeLimit: 40, wrongLimit: 2 };
    case total > 6:
      return { questionsCount: 35, timeLimit: 45, wrongLimit: 3 };
    default:
      return null;
  }
}

function isCorrectExamTime(startTime: number, examTime: number, endTime: number): boolean {
  return (endTime - startTime) <  examTime;
}

function shuffle(array) {
  const shufflerArray = array.slice();
  let currentIndex = shufflerArray.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [shufflerArray[currentIndex], shufflerArray[randomIndex]] = [shufflerArray[randomIndex], shufflerArray[currentIndex]];
  }
  return shufflerArray;
}

function createSession(id: number, type: Session["type"], timeLimit: number, wrongLimit: number) {
  sessions[id] = {
    type,
    questions: [],
    timeLimit: timeLimit * 60 * 1000,
    wrongLimit,
  };

  setTimeout(() => {
    if (sessions[id]) {
      delete sessions[id];
    }
  }, timeForCleanSession)
}

export default {
  async getQuestions(type: 'quiz' | 'exam', requestBody: requestBody) {
    const dataCounts = getDataCounts(requestBody)
    if (dataCounts === null) {
      throw new Error(`Поля с типами регион и судно выбраны с ошибкой, отсутсвуют нужные поля`);
    }

    const { questionsCount, timeLimit, wrongLimit } = dataCounts
    const allTypes = [...requestBody.regions, ...requestBody.vessels]
    const limit = Math.ceil(questionsCount / allTypes.length)

    const allQuestions = await Promise.all(
      allTypes.map(async type => {
          const questions = await strapi.entityService.findMany('api::question.question', {
          // @ts-ignore
          filters: { type },
          populate: { answers: { fields: ['is_correct', 'text'] }, image: true },
          limit,
        })

        return questions.map(question => ({
          ...question,
          // @ts-ignore
          image: question.image ? { ...question.image, url: fillingImgUrl(question.image.url) } : null,
        }))
        }
      )
    );

    const flatQuestions = allQuestions.flat().slice(0, questionsCount);
    const shuffledQuestions = shuffle(flatQuestions).map(question => ({
      ...question,
      answers: shuffle(question.answers)
    }));

    const session = uuidv4();

    createSession(session, type, timeLimit, wrongLimit);

    return { success: true, session, questions: shuffledQuestions, timeLimit, wrongLimit };
  },

  async sendAnswer(session: string, questionId: number, answerId: number) {
    const currentSession = sessions[session];
    if (!currentSession) throw new Error('Сессия не найдена');

    const question = await strapi.entityService.findOne('api::question.question', questionId, {
      populate: { answers: true }
    });

    if (!question) throw new Error('Вопрос не найден');

    // @ts-ignore
    const answer = question.answers?.find(asnwer => asnwer.id === Number(answerId));
    if (!answer) throw new Error('Ответ не найден');

    currentSession.questions.push({ id: questionId, description: question.description, answer: { id: answerId, is_correct: answer.is_correct } });

    if (currentSession.type === 'quiz') {
      return {  success: true, is_correct: answer.is_correct };
    } else {
      return { success: true };
    }
  },

  async launchExam(session: string) {
    const currentSession = sessions[session];
    if (!currentSession) throw new Error('Сессия не найдена');

    currentSession.timer = Date.now();

    return { success: true };
  },

  async getInfo(type: string, certificate: boolean, regions: any, vessels: any) {
    const data = getDataCounts({certificate, regions, vessels})

    return { success: true, ...data };
  },

  async finishExam(session: string) {
    const currentSession = sessions[session];
    const finishTime = Date.now();
    if (!currentSession) throw new Error('Сессия не найдена');

    const questions = currentSession.questions;
    const total = currentSession.questions.length;
    const wrongAnswerCount = questions.filter(
      (question) => question.answer && question.answer.is_correct === false
    ).length
    const wrongLimit = currentSession.wrongLimit
    const isPassedExam = wrongAnswerCount <= wrongLimit;
    const isCorrectTime = isCorrectExamTime(currentSession.timer, finishTime, currentSession.timeLimit);

    delete sessions[session];

    return { type: currentSession.type, questions, total, isTimer: isCorrectTime, wrongAnswer: wrongAnswerCount, wrongLimit, isPassedExam, success: isCorrectTime };
  },
};