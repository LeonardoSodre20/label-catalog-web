import { Controller, type UseFormReturn } from 'react-hook-form'

import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { SECTORS } from '../schemas/create-label-schema'
import type { CreateLabelSchema } from '../schemas/create-label-schema'
import { useCreateLabelStore } from '../stores/create-label-store'
import { ImageUpload } from './image-upload'

interface StepDataEntryProps {
  form: UseFormReturn<CreateLabelSchema>
}

export function StepDataEntry({ form }: StepDataEntryProps) {
  const { setStep, imagePreview, setImageFile } = useCreateLabelStore()
  const { register, control, formState } = form

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-lg font-medium text-foreground'>
          Dados da etiqueta
        </h2>
        <p className='mt-1 text-sm text-muted-foreground'>
          Preencha as informações da etiqueta
        </p>
      </div>

      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        {/* Código de referência */}
        <div className='space-y-2'>
          <Label htmlFor='referenceCode'>
            Código de referência <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='referenceCode'
            placeholder='Ex: PEC-001'
            autoFocus
            aria-invalid={!!formState.errors.referenceCode}
            {...register('referenceCode')}
          />
          {formState.errors.referenceCode && (
            <span className='text-sm text-destructive'>
              {formState.errors.referenceCode.message}
            </span>
          )}
        </div>

        {/* Nome */}
        <div className='space-y-2'>
          <Label htmlFor='name'>
            Nome <span className='text-destructive'>*</span>
          </Label>
          <Input
            id='name'
            placeholder='Ex: Suporte metálico 150mm'
            aria-invalid={!!formState.errors.name}
            {...register('name')}
          />
          {formState.errors.name && (
            <span className='text-sm text-destructive'>
              {formState.errors.name.message}
            </span>
          )}
        </div>

        {/* Descrição */}
        <div className='space-y-2'>
          <Label htmlFor='description'>Descrição</Label>
          <textarea
            id='description'
            placeholder='Ex: Suporte para fixação de peças na linha de montagem'
            className='flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 aria-[invalid=true]:border-destructive'
            {...register('description')}
          />
        </div>

        {/* Setor */}
        <div className='space-y-2'>
          <Label htmlFor='sector'>
            Setor <span className='text-destructive'>*</span>
          </Label>
          <Controller
            name='sector'
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  id='sector'
                  aria-invalid={!!formState.errors.sector}
                >
                  <SelectValue placeholder='Selecione um setor' />
                </SelectTrigger>
                <SelectContent>
                  {SECTORS.map((sector) => (
                    <SelectItem key={sector.value} value={sector.value}>
                      {sector.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {formState.errors.sector && (
            <span className='text-sm text-destructive'>
              {formState.errors.sector.message}
            </span>
          )}
        </div>

        {/* Linha de montagem */}
        <div className='space-y-2'>
          <Label htmlFor='assemblyLine'>Linha de montagem</Label>
          <Input
            id='assemblyLine'
            placeholder='Ex: Linha A'
            {...register('assemblyLine')}
          />
        </div>

        {/* Localização - Corredor */}
        <div className='space-y-2'>
          <Label htmlFor='aisle'>Localização (Corredor)</Label>
          <Input id='aisle' placeholder='Ex: C-01' {...register('aisle')} />
        </div>

        {/* Localização - Prateleira */}
        <div className='space-y-2'>
          <Label htmlFor='shelf'>Localização (Prateleira)</Label>
          <Input id='shelf' placeholder='Ex: P-05' {...register('shelf')} />
        </div>

        {/* Qtd. por caixa */}
        <div className='space-y-2'>
          <Label htmlFor='quantityPerBox'>Qtd. por caixa</Label>
          <Input
            id='quantityPerBox'
            type='number'
            min='1'
            placeholder='Ex: 50'
            {...register('quantityPerBox')}
          />
        </div>

        {/* Revisão / Versão */}
        <div className='space-y-2'>
          <Label htmlFor='revision'>Revisão / versão</Label>
          <Input
            id='revision'
            placeholder='Ex: Rev. 01'
            {...register('revision')}
          />
        </div>

        {/* Imagem da peça — ocupa largura total */}
        <div className='md:col-span-2'>
          <ImageUpload preview={imagePreview} onFileSelect={setImageFile} />
        </div>
      </div>

      <div className='flex justify-between'>
        <button
          type='button'
          className='inline-flex h-9 items-center justify-center gap-2 rounded-md border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent'
          onClick={() => setStep(1)}
        >
          Anterior
        </button>

        <button
          type='button'
          className='inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90'
          onClick={() => setStep(3)}
        >
          Próximo
        </button>
      </div>
    </div>
  )
}
