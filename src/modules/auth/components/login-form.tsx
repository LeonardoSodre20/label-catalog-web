import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { useLoginForm } from '../hooks/use-login-form'

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useLoginForm()

  return (
    <div className='space-y-6'>
      <div className='space-y-1.5'>
        <h2 className='text-xl font-medium text-foreground'>Acessar sistema</h2>
        <p className='text-sm text-muted-foreground'>
          Insira suas credenciais para continuar
        </p>
      </div>

      <form className='space-y-4' onSubmit={handleSubmit(() => {})} noValidate>
        <div className='space-y-2'>
          <Label htmlFor='email'>E-mail</Label>
          <Input
            id='email'
            type='email'
            placeholder='seu@email.com'
            autoComplete='email'
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
          <Input
            id='password'
            type='password'
            placeholder='••••••••'
            autoComplete='current-password'
            aria-invalid={!!errors.password}
            {...register('password')}
          />
          {errors.password && (
            <span className='text-sm text-destructive'>
              {errors.password.message}
            </span>
          )}
        </div>

        <Button
          type='submit'
          className='w-full cursor-pointer'
          disabled={!isValid}
        >
          Entrar
        </Button>
      </form>
    </div>
  )
}
