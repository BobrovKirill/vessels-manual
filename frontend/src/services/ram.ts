interface CustomFetchOptions<T> {
  query?: Record<string, any>
  body?: any
  headers?: HeadersInit
  credentials?: RequestCredentials
  server?: boolean
  lazy?: boolean
  default?: () => T
}

function getBaseURL() {
  const API_URL = import.meta.env.API_URL || null
  const API_URL_SERVER = import.meta.env.API_URL_SERVER || ''
  const isServer = import.meta.server

  return isServer && API_URL_SERVER ? API_URL_SERVER : API_URL
}

export async function useRam<T>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  options: CustomFetchOptions<T> = {},
) {
  // const user = useUser()
  const user = { isAuthorized: false, jwt: { accessToken: '' } }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (user.isAuthorized) {
    headers.Authorization = `Bearer ${user.jwt.accessToken}`
  }

  const baseURL = getBaseURL() || ''

  try {
    const data: T = await $fetch(path, {
      method,
      baseURL,
      query: options.query,
      body: options.body,
      headers,
      credentials: options.credentials || 'include',
    })

    return { data, error: null }
  } catch (error: any) {
    if (error?.response?.status === 401 && user.isAuthorized) {
      try {
        // const { data: newTokens } = await ram.auth.refreshAccessToken(...)
        const newTokens = { token: '', refreshToken: '' }

        user.jwt = {
          accessToken: newTokens.token || '',
          refreshToken: newTokens.refreshToken || '',
        }

        headers.Authorization = `Bearer ${user.jwt.accessToken}`

        const retryData: T = await $fetch(path, {
          method,
          baseURL,
          query: options.query,
          body: options.body,
          headers,
          credentials: options.credentials || 'include',
        })

        return { data: retryData, error: null }
      } catch (retryError) {
        console.error('Token refresh error', retryError)
        return { data: null, error: retryError }
      }
    }

    console.error('🔴 Request error', error)
    return { data: null, error }
  }
}
