declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * CDN url.
     * @const
     */
    readonly CDN_URL: string

    /**
     * CloudPayments public id.
     * @const
     */
    readonly CP_PUBLIC_ID: string

    /**
     * Duck url.
     * @const
     */
    readonly DUCK_URL: string

    /**
     * Duck url for server.
     * @const
     */
    readonly DUCK_URL_SERVER: string

    /**
     * Host name.
     * @const
     */
    readonly HOST: string

    /**
     * Node environment.
     * @const
     */
    readonly NODE_ENV: 'development' | 'production' | 'staging'

    /**
     * Request timeout.
     * @const
     */
    readonly REQUEST_TIMEOUT: string

    /**
     * Server host.
     * @const
     */
    readonly SERVER_HOST: string

    /**
     * Server port.
     * @const
     */
    readonly SERVER_PORT: string

    /**
     * Waterfall url.
     * @const
     */
    readonly WATERFALL_URL: string
  }

  interface Process {
    env: ProcessEnv
  }
}

// eslint-disable-next-line no-var
declare var process: NodeJS.Process
