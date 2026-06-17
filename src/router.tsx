import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { AuthModule } from '@/modules/auth/auth.module'
import { ResetPasswordModule } from '@/modules/auth/reset-password.module'
import { LabelsCreateModule } from '@/modules/labels/labels-create.module'
import { LabelsModule } from '@/modules/labels/labels.module'
import { TypesOfLabelsModule } from '@/modules/types-of-labels/types-of-labels.module'
import { UsersModule } from '@/modules/users/users.module'
import { DashboardLayout } from '@/shared/components/dashboard-layout'
import { AppProvider } from '@/shared/providers/app-provider'
import { useAuthStore } from '@/shared/stores/auth-store'

const rootRoute = createRootRoute({
  component: () => (
    <AppProvider>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </AppProvider>
  ),
})

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: AuthModule,
})

const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reset-password',
  component: ResetPasswordModule,
})

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  beforeLoad: () => {
    const { token } = useAuthStore.getState()
    if (!token) {
      throw redirect({ to: '/' })
    }
  },
  component: DashboardLayout,
})

const usersRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/users',
  component: UsersModule,
})

const labelsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/labels',
  component: LabelsModule,
})

const labelsCreateRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/labels/new',
  component: LabelsCreateModule,
})

const typesOfLabelsRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/types-of-labels',
  component: TypesOfLabelsModule,
})

const routeTree = rootRoute.addChildren([
  authRoute,
  resetPasswordRoute,
  dashboardRoute.addChildren([
    usersRoute,
    labelsRoute,
    labelsCreateRoute,
    typesOfLabelsRoute,
  ]),
])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export { router }
