import { http } from '@/shared/api/http'
import type {
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  VerifyTokenRequest,
} from '../types/auth-types'

export class AuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await http.post<LoginResponse>('/auth/login', data)
    return response.data
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await http.post('/auth/forgot-password', data)
  }

  async verifyToken(data: VerifyTokenRequest): Promise<void> {
    await http.post('/auth/verify-token', data)
  }

  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await http.post('/auth/reset-password', data)
  }
}
