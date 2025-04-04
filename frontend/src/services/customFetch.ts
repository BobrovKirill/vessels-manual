import { useUser } from '~/composables/user'
import { createRam } from './ram'

export async function customFetchAuthorized(input: RequestInfo, init?: RequestInit) {
  const user = useUser()
  const headers: Record<string, string> = (init?.headers as Record<string, string>) || {}

  if (user.isAuthorized) {
    headers.Authorization = `Bearer ${user.jwt.accessToken}`
  }

  try {
    return fetch(input, init).then(async (response) => {
      // Pass any HTTP status except Unauthorized (401)
      if (response.status !== 401) {
        return response
      }

      // Pass only Unauthorized (401) status and state WITHOUT access tokens
      if (!user.isAuthorized) {
        return response
      }

      // Otherwise pass only Unauthorized (401) status and state WITH access tokens...

      const ram = createRam() // ! Creating a new instance of duck to not conflict with the main one.

      // ...And then refresh access tokens
      const { data } = await ram.auth.refreshAccessToken({ refreshToken: user.jwt.refreshToken }, { headers })

      user.jwt = {
        accessToken: data.token || '',
        refreshToken: data.refreshToken || '',
      }

      headers.Authorization = `Bearer ${user.jwt.accessToken}`

      if (process.env.ANTIDDOSKEY && process.server) {
        headers.antiddoskey = process.env.ANTIDDOSKEY
      }

      user.info = await user.getCurrentInfo()
      user.syncCookies()

      if (init) {
        init.credentials = 'include'
      }

      return fetch(input, init)
    })
  } catch (error) {
    return error as Response
  }
}
