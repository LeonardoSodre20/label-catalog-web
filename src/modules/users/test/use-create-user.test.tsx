import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { useCreateUser } from '../mutations/use-create-user'
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

describe('useCreateUser', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls UsersService.create and returns data on success', async () => {
    vi.mocked(UsersService.prototype.create).mockResolvedValue(mockUser)

    const { result } = renderHook(() => useCreateUser(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({
      name: 'João Silva',
      email: 'joao@example.com',
      function: 'ADMIN',
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockUser)
    expect(UsersService.prototype.create).toHaveBeenCalledWith({
      name: 'João Silva',
      email: 'joao@example.com',
      function: 'ADMIN',
    })
  })

  it('handles error state', async () => {
    vi.mocked(UsersService.prototype.create).mockRejectedValue(
      new Error('Email already exists'),
    )

    const { result } = renderHook(() => useCreateUser(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({
      name: 'João Silva',
      email: 'existente@example.com',
      function: 'ADMIN',
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
  })

  it('starts in idle state before mutation is called', () => {
    const { result } = renderHook(() => useCreateUser(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
  })
})
