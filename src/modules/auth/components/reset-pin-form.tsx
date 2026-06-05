import { Button } from '@/shared/components/ui/button'
import { Label } from '@/shared/components/ui/label'
import { PinInput } from '@/shared/components/ui/pin-input'
import { useResetPinForm } from '../hooks/use-reset-pin-form'
import { useForgotPassword } from '../mutations/use-forgot-password'

interface ResetPinFormProps {
  email: string
  onSuccess: (token: string) => void
  onBack: () => void
}

export function ResetPinForm({ email, onSuccess, onBack }: ResetPinFormProps) {
  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useResetPinForm()

  const pin = watch('pin')
  const forgotPasswordMutation = useForgotPassword()

  const onSubmit = (data: { pin: string }) => {
    onSuccess(data.pin)
  }

  const handleResend = () => {
    forgotPasswordMutation.mutate({ email })
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

        <Button type='submit' className='w-full cursor-pointer'>
          Verificar código
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
          className='cursor-pointer text-sm font-medium text-primary underline-offset-4 hover:underline'
        >
          Reenviar código
        </button>
      </div>
    </div>
  )
}
