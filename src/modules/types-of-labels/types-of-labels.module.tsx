import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Plus, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { CreateTypeOfLabelDialog } from './components/create-type-of-label-dialog'
import { DeleteTypeOfLabelDialog } from './components/delete-type-of-label-dialog'
import { EditTypeOfLabelDialog } from './components/edit-type-of-label-dialog'
import { TypeOfLabelsTable } from './components/type-of-labels-table'
import { useCreateTypeOfLabel } from './mutations/use-create-type-of-label'
import { useDeleteTypeOfLabel } from './mutations/use-delete-type-of-label'
import { useUpdateTypeOfLabel } from './mutations/use-update-type-of-label'
import { useTypesOfLabels } from './queries/use-types-of-labels'
import type { TypeOfLabelResponse } from './types/type-of-label-types'

export function TypesOfLabelsModule() {
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editingType, setEditingType] = useState<TypeOfLabelResponse | null>(
    null,
  )
  const [deletingType, setDeletingType] = useState<TypeOfLabelResponse | null>(
    null,
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(0)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  const { data, isLoading } = useTypesOfLabels(
    page,
    20,
    debouncedSearch || undefined,
  )
  const createType = useCreateTypeOfLabel()
  const updateType = useUpdateTypeOfLabel()
  const deleteType = useDeleteTypeOfLabel()

  const handleCreateType = (formData: {
    name: string
    description?: string
  }) => {
    createType.mutate(formData, {
      onSuccess: () => {
        setCreateDialogOpen(false)
        toast.success('Tipo de etiqueta cadastrado com sucesso')
      },
      onError: (error) => {
        toast.error(error.message ?? 'Erro ao cadastrar tipo de etiqueta')
      },
    })
  }

  const handleUpdateType = (formData: {
    name: string
    description?: string
  }) => {
    if (!editingType) return

    updateType.mutate(
      { id: editingType.id, data: formData },
      {
        onSuccess: () => {
          setEditingType(null)
          toast.success('Tipo de etiqueta atualizado com sucesso')
        },
        onError: (error) => {
          toast.error(error.message ?? 'Erro ao atualizar tipo de etiqueta')
        },
      },
    )
  }

  const handleDeleteConfirm = () => {
    if (!deletingType) return

    deleteType.mutate(deletingType.id, {
      onSuccess: () => {
        setDeletingType(null)
        toast.success('Tipo de etiqueta excluído com sucesso')
      },
      onError: (error) => {
        toast.error(error.message ?? 'Erro ao excluir tipo de etiqueta')
      },
    })
  }

  return (
    <div className='flex flex-1 flex-col gap-6 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-medium text-foreground'>
          Tipos de etiqueta
        </h1>
        <Button size='sm' onClick={() => setCreateDialogOpen(true)}>
          <Plus className='mr-2 h-4 w-4' />
          Novo tipo
        </Button>
      </div>

      <div className='relative'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        <Input
          placeholder='Buscar por nome...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='pl-9'
        />
      </div>

      <TypeOfLabelsTable
        data={data?.content ?? []}
        totalPages={data?.totalPages ?? 0}
        page={page}
        onPageChange={setPage}
        isLoading={isLoading}
        onEdit={setEditingType}
        onDelete={setDeletingType}
      />

      <CreateTypeOfLabelDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateType}
        isPending={createType.isPending}
      />

      <EditTypeOfLabelDialog
        open={!!editingType}
        onOpenChange={(open) => {
          if (!open) setEditingType(null)
        }}
        type={editingType}
        onSubmit={handleUpdateType}
        isPending={updateType.isPending}
      />

      <DeleteTypeOfLabelDialog
        open={!!deletingType}
        onOpenChange={(open) => {
          if (!open) setDeletingType(null)
        }}
        onConfirm={handleDeleteConfirm}
        isPending={deleteType.isPending}
        typeName={deletingType?.name}
      />
    </div>
  )
}
