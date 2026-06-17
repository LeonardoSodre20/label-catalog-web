import { Link, useLocation } from '@tanstack/react-router'
import { BookOpen, Clock, Layers, Tag, Tags, Users } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/components/ui/sidebar'
import { cn } from '@/shared/lib/utils'

const navItems = [
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
  {
    label: 'Etiquetas',
    icon: Tags,
    path: '/dashboard/labels',
    disabled: false,
  },
  {
    label: 'Usuários',
    icon: Users,
    path: '/dashboard/users',
    disabled: false,
  },
  {
    label: 'Tipos de etiqueta',
    icon: Layers,
    path: '/dashboard/types-of-labels',
    disabled: false,
  },
]

export function AppSidebar() {
  const { pathname: currentPath } = useLocation()
  const { state } = useSidebar()
  const collapsed = state === 'collapsed'

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='flex-row items-center gap-2 border-b border-sidebar-border px-4 py-3'>
        <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent'>
          <Tag className='h-4 w-4 text-sidebar-foreground' />
        </div>
        <span
          className={cn(
            'truncate text-sm font-semibold text-sidebar-foreground transition-opacity duration-200',
            collapsed && 'opacity-0',
          )}
        >
          LabelCatalog
        </span>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className='gap-1.5'>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = !item.disabled && currentPath === item.path

            if (item.disabled) {
              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    disabled
                    tooltip={collapsed ? item.label : undefined}
                    className='h-9 py-1.5 pl-3'
                  >
                    <Icon className='size-4 shrink-0' />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            }

            return (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={collapsed ? item.label : undefined}
                  className='h-9 py-1.5 pl-3'
                >
                  <Link to={item.path}>
                    <Icon className='size-4 shrink-0' />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
