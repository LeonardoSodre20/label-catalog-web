import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { useUpdateTypeOfLabel } from '../mutations/use-update-type-of-label'
import { TypesOfLabelsService } from '../services/types-of-labels.service'

vi.mock('../services/types-of-labels.service')

const mockType = {
  id: 1,
  name: 'Peça',
  description: 'Updated description',
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

describe('useUpdateTypeOfLabel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls TypesOfLabelsService.update and returns data on success', async () => {
    vi.mocked(TypesOfLabelsService.prototype.update).mockResolvedValue(mockType)

    const { result } = renderHook(() => useUpdateTypeOfLabel(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({
      id: 1,
      data: { name: 'Peça', description: 'Updated description' },
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(result.current.data).toEqual(mockType)
    expect(TypesOfLabelsService.prototype.update).toHaveBeenCalledWith(1, {
      name: 'Peça',
      description: 'Updated description',
    })
  })

  it('handles error state', async () => {
    vi.mocked(TypesOfLabelsService.prototype.update).mockRejectedValue(
      new Error('Update failed'),
    )

    const { result } = renderHook(() => useUpdateTypeOfLabel(), {
      wrapper: createWrapper(),
    })

    result.current.mutate({
      id: 999,
      data: { name: 'Peça' },
    })

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
  })

  it('starts in idle state before mutation is called', () => {
    const { result } = renderHook(() => useUpdateTypeOfLabel(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
  })
})
