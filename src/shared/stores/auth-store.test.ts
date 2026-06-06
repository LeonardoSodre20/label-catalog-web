import { useAuthStore } from './auth-store'

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ token: null })
  })

  it('starts with null token', () => {
    const { token } = useAuthStore.getState()

    expect(token).toBeNull()
  })

  it('sets token', () => {
    useAuthStore.getState().setToken('eyJhbGciOiJIUzI1NiJ9')

    expect(useAuthStore.getState().token).toBe('eyJhbGciOiJIUzI1NiJ9')
  })

  it('clears session', () => {
    useAuthStore.getState().setToken('eyJhbGciOiJIUzI1NiJ9')
    useAuthStore.getState().clearSession()

    expect(useAuthStore.getState().token).toBeNull()
  })

  it('overrides existing token when setToken is called again', () => {
    useAuthStore.getState().setToken('token-1')
    useAuthStore.getState().setToken('token-2')

    expect(useAuthStore.getState().token).toBe('token-2')
  })
})
