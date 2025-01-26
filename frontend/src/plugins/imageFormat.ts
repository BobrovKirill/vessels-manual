import { useImageFormat } from '~/composables'
import { defineComponent } from 'vue'

export default defineNuxtPlugin(async (context) => {
  useImageFormat()._initialize(context)
})
