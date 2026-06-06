import { useCallback, useEffect, useRef, useState } from 'react'

const COOLDOWN_SECONDS = 90

export function useResendCooldown() {
  const [timeLeft, setTimeLeft] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startCooldown = useCallback(() => {
    clearTimer()
    setTimeLeft(COOLDOWN_SECONDS)

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [clearTimer])

  useEffect(() => {
    return () => clearTimer()
  }, [clearTimer])

  return {
    timeLeft,
    isBlocked: timeLeft > 0,
    startCooldown,
  }
}
