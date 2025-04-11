import type { App } from 'vue'
import { createAuthState } from './core/auth-state'
import type { AuthOptions } from './core/types'

export default {
  install(app: App, options: AuthOptions) {
    const auth = createAuthState(options)
    app.provide('auth', auth)
  }
}
