import { useImageFormat } from '~/composables'

export default defineNuxtPlugin(async (context) => {
  useImageFormat()._initialize(context)
})
