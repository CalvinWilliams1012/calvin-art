/// <reference types="astro/client" />
interface ImportMetaEnv {
    readonly SUPABASE_URL: string
    readonly SUPABASE_ANON_KEY: string
    readonly API_HOST: string
    readonly SUPABASE_SERVICE_ROLE: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

    