import { AuthModule } from '@/modules/auth/auth.module'
import { AppProvider } from '@/shared/providers/app-provider'

export function App() {
  return (
    <AppProvider>
      <AuthModule />
    </AppProvider>
  )
}
