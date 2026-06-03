import type { ReactNode } from 'react'

interface AuthModuleProps {
  children: ReactNode
}

export function AuthModule({ children }: AuthModuleProps) {
  return <>{children}</>
}
