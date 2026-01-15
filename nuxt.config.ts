// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],

  runtimeConfig: {
    public: {
      cookieDomain: '' // 由 NUXT_PUBLIC_COOKIE_DOMAIN 注入
    }
  },

  // 全域 cookie 設定（統一管理）
  piniaPluginPersistedstate: {
    storage: 'cookies',
    cookieOptions: {
      domain: process.env.NUXT_PUBLIC_COOKIE_DOMAIN || undefined,
      path: '/',
      secure: process.env.NUXT_PUBLIC_COOKIE_SECURE === 'true',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30 天
    },
    debug: true
  },

  compatibilityDate: '2025-01-16'
})
