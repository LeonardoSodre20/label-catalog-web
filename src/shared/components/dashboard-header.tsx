import { Link, useRouter } from '@tanstack/react-router'
import { LogOut, Tag } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { SidebarTrigger } from '@/shared/components/ui/sidebar'
import { useInitials } from '@/shared/hooks/use-initials'
import { useAuthStore } from '@/shared/stores/auth-store'

export function DashboardHeader() {
  const router = useRouter()
  const email = useAuthStore((state) => state.email)
  const initials = useInitials(email)
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = () => {
    setLoggingOut(true)
    useAuthStore.getState().clearSession()
    toast.success('Sessão encerrada')
    router.navigate({ to: '/' })
  }

  return (
    <header className='flex h-14 items-center border-b border-border bg-background px-4'>
      <SidebarTrigger className='mr-3' />

      <Link to='/dashboard/users' className='flex items-center gap-2 lg:hidden'>
        <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
          <Tag className='h-4 w-4 text-primary-foreground' />
        </div>
        <span className='text-sm font-semibold text-foreground'>
          LabelCatalog
        </span>
      </Link>

      <div className='ml-auto flex items-center gap-3'>
        <div
          className='flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground'
          aria-label={email ?? undefined}
        >
          {initials}
        </div>
        <div className='hidden flex-col sm:flex'>
          <span className='text-sm font-medium text-foreground'>{email}</span>
        </div>
        <button
          type='button'
          onClick={handleLogout}
          disabled={loggingOut}
          className='flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50'
          aria-label='Sair'
        >
          <LogOut className='h-4 w-4' />
          <span className='hidden sm:inline'>
            {loggingOut ? 'Saindo...' : 'Sair'}
          </span>
        </button>
      </div>
    </header>
  )
}
