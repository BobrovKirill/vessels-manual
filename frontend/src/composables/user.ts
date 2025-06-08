// import { defineStore } from 'pinia'

// import { useRam } from '~/services'
// import { parseCookies, parseJSON } from '~/utils'

/**
 * JWT cookie name.
 * @string
 */
// export const USER_COOKIE_JWT = 'jwt'

/**
 * JWT cookie expires in days.
 * @const
 */
// export const USER_COOKIE_EXPIRES_IN_DAYS = 7

/**
 * JWT cookie SameSite.
 * @const
 */
// export const USER_COOKIE_SAMESITE = 'Lax'
//
// export interface UserChangePasswordOptions {
//   code: string
//   email: string
//
//   newPassword: string
// }
//
// export interface UserCreateOptions {
//   email: string
//   name: string
//   password: string
//   subscribe: boolean
// }
//
// export interface UserCreateConfirmOptions {
//   code: string
//   email: string
// }
//
// export interface UserEmailConfirmOptions {
//   code: string
//   email: string
// }
//
// export interface UserEmailRecoveryOptions {
//   code: string
//   email: string
// }
//
// async function createOAuth(url: string, height = 640, width = 640): Promise<Record<string, string>> {
//   const left = screen.width / 2 - width / 2
//   const top = screen.height / 2 - height / 2
//
//   const w = window.open(url, '', `popup=1,width=${width},height=${height},top=${top},left=${left}`)
//
//   if (!w) {
//     return {}
//   }
//
//   w.focus()
//
//   return new Promise((resolve) => {
//     const interval = window.setInterval(() => {
//       try {
//         if (w.location.origin !== window.location.origin) {
//           return
//         }
//
//         const hash = Object.fromEntries(
//           w.location.hash
//             .slice(1)
//             .split(/& */)
//             .map(v => v.split('=')),
//         )
//
//         if (w.location.search) {
//           Object.assign(hash, Object.fromEntries(new URLSearchParams(w.location.search) as any))
//         }
//
//         w.close()
//         window.clearInterval(interval)
//
//         resolve(hash)
//       } catch (error) {
//         //
//       }
//     }, 200)
//   })
// }
//
// export const useUser = {
//   isAuthorized: false,
// }

// export const useUser = defineStore('user', {
// actions: {
//   create(options: UserCreateOptions) {
//     return useRam().pub.postAuthReg({
//       info: {
//         displayName: options.name,
//         email: options.email,
//       },
//
//       password: options.password,
//       subscribe: Number(options.subscribe),
//     })
//   },
//
//   changePassword(options: UserChangePasswordOptions) {
//     return useRam().pub.postPubNewPassword({
//       code: options.code,
//       email: options.email,
//
//       password1: options.newPassword,
//       password2: options.newPassword,
//     })
//   },
//
//   createConfirm(options: UserCreateConfirmOptions) {
//     return useRam().pub.postAuthRegConfirm(options)
//   },
//
//   emailConfirm(options: UserEmailConfirmOptions) {
//     return useRam().pub.postPubEmailConfirm(options)
//   },
//
//   emailRecovery(options: UserEmailRecoveryOptions) {
//     return useRam().pub.postPubEmailRecovery(options)
//   },
//
//   async getCurrentInfo(refresh = false) {
//     if (this.info !== null && !refresh) {
//       return this.info
//     }
//
//     try {
//       const duck = useRam()
//       const response = await duck.users.getCurrentUser()
//
//       if (this.info) {
//         Object.assign(this.info, response.data)
//       } else {
//         this.info = response.data
//       }
//     } catch {
//       //
//     }
//
//     return this.info
//   },
//
//   async loginWithCookies(cookies: string) {
//     const parsedCookies = parseCookies(cookies)
//     const cookieJWT = parseJSON(parsedCookies[USER_COOKIE_JWT])
//
//     if (!Array.isArray(cookieJWT) || !cookieJWT.length) {
//       return
//     }
//
//     const [accessToken = '', refreshToken = ''] = cookieJWT
//
//     this.jwt = {
//       accessToken,
//       refreshToken,
//     }
//
//     this.info = await this.getCurrentInfo()
//   },
//
//   async loginWithCredentials(email: string, password: string) {
//     const duck = useRam()
//
//     const response = await ram.auth.login({
//       password,
//       username: email,
//     })
//
//     const { accessToken = '', refreshToken = '' } = response.data
//
//     this.jwt.accessToken = accessToken
//     this.jwt.refreshToken = refreshToken
//
//     this.info = await this.getCurrentInfo()
//     this.syncCookies()
//   },
//
//   logout() {
//     this.jwt = {
//       accessToken: '',
//       refreshToken: '',
//     }
//
//     this.info = null
//     this.syncCookies()
//   },
//
//   recoverPassword(email: string) {
//     return useRam().pub.postPubRecovery({ email })
//   },
//
//   recoverPasswordConfirm() {
//     return useRam().pub.postPubNewPassword({})
//   },
//
//   syncCookies() {
//     let maxAge = 60 * 60 * 24 * USER_COOKIE_EXPIRES_IN_DAYS
//
//     if (!this.isAuthorized) {
//       maxAge = 0
//     }
//
//     const value = `${USER_COOKIE_JWT}=${JSON.stringify([
//       this.jwt.accessToken,
//       this.jwt.refreshToken,
//     ])}; Max-Age=${maxAge}; SameSite=${USER_COOKIE_SAMESITE}; Path=/`
//
//     const context = globalThis.__VUE_SSR_CONTEXT__
//
//     if (context) {
//       return context.res?.setHeader('Set-Cookie', value)
//     }
//
//     localStorage.setItem(USER_COOKIE_JWT, JSON.stringify(this.jwt))
//     document.cookie = value
//   },
// },
//
// getters: {
//   activePackagesIds(state) {
//     if (!state.info) {
//       return []
//     }
//
//     return state.info?.activePackages?.map(pkg => pkg.package?.id) || []
//   },
//
//   isAuthorized(state) {
//     return !!(state.jwt.accessToken && state.jwt.refreshToken)
//   },
//
//   hasActiveSubscription(state) {
//     if (!state.info) {
//       return false
//     }
//
//     return state.info?.activePackages?.some(pkg => Number(pkg.end) * 1000 > new Date().getTime())
//   },
// },
//
// state: () => ({
//   info: null as UserInfo | null,
//
//   jwt: {
//     accessToken: '',
//     refreshToken: '',
//   },
// }),
// })
