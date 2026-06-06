import { cn } from '@/shared/lib/utils'
import { useRouter } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
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

function SidebarPanel({
  collapsed,
  onToggle,
  onNavClick,
}: {
  collapsed: boolean
  onToggle: () => void
  onNavClick: () => void
}) {
  const router = useRouter()
  const currentPath = router.state.location.pathname

  return (
    <div
      className={cn(
        'flex h-full flex-col border-r border-border bg-sidebar overflow-hidden transition-all duration-200',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      <div
        className={cn(
          'flex shrink-0 items-center border-b border-primary-foreground/10 px-4 transition-all duration-200',
          collapsed ? 'h-16 justify-center' : 'h-14 gap-2',
        )}
      >
        <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10'>
          <Tag className='h-4 w-4 text-primary-foreground' />
        </div>
        <span
          className={cn(
            'truncate text-sm font-semibold text-primary-foreground transition-opacity duration-200',
            collapsed && 'opacity-0',
          )}
        >
          LabelCatalog
        </span>
      </div>

      <nav className='flex flex-1 flex-col gap-1 overflow-y-auto p-3'>
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = !item.disabled && currentPath === item.path

          return (
            <button
              key={item.path}
              type='button'
              disabled={item.disabled}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => {
                if (!item.disabled) {
                  router.navigate({ to: item.path })
                  onNavClick()
                }
              }}
              className={cn(
                'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
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
              <span
                className={cn(
                  'truncate transition-opacity duration-200',
                  collapsed && 'opacity-0',
                )}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>

      <div
        className={cn(
          'flex shrink-0 border-t border-primary-foreground/10 p-3 transition-all duration-200',
          collapsed && 'justify-center',
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
}

export function DashboardSidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
}: DashboardSidebarProps) {
  return (
    <>
      <div className='hidden lg:flex'>
        <SidebarPanel
          collapsed={collapsed}
          onToggle={onToggle}
          onNavClick={() => {}}
        />
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <div className='fixed inset-0 z-50 lg:hidden'>
            <motion.div
              className='absolute inset-0 bg-black/50'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onMobileClose}
              role='presentation'
            />
            <motion.div
              className='absolute left-0 top-0 h-full'
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              <SidebarPanel
                collapsed={collapsed}
                onToggle={onToggle}
                onNavClick={onMobileClose}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
