import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import axios from 'axios'
import { useState } from 'react'
import { useForgotPasswordForm } from '../hooks/use-forgot-password-form'
import { useForgotPassword } from '../mutations/use-forgot-password'

interface ForgotPasswordFormProps {
  onSuccess: (email: string) => void
  onBackToLogin: () => void
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { error?: string } | undefined
    if (data?.error) return data.error
    if (error.response?.status === 404) return 'E-mail não encontrado'
  }
  return 'Erro ao enviar código. Tente novamente.'
}

export function ForgotPasswordForm({
  onSuccess,
  onBackToLogin,
}: ForgotPasswordFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const forgotPasswordMutation = useForgotPassword()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForgotPasswordForm()

  const onSubmit = (data: { email: string }) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        setSubmitted(true)
        onSuccess(data.email)
      },
    })
  }

  if (submitted) {
    return (
      <div className='space-y-6'>
        <div className='space-y-1.5'>
          <h2 className='text-xl font-medium text-foreground'>
            E-mail enviado
          </h2>
          <p className='text-sm text-muted-foreground'>
            Enviamos um código de verificação para seu e-mail. Siga as
            instruções para redefinir sua senha.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-1.5'>
        <h2 className='text-xl font-medium text-foreground'>Recuperar senha</h2>
        <p className='text-sm text-muted-foreground'>
          Insira seu e-mail para receber o código de verificação
        </p>
      </div>

      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='space-y-2'>
          <Label htmlFor='email'>E-mail</Label>
          <Input
            id='email'
            type='email'
            placeholder='seu@email.com'
            autoComplete='email'
            autoFocus
            maxLength={100}
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <span className='text-sm text-destructive'>
              {errors.email.message}
            </span>
          )}
        </div>

        {forgotPasswordMutation.isError && (
          <div className='rounded-md bg-destructive/10 p-3 text-sm text-destructive'>
            {getErrorMessage(forgotPasswordMutation.error)}
          </div>
        )}

        <Button
          type='submit'
          className='w-full cursor-pointer'
          disabled={forgotPasswordMutation.isPending}
        >
          {forgotPasswordMutation.isPending ? 'Enviando...' : 'Enviar código'}
        </Button>
      </form>

      <button
        type='button'
        onClick={onBackToLogin}
        className='w-full cursor-pointer text-center text-sm font-medium text-primary underline-offset-4 hover:underline'
      >
        Voltar ao login
      </button>
    </div>
  )
}
