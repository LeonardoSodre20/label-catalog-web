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
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  type UpdateUserSchema,
  updateUserSchema,
} from '../schemas/update-user-schema'
import type { User } from '../types/user-types'

interface EditUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User | null
  onSubmit?: (data: UpdateUserSchema) => void
  isPending?: boolean
}

export function EditUserDialog({
  open,
  onOpenChange,
  user,
  onSubmit,
  isPending = false,
}: EditUserDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        function: user.function,
      })
    }
  }, [user, reset])

  const handleClose = () => {
    if (user) {
      reset({
        name: user.name,
        function: user.function,
      })
    }
    onOpenChange(false)
  }

  const handleFormSubmit = (data: UpdateUserSchema) => {
    if (onSubmit) {
      onSubmit(data)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
          <DialogDescription>Altere os dados do usuário.</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className='space-y-4'
          noValidate
        >
          <div className='space-y-2'>
            <Label htmlFor='edit-name'>Nome completo</Label>
            <Input
              id='edit-name'
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
            <Label>Email</Label>
            <div className='rounded-md border border-input px-3 py-1.5 text-sm text-muted-foreground'>
              {user?.email}
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='edit-function'>Função</Label>
            <Controller
              name='function'
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ''}
                >
                  <SelectTrigger
                    id='edit-function'
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
              Salvar alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
