import { Outlet } from '@tanstack/react-router'
import { useState } from 'react'
import { DashboardHeader } from './dashboard-header'
import { DashboardSidebar } from './dashboard-sidebar'
import { DashboardToolbar } from './dashboard-toolbar'

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className='flex min-h-dvh'>
      <DashboardSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div className='flex flex-1 flex-col min-w-0'>
        <DashboardHeader onMenuClick={() => setMobileOpen(true)} />

        <DashboardToolbar />

        <main className='flex flex-1 flex-col bg-background p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
