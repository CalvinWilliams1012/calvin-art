/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly SUPABASE_URL: string
    readonly SUPABASE_ANON_KEY: string
    readonly API_HOST: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

    