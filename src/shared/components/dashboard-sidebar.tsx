import { cn } from '@/shared/lib/utils'
import { useRouter } from '@tanstack/react-router'
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  PlusCircle,
  Tag,
  Users,
} from 'lucide-react'

interface NavItem {
  label: string
  icon: typeof Tag
  path: string
  disabled: boolean
}

const navItems: NavItem[] = [
  {
    label: 'Catálogo',
    icon: BookOpen,
    path: '/dashboard/catalog',
    disabled: true,
  },
  {
    label: 'Histórico',
    icon: Clock,
    path: '/dashboard/history',
    disabled: true,
  },
  { label: 'Usuários', icon: Users, path: '/dashboard/users', disabled: false },
  {
    label: '+ Nova Etiqueta',
    icon: PlusCircle,
    path: '/dashboard/labels/new',
    disabled: true,
  },
]

interface DashboardSidebarProps {
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

export function DashboardSidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: DashboardSidebarProps) {
  const router = useRouter()
  const currentPath = router.state.location.pathname

  const sidebarContent = (
    <div
      className={cn(
        'flex h-full flex-col border-r border-border bg-sidebar transition-all duration-200',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      <div
        className={cn(
          'flex items-center border-b border-primary-foreground/10 px-4',
          collapsed ? 'h-16 justify-center' : 'h-14 gap-2',
        )}
      >
        <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10'>
          <Tag className='h-4 w-4 text-primary-foreground' />
        </div>
        {!collapsed && (
          <span className='text-sm font-semibold text-primary-foreground'>
            LabelCatalog
          </span>
        )}
      </div>

      <nav className='flex flex-1 flex-col gap-1 p-3'>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = !item.disabled && currentPath === item.path

          return (
            <button
              key={item.path}
              type='button'
              disabled={item.disabled}
              onClick={() => {
                if (!item.disabled) {
                  router.navigate({ to: item.path })
                  onMobileClose()
                }
              }}
              className={cn(
                'flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                collapsed && 'justify-center px-0',
                isActive && 'bg-primary-foreground/10 text-primary-foreground',
                !isActive &&
                  !item.disabled &&
                  'text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground',
                item.disabled &&
                  'cursor-not-allowed text-primary-foreground/30',
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon className='h-4 w-4 shrink-0' />
              {!collapsed && <span className='truncate'>{item.label}</span>}
            </button>
          )
        })}
      </nav>

      <div
        className={cn(
          'border-t border-primary-foreground/10 p-3',
          collapsed && 'flex justify-center',
        )}
      >
        <button
          type='button'
          onClick={onToggle}
          className='flex cursor-pointer items-center justify-center rounded-md p-2 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground'
          aria-label={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          {collapsed ? (
            <ChevronRight className='h-4 w-4' />
          ) : (
            <ChevronLeft className='h-4 w-4' />
          )}
        </button>
      </div>
    </div>
  )

  return (
    <>
      <div className='hidden lg:flex'>{sidebarContent}</div>

      {mobileOpen && (
        <div className='fixed inset-0 z-50 lg:hidden'>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: overlay backdrop is non-interactive, Escape handled by parent */}
          <div
            className='absolute inset-0 bg-black/50'
            onClick={onMobileClose}
            role='presentation'
          />
          <div className='absolute left-0 top-0 h-full'>{sidebarContent}</div>
        </div>
      )}
    </>
  )
}
