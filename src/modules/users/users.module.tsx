import type { ReactNode } from 'react'

interface UsersModuleProps {
  children: ReactNode
}

export function UsersModule({ children }: UsersModuleProps) {
  return <>{children}</>
}
