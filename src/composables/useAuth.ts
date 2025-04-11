import { inject } from 'vue'
import type { AuthComposable } from '../core/types'

export function useAuth(): AuthComposable {
  const auth = inject<AuthComposable>('auth')

  if (!auth) {
    throw new Error('[vue-auth-kit] useAuth() called without installing the plugin.')
  }

  return auth
}
