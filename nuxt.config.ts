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

  piniaPluginPersistedstate: {
    cookieOptions: {
      domain: process.env.NUXT_PUBLIC_COOKIE_DOMAIN,
      path: '/',
      secure: 'true',
      maxAge: 60 * 60 * 24 * 30
    },
    debug: true
  },

  compatibilityDate: '2025-01-16'
})
