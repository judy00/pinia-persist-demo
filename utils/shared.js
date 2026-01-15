export function genAuthKeyByEnv(key) {
  const mode = import.meta.env.NUXT_PUBLIC_MODE
  console.info('mode', mode)
  console.info('import.meta.env', import.meta.env)
  console.info('process.env', process.env)

  switch (mode) {
    case 'development':
    case 'staging':
      return `${key}_${mode.toUpperCase()}`

    case 'production':
    default:
      return key
  }
}
