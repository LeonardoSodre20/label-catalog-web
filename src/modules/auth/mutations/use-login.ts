import { useMutation } from '@tanstack/react-query'
import { AuthService } from '../services/auth.service'
import type { LoginRequest } from '../types/auth-types'

const authService = new AuthService()

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
  })
}
