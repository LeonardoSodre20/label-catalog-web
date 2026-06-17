import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { useUpdateLabel } from '../mutations/use-update-label'
import { LabelsService } from '../services/labels.service'

vi.mock('../services/labels.service')

const mockLabel = {
  id: 1,
  name: 'Updated name',
  codeRef: 'PEC-001',
  typeId: 1,
  typeName: 'Peça',
  sector: 'MONTAGEM',
  qtdByBatch: 100,
  localization: 'C-02 / P-10',
  fields: {},
  createdAt: '2026-06-08T10:00:00',
  updatedAt: '2026-06-08T11:00:00',
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

describe('useUpdateLabel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls LabelsService.update and returns data on success', async () => {
    vi.mocked(LabelsService.prototype.update).mockResolvedValue(mockLabel)

    const { result } = renderHook(() => useUpdateLabel(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({
      id: 1,
      data: {
        name: 'Updated name',
        codeRef: 'PEC-001',
        typeName: 'Peça',
        sector: 'MONTAGEM',
        qtdByBatch: 100,
      },
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockLabel)
    expect(LabelsService.prototype.update).toHaveBeenCalledWith(1, {
      name: 'Updated name',
      codeRef: 'PEC-001',
      typeName: 'Peça',
      sector: 'MONTAGEM',
      qtdByBatch: 100,
    })
  })

  it('handles error state', async () => {
    vi.mocked(LabelsService.prototype.update).mockRejectedValue(
      new Error('Update failed'),
    )

    const { result } = renderHook(() => useUpdateLabel(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({
      id: 999,
      data: { name: 'Fake', codeRef: 'PEC-001', typeName: 'Peça' },
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
  })

  it('starts in idle state before mutation is called', () => {
    const { result } = renderHook(() => useUpdateLabel(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
  })
})
