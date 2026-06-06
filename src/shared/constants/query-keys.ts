export const AUTH_KEYS = {
  session: ['auth', 'session'] as const,
  forgotPassword: ['auth', 'forgot-password'] as const,
  verifyToken: ['auth', 'verify-token'] as const,
  resetPassword: ['auth', 'reset-password'] as const,
}

export const USERS_KEYS = {
  list: ['users', 'list'] as const,
  detail: (id: string) => ['users', 'detail', id] as const,
}
