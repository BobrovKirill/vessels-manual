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

const keyWordsForRootType: {type: rootQuestionType, words: string[]}[] = [
  { type: 'vessel', words: ["тип", "судна"] },
  { type: 'region', words: ["районы", "плавания"] },
]

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


export default factories.createCoreService('api::parser.parser', ({strapi}) => ({
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
  }
}));
