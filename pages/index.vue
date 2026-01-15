<script setup>
import { genAuthKeyByEnv } from '@/utils/shared'
const config = useRuntimeConfig()
const testStore = useTestStore()

const cookieInfo = ref('')
const useCookieInfo = ref('')
const allCookies = ref('')

function getCookieKey() {
  return genAuthKeyByEnv('TEST_COLOR')
}

function updateCookieInfo() {
  if (import.meta.client) {
    allCookies.value = document.cookie
    const cookies = document.cookie.split(';')

    // 解析 TEST_COLOR cookie (by pinia-plugin-persistedstate)
    const testColorCookie = cookies.find(c => c.trim().startsWith('TEST_COLOR='))
    if (testColorCookie) {
      const rawValue = testColorCookie.trim().substring('TEST_COLOR='.length)
      try {
        cookieInfo.value = decodeURIComponent(rawValue)
      } catch (e) {
        cookieInfo.value = rawValue
      }
    } else {
      cookieInfo.value = 'TEST_COLOR cookie not found'
    }

    // 解析 TEST_USECOOKIE cookie (by useCookie)
    const testUseCookie = cookies.find(c => c.trim().startsWith('TEST_USECOOKIE='))
    useCookieInfo.value = testUseCookie ? testUseCookie.trim() : 'TEST_USECOOKIE cookie not found'
  }
}

function setColor(color) {
  testStore.color = color
  // 等待 cookie 寫入後更新顯示
  setTimeout(updateCookieInfo, 100)
}

function clearCookie() {
  if (import.meta.client) {
    document.cookie = 'TEST_COLOR=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    testStore.color = ''
    updateCookieInfo()
  }
}

onMounted(() => {
  updateCookieInfo()
})
</script>

<template>
  <div style="padding: 2rem; font-family: system-ui, sans-serif;">
    <h1>Pinia Persist Cookie Domain Test</h1>

    <section style="margin: 2rem 0; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
      <h2>Environment Config</h2>
      <p><strong>NUXT_PUBLIC_COOKIE_DOMAIN:</strong> {{ config.public.cookieDomain || '(not set)' }}</p>
    </section>

    <section style="margin: 2rem 0; padding: 1rem; background: #e8f5e9; border-radius: 8px;">
      <h2>Store State</h2>
      <p><strong>testStore.color:</strong> {{ testStore.color || '(empty)' }}</p>
      <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
        <button
          style="padding: 0.5rem 1rem; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;"
          @click="setColor('red')"
        >
          Set Red
        </button>
        <button
          style="padding: 0.5rem 1rem; background: #2196f3; color: white; border: none; border-radius: 4px; cursor: pointer;"
          @click="setColor('blue')"
        >
          Set Blue
        </button>
        <button
          style="padding: 0.5rem 1rem; background: #9e9e9e; color: white; border: none; border-radius: 4px; cursor: pointer;"
          @click="clearCookie"
        >
          Clear Cookie
        </button>
        <button
          style="padding: 0.5rem 1rem; background: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer;"
          @click="updateCookieInfo"
        >
          Refresh
        </button>
        <button
          style="padding: 0.5rem 1rem; background: #4caf50; color: white; border: none; border-radius: 4px; cursor: pointer;"
          @click="getCookieKey"
        >
          Get Cookie Key
        </button>
      </div>
    </section>

    <section style="margin: 2rem 0; padding: 1rem; background: #fff3e0; border-radius: 8px;">
      <h2>Cookie Info</h2>
      <div style="display: grid; gap: 1rem;">
        <div style="padding: 0.5rem; background: #ffe0b2; border-radius: 4px;">
          <p style="margin: 0; font-size: 0.875rem; color: #e65100;">By pinia-plugin-persistedstate</p>
          <p style="margin: 0.25rem 0 0;"><strong>TEST_COLOR:</strong> {{ cookieInfo }}</p>
        </div>
        <div style="padding: 0.5rem; background: #c8e6c9; border-radius: 4px;">
          <p style="margin: 0; font-size: 0.875rem; color: #2e7d32;">By useCookie (server plugin)</p>
          <p style="margin: 0.25rem 0 0;"><strong>TEST_USECOOKIE:</strong> {{ useCookieInfo }}</p>
        </div>
      </div>
      <details style="margin-top: 1rem;">
        <summary style="cursor: pointer;">All cookies (document.cookie)</summary>
        <pre style="margin-top: 0.5rem; padding: 0.5rem; background: #fff; overflow-x: auto;">{{ allCookies || '(no cookies)' }}</pre>
      </details>
    </section>

    <section style="margin: 2rem 0; padding: 1rem; background: #e3f2fd; border-radius: 8px;">
      <h2>How to Check Cookie Domain</h2>
      <ol>
        <li>Open DevTools (F12)</li>
        <li>Go to Application tab</li>
        <li>Click Cookies in the left sidebar</li>
        <li>Compare domain of <code>TEST_COLOR</code> vs <code>TEST_USECOOKIE</code></li>
      </ol>
      <p style="margin-top: 1rem; color: #666;">
        <strong>Compare:</strong>
      </p>
      <ul style="color: #666; margin-top: 0.5rem;">
        <li><code>TEST_COLOR</code> - set by pinia-plugin-persistedstate</li>
        <li><code>TEST_USECOOKIE</code> - set by useCookie in server plugin</li>
      </ul>
      <p style="margin-top: 0.5rem; color: #666;">
        Check if both cookies have the same domain format (with or without leading dot).
      </p>
    </section>
  </div>
</template>
