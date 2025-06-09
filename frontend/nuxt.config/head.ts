// const { VITE_API, HOST } = import.meta.env

const title = 'ОНЛАЙН ТРЕНАЖЕР ЭКЗАМЕНА ГИМС'
const description = 'Бесплатный ОНЛАЙН ТРЕНАЖЕР который поможет сдать экзамен гимс.'

// function addPreconnect(href: string) {
//   return [
//     { href, rel: 'preconnect', crossorigin: '' },
//     { href, rel: 'dns-prefetch' },
//   ]
// }

export const HEAD = {
  /**
   * Html tag attributes
   */
  htmlAttrs: { lang: 'ru' },

  /**
   * Title
   */
  title,

  /**
   * Meta.
   */
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'format-detection', name: 'format-detection', content: 'telephone=no' },
    { name: 'robots', content: 'max-image-preview:large, max-snippet:-1, max-video-preview:-1' },

    { hid: 'description', name: 'description', content: description },

    // Social base
    { hid: 'og:locale', property: 'og:locale', content: 'ru_RU' },
    { hid: 'og:site_name', property: 'og:site_name', content: 'ОНЛАЙН ТРЕНАЖЕР' },
    { hid: 'og:type', property: 'og:type', content: 'website' },

    // Social important
    { hid: 'og:description', property: 'og:description', content: description },
    { hid: 'og:title', property: 'og:title', content: title },
    { hid: 'og:url', property: 'og:url', content: 'https://vessels-manual.ru/' },

    // Favicons
    // { name: 'msapplication-TileColor', content: '#101010' },
    // { name: 'msapplication-config', content: '/favicon/browserconfig.xml?v=2' },
    { name: 'theme-color', content: '#101010' },
  ],

  /**
   * Link
   */
  link: [
    { hid: 'canonical', rel: 'canonical', href: 'https://vessels-manual.ru/' },

    // Favicons
    // { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png?v=2' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
    { rel: 'manifest', href: '/favicon/site.webmanifest' },
    // { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg?v=2', color: '#101010' },
    { rel: 'shortcut icon', href: '/favicon/favicon.ico' },

    // Resource hints: preconnect
    // ...(IS_PRODUCTION_MODE ? [...addPreconnect('//{host}')] : []),
    // ...addPreconnect(VITE_API),

    // Resource hints: dns-prefetch
  ],

  /**
   * Noscript
   */
  noscript: [
    {
      innerHTML:
        'К сожалению, сайт не работает без включенного JavaScript. Пожалуйста, включите JavaScript в настройках вашего браузера.',
    },
  ],

  /**
   * Script.
   */
  script: [],
}
