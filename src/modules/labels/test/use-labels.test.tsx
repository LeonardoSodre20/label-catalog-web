import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { useLabels } from '../queries/use-labels'
import { LabelsService } from '../services/labels.service'

vi.mock('../services/labels.service')

const mockLabels = [
  {
    id: 1,
    name: 'Suporte metálico 150mm',
    codeRef: 'PEC-001',
    typeId: 1,
    typeName: 'Peça',
    sector: 'PRODUCAO',
    qtdByBatch: 50,
    localization: 'C-01 / P-05',
    fields: {},
    createdAt: '2026-06-08T10:00:00',
    updatedAt: '2026-06-08T10:00:00',
  },
]

const mockPaginatedResponse = {
  content: mockLabels,
  totalPages: 1,
  totalElements: 1,
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

describe('useLabels', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns paginated labels on success', async () => {
    vi.mocked(LabelsService.prototype.list).mockResolvedValue(
      mockPaginatedResponse,
    )

    const { result } = renderHook(() => useLabels(0, 20), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data?.content).toHaveLength(1)
    expect(result.current.data?.content[0]?.codeRef).toBe('PEC-001')
  })

  it('calls service with correct page and size', async () => {
    vi.mocked(LabelsService.prototype.list).mockResolvedValue(
      mockPaginatedResponse,
    )

    renderHook(() => useLabels(2, 10), {
      wrapper: createWrapper(),
    })

    await waitFor(() =>
      expect(LabelsService.prototype.list).toHaveBeenCalledWith(
        2,
        10,
        undefined,
      ),
    )
  })

  it('passes search param to service', async () => {
    vi.mocked(LabelsService.prototype.list).mockResolvedValue(
      mockPaginatedResponse,
    )

    renderHook(() => useLabels(0, 20, 'PEC'), {
      wrapper: createWrapper(),
    })

    await waitFor(() =>
      expect(LabelsService.prototype.list).toHaveBeenCalledWith(0, 20, 'PEC'),
    )
  })

  it('handles error state', async () => {
    vi.mocked(LabelsService.prototype.list).mockRejectedValue(
      new Error('Failed to fetch'),
    )

    const { result } = renderHook(() => useLabels(0, 20), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
  })

  it('starts in pending state', () => {
    vi.mocked(LabelsService.prototype.list).mockResolvedValue(
      mockPaginatedResponse,
    )

    const { result } = renderHook(() => useLabels(0, 20), {
      wrapper: createWrapper(),
    })

    expect(result.current.isPending).toBe(true)
  })
})
