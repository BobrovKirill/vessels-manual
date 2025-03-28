import type { NuxtConfig } from '@nuxt/schema'
import { BREAKPOINTS } from '../src/constants'

export const MODULES: NuxtConfig['modules'] = [
  '@pinia/nuxt',

  /**
   * DayJS.
   * @see {@link https://nuxt.com/modules/dayjs}
   */
  ['dayjs-nuxt', {
    defaultLocale: 'ru',
    defaultTimezone: 'Europe/Moscow',
    locales: ['ru'],
    plugins: ['customParseFormat', 'duration', 'relativeTime', 'timezone', 'utc'],
  }],

  /**
   * Viewport.
   * @see {@link https://github.com/mvrlin/nuxt-viewport}
   */
  [
    'nuxt-viewport',
    {
      breakpoints: BREAKPOINTS,

      defaultBreakpoints: {
        desktop: 'desktopMedium',
        mobile: 'mobile',
        tablet: 'tablet',
      },

      fallbackBreakpoint: 'desktopMedium',
    },
  ],
]
