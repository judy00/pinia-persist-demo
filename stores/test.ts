export const useTestStore = defineStore('test', {
  state: () => ({
    color: 'red' // 預設值
  }),
  persist: {
    key: 'TEST_COLOR'
    // storage 由 nuxt.config.ts 統一設定
  }
})
