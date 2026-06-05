import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  type ForgotPasswordSchema,
  forgotPasswordSchema,
} from '../schemas/reset-password-schema'

export function useForgotPasswordForm() {
  return useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
}
