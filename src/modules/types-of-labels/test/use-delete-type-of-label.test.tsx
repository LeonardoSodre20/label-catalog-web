import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { useDeleteTypeOfLabel } from '../mutations/use-delete-type-of-label'
import { TypesOfLabelsService } from '../services/types-of-labels.service'

vi.mock('../services/types-of-labels.service')

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

describe('useDeleteTypeOfLabel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls TypesOfLabelsService.delete on success', async () => {
    vi.mocked(TypesOfLabelsService.prototype.delete).mockResolvedValue(
      undefined,
    )

    const { result } = renderHook(() => useDeleteTypeOfLabel(), {
      wrapper: createWrapper(),
    })

    result.current.mutate(1)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(TypesOfLabelsService.prototype.delete).toHaveBeenCalledWith(1)
  })

  it('handles error state', async () => {
    vi.mocked(TypesOfLabelsService.prototype.delete).mockRejectedValue(
      new Error('Delete failed'),
    )

    const { result } = renderHook(() => useDeleteTypeOfLabel(), {
      wrapper: createWrapper(),
    })

    result.current.mutate(999)

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
  })

  it('starts in idle state before mutation is called', () => {
    const { result } = renderHook(() => useDeleteTypeOfLabel(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
  })
})
