/**
 * top question router
 */

import { factories } from '@strapi/strapi';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/quez',
      handler: 'top.quez',
      config: {
        auth: false,
      },
    },

    {
      method: 'GET',
      path: '/exam',
      handler: 'top.exam',
      config: {
        auth: false,
      },
    },
  ],
};