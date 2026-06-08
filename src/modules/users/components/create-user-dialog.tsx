import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import {
  type CreateUserSchema,
  createUserSchema,
} from '../schemas/create-user-schema'

interface CreateUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: CreateUserSchema) => void
  isPending?: boolean
}

export function CreateUserDialog({
  open,
  onOpenChange,
  onSubmit,
  isPending = false,
}: CreateUserDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const handleClose = () => {
    reset()
    onOpenChange(false)
  }

  const handleFormSubmit = (data: CreateUserSchema) => {
    if (onSubmit) {
      onSubmit(data)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Novo usuário</DialogTitle>
          <DialogDescription>
            Preencha os dados para cadastrar um novo usuário no sistema.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className='space-y-4'
          noValidate
        >
          <div className='space-y-2'>
            <Label htmlFor='name'>Nome completo</Label>
            <Input
              id='name'
              type='text'
              placeholder='Nome completo do usuário'
              autoFocus
              maxLength={100}
              aria-invalid={!!errors.name}
              {...register('name')}
            />
            {errors.name && (
              <span className='text-sm text-destructive'>
                {errors.name.message}
              </span>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='email@exemplo.com'
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
            <Label htmlFor='function'>Função</Label>
            <Controller
              name='function'
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ''}
                >
                  <SelectTrigger
                    id='function'
                    className='w-full'
                    aria-invalid={!!errors.function}
                  >
                    <SelectValue placeholder='Selecione uma função' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='ADMIN'>Administrador</SelectItem>
                    <SelectItem value='OPERATOR'>Operador</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.function && (
              <span className='text-sm text-destructive'>
                {errors.function.message}
              </span>
            )}
          </div>

          <DialogFooter className='pt-2'>
            <Button
              type='button'
              variant='outline'
              onClick={handleClose}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type='submit' disabled={isPending}>
              {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
