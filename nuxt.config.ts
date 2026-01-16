// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],

  runtimeConfig: {
    public: {
      cookieDomain: ''
    }
  },

  vite: {
    envPrefix: "NUXT_PUBLIC_"
  },

  // piniaPluginPersistedstate: {
  //   cookieOptions: {
  //     domain: process.env.NUXT_PUBLIC_COOKIE_DOMAIN,
  //     path: '/',
  //     maxAge: 60 * 60 * 24 * 2,
  //     secure: true
  //   },
  //   debug: true
  // },

  compatibilityDate: '2025-01-16'
})
