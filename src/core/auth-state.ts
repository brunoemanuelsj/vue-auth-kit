import { reactive, readonly } from 'vue'
import { useTokenStorage } from './token-storage'
import type { AuthOptions, AuthState } from './types'

export function createAuthState(options: AuthOptions) {
  const tokenStore = useTokenStorage(options.tokenStorage || 'local')

  const state = reactive<AuthState>({
    user: null,
    token: tokenStore.get(),
    loading: false
  })

  async function login(credentials: any) {
    state.loading = true
    try {
      const result = await options.loginFn(credentials)
      state.token = result.token
      tokenStore.set(result.token)
      await loadUser()
    } finally {
      state.loading = false
    }
  }

  async function loadUser() {
    if (!state.token) return
    try {
      state.user = await options.fetchUserFn(state.token)
    } catch {
      logout()
    }
  }

  function logout() {
    state.user = null
    state.token = null
    tokenStore.remove()
  }

  function isAuthenticated() {
    return !!state.token
  }

  if (state.token) {
    loadUser()
  }

  return {
    user: readonly(state).user,
    token: readonly(state).token,
    loading: readonly(state).loading,
    login,
    logout,
    isAuthenticated
  }
}
