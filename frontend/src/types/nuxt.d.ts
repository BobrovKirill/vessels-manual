import type { Context } from '@nuxt/types'
import type { Route } from 'vue-router'
import {Ref} from "vue";

/**
 * Duplicate unexported UseContextReturn from
 * @nuxtjs/composition-api/dist/runtime/index.d.ts
 */
export interface UseContextReturn extends Omit<Context, 'route' | 'query' | 'from' | 'params'> {
  route: Ref<Route>
  query: Ref<Route['query']>
  from: Ref<Context['from']>
  params: Ref<Route['params']>
}

declare module '@nuxt/types' {
  interface Context {
    $adfoxLoader: any
    $amberData: any
    $googleGtag: any
    $ioAnalytics: any
    $liveInternet: any
    $mailRu: any
    $page: any
    $yandexMetrika: any
  }

  interface NuxtAppOptions {
    $adfoxLoader: any
    $amberData: any
    $googleGtag: any
    $ioAnalytics: any
    $liveInternet: any
    $mailRu: any
    $page: any
    $yandexMetrika: any
  }
}

declare module '@nuxt/types/app' {
  interface NuxtApp {
    $adfoxLoader: any
    $amberData: any
    $googleGtag: any
    $ioAnalytics: any
    $liveInternet: any
    $mailRu: any
    $page: any
    $yandexMetrika: any
  }
}

declare module '@nuxt/types/config/index' {
  interface NuxtOptions {
    $adfoxLoader: any
    $amberData: any
    $googleGtag: any
    $ioAnalytics: any
    $liveInternet: any
    $mailRu: any
    $page: any
    $yandexMetrika: any
  }
}
