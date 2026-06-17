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
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { TypeOfLabelResponse } from '../types/type-of-label-types'

const editTypeSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional().default(''),
})

type EditTypeSchema = z.infer<typeof editTypeSchema>

interface EditTypeOfLabelDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  type: TypeOfLabelResponse | null
  onSubmit?: (data: EditTypeSchema) => void
  isPending?: boolean
}

export function EditTypeOfLabelDialog({
  open,
  onOpenChange,
  type,
  onSubmit,
  isPending = false,
}: EditTypeOfLabelDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditTypeSchema>({
    resolver: zodResolver(editTypeSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  useEffect(() => {
    if (type) {
      reset({
        name: type.name,
        description: type.description ?? '',
      })
    }
  }, [type, reset])

  const handleClose = () => {
    if (type) {
      reset({
        name: type.name,
        description: type.description ?? '',
      })
    }
    onOpenChange(false)
  }

  const handleFormSubmit = (data: EditTypeSchema) => {
    if (onSubmit) {
      onSubmit(data)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Editar tipo de etiqueta</DialogTitle>
          <DialogDescription>
            Altere os dados do tipo de etiqueta.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className='space-y-4'
          noValidate
        >
          <div className='space-y-2'>
            <Label htmlFor='edit-name'>Nome</Label>
            <Input
              id='edit-name'
              type='text'
              placeholder='Ex: Peça'
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
            <Label htmlFor='edit-description'>Descrição</Label>
            <Input
              id='edit-description'
              type='text'
              placeholder='Ex: Componente para montagem'
              maxLength={255}
              {...register('description')}
            />
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
