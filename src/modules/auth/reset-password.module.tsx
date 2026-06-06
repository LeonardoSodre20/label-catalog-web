import { useRouter } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'
import { ForgotPasswordForm } from './components/forgot-password-form'
import { LoginLayout } from './components/login-layout'
import { ResetPasswordForm } from './components/reset-password-form'
import { ResetPinForm } from './components/reset-pin-form'

const stepVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: [0.25, 1, 0.5, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.15, ease: [0.25, 1, 0.5, 1] as const },
  },
}

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
      <div className='relative'>
        <button
          type='button'
          onClick={handleBackToLogin}
          className='absolute -top-2 right-0 cursor-pointer rounded-md p-1 text-muted-foreground transition-colors hover:bg-primary-foreground/10 hover:text-foreground'
          aria-label='Fechar'
        >
          <X className='h-4 w-4' />
        </button>

        <AnimatePresence mode='wait'>
          {step === 1 && (
            <motion.div
              key='step-1'
              variants={stepVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <ForgotPasswordForm
                onSuccess={(e) => {
                  setEmail(e)
                  setStep(2)
                }}
                onBackToLogin={handleBackToLogin}
              />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key='step-2'
              variants={stepVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <ResetPinForm
                email={email}
                onSuccess={(t) => {
                  setToken(t)
                  setStep(3)
                }}
                onBack={() => setStep(1)}
              />
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              key='step-3'
              variants={stepVariants}
              initial='initial'
              animate='animate'
              exit='exit'
            >
              <ResetPasswordForm
                email={email}
                token={token}
                onSuccess={handleResetSuccess}
                onBack={() => setStep(2)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LoginLayout>
  )
}
