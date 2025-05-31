// import type { Context } from '@nuxt/types'
// import { defineStore } from 'pinia'
//
// export type ImageFormat = 'avif' | 'webp'
//
// export const IMAGE_FORMATS_DUMMIES: Record<ImageFormat, string> = {
//   avif: `data:image/avif;base64,AAAAFGZ0eXBhdmlmAAAAAG1pZjEAAACgbWV0YQAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAC8AAAAGwAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAARWlwcnAAAAAoaXBjbwAAABRpc3BlAAAAAAAAAAQAAAAEAAAADGF2MUOBAAAAAAAAFWlwbWEAAAAAAAAAAQABAgECAAAAI21kYXQSAAoIP8R8hAQ0BUAyDWeeUy0JG+QAACANEkA=`,
//   webp: 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=',
// }
//
// export const useImageFormat = defineStore('imageFormat', {
//   actions: {
//     _initialize(context: Context) {
//       // eslint-disable-next-line @typescript-eslint/no-this-alias
//       const self = this
//
//       for (const key in self.$state) {
//         const value = self.$state[key as ImageFormat]
//
//         if (value) {
//           continue
//         }
//
//         if (process.server) {
//           if (!context) {
//             continue
//           }
//
//           const input = context.req?.headers?.accept || ''
//
//           if (!input) {
//             continue
//           }
//
//           self.$state[key as ImageFormat] = input.includes(`image/${key}`)
//         }
//
//         if (!self.$state[key as ImageFormat] && process.client) {
//           ;(async function () {
//             await new Promise((resolve) => {
//               const image = new Image()
//               image.src = IMAGE_FORMATS_DUMMIES[key as ImageFormat]
//
//               image.onerror = () => {
//                 self.$state[key as ImageFormat] = false
//                 resolve(self.$state[key as ImageFormat])
//               }
//
//               image.onload = () => {
//                 self.$state[key as ImageFormat] = Boolean(image.height && image.width)
//                 resolve(self.$state[key as ImageFormat])
//               }
//             })
//           })()
//         }
//       }
//     },
//
//     isSupported(format: ImageFormat) {
//       return this.$state[format]
//     },
//   },
//
//   state: (): Record<ImageFormat, boolean> => ({
//     avif: false,
//     webp: false,
//   }),
// })
