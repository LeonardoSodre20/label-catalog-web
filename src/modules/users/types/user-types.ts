export type UserFunction = 'ADMIN' | 'OPERATOR'

export interface User {
  id: number
  name: string
  email: string
  function: UserFunction
  firstAccess: boolean
  createdAt: string
  updatedAt?: string
}

export interface CreateUserRequest {
  name: string
  email: string
  function: UserFunction
}

export interface UpdateUserRequest {
  name: string
  function: UserFunction
}

export interface PaginatedResponse<T> {
  content: T[]
  totalPages: number
  totalElements: number
  number: number
  size: number
  empty: boolean
}
