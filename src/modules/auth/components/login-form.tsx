import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'

export function LoginForm() {
  return (
    <div className='space-y-6'>
      <div className='space-y-1.5'>
        <h2 className='text-xl font-semibold text-slate-900'>
          Acessar sistema
        </h2>
        <p className='text-sm text-slate-500'>
          Insira suas credenciais para continuar
        </p>
      </div>

      <form className='space-y-4' onSubmit={(e) => e.preventDefault()}>
        <div className='space-y-2'>
          <Label htmlFor='email'>E-mail</Label>
          <Input
            id='email'
            type='email'
            placeholder='seu@email.com'
            autoComplete='email'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='password'>Senha</Label>
          <Input
            id='password'
            type='password'
            placeholder='••••••••'
            autoComplete='current-password'
          />
        </div>

        <Button
          type='submit'
          className='w-full cursor-pointer bg-blue-950 text-white hover:bg-blue-900'
        >
          Entrar
        </Button>
      </form>
    </div>
  )
}
