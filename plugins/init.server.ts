export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig()
  const testStore = useTestStore()

  // 測試：使用 useCookie 設置另一個 cookie，檢查是否和 persist 衝突
  const testCookie = useCookie('TEST_COLOR', {
    path: '/',
    domain: runtimeConfig.public.cookieDomain,
    secure: true,
    maxAge: 60 * 60 * 24 * 30 // 30 天
  })

  // 設置 useCookie 的值
  if (!testCookie.value) {
    testCookie.value = 'set-by-useCookie'
  }

  console.log('[init.server.ts] testStore.color:', testStore.color)
  console.log('[init.server.ts] TEST_USECOOKIE:', testCookie.value)
})
