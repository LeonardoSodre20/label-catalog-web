import { act, renderHook } from '@testing-library/react'
import { useResendCooldown } from '../hooks/use-resend-cooldown'

describe('useResendCooldown', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('starts with no cooldown', () => {
    const { result } = renderHook(() => useResendCooldown())

    expect(result.current.isBlocked).toBe(false)
    expect(result.current.timeLeft).toBe(0)
  })

  it('blocks after starting cooldown', () => {
    const { result } = renderHook(() => useResendCooldown())

    act(() => {
      result.current.startCooldown()
    })

    expect(result.current.isBlocked).toBe(true)
    expect(result.current.timeLeft).toBe(90)
  })

  it('decrements timeLeft every second', () => {
    const { result } = renderHook(() => useResendCooldown())

    act(() => {
      result.current.startCooldown()
    })

    act(() => {
      vi.advanceTimersByTime(5000)
    })

    expect(result.current.timeLeft).toBe(85)
    expect(result.current.isBlocked).toBe(true)
  })

  it('unblocks after 90 seconds', () => {
    const { result } = renderHook(() => useResendCooldown())

    act(() => {
      result.current.startCooldown()
    })

    act(() => {
      vi.advanceTimersByTime(90000)
    })

    expect(result.current.timeLeft).toBe(0)
    expect(result.current.isBlocked).toBe(false)
  })

  it('resets timer when startCooldown is called again', () => {
    const { result } = renderHook(() => useResendCooldown())

    act(() => {
      result.current.startCooldown()
    })

    act(() => {
      vi.advanceTimersByTime(30000)
    })

    expect(result.current.timeLeft).toBe(60)

    act(() => {
      result.current.startCooldown()
    })

    expect(result.current.timeLeft).toBe(90)
  })

  it('clears interval on unmount', () => {
    const { result, unmount } = renderHook(() => useResendCooldown())

    act(() => {
      result.current.startCooldown()
    })

    unmount()

    expect(vi.getTimerCount()).toBe(0)
  })
})
