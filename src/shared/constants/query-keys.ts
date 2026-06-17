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

export const LABELS_KEYS = {
  list: ['labels', 'list'] as const,
  detail: (id: number) => ['labels', 'detail', id] as const,
}

export const TYPES_OF_LABELS_KEYS = {
  list: ['types-of-labels', 'list'] as const,
  detail: (id: number) => ['types-of-labels', 'detail', id] as const,
}
