export const useTestStore = defineStore('test', {
  state: () => ({
    color: 'red' // 預設值
  }),
  persist: {
    key: 'TEST_COLOR',
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
