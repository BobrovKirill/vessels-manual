import { IS_PRODUCTION_MODE } from '../src/constants'
import type {NuxtConfig} from "@nuxt/schema";


export const BUILD_MODULES: NuxtConfig['modules'] = [
  '@nuxtjs/device',
  [
    '@nuxt/typescript-build',
    {
      typeCheck: {
        typescript: {
          enabled: true,
          mode: 'write-tsbuildinfo',
        },
      },
    },
  ],

  [
    '@nuxtjs/router',
    {
      fileName: 'router.ts',
      keepDefaultRouter: true,
    },
  ],

  '@nuxtjs/stylelint-module',


  [
    'nuxt-build-optimisations',
    {
      profile: IS_PRODUCTION_MODE ? 'safe' : 'experimental',
    },
  ],
  'nuxt-svg-loader',
]
