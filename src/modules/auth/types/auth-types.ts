export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface User {
  id: string
  name: string
  email: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPinRequest {
  email: string
  token: string
}

export interface ResetPasswordRequest {
  email: string
  token: string
  password: string
  passwordConfirmation: string
}
