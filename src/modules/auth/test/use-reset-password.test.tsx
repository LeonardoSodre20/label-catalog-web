import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { useResetPassword } from '../mutations/use-reset-password'
import { AuthService } from '../services/auth.service'

vi.mock('../services/auth.service')

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

describe('useResetPassword', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls AuthService.resetPassword on success', async () => {
    vi.mocked(AuthService.prototype.resetPassword).mockResolvedValue()

    const { result } = renderHook(() => useResetPassword(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({
      email: 'leo@test.com',
      token: '123456',
      password: 'NewPass123!',
      confirmPassword: 'NewPass123!',
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(AuthService.prototype.resetPassword).toHaveBeenCalledWith({
      email: 'leo@test.com',
      token: '123456',
      password: 'NewPass123!',
      confirmPassword: 'NewPass123!',
    })
  })

  it('handles error state', async () => {
    vi.mocked(AuthService.prototype.resetPassword).mockRejectedValue(
      new Error('Token is invalid or expired'),
    )

    const { result } = renderHook(() => useResetPassword(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({
      email: 'leo@test.com',
      token: '000000',
      password: 'NewPass123!',
      confirmPassword: 'NewPass123!',
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
  })

  it('starts in idle state before mutation is called', () => {
    const { result } = renderHook(() => useResetPassword(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
  })
})
