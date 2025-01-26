import {
  BUILD_MODULES as buildModules,
  HEAD as head,
  PLUGINS as plugins,
  ROUTER as router,
} from './nuxt.config/index'

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

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  css: ['~/assets/styles/global.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/styles/shared/_index.scss" as *;
          `,
        },
      },
    },
  },


  // render: {
  //   bundleRenderer: {
  //     shouldPreload: (_file, type) => {
  //       return ['font', 'script', 'style'].includes(type)
  //     },
  //   },
  // },

  svgLoader: {
    svgoConfig: {
      plugins: [{ mergePaths: false }],
    },
  },

  srcDir: 'src',

  modules: ['@pinia/nuxt'],
  buildModules,
  head,
  plugins,
  router,

})
