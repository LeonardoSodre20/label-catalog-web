import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { useUpdateUser } from '../mutations/use-update-user'
import { UsersService } from '../services/users.service'
import type { User } from '../types/user-types'

vi.mock('../services/users.service')

const mockUser: User = {
  id: 1,
  name: 'João Silva',
  email: 'joao@example.com',
  function: 'ADMIN',
  firstAccess: true,
  createdAt: '2026-06-08T10:00:00',
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

describe('useUpdateUser', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls UsersService.update and returns data on success', async () => {
    vi.mocked(UsersService.prototype.update).mockResolvedValue(mockUser)

    const { result } = renderHook(() => useUpdateUser(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({
      id: 1,
      data: {
        name: 'João Silva',
        function: 'OPERATOR',
      },
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockUser)
    expect(UsersService.prototype.update).toHaveBeenCalledWith(1, {
      name: 'João Silva',
      function: 'OPERATOR',
    })
  })

  it('handles error state', async () => {
    vi.mocked(UsersService.prototype.update).mockRejectedValue(
      new Error('User not found'),
    )

    const { result } = renderHook(() => useUpdateUser(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({
      id: 999,
      data: {
        name: 'João Silva',
        function: 'ADMIN',
      },
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
  })

  it('starts in idle state before mutation is called', () => {
    const { result } = renderHook(() => useUpdateUser(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
  })
})
