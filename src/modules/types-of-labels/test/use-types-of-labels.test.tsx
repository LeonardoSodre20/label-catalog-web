import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { useTypesOfLabels } from '../queries/use-types-of-labels'
import { TypesOfLabelsService } from '../services/types-of-labels.service'

vi.mock('../services/types-of-labels.service')

const mockPaginatedResponse = {
  content: [
    {
      id: 1,
      name: 'Peça',
      description: 'Componente para montagem',
      createdAt: '2026-06-08T10:00:00',
      updatedAt: '2026-06-08T10:00:00',
    },
    {
      id: 2,
      name: 'Fixadores',
      description: 'Parafusos e porcas',
      createdAt: '2026-06-08T10:00:00',
      updatedAt: '2026-06-08T10:00:00',
    },
  ],
  totalPages: 1,
  totalElements: 2,
  number: 0,
  size: 20,
  empty: false,
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

describe('useTypesOfLabels', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns paginated types on success', async () => {
    vi.mocked(TypesOfLabelsService.prototype.list).mockResolvedValue(
      mockPaginatedResponse,
    )

    const { result } = renderHook(() => useTypesOfLabels(0, 20), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.content).toHaveLength(2)
    expect(result.current.data?.content[0]?.name).toBe('Peça')
  })

  it('calls service with correct page, size and search', async () => {
    vi.mocked(TypesOfLabelsService.prototype.list).mockResolvedValue(
      mockPaginatedResponse,
    )

    renderHook(() => useTypesOfLabels(1, 10, 'Peça'), {
      wrapper: createWrapper(),
    })

    await waitFor(() =>
      expect(TypesOfLabelsService.prototype.list).toHaveBeenCalledWith(
        1,
        10,
        'Peça',
      ),
    )
  })

  it('handles error state', async () => {
    vi.mocked(TypesOfLabelsService.prototype.list).mockRejectedValue(
      new Error('Failed to fetch'),
    )

    const { result } = renderHook(() => useTypesOfLabels(0, 20), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
  })

  it('starts in pending state', () => {
    vi.mocked(TypesOfLabelsService.prototype.list).mockResolvedValue(
      mockPaginatedResponse,
    )

    const { result } = renderHook(() => useTypesOfLabels(0, 20), {
      wrapper: createWrapper(),
    })

    expect(result.current.isPending).toBe(true)
  })
})
