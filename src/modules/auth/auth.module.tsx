import { LoginForm } from './components/login-form'
import { LoginLayout } from './components/login-layout'

export function AuthModule() {
  return (
    <LoginLayout>
      <LoginForm />
    </LoginLayout>
  )
}
