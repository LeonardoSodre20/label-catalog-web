import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { useForgotPassword } from '../mutations/use-forgot-password'
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

describe('useForgotPassword', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls AuthService.forgotPassword on success', async () => {
    vi.mocked(AuthService.prototype.forgotPassword).mockResolvedValue()

    const { result } = renderHook(() => useForgotPassword(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({ email: 'leo@test.com' })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(AuthService.prototype.forgotPassword).toHaveBeenCalledWith({
      email: 'leo@test.com',
    })
  })

  it('handles error state', async () => {
    vi.mocked(AuthService.prototype.forgotPassword).mockRejectedValue(
      new Error('Email not found'),
    )

    const { result } = renderHook(() => useForgotPassword(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({ email: 'notfound@test.com' })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
  })

  it('starts in idle state before mutation is called', () => {
    const { result } = renderHook(() => useForgotPassword(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
  })
})
