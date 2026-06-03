export const AUTH_KEYS = {
  session: ['auth', 'session'] as const,
}

export const USERS_KEYS = {
  list: ['users', 'list'] as const,
  detail: (id: string) => ['users', 'detail', id] as const,
}
