import { useMutation } from '@tanstack/react-query'
import { AuthService } from '../services/auth.service'
import type { ForgotPasswordRequest } from '../types/auth-types'

const authService = new AuthService()

export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      authService.forgotPassword(data),
  })
}
