import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import axios from 'axios'
import { useState } from 'react'
import { useResetPasswordForm } from '../hooks/use-reset-password-form'
import { useResetPassword } from '../mutations/use-reset-password'

interface ResetPasswordFormProps {
  email: string
  token: string
  onSuccess: () => void
  onBack: () => void
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { error?: string } | undefined
    if (data?.error) return data.error
  }
  return 'Erro ao redefinir senha. Tente novamente.'
}

export function ResetPasswordForm({
  email,
  token,
  onSuccess,
  onBack,
}: ResetPasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const resetPasswordMutation = useResetPassword()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useResetPasswordForm()

  const onSubmit = (data: {
    password: string
    confirmPassword: string
  }) => {
    resetPasswordMutation.mutate(
      { email, token, ...data },
      { onSuccess: () => onSuccess() },
    )
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-1.5'>
        <h2 className='text-xl font-medium text-foreground'>Nova senha</h2>
        <p className='text-sm text-muted-foreground'>
          Escolha uma nova senha para sua conta
        </p>
      </div>

      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='space-y-2'>
          <Label htmlFor='password'>Nova senha</Label>
          <div className='relative'>
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='••••••••'
              autoComplete='new-password'
              maxLength={128}
              className='pr-10'
              aria-invalid={!!errors.password}
              {...register('password')}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-muted-foreground hover:text-foreground'
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              tabIndex={-1}
            >
              {showPassword ? (
                <svg
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                  />
                </svg>
              ) : (
                <svg
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <span className='text-sm text-destructive'>
              {errors.password.message}
            </span>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='confirmPassword'>Confirmar senha</Label>
          <div className='relative'>
            <Input
              id='confirmPassword'
              type={showConfirmation ? 'text' : 'password'}
              placeholder='••••••••'
              autoComplete='new-password'
              maxLength={128}
              className='pr-10'
              aria-invalid={!!errors.confirmPassword}
              {...register('confirmPassword')}
            />
            <button
              type='button'
              onClick={() => setShowConfirmation(!showConfirmation)}
              className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-muted-foreground hover:text-foreground'
              aria-label={showConfirmation ? 'Ocultar senha' : 'Mostrar senha'}
              tabIndex={-1}
            >
              {showConfirmation ? (
                <svg
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                  />
                </svg>
              ) : (
                <svg
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className='text-sm text-destructive'>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {resetPasswordMutation.isError && (
          <div className='rounded-md bg-destructive/10 p-3 text-sm text-destructive'>
            {getErrorMessage(resetPasswordMutation.error)}
          </div>
        )}

        <Button
          type='submit'
          className='w-full cursor-pointer'
          disabled={resetPasswordMutation.isPending}
        >
          {resetPasswordMutation.isPending
            ? 'Redefinindo...'
            : 'Redefinir senha'}
        </Button>
      </form>

      <button
        type='button'
        onClick={onBack}
        className='block w-full cursor-pointer text-center text-sm font-medium text-primary underline-offset-4 hover:underline'
      >
        Voltar
      </button>
    </div>
  )
}
