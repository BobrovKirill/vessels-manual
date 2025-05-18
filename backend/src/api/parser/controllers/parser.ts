/**
 * parser controller
 */

import { factories } from '@strapi/strapi'
const rootUrl = 'https://mchs.gov.ru/deyatelnost/attestaciya-i-akkreditaciya/attestaciya-sudovoditeley/voprosy-dlya-attestacii-sudovoditeley'

const mokUrl = 'https://mchs.gov.ru/deyatelnost/attestaciya-i-akkreditaciya/attestaciya-sudovoditeley/voprosy-dlya-attestacii-sudovoditeley/razdel-rayon-plavaniya/mp-plus'; // URL для парсинга


// TODO избавиться от any!!
export default factories.createCoreController('api::parser.parser' as any, ({strapi}) => ({

  async parse(ctx) {
    try {
      const body = await ctx.request.body;
      const { type } = body;

      if (!type) {
        return ctx.badRequest(`Missing type in request body`);
      }


      const allPdfLinksForType = await strapi.service('api::parser.parser').getUrlList(rootUrl, type);

      for (const pdfLink of allPdfLinksForType) {
        const parsedResult = await strapi.service('api::parser.parser').parsePdfFromUrl(pdfLink);
        await strapi.service('api::parser.parser').fillBD(parsedResult);
      }

      return ctx.send({ message: 'BD filled successfully', success: true }, 200);
    } catch (error) {
      console.error('Ошибка при парсинге и загрузке:', error);
      ctx.throw(500, 'Ошибка парсинга и загрузки BD');
    }
  },
}));
