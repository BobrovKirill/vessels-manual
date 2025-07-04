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

  console.log('import.meta', import.meta)
  console.log('import.meta.env', import.meta.env)
  const baseUrl = getBaseURL()

  const fetchOptions = {
    method,
    baseURL: baseUrl || 'http://localhost:1337/api',
    query: options.query,
    body: options.body,
    headers,
    credentials: options.credentials || 'include',
    server: options.server ?? true,
    lazy: options.lazy ?? false,
    default: options.default,
  }

  const { data, error, refresh } = await useFetch(path, fetchOptions)

  // Если всё нормально — возвращаем сразу
  if (!error.value || error.value?.statusCode !== 401) {
    return { data, error, refresh }
  }

  // Неавторизованный пользователь — не обновляем токены
  if (!user.isAuthorized) {
    return { data, error, refresh }
  }

  try {
    // const { data: newTokens } = await ram.auth.refreshAccessToken(
    //   { refreshToken: user.jwt.refreshToken },
    //   { headers },
    // )

    user.jwt = {
      accessToken: newTokens.token || '',
      refreshToken: newTokens.refreshToken || '',
    }

    headers.Authorization = `Bearer ${user.jwt.accessToken}`

    if (process.env.ANTIDDOSKEY && process.server) {
      headers.antiddoskey = process.env.ANTIDDOSKEY
    }

    // user.info = await user.getCurrentInfo()
    // user.syncCookies()

    // Повторяем запрос с обновлёнными токенами
    return await useFetch(path, {
      ...fetchOptions,
      headers,
    })
  } catch (e) {
    console.error('Token refresh error', e)
    return { data, error, refresh }
  }
}
