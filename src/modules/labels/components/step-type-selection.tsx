import { useTypesOfLabels } from '@/modules/types-of-labels/queries/use-types-of-labels'
import { cn } from '@/shared/lib/utils'
import { Check, Container, LayoutGrid, Package, Wrench } from 'lucide-react'
import { useMemo } from 'react'
import { useCreateLabelStore } from '../stores/create-label-store'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Package,
  Wrench,
  LayoutGrid,
  Container,
}

function getIconForType(name: string): string {
  const iconMapByType: Record<string, string> = {
    Peça: 'Package',
    Fixadores: 'Wrench',
    Prateleira: 'LayoutGrid',
    Jaula: 'Container',
  }
  return iconMapByType[name] ?? 'Package'
}

function getDescriptionForType(name: string, apiDescription?: string): string {
  if (apiDescription) return apiDescription
  const descMap: Record<string, string> = {
    Peça: 'Componente para montagem',
    Fixadores: 'Parafuso, ruela, porca',
    Prateleira: 'Localizador de armazenagem',
    Jaula: 'Recipiente retornável',
  }
  return descMap[name] ?? name
}

interface TypeCardProps {
  name: string
  label: string
  description: string
  iconName: string
  selected: boolean
  onSelect: (value: string) => void
}

function TypeCard({
  name,
  label,
  description,
  iconName,
  selected,
  onSelect,
}: TypeCardProps) {
  const Icon = iconMap[iconName]

  return (
    <button
      type='button'
      onClick={() => onSelect(name)}
      className={cn(
        'group relative flex flex-col items-center gap-2 rounded-xl border p-6 text-center transition-all',
        'hover:border-primary/50 hover:bg-accent/50',
        selected
          ? 'border-primary bg-primary/5 ring-1 ring-primary'
          : 'border-border bg-card',
      )}
    >
      {selected && (
        <span className='absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary'>
          <Check className='h-3 w-3 text-primary-foreground' />
        </span>
      )}

      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-lg transition-colors',
          selected
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary',
        )}
      >
        {Icon && <Icon className='h-6 w-6' />}
      </div>

      <div>
        <p className='text-sm font-semibold text-foreground'>{label}</p>
        <p className='mt-0.5 text-xs text-muted-foreground'>{description}</p>
      </div>
    </button>
  )
}

function SkeletonCard() {
  return (
    <div className='flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-6 text-center'>
      <div className='h-12 w-12 animate-pulse rounded-lg bg-muted' />
      <div className='h-4 w-20 animate-pulse rounded bg-muted' />
      <div className='h-3 w-32 animate-pulse rounded bg-muted' />
    </div>
  )
}

export function StepTypeSelection() {
  const { selectedType, setSelectedType, setStep } = useCreateLabelStore()
  const { data, isLoading } = useTypesOfLabels(0, 100)
  const types = data?.content

  const handleSelect = (type: string) => {
    setSelectedType(type)
  }

  const canProceed = useMemo(() => !!selectedType, [selectedType])

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-lg font-medium text-foreground'>
          Tipo de etiqueta
        </h2>
        <p className='mt-1 text-sm text-muted-foreground'>
          Selecione o tipo de etiqueta que deseja criar
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          types?.map((type) => (
            <TypeCard
              key={type.id}
              name={type.name}
              label={type.name}
              description={getDescriptionForType(type.name, type.description)}
              iconName={getIconForType(type.name)}
              selected={selectedType === type.name}
              onSelect={handleSelect}
            />
          ))
        )}
      </div>

      <div className='flex justify-end'>
        <button
          type='button'
          disabled={!canProceed}
          className='inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50'
          onClick={() => setStep(2)}
        >
          Próximo
        </button>
      </div>
    </div>
  )
}
