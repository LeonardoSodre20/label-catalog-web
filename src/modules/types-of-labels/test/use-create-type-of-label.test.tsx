import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { useCreateTypeOfLabel } from '../mutations/use-create-type-of-label'
import { TypesOfLabelsService } from '../services/types-of-labels.service'

vi.mock('../services/types-of-labels.service')

const mockType = {
  id: 1,
  name: 'Peça',
  description: 'Componente para montagem',
  createdAt: '2026-06-08T10:00:00',
  updatedAt: '2026-06-08T10:00:00',
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

describe('useCreateTypeOfLabel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls TypesOfLabelsService.create and returns data on success', async () => {
    vi.mocked(TypesOfLabelsService.prototype.create).mockResolvedValue(mockType)

    const { result } = renderHook(() => useCreateTypeOfLabel(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({
      name: 'Peça',
      description: 'Componente para montagem',
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockType)
    expect(TypesOfLabelsService.prototype.create).toHaveBeenCalledWith({
      name: 'Peça',
      description: 'Componente para montagem',
    })
  })

  it('handles error state', async () => {
    vi.mocked(TypesOfLabelsService.prototype.create).mockRejectedValue(
      new Error('Name already exists'),
    )

    const { result } = renderHook(() => useCreateTypeOfLabel(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({ name: 'Peça' })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
  })

  it('starts in idle state before mutation is called', () => {
    const { result } = renderHook(() => useCreateTypeOfLabel(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
  })
})
