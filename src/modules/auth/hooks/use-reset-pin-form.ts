import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  type ResetPinSchema,
  resetPinSchema,
} from '../schemas/reset-password-schema'

export function useResetPinForm() {
  return useForm<ResetPinSchema>({
    resolver: zodResolver(resetPinSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
}
