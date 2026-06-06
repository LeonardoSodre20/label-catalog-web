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
import { UsersModule } from '@/modules/users/users.module'
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

const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users',
  beforeLoad: () => {
    const { token } = useAuthStore.getState()
    if (!token) {
      throw redirect({ to: '/' })
    }
  },
  component: UsersModule,
})

const routeTree = rootRoute.addChildren([
  authRoute,
  resetPasswordRoute,
  usersRoute,
])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export { router }
