import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'

import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import { ArrowLeft, X } from 'lucide-react'
import { CreateLabelStepper } from './components/create-label-stepper'
import { StepDataEntry } from './components/step-data-entry'
import { StepPreview } from './components/step-preview'
import { StepTypeSelection } from './components/step-type-selection'
import {
  type CreateLabelSchema,
  createLabelSchema,
} from './schemas/create-label-schema'
import { useCreateLabelStore } from './stores/create-label-store'

export function LabelsCreateModule() {
  const navigate = useNavigate()
  const { step, reset } = useCreateLabelStore()

  const form = useForm<CreateLabelSchema>({
    resolver: zodResolver(createLabelSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      referenceCode: '',
      name: '',
      description: '',
      sector: '',
      assemblyLine: '',
      aisle: '',
      shelf: '',
      quantityPerBox: '',
      revision: '',
    },
  })

  const handleCancel = () => {
    reset()
    form.reset()
    navigate({ to: '/dashboard/labels' })
  }

  return (
    <div className='flex flex-1 flex-col gap-6 p-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <button
            type='button'
            onClick={handleCancel}
            className='flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground'
            aria-label='Voltar'
          >
            <ArrowLeft className='h-4 w-4' />
          </button>
          <div>
            <h1 className='text-xl font-medium text-foreground'>
              Nova etiqueta
            </h1>
            <p className='text-sm text-muted-foreground'>
              Criação de etiqueta em 3 etapas
            </p>
          </div>
        </div>

        <Button variant='ghost' size='sm' onClick={handleCancel}>
          <X className='mr-1.5 h-4 w-4' />
          Cancelar
        </Button>
      </div>

      <Separator />

      {/* Stepper indicator */}
      <CreateLabelStepper currentStep={step} />

      {/* Step content */}
      <div className='mx-auto w-full max-w-2xl'>
        {step === 1 && <StepTypeSelection />}
        {step === 2 && <StepDataEntry form={form} />}
        {step === 3 && <StepPreview form={form} />}
      </div>
    </div>
  )
}
