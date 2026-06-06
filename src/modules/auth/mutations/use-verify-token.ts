import { useMutation } from '@tanstack/react-query'
import { AuthService } from '../services/auth.service'
import type { VerifyTokenRequest } from '../types/auth-types'

const authService = new AuthService()

export function useVerifyToken() {
  return useMutation({
    mutationFn: (data: VerifyTokenRequest) => authService.verifyToken(data),
  })
}
