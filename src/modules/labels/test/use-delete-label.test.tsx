import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { useDeleteLabel } from '../mutations/use-delete-label'
import { LabelsService } from '../services/labels.service'

vi.mock('../services/labels.service')

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

describe('useDeleteLabel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls LabelsService.delete on success', async () => {
    vi.mocked(LabelsService.prototype.delete).mockResolvedValue(undefined)

    const { result } = renderHook(() => useDeleteLabel(), {
      wrapper: createWrapper(),
    })

    result.current.mutate(1)

    await waitFor(() => expect(result.current.isSuccess).toBe(true))

    expect(LabelsService.prototype.delete).toHaveBeenCalledWith(1)
  })

  it('handles error state', async () => {
    vi.mocked(LabelsService.prototype.delete).mockRejectedValue(
      new Error('Delete failed'),
    )

    const { result } = renderHook(() => useDeleteLabel(), {
      wrapper: createWrapper(),
    })

    result.current.mutate(999)

    await waitFor(() => expect(result.current.isError).toBe(true))

    expect(result.current.error).toBeDefined()
  })

  it('starts in idle state before mutation is called', () => {
    const { result } = renderHook(() => useDeleteLabel(), {
      wrapper: createWrapper(),
    })

    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
  })
})
