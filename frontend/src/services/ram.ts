import { customFetchAuthorized } from './customFetch'
import * as Ram from './ram-types'

export function createRam() {
  let baseUrl = process.env.DUCK_URL

  if (process.server && process.env.DUCK_URL_SERVER) {
    baseUrl = process.env.DUCK_URL_SERVER
  }

  const instance = new Ram.Api({
    baseUrl,
  })

  const pub = instance.pub as any
  const methods: Record<string, boolean> = {}

  if (process.client) {
    for (const methodKey in pub) {
      if (methodKey in methods) {
        continue
      }

      const originalFunc = pub[methodKey]

      pub[methodKey] = function () {
        let cancelToken = Math.random().toString(16)

        if (!arguments[1]) {
          arguments[1] = {
            cancelToken,
          }
        } else {
          cancelToken = arguments[1]?.cancelToken || cancelToken
        }

        methods[methodKey] = true

        return Promise.race([
          originalFunc(...arguments),

          // eslint-disable-next-line promise/param-names
          new Promise((_, reject) => {
            setTimeout(() => {
              instance.abortRequest(cancelToken)
              reject(new Error('Timeout'))
            }, Number.parseInt(process.env.REQUEST_TIMEOUT))
          }),
        ])
      }
    }
  }

  return instance
}

const ram = createRam()

/**
 * Returns a Duck API wrapper.
 */
export function useRam() {
  // @ts-ignore
  ram.customFetch = customFetchAuthorized
  return ram
}
