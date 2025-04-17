export function parseCookies(input = ''): Record<string, string> {
  if (!input) {
    return {}
  }

  return Object.fromEntries(input.split(/; */).map((cookie) => cookie.split('=')))
}
