import type { PaginatedResponse } from '@/modules/users/types/user-types'
import { http } from '@/shared/api/http'
import type {
  CreateLabelRequest,
  LabelResponse,
  UpdateLabelRequest,
  UploadResponse,
} from '../types/label-types'

export class LabelsService {
  async list(
    page: number,
    size: number,
    search?: string,
  ): Promise<PaginatedResponse<LabelResponse>> {
    const params: Record<string, number | string> = { page, size }
    if (search) params.search = search
    const response = await http.get<PaginatedResponse<LabelResponse>>(
      '/labels',
      { params },
    )
    return response.data
  }

  async getById(id: number): Promise<LabelResponse> {
    const response = await http.get<LabelResponse>(`/labels/${id}`)
    return response.data
  }

  async getByCodeRef(codeRef: string): Promise<LabelResponse> {
    const response = await http.get<LabelResponse>(
      `/labels/code-ref/${codeRef}`,
    )
    return response.data
  }

  async create(data: CreateLabelRequest): Promise<LabelResponse> {
    const response = await http.post<LabelResponse>('/labels', data)
    return response.data
  }

  async update(id: number, data: UpdateLabelRequest): Promise<LabelResponse> {
    const response = await http.put<LabelResponse>(`/labels/${id}`, data)
    return response.data
  }

  async delete(id: number): Promise<void> {
    await http.delete(`/labels/${id}`)
  }

  async uploadImage(file: File): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append('file', file)
    const response = await http.post<UploadResponse>('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  }
}
