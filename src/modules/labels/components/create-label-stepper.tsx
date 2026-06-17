import { cn } from '@/shared/lib/utils'
import { Check } from 'lucide-react'

interface Step {
  number: number
  label: string
}

const STEPS: Step[] = [
  { number: 1, label: 'Tipo' },
  { number: 2, label: 'Dados' },
  { number: 3, label: 'Revisão' },
]

interface CreateLabelStepperProps {
  currentStep: number
}

export function CreateLabelStepper({ currentStep }: CreateLabelStepperProps) {
  return (
    <div className='flex items-center justify-center gap-0'>
      {STEPS.map((step, index) => {
        const isCompleted = currentStep > step.number
        const isCurrent = currentStep === step.number
        const isLast = index === STEPS.length - 1

        return (
          <div key={step.number} className='flex items-center'>
            {/* Step indicator */}
            <div className='flex flex-col items-center gap-1.5'>
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors',
                  isCompleted && 'bg-primary text-primary-foreground',
                  isCurrent &&
                    'border-2 border-primary bg-primary/10 text-primary',
                  !isCompleted &&
                    !isCurrent &&
                    'border border-border text-muted-foreground',
                )}
              >
                {isCompleted ? <Check className='h-4 w-4' /> : step.number}
              </div>
              <span
                className={cn(
                  'text-xs transition-colors',
                  isCurrent && 'font-medium text-foreground',
                  isCompleted && 'text-primary',
                  !isCompleted && !isCurrent && 'text-muted-foreground',
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div
                className={cn(
                  'mx-2 h-px w-16 transition-colors sm:w-24',
                  isCompleted ? 'bg-primary' : 'bg-border',
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
