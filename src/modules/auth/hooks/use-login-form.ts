import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type LoginSchema, loginSchema } from '../schemas/login-schema'

export function useLoginForm() {
  return useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
}
