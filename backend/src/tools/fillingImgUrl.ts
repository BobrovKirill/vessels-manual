export const fillingImgUrl = (path: string | null | undefined): string | null => {
  if (!path) return null
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://api.vessels-manual.ru' : 'http://localhost:3000'
  return path.startsWith('/') ? baseUrl + path : path
}