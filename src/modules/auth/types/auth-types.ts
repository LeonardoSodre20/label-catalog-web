export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  type: string
  email: string
  function: string
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
  confirmPassword: string
}

export interface VerifyTokenRequest {
  email: string
  token: string
}

export interface ApiError {
  error: string
}
