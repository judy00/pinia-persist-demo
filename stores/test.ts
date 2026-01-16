import { genAuthKeyByEnv } from '~/utils/shared'

export const useTestStore = defineStore('test', () => {
  const color = ref('yellow') // 預設值

  function setStoreColor(updateColor) {
    color.value = updateColor
  }

  return {
    color,
    setStoreColor
  }
}, {
  persist: {
    key: genAuthKeyByEnv('TEST_COLOR'),
    pick: ['color'],
    storage: piniaPluginPersistedstate.cookies({
      domain: import.meta.env.NUXT_PUBLIC_COOKIE_DOMAIN,
      path: '/',
      maxAge: 60 * 60 * 24 * 2,
      secure: true
    }),
    serializer: {
      serialize: (state) => {
        return JSON.stringify({ user: { color: state.color } })
      },
      deserialize: (value) => {
        try {
          const parsed = JSON.parse(value)
          return { color: parsed?.user?.color || 'orange' }
        } catch {
          return { color: 'orange' }
        }
      }
    }
  }
})
