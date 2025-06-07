/**
 * parser service
 */
import { factories } from '@strapi/strapi';
import {
  getParsedHtmlTableData,
  getPdfUrls,
  getUrlListByGroups
} from '../../../tools/parceHtml';
import {getHtmlUrl} from "../../../tools/pdf2html";
import {parseBase64Image} from "../../../tools/parceBase64";
import { Readable } from 'stream';

type rootQuestionType = 'vessel' | 'region'
type QuestionType = "vp" | "vvp" | "mp" | "motor" | "scooter" | "sail" | "special";
type Answer = {
  id: number;
  is_correct: boolean;
  text: string;
};

type QuestionWithAnswers = {
  id: number;
  documentId: string;
  text: string;
  answers: Answer[];
  type: "vp" | "vvp" | "mp" | "motor" | "scooter" | "sail" | "special";
};

const keyWordsForRootType: {type: rootQuestionType, words: string[]}[] = [
  { type: 'vessel', words: ["тип", "судна"] },
  { type: 'region', words: ["районы", "плавания"] },
]

const models = {
  'openrouter': {
    url: 'https://openrouter.ai/api/v1/chat/completions',
    apiKey: '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',
    model: 'deepseek/deepseek-chat-v3-0324:free'
  },
  'deepseek': {
    url: 'https://api.deepseek.com/v1/chat/completions',
    apiKey: 'sk-1e01ae90da8146cb9bf5b84efb61b8d9',
    model: 'deepseek-chat'
  },
  'deepseek2': {
    url: 'https://deepseekapiio.erweima.ai/api/v1/chat/completions',
    apiKey: 'd448af6225a843a7de867c4aeb7f5e62',
    model: 'DeepSeek-R1'
  },
  'gemini': {
    url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBa6yNdZjkzttXqTvzlRG96nwnxhLMDBuM',
  }
}


const questionSizeForPrompt = 30;

const keyWordsForType: Record<rootQuestionType, { type: QuestionType; words: string[] }[]> = {
  vessel : [
    {
      type: 'motor',
      words: ["маломерное", "моторное", "судно"]
    },
    {
      type: 'sail',
      words: ["маломерное", "парусное", "судно"]
    },
    {
      type: 'special',
      words: ["судно", "особой", "конструкции"]
    },
    {
      type: 'scooter',
      words: ["гидроцикл"]
    },
  ],

  region : [
    {
      type: 'vp',
      words: ["вп"]
    },
    {
      type: 'vvp',
      words: ["ввп"]
    },
    {
      type: 'mp',
      words: ["мп"]
    },
  ]
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function aiGenerateWrongAnswers(questions, model) {
    const prompt = `
  Ты — помощник, генерирующий неправильные ответы. Для каждого вопроса из списка с правильными ответами сгенерируй 3 неправдоподобных, но реалистичных неправильных ответа. Не повторяй правильные.
  
  Формат ответа:
  
  [
    {
      "id": 123,
      "wrongAnswers": ["...", "...", "..."]
    },
    ...
  ]
  
  Вот список вопросов:
  ${JSON.stringify(questions, null, 2)}
  `;

  if (model === 'gemini') {
     const response = await fetch(models[model].url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("Gemini response does not contain valid text output.");
    }

    return JSON.parse(text.replace(/```json\s*/, '').replace(/\s*```/, '').trim());
  } else {
     const response = await fetch(models[model].url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${models[model].apiKey}`
      },
      body: JSON.stringify({
        model: models[model].model,
        messages: [
          { role: 'system', content: 'Ты помогаешь создавать варианты ответов для экзамена.' },
          { role: "user", content: prompt }
        ]
      })
    });

    const result = await response.json();
    const text = result.choices[0].message.content
    if (!text) {
      throw new Error(`${model} response does not contain valid text output.`);
    }

    return JSON.parse(text.replace(/```json\s*/, '').replace(/\s*```/, '').trim());
  }
}

async function uploadImageToStrapi(file) {
  try {
    const uploadService = strapi.plugin('upload').service('upload');
    const uploadedFiles = await uploadService.upload({
      data: {},
      files: {
        filepath: file.buffer,
        stream: Readable.from(file.buffer), // Используем Readable поток
        filename: file.name,               // Обязательное поле
        name: file.name,
        mimetype: file.mime,               // Корректный MIME-тип
        size: file.buffer.length,          // Размер файла в байтах
      }
    });

    return uploadedFiles?.[0]?.id;
  } catch (e) {
    strapi.log.error('File upload failed:', e);
    throw e;
  }
}


export default factories.createCoreService('api::parser.parser' as any, ({strapi}) => ({
  async parsePdfFromUrl(data: { type: QuestionType, urls: string[] }) {
    try {
      // !! Временно обрезаем ссылки на все пдф, чтоб не загружать парсер
      data.urls = data.urls.slice(0, 1); // <--- На проде убрать


      const parsedData: any[] = [];

      for (const url of data.urls) {
        try {
          const htmlUrl = await getHtmlUrl(url);
          const parsed = await getParsedHtmlTableData(htmlUrl);
          parsedData.push(parsed);
        } catch (err) {
          console.error(`Ошибка при обработке ${data.type} → ${url}:`, err);
        }
      }

      strapi.log.info(`Список ссылок сформирован для - ${data.type}`);
      return { type: data.type, data: parsedData};
    } catch (error) {
      strapi.log.error(`Ошибка при сформировании ссылок для - ${data.type}`, error);
      throw new Error(`Ошибка при сформировании ссылок для - ${data.type}`);
    }
  },

  async getUrlList(rootUrl: string, type: QuestionType) {
    try {
      const rootTypeUrls = await getUrlListByGroups(rootUrl, keyWordsForRootType)
      const currentTypeUrls = await getUrlListByGroups(rootTypeUrls[type], keyWordsForType[type])
      if (!Object.keys(currentTypeUrls).length) {
        throw new Error(`Не удалось извлечь ссылки страницы для типа - ${type}, массив пуст`);
      }

      const finallyAllUrls = await Promise.all(
        Object.entries(currentTypeUrls).map(([type, url]) => getPdfUrls(url, type))
      );

      return finallyAllUrls
    } catch (error) {
      strapi.log.error(`Ошибка при парсинге ссылок для типа - ${type}`, error);
      throw new Error(`Не удалось извлечь ссылки страницы для типа - ${type}`);
    }
  },

  async fillBD(data: { type: QuestionType, data: any[] }) {
    try {
      for (const item of data.data) {
        for (const question of item) {
          const file = parseBase64Image(question.image);
          const imageId = file ? await uploadImageToStrapi(file) : null;

          // Создание вопроса
          const createdQuestion = await strapi.entityService.create('api::question.question', {
            data: {
              text: question.question,
              image: imageId,
              type: data.type,
            },
          });

          // Создание ответа и привязка к вопросу
          await strapi.entityService.create('api::answer.answer', {
            data: {
              text: question.answer,
              question: createdQuestion.id,
              is_correct: true
            },
          });
        }
      }
      strapi.log.info(`${data.type} - записан в базу`);
    } catch (error) {
      strapi.log.error(`Ошибка при записи в базу данных для типа - ${data.type}`, error);
      throw new Error(`Не удалось данные в базу данных для типа - ${data.type}`);
    }
  },

  async createWrongAnswers() {
    const questions = await strapi.entityService.findMany('api::question.question', {
      populate: ['answers'],
    })

    // questions = questions.slice(0, 1)
    const typedQuestions = questions as unknown as QuestionWithAnswers[];
    const questionsToProcess = typedQuestions.filter(q => q.answers.length <= 1);

    for (let i = 0; i < questionsToProcess.length; i += questionSizeForPrompt) {
      const batch = questionsToProcess.slice(i, i + questionSizeForPrompt);

      const aiInput = batch.map(question => ({
        id: question.id,
        text: question.text,
        correctAnswers: question.answers.filter(a => a.is_correct).map(a => a.text),
      }));

      let aiResponse: { id: number; wrongAnswers: string[] }[] = [];

      try {
        aiResponse = await aiGenerateWrongAnswers(aiInput, 'gemini');
      } catch (err) {
        console.warn(`Deepseek failed, trying Lima. Error: ${err.message}`);
        try {
          aiResponse = await aiGenerateWrongAnswers(aiInput, 'openrouter');
        } catch (err2) {
          console.error(`Both models failed: ${err2.message}`);
          continue;
        }
      }

      for (const { id, wrongAnswers } of aiResponse) {
        for (const text of wrongAnswers) {
          await strapi.entityService.create('api::answer.answer', {
            data: {
              is_correct: false,
              text,
              question: id,
            },
          });
        }

        console.log(`✅ Заполнили ${wrongAnswers.length} ответов для вопроса ${id}`);
      }

      await sleep(2000);
    }
  }
}));
