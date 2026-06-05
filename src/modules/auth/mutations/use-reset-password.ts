import { useMutation } from '@tanstack/react-query'
import { AuthService } from '../services/auth.service'
import type { ResetPasswordRequest } from '../types/auth-types'

const authService = new AuthService()

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
  })
}
