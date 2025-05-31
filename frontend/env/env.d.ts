interface ImportMetaEnv {
  readonly MODE: string
  readonly API_URL: string
  readonly HOST_URL: string
  readonly API_URL_SERVER: string
  readonly BUILD_TIMESTAMP: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
