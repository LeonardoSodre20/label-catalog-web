import { Button } from '@/shared/components/ui/button'
import { Label } from '@/shared/components/ui/label'
import { PinInput } from '@/shared/components/ui/pin-input'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useResendCooldown } from '../hooks/use-resend-cooldown'
import { useResetPinForm } from '../hooks/use-reset-pin-form'
import { useForgotPassword } from '../mutations/use-forgot-password'
import { useVerifyToken } from '../mutations/use-verify-token'

interface ResetPinFormProps {
  email: string
  onSuccess: (token: string) => void
  onBack: () => void
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { error?: string } | undefined
    if (data?.error) return data.error
  }
  return 'Erro ao verificar o código. Tente novamente.'
}

export function ResetPinForm({ email, onSuccess, onBack }: ResetPinFormProps) {
  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useResetPinForm()

  const pin = watch('pin')
  const verifyTokenMutation = useVerifyToken()
  const forgotPasswordMutation = useForgotPassword()
  const { timeLeft, isBlocked, startCooldown } = useResendCooldown()

  const onSubmit = (data: { pin: string }) => {
    verifyTokenMutation.mutate(
      { email, token: data.pin },
      {
        onSuccess: () => {
          onSuccess(data.pin)
        },
      },
    )
  }

  const handleResend = () => {
    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success('Novo código enviado para seu e-mail')
          startCooldown()
        },
      },
    )
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-1.5'>
        <h2 className='text-xl font-medium text-foreground'>
          Verificar código
        </h2>
        <p className='text-sm text-muted-foreground'>
          Digite o código enviado para{' '}
          <span className='text-foreground'>{email}</span>
        </p>
      </div>

      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='space-y-2'>
          <Label htmlFor='pin'>Código de verificação</Label>
          <PinInput
            value={pin ?? ''}
            onValueChange={(value) =>
              setValue('pin', value, { shouldValidate: true })
            }
            error={!!errors.pin}
          />
          {errors.pin && (
            <span className='text-sm text-destructive'>
              {errors.pin.message}
            </span>
          )}
        </div>

        {verifyTokenMutation.isError && (
          <div className='rounded-md bg-destructive/10 p-3 text-sm text-destructive'>
            {getErrorMessage(verifyTokenMutation.error)}
          </div>
        )}

        <Button
          type='submit'
          className='w-full cursor-pointer'
          disabled={verifyTokenMutation.isPending}
        >
          {verifyTokenMutation.isPending ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Verificando...
            </>
          ) : (
            'Verificar código'
          )}
        </Button>
      </form>

      <div className='flex items-center justify-between'>
        <button
          type='button'
          onClick={onBack}
          className='cursor-pointer text-sm font-medium text-primary underline-offset-4 hover:underline'
        >
          Voltar
        </button>
        <button
          type='button'
          onClick={handleResend}
          disabled={isBlocked || forgotPasswordMutation.isPending}
          className='cursor-pointer text-sm font-medium text-primary underline-offset-4 hover:underline disabled:pointer-events-none disabled:opacity-50'
        >
          {forgotPasswordMutation.isPending
            ? 'Enviando...'
            : isBlocked
              ? `Reenviar código (${timeLeft}s)`
              : 'Reenviar código'}
        </button>
      </div>
    </div>
  )
}
