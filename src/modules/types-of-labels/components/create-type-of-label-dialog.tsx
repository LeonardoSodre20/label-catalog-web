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
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createTypeSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional().default(''),
})

type CreateTypeSchema = z.infer<typeof createTypeSchema>

interface CreateTypeOfLabelDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: CreateTypeSchema) => void
  isPending?: boolean
}

export function CreateTypeOfLabelDialog({
  open,
  onOpenChange,
  onSubmit,
  isPending = false,
}: CreateTypeOfLabelDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTypeSchema>({
    resolver: zodResolver(createTypeSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const handleClose = () => {
    reset()
    onOpenChange(false)
  }

  const handleFormSubmit = (data: CreateTypeSchema) => {
    if (onSubmit) {
      onSubmit(data)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Novo tipo de etiqueta</DialogTitle>
          <DialogDescription>
            Preencha os dados para cadastrar um novo tipo de etiqueta.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className='space-y-4'
          noValidate
        >
          <div className='space-y-2'>
            <Label htmlFor='name'>Nome</Label>
            <Input
              id='name'
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
            <Label htmlFor='description'>Descrição</Label>
            <Input
              id='description'
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
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
