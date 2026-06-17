import type { PaginatedResponse } from '@/modules/users/types/user-types'
import { http } from '@/shared/api/http'
import type {
  CreateTypeOfLabelRequest,
  TypeOfLabelResponse,
  UpdateTypeOfLabelRequest,
} from '../types/type-of-label-types'

export class TypesOfLabelsService {
  async list(
    page: number,
    size: number,
    search?: string,
  ): Promise<PaginatedResponse<TypeOfLabelResponse>> {
    const params: Record<string, number | string> = { page, size }
    if (search) params.search = search
    const response = await http.get<PaginatedResponse<TypeOfLabelResponse>>(
      '/types-of-labels',
      { params },
    )
    return response.data
  }

  async getById(id: number): Promise<TypeOfLabelResponse> {
    const response = await http.get<TypeOfLabelResponse>(
      `/types-of-labels/${id}`,
    )
    return response.data
  }

  async create(data: CreateTypeOfLabelRequest): Promise<TypeOfLabelResponse> {
    const response = await http.post<TypeOfLabelResponse>(
      '/types-of-labels',
      data,
    )
    return response.data
  }

  async update(
    id: number,
    data: UpdateTypeOfLabelRequest,
  ): Promise<TypeOfLabelResponse> {
    const response = await http.put<TypeOfLabelResponse>(
      `/types-of-labels/${id}`,
      data,
    )
    return response.data
  }

  async delete(id: number): Promise<void> {
    await http.delete(`/types-of-labels/${id}`)
  }
}
