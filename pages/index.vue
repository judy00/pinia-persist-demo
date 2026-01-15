<script setup>
const config = useRuntimeConfig()
const testStore = useTestStore()

const cookieInfo = ref('')
const allCookies = ref('')

function updateCookieInfo() {
  if (import.meta.client) {
    allCookies.value = document.cookie

    // 解析 TEST_COLOR cookie
    const cookies = document.cookie.split(';')
    const testColorCookie = cookies.find(c => c.trim().startsWith('TEST_COLOR='))
    if (testColorCookie) {
      cookieInfo.value = testColorCookie.trim()
    } else {
      cookieInfo.value = 'TEST_COLOR cookie not found'
    }
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
      </div>
    </section>

    <section style="margin: 2rem 0; padding: 1rem; background: #fff3e0; border-radius: 8px;">
      <h2>Cookie Info</h2>
      <p><strong>TEST_COLOR cookie:</strong> {{ cookieInfo }}</p>
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
        <li>Find TEST_COLOR cookie</li>
        <li>Check the Domain column</li>
      </ol>
      <p style="margin-top: 1rem; color: #666;">
        <strong>Expected:</strong> If domain has a leading dot (e.g., <code>.example.com</code>),
        subdomains can access the cookie. Without the dot, the cookie is bound to the exact domain.
      </p>
    </section>
  </div>
</template>
