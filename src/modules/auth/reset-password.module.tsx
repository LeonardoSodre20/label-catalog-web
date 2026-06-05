import { useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { ForgotPasswordForm } from './components/forgot-password-form'
import { LoginLayout } from './components/login-layout'
import { ResetPasswordForm } from './components/reset-password-form'
import { ResetPinForm } from './components/reset-pin-form'

export function ResetPasswordModule() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')

  const handleBackToLogin = () => {
    router.navigate({ to: '/' })
  }

  const handleResetSuccess = () => {
    router.navigate({ to: '/' })
  }

  return (
    <LoginLayout>
      {step === 1 && (
        <ForgotPasswordForm
          onSuccess={(e) => {
            setEmail(e)
            setStep(2)
          }}
          onBackToLogin={handleBackToLogin}
        />
      )}
      {step === 2 && (
        <ResetPinForm
          email={email}
          onSuccess={(t) => {
            setToken(t)
            setStep(3)
          }}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <ResetPasswordForm
          email={email}
          token={token}
          onSuccess={handleResetSuccess}
          onBack={() => setStep(2)}
        />
      )}
    </LoginLayout>
  )
}
