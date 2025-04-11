export type User = any 

export interface AuthOptions {
  loginFn: (credentials: any) => Promise<{ token: string }>
  fetchUserFn: (token: string) => Promise<User>
  tokenStorage?: 'local' | 'session'
}

export interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
}

export interface AuthComposable {
  user: User | null
  token: string | null
  loading: boolean
  login: (credentials: any) => Promise<void>
  logout: () => void
  isAuthenticated: () => boolean
}
