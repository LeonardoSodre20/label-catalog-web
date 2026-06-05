import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  type ResetPasswordSchema,
  resetPasswordSchema,
} from '../schemas/reset-password-schema'

export function useResetPasswordForm() {
  return useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
}
