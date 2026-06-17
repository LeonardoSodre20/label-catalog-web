import { useNavigate } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/shared/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Separator } from '@/shared/components/ui/separator'
import { useCreateLabel } from '../mutations/use-create-label'
import { SECTORS } from '../schemas/create-label-schema'
import type { CreateLabelSchema } from '../schemas/create-label-schema'
import { LabelsService } from '../services/labels.service'
import { useCreateLabelStore } from '../stores/create-label-store'
import { LabelPreviewCard } from './label-preview-card'

const labelsService = new LabelsService()

interface StepPreviewProps {
  form: UseFormReturn<CreateLabelSchema>
}

export function StepPreview({ form }: StepPreviewProps) {
  const navigate = useNavigate()
  const { setStep, selectedType, reset, imageFile } = useCreateLabelStore()
  const createLabel = useCreateLabel()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const data = form.watch()

  const sectorLabel = SECTORS.find((s) => s.value === data.sector)?.label

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)

    try {
      let imageId: number | undefined

      if (imageFile) {
        const uploaded = await labelsService.uploadImage(imageFile)
        imageId = uploaded.id
      }

      const fields: Record<string, string> = {}
      if (data.assemblyLine) fields.assemblyLine = data.assemblyLine
      if (data.aisle) fields.aisle = data.aisle
      if (data.shelf) fields.shelf = data.shelf
      if (data.revision) fields.revision = data.revision

      const localization =
        [data.aisle, data.shelf].filter(Boolean).join(' / ') || undefined

      await createLabel.mutateAsync({
        name: data.name,
        codeRef: data.referenceCode,
        typeName: selectedType ?? '',
        description: data.description || undefined,
        sector: data.sector,
        qtdByBatch: data.quantityPerBox
          ? Number(data.quantityPerBox)
          : undefined,
        localization,
        fields: Object.keys(fields).length > 0 ? fields : undefined,
        imageId,
      })

      toast.success('Etiqueta criada com sucesso!')
      reset()
      form.reset()
      navigate({ to: '/dashboard/labels' })
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao criar etiqueta'
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }, [createLabel, data, form, imageFile, navigate, reset, selectedType])

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-lg font-medium text-foreground'>
          Revisão da etiqueta
        </h2>
        <p className='mt-1 text-sm text-muted-foreground'>
          Verifique os dados antes de criar a etiqueta
        </p>
      </div>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        {/* Preview da etiqueta */}
        <div>
          <p className='mb-3 text-sm font-medium text-muted-foreground'>
            Preview da etiqueta
          </p>
          <LabelPreviewCard data={data} />
        </div>

        {/* Dados */}
        <div>
          <p className='mb-3 text-sm font-medium text-muted-foreground'>
            Dados inseridos
          </p>
          <Card>
            <CardHeader className='pb-3'>
              <CardTitle className='text-sm'>Resumo</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <DataRow label='Tipo' value={selectedType} />
              <DataRow label='Código' value={data.referenceCode} />
              <DataRow label='Nome' value={data.name} />
              {data.description && (
                <DataRow label='Descrição' value={data.description} />
              )}
              <DataRow label='Setor' value={sectorLabel ?? data.sector} />
              <Separator />

              {data.assemblyLine && (
                <DataRow label='Linha de montagem' value={data.assemblyLine} />
              )}
              {data.aisle && <DataRow label='Corredor' value={data.aisle} />}
              {data.shelf && <DataRow label='Prateleira' value={data.shelf} />}
              {data.quantityPerBox && (
                <DataRow
                  label='Qtd. por caixa'
                  value={String(data.quantityPerBox)}
                />
              )}
              {data.revision && (
                <DataRow label='Revisão' value={data.revision} />
              )}
              <DataRow
                label='Imagem'
                value={imageFile ? 'Anexada' : 'Sem imagem'}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className='flex justify-between'>
        <button
          type='button'
          className='inline-flex h-9 items-center justify-center gap-2 rounded-md border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent'
          onClick={() => setStep(2)}
          disabled={isSubmitting}
        >
          Anterior
        </button>

        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Criando…' : 'Criar etiqueta'}
        </Button>
      </div>
    </div>
  )
}

function DataRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className='flex justify-between gap-4'>
      <span className='text-sm text-muted-foreground'>{label}</span>
      <span className='text-sm font-medium text-foreground'>
        {value || '---'}
      </span>
    </div>
  )
}
