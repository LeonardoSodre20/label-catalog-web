import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Link } from '@tanstack/react-router'
import { Plus, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { DeleteLabelDialog } from './components/delete-label-dialog'
import { EditLabelDialog } from './components/edit-label-dialog'
import { LabelsTable } from './components/labels-table'
import { useDeleteLabel } from './mutations/use-delete-label'
import { useUpdateLabel } from './mutations/use-update-label'
import { useLabels } from './queries/use-labels'
import type { LabelResponse } from './types/label-types'

interface EditFormData {
  name: string
  description?: string
  sector: string
  assemblyLine?: string
  aisle?: string
  shelf?: string
  quantityPerBox?: string
  revision?: string
}

export function LabelsModule() {
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [editingLabel, setEditingLabel] = useState<LabelResponse | null>(null)
  const [deletingLabel, setDeletingLabel] = useState<LabelResponse | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(0)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const { data, isLoading } = useLabels(page, 20, debouncedSearch || undefined)
  const updateLabel = useUpdateLabel()
  const deleteLabel = useDeleteLabel()

  const handleUpdateLabel = (formData: EditFormData) => {
    if (!editingLabel) return

    const fields: Record<string, string> = {}
    if (formData.assemblyLine) fields.assemblyLine = formData.assemblyLine
    if (formData.aisle) fields.aisle = formData.aisle
    if (formData.shelf) fields.shelf = formData.shelf
    if (formData.revision) fields.revision = formData.revision

    const localization =
      [formData.aisle, formData.shelf].filter(Boolean).join(' / ') || undefined

    updateLabel.mutate(
      {
        id: editingLabel.id,
        data: {
          name: formData.name,
          codeRef: editingLabel.codeRef,
          typeName: editingLabel.typeName,
          description: formData.description || undefined,
          sector: formData.sector,
          qtdByBatch: formData.quantityPerBox
            ? Number(formData.quantityPerBox)
            : undefined,
          localization,
          fields: Object.keys(fields).length > 0 ? fields : undefined,
        },
      },
      {
        onSuccess: () => {
          setEditingLabel(null)
          toast.success('Etiqueta atualizada com sucesso')
        },
        onError: (error) => {
          toast.error(error.message ?? 'Erro ao atualizar etiqueta')
        },
      },
    )
  }

  const handleDeleteConfirm = () => {
    if (!deletingLabel) return

    deleteLabel.mutate(deletingLabel.id, {
      onSuccess: () => {
        setDeletingLabel(null)
        toast.success('Etiqueta excluída com sucesso')
      },
      onError: (error) => {
        toast.error(error.message ?? 'Erro ao excluir etiqueta')
      },
    })
  }

  return (
    <div className='flex flex-1 flex-col gap-6 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-medium text-foreground'>Etiquetas</h1>
        <Button size='sm' asChild>
          <Link to='/dashboard/labels/new'>
            <Plus className='mr-2 h-4 w-4' />
            Criar etiqueta
          </Link>
        </Button>
      </div>

      <div className='relative'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        <Input
          placeholder='Buscar por nome ou código de referência...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='pl-9'
        />
      </div>

      <LabelsTable
        data={data?.content ?? []}
        totalPages={data?.totalPages ?? 0}
        page={page}
        onPageChange={setPage}
        isLoading={isLoading}
        onEdit={setEditingLabel}
        onDelete={setDeletingLabel}
      />

      <EditLabelDialog
        open={!!editingLabel}
        onOpenChange={(open) => {
          if (!open) setEditingLabel(null)
        }}
        label={editingLabel}
        onSubmit={handleUpdateLabel}
        isPending={updateLabel.isPending}
      />

      <DeleteLabelDialog
        open={!!deletingLabel}
        onOpenChange={(open) => {
          if (!open) setDeletingLabel(null)
        }}
        onConfirm={handleDeleteConfirm}
        isPending={deleteLabel.isPending}
        labelName={deletingLabel?.name}
      />
    </div>
  )
}
