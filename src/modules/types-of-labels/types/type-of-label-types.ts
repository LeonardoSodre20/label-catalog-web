export interface TypeOfLabelResponse {
  id: number
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface CreateTypeOfLabelRequest {
  name: string
  description?: string
}

export interface UpdateTypeOfLabelRequest {
  name: string
  description?: string
}
