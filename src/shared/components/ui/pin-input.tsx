import { useCallback, useEffect, useRef } from 'react'
import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from 'react'

import { cn } from '@/shared/lib/utils'

const PIN_LENGTH = 6
const SLOTS = Array.from({ length: PIN_LENGTH }, (_, i) => i)

interface PinInputProps {
  value: string
  onValueChange: (value: string) => void
  error?: boolean
  disabled?: boolean
  className?: string
}

function PinInput({
  value,
  onValueChange,
  error,
  disabled,
  className,
}: PinInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    Array(PIN_LENGTH).fill(null),
  )

  const digits = value.split('').slice(0, PIN_LENGTH)
  while (digits.length < PIN_LENGTH) {
    digits.push('')
  }

  const focusInput = useCallback((index: number) => {
    const ref = inputRefs.current[index]
    if (ref) {
      ref.focus()
    }
  }, [])

  const handleChange = useCallback(
    (index: number, e: ChangeEvent<HTMLInputElement>) => {
      const char = e.target.value.replace(/\D/g, '').slice(-1)
      const newDigits = [...digits]
      newDigits[index] = char
      const newValue = newDigits
        .join('')
        .replace(/\D/g, '')
        .slice(0, PIN_LENGTH)
      onValueChange(newValue)

      if (char && index < PIN_LENGTH - 1) {
        focusInput(index + 1)
      }
    },
    [digits, focusInput, onValueChange],
  )

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !digits[index] && index > 0) {
        const newDigits = [...digits]
        newDigits[index - 1] = ''
        onValueChange(newDigits.join(''))
        focusInput(index - 1)
      }

      if (e.key === 'ArrowLeft' && index > 0) {
        focusInput(index - 1)
      }

      if (e.key === 'ArrowRight' && index < PIN_LENGTH - 1) {
        focusInput(index + 1)
      }
    },
    [digits, focusInput, onValueChange],
  )

  const handlePaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pasted = e.clipboardData
        .getData('text')
        .replace(/\D/g, '')
        .slice(0, PIN_LENGTH)
      if (pasted) {
        onValueChange(pasted)
        const targetIndex = Math.min(pasted.length, PIN_LENGTH - 1)
        focusInput(targetIndex)
      }
    },
    [focusInput, onValueChange],
  )

  useEffect(() => {
    if (value.length === PIN_LENGTH) {
      inputRefs.current[PIN_LENGTH - 1]?.focus()
    }
  }, [value])

  return (
    <fieldset
      className={cn('flex gap-2 border-none p-0', className)}
      aria-label='Código de verificação'
    >
      {SLOTS.map((i) => (
        <input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el
          }}
          type='text'
          inputMode='numeric'
          maxLength={1}
          value={digits[i]}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          disabled={disabled}
          aria-label={`Dígito ${i + 1}`}
          aria-invalid={error}
          data-slot='pin-input'
          className={cn(
            'h-9 w-9 rounded-md border border-input bg-transparent text-center text-base font-medium outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground',
            'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
            'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
            'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          )}
        />
      ))}
    </fieldset>
  )
}

export { PinInput }
