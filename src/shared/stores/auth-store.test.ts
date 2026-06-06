import { useAuthStore } from './auth-store'

const mockSession = {
  token: 'eyJhbGciOiJIUzI1NiJ9',
  email: 'leo@test.com',
  function: 'ADMIN',
}

describe('authStore', () => {
  beforeEach(() => {
    localStorage.clear()
    useAuthStore.setState({ token: null, email: null, function: null })
  })

  it('starts with null token', () => {
    const { token, email, function: fn } = useAuthStore.getState()

    expect(token).toBeNull()
    expect(email).toBeNull()
    expect(fn).toBeNull()
  })

  it('sets session and persists to localStorage', () => {
    useAuthStore.getState().setSession(mockSession)

    const state = useAuthStore.getState()
    expect(state.token).toBe(mockSession.token)
    expect(state.email).toBe(mockSession.email)
    expect(state.function).toBe(mockSession.function)

    const stored = JSON.parse(
      localStorage.getItem('label-catalog-auth') ?? '{}',
    )
    expect(stored).toEqual(mockSession)
  })

  it('clears session and removes from localStorage', () => {
    useAuthStore.getState().setSession(mockSession)
    useAuthStore.getState().clearSession()

    const state = useAuthStore.getState()
    expect(state.token).toBeNull()
    expect(state.email).toBeNull()
    expect(state.function).toBeNull()
    expect(localStorage.getItem('label-catalog-auth')).toBeNull()
  })

  it('isAuthenticated returns true when token exists', () => {
    useAuthStore.getState().setSession(mockSession)

    expect(useAuthStore.getState().isAuthenticated()).toBe(true)
  })

  it('isAuthenticated returns false when token is null', () => {
    expect(useAuthStore.getState().isAuthenticated()).toBe(false)
  })

  it('overrides existing session when setSession is called again', () => {
    useAuthStore.getState().setSession(mockSession)

    const updatedSession = {
      token: 'new-token',
      email: 'new@test.com',
      function: 'USER',
    }
    useAuthStore.getState().setSession(updatedSession)

    const state = useAuthStore.getState()
    expect(state.token).toBe('new-token')
    expect(state.email).toBe('new@test.com')
    expect(state.function).toBe('USER')
  })
})
