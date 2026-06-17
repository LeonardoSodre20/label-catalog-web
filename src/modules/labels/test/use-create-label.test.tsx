import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { useCreateLabel } from '../mutations/use-create-label'
import { LabelsService } from '../services/labels.service'

vi.mock('../services/labels.service')

const mockLabel = {
  id: 1,
  name: 'Suporte metálico 150mm',
  description: 'Suporte para fixação',
  codeRef: 'PEC-001',
  typeId: 1,
  typeName: 'Peça',
  sector: 'PRODUCAO',
  qtdByBatch: 50,
  localization: 'C-01 / P-05',
  fields: { assemblyLine: 'Linha A' },
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

describe('useCreateLabel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls LabelsService.create and returns data on success', async () => {
    vi.mocked(LabelsService.prototype.create).mockResolvedValue(mockLabel)

    const { result } = renderHook(() => useCreateLabel(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({
      name: 'Suporte metálico 150mm',
      codeRef: 'PEC-001',
      typeName: 'Peça',
      sector: 'PRODUCAO',
      qtdByBatch: 50,
      localization: 'C-01 / P-05',
      fields: { assemblyLine: 'Linha A' },
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockLabel)
    expect(LabelsService.prototype.create).toHaveBeenCalledWith({
      name: 'Suporte metálico 150mm',
      codeRef: 'PEC-001',
      typeName: 'Peça',
      sector: 'PRODUCAO',
      qtdByBatch: 50,
      localization: 'C-01 / P-05',
      fields: { assemblyLine: 'Linha A' },
    })
  })

  it('handles error state', async () => {
    vi.mocked(LabelsService.prototype.create).mockRejectedValue(
      new Error('Code ref already exists'),
    )

    const { result } = renderHook(() => useCreateLabel(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({
      name: 'Duplicated',
      codeRef: 'PEC-001',
      typeName: 'Peça',
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
  })

  it('starts in idle state before mutation is called', () => {
    const { result } = renderHook(() => useCreateLabel(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
  })
})
