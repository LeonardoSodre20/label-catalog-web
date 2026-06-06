import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { useAuthStore } from '@/shared/stores/auth-store'
import { useRouter } from '@tanstack/react-router'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { useLoginForm } from '../hooks/use-login-form'
import { useLogin } from '../mutations/use-login'

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { error?: string } | undefined
    if (data?.error) return data.error
    if (error.response?.status === 401) return 'E-mail ou senha inválidos'
    if (error.response?.status === 400) return 'Dados inválidos'
  }
  return 'Erro ao fazer login. Tente novamente.'
}

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const loginMutation = useLogin()
  const setSession = useAuthStore((state) => state.setSession)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useLoginForm()

  const onSubmit = (data: { email: string; password: string }) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        setSession({
          token: response.token,
          email: response.email,
          function: response.function,
        })
        toast.success('Login realizado com sucesso')
        router.navigate({ to: '/dashboard/users' })
      },
    })
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-1.5'>
        <h2 className='text-xl font-medium text-foreground'>Acessar sistema</h2>
        <p className='text-sm text-muted-foreground'>
          Insira suas credenciais para continuar
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

        <div className='space-y-2'>
          <Label htmlFor='password'>Senha</Label>
          <div className='relative'>
            <Input
              id='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='••••••••'
              autoComplete='current-password'
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

        {loginMutation.isError && (
          <div className='rounded-md bg-destructive/10 p-3 text-sm text-destructive'>
            {getErrorMessage(loginMutation.error)}
          </div>
        )}

        <Button
          type='submit'
          className='w-full cursor-pointer'
          disabled={!isValid || loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Entrando...
            </>
          ) : (
            'Entrar'
          )}
        </Button>
      </form>

      <button
        type='button'
        onClick={() => router.navigate({ to: '/reset-password' })}
        className='block w-full cursor-pointer text-center text-sm font-medium text-primary underline-offset-4 hover:underline'
      >
        Esqueci minha senha
      </button>
    </div>
  )
}
