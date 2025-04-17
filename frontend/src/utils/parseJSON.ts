/**
 * Returns a typed object or string on error.
 */
export function parseJSON<T = any>(data: string): T {
  try {
    return JSON.parse(data) as T
  } catch {
    return {} as T
  }
}
