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
import { z } from 'zod'
import type { LabelResponse } from '../types/label-types'

const editLabelSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional().default(''),
  sector: z.string().min(1, 'Selecione um setor'),
  assemblyLine: z.string().optional().default(''),
  aisle: z.string().optional().default(''),
  shelf: z.string().optional().default(''),
  quantityPerBox: z.string().optional().default(''),
  revision: z.string().optional().default(''),
})

type EditLabelSchema = z.infer<typeof editLabelSchema>

const SECTORS = [
  { value: 'PRODUCAO', label: 'Produção' },
  { value: 'MONTAGEM', label: 'Montagem' },
  { value: 'EXPEDICAO', label: 'Expedição' },
  { value: 'ALMOXARIFADO', label: 'Almoxarifado' },
  { value: 'QUALIDADE', label: 'Qualidade' },
  { value: 'MANUTENCAO', label: 'Manutenção' },
]

interface EditLabelDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  label: LabelResponse | null
  onSubmit?: (data: EditLabelSchema) => void
  isPending?: boolean
}

export function EditLabelDialog({
  open,
  onOpenChange,
  label,
  onSubmit,
  isPending = false,
}: EditLabelDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EditLabelSchema>({
    resolver: zodResolver(editLabelSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  useEffect(() => {
    if (label) {
      reset({
        name: label.name,
        description: label.description ?? '',
        sector: label.sector ?? '',
        assemblyLine: label.fields?.assemblyLine ?? '',
        aisle: label.fields?.aisle ?? '',
        shelf: label.fields?.shelf ?? '',
        quantityPerBox: label.qtdByBatch ? String(label.qtdByBatch) : '',
        revision: label.fields?.revision ?? '',
      })
    }
  }, [label, reset])

  const handleClose = () => {
    if (label) {
      reset({
        name: label.name,
        description: label.description ?? '',
        sector: label.sector ?? '',
        assemblyLine: label.fields?.assemblyLine ?? '',
        aisle: label.fields?.aisle ?? '',
        shelf: label.fields?.shelf ?? '',
        quantityPerBox: label.qtdByBatch ? String(label.qtdByBatch) : '',
        revision: label.fields?.revision ?? '',
      })
    }
    onOpenChange(false)
  }

  const handleFormSubmit = (data: EditLabelSchema) => {
    if (onSubmit) {
      onSubmit(data)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Editar etiqueta</DialogTitle>
          <DialogDescription>Altere os dados da etiqueta.</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className='space-y-4'
          noValidate
        >
          {/* Read-only: Código de referência */}
          <div className='space-y-2'>
            <Label>Código de referência</Label>
            <div className='rounded-md border border-input px-3 py-1.5 text-sm text-muted-foreground'>
              {label?.codeRef}
            </div>
          </div>

          {/* Read-only: Tipo */}
          <div className='space-y-2'>
            <Label>Tipo</Label>
            <div className='rounded-md border border-input px-3 py-1.5 text-sm text-muted-foreground'>
              {label?.typeName}
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {/* Nome */}
            <div className='space-y-2'>
              <Label htmlFor='edit-name'>
                Nome <span className='text-destructive'>*</span>
              </Label>
              <Input
                id='edit-name'
                placeholder='Ex: Suporte metálico 150mm'
                autoFocus
                aria-invalid={!!errors.name}
                {...register('name')}
              />
              {errors.name && (
                <span className='text-sm text-destructive'>
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Setor */}
            <div className='space-y-2'>
              <Label htmlFor='edit-sector'>
                Setor <span className='text-destructive'>*</span>
              </Label>
              <Controller
                name='sector'
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      id='edit-sector'
                      aria-invalid={!!errors.sector}
                    >
                      <SelectValue placeholder='Selecione um setor' />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTORS.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.sector && (
                <span className='text-sm text-destructive'>
                  {errors.sector.message}
                </span>
              )}
            </div>

            {/* Descrição */}
            <div className='space-y-2 md:col-span-2'>
              <Label htmlFor='edit-description'>Descrição</Label>
              <textarea
                id='edit-description'
                placeholder='Ex: Suporte para fixação de peças'
                className='flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 aria-[invalid=true]:border-destructive'
                {...register('description')}
              />
            </div>

            {/* Linha de montagem */}
            <div className='space-y-2'>
              <Label htmlFor='edit-assemblyLine'>Linha de montagem</Label>
              <Input
                id='edit-assemblyLine'
                placeholder='Ex: Linha A'
                {...register('assemblyLine')}
              />
            </div>

            {/* Localização - Corredor */}
            <div className='space-y-2'>
              <Label htmlFor='edit-aisle'>Localização (Corredor)</Label>
              <Input
                id='edit-aisle'
                placeholder='Ex: C-01'
                {...register('aisle')}
              />
            </div>

            {/* Localização - Prateleira */}
            <div className='space-y-2'>
              <Label htmlFor='edit-shelf'>Localização (Prateleira)</Label>
              <Input
                id='edit-shelf'
                placeholder='Ex: P-05'
                {...register('shelf')}
              />
            </div>

            {/* Qtd. por caixa */}
            <div className='space-y-2'>
              <Label htmlFor='edit-qty'>Qtd. por caixa</Label>
              <Input
                id='edit-qty'
                type='number'
                min='1'
                placeholder='Ex: 50'
                {...register('quantityPerBox')}
              />
            </div>

            {/* Revisão / Versão */}
            <div className='space-y-2'>
              <Label htmlFor='edit-revision'>Revisão / versão</Label>
              <Input
                id='edit-revision'
                placeholder='Ex: Rev. 01'
                {...register('revision')}
              />
            </div>
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
