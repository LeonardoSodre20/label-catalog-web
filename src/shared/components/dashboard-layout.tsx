import { Outlet } from '@tanstack/react-router'

import { SidebarProvider } from '@/shared/components/ui/sidebar'
import { AppSidebar } from './app-sidebar'
import { DashboardHeader } from './dashboard-header'
import { DashboardToolbar } from './dashboard-toolbar'

export function DashboardLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <div className='flex flex-1 flex-col min-w-0'>
        <DashboardHeader />
        <DashboardToolbar />
        <main className='flex flex-1 flex-col bg-background p-6'>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
