/**
 * JWT model
 */
export interface JWT {
  /** Access token */
  accessToken: string
  /** Expires in seconds */
  expiresIn: number
  /** Refresh token */
  refreshToken: string
}
/**
 * Error model
 */
export interface Error {
  /** Errpr message */
  message?: string
}
/**
 * User model
 */
export interface User {
  /** ID */
  id: number
  /** Personal Info */
  info: {
    displayName: string
    email: string
    surname?: string
    scope?: string
    city?: string
    company?: string
    position?: string
    gender?: number
    birthdate?: number
    phone?: string
  }
  /** Nickname */
  name: string
  vkId?: string
  googleId?: string
  photoFileId?: number
  /** File model */
  photo?: File
  /** Permissions */
  permissions?: Permission[]
  /** Roles */
  roles?: Role[]
  activePackages?: PaywallUserPackage[]
  deleted?: number
  blocked?: string
  request?: {
    unacceptable?: {
      status?: number
    }
  }
}

export declare type QueryParamsType = Record<string | number, any>
export declare type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>
export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}
export declare type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>
export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}
export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D
  error: E
}
declare type CancelToken = symbol | string | number
export declare enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}
export declare class HttpClient<SecurityDataType = unknown> {
  baseUrl: string
  private securityData
  private securityWorker?
  private abortControllers
  private customFetch
  private baseApiParams
  constructor(apiConfig?: ApiConfig<SecurityDataType>)
  setSecurityData: (data: SecurityDataType | null) => void
  private encodeQueryParam
  private addQueryParam
  private addArrayQueryParam
  protected toQueryString(rawQuery?: QueryParamsType): string
  protected addQueryParams(rawQuery?: QueryParamsType): string
  private contentFormatters
  private mergeRequestParams
  private createAbortSignal
  abortRequest: (cancelToken: CancelToken) => void
  request: <T = any, E = any>({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }: FullRequestParams) => Promise<HttpResponse<T, E>>
}
/**
 * @title Ram
 * @version 0.0.0
 * @license UNLICENSED
 *
 * API for Forbes administration, based on a Drupal-generated database
 */
export declare class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  auth: {
    /**
     * @description Authorizes the user
     *
     * @tags auth
     * @name Login
     * @summary Login
     * @request POST:/auth/login
     * @secure
     * @response `200` `JWT` Authorized
     * @response `403` `Error` Invalid credentials
     */
    login: (data: {
      username: string
      password: string
      ip?: string
    }, params?: RequestParams) => Promise<HttpResponse<JWT, Error>>
    /**
     * @description Refresh access token
     *
     * @tags auth
     * @name RefreshAccessToken
     * @summary RefreshAccessToken
     * @request GET:/auth/refresh
     * @secure
     * @response `200` `{ token?: string, refreshToken?: string }` OK
     */
    refreshAccessToken: (query?: {
      refreshToken?: string
    }, params?: RequestParams) => Promise<HttpResponse<{ token?: string, refreshToken?: string }, any>>
    /**
     * No description
     *
     * @tags auth
     * @name PostAuthAdminLogin
     * @summary Аутентификация в панель администратора
     * @request POST:/auth/admin_login
     * @secure
     * @response `200` `JWT` OK
     */
    postAuthAdminLogin: (data: {
      email?: string
      password?: string
      token?: string
    }, params?: RequestParams) => Promise<HttpResponse<JWT, any>>
    /**
     * No description
     *
     * @tags auth
     * @name GetAuthYandexAuthData
     * @summary Поинт для получения авторизационных данных в Яндекс OAuth
     * @request GET:/auth/yandex_auth_data
     * @secure
     * @response `200` `{ token?: string, email?: string, status?: number, expires_in?: number, created_at?: number }` OK
     */
    getAuthYandexAuthData: (query?: {
      access_token?: string
    }, params?: RequestParams) => Promise<HttpResponse<{ token?: string, email?: string, status?: number, expires_in?: number, created_at?: number }, any>>
  }

  pub: {
    /**
     * No description
     *
     * @name PostPubLoginVk
     * @summary Login VK
     * @request POST:/pub/login_vk
     * @secure
     * @response `200` `JWT` OK
     */
    postPubLoginVk: (data: {
      access_token?: string
      ip?: string
    }, params?: RequestParams) => Promise<HttpResponse<JWT, any>>
  }
}
