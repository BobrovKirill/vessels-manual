/**
 * top question router
 */

import { factories } from '@strapi/strapi';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/top',
      handler: 'question.topTen',
      config: {
        auth: false,
      },
    },
  ],
};