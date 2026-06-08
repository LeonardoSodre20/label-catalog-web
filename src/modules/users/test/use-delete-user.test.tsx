import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { useDeleteUser } from '../mutations/use-delete-user'
import { UsersService } from '../services/users.service'

vi.mock('../services/users.service')

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

describe('useDeleteUser', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls UsersService.delete and returns on success', async () => {
    vi.mocked(UsersService.prototype.delete).mockResolvedValue(undefined)

    const { result } = renderHook(() => useDeleteUser(), {
      wrapper: createWrapper(),
    })

    result.current.mutate([1])

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(UsersService.prototype.delete).toHaveBeenCalledWith([1])
  })

  it('handles error state', async () => {
    vi.mocked(UsersService.prototype.delete).mockRejectedValue(
      new Error('User not found'),
    )

    const { result } = renderHook(() => useDeleteUser(), {
      wrapper: createWrapper(),
    })

    result.current.mutate([999])

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
  })

  it('starts in idle state before mutation is called', () => {
    const { result } = renderHook(() => useDeleteUser(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
  })
})
