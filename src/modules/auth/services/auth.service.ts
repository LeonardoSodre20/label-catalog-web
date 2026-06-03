import { http } from '@/shared/api/http'
import type { LoginRequest, LoginResponse } from '../types/auth-types'

export class AuthService {
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await http.post<LoginResponse>('/auth/login', data)
    return response.data
  }
}
