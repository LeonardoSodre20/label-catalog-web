import { http } from '@/shared/api/http'
import type { User } from '../types/user-types'

export class UsersService {
  async list(): Promise<User[]> {
    const response = await http.get<User[]>('/users')
    return response.data
  }
}
