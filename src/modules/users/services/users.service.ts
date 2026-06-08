import { http } from '@/shared/api/http'
import type {
  CreateUserRequest,
  PaginatedResponse,
  UpdateUserRequest,
  User,
} from '../types/user-types'

export class UsersService {
  async list(
    page: number,
    size: number,
    search?: string,
  ): Promise<PaginatedResponse<User>> {
    const response = await http.get<PaginatedResponse<User>>('/users', {
      params: { page, size, ...(search && { search }) },
    })
    return response.data
  }

  async create(data: CreateUserRequest): Promise<User> {
    const response = await http.post<User>('/users', data)
    return response.data
  }

  async update(id: number, data: UpdateUserRequest): Promise<User> {
    const response = await http.put<User>(`/users/${id}`, data)
    return response.data
  }

  async delete(ids: number[]): Promise<void> {
    await http.delete('/users', { data: { ids } })
  }
}
