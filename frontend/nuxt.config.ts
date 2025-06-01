import { resolve } from 'node:path'
import { defineNuxtConfig } from 'nuxt/config'
import usePluginAutoImport from 'unplugin-auto-import/vite'
import svgLoader from 'vite-svg-loader'
import { envDefine } from './env'
import {
  BUILD_MODULES as buildModules,
  HEAD as head,
  MODULES as modules,
  ROUTER as router,
} from './nuxt.config/index'

// createRobots()

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  build: {
    extractCSS: false,
    extend(config: any) {
      config.module?.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      })
    },

    // cssModules: {
    //   modules: {
    //     localIdentName: IS_PRODUCTION_MODE ? '[hash:base64:5]' : '[path][name]__[local]',
    //   },
    // },

    transpile: ['maska'],
  },

  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false,
        global: true,
        extensions: ['vue'],
      },
    ],
  },

  css: ['~/assets/styles/global.scss'],

  vite: {
    define: envDefine,

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/styles/shared/_index.scss" as *;
          `,
        },
      },
    },

    plugins: [
      svgLoader(),

      usePluginAutoImport({
        imports: ['vue'],

        dts: resolve(__dirname, 'src/types', 'auto-imports.d.ts'),
      }),
    ],
  },

  // render: {
  //   bundleRenderer: {
  //     shouldPreload: (_file, type) => {
  //       return ['font', 'script', 'style'].includes(type)
  //     },
  //   },
  // },

  srcDir: 'src',

  buildModules,
  head,
  router,
  modules,
})
