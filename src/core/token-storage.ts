export function useTokenStorage(type: 'local' | 'session') {
    const store = type === 'local' ? localStorage : sessionStorage
    const key = 'vue-auth-kit-token'
  
    return {
      get: () => store.getItem(key),
      set: (token: string) => store.setItem(key, token),
      remove: () => store.removeItem(key)
    }
  }
  