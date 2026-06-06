import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { useLogin } from '../mutations/use-login'
import { AuthService } from '../services/auth.service'
import type { LoginResponse } from '../types/auth-types'

vi.mock('../services/auth.service')

const mockLoginResponse: LoginResponse = {
  token: 'eyJhbGciOiJIUzI1NiJ9',
  user: { id: '1', name: 'Leo', email: 'leo@test.com' },
}

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }
}

describe('useLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls AuthService.login and returns data on success', async () => {
    vi.mocked(AuthService.prototype.login).mockResolvedValue(mockLoginResponse)

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({ email: 'leo@test.com', password: '123456' })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockLoginResponse)
    expect(AuthService.prototype.login).toHaveBeenCalledWith({
      email: 'leo@test.com',
      password: '123456',
    })
  })

  it('handles error state', async () => {
    vi.mocked(AuthService.prototype.login).mockRejectedValue(
      new Error('Invalid credentials'),
    )

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({ email: 'leo@test.com', password: '123456' })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
  })

  it('starts in idle state before mutation is called', () => {
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
  })
})
