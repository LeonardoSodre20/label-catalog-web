import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { useDebounce } from '@/shared/hooks/use-debounce'
import { Plus, Search, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { CreateUserDialog } from './components/create-user-dialog'
import { DeleteUserDialog } from './components/delete-user-dialog'
import { EditUserDialog } from './components/edit-user-dialog'
import { UsersTable } from './components/users-table'
import { useCreateUser } from './mutations/use-create-user'
import { useDeleteUser } from './mutations/use-delete-user'
import { useUpdateUser } from './mutations/use-update-user'
import { useUsers } from './queries/use-users'
import type { CreateUserSchema } from './schemas/create-user-schema'
import type { UpdateUserSchema } from './schemas/update-user-schema'
import type { User } from './types/user-types'

export function UsersModule() {
  const [page, setPage] = useState(0)
  const [searchInput, setSearchInput] = useState('')
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const search = useDebounce(searchInput, 300)

  const { data, isLoading } = useUsers(page, search || undefined)
  const createUser = useCreateUser()
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()

  const handleCreateUser = (formData: CreateUserSchema) => {
    createUser.mutate(formData, {
      onSuccess: () => {
        setCreateDialogOpen(false)
        toast.success('Usuário cadastrado com sucesso')
      },
      onError: (error) => {
        toast.error(error.message ?? 'Erro ao cadastrar usuário')
      },
    })
  }

  const handleUpdateUser = (formData: UpdateUserSchema) => {
    if (!editingUser) return

    updateUser.mutate(
      { id: editingUser.id, data: formData },
      {
        onSuccess: () => {
          setEditingUser(null)
          toast.success('Usuário atualizado com sucesso')
        },
        onError: (error) => {
          toast.error(error.message ?? 'Erro ao atualizar usuário')
        },
      },
    )
  }

  const handleDeleteConfirm = () => {
    const ids = [...selectedIds]

    deleteUser.mutate(ids, {
      onSuccess: () => {
        setDeleteDialogOpen(false)
        setSelectedIds([])
        toast.success(
          ids.length === 1
            ? 'Usuário excluído com sucesso'
            : `${ids.length} usuários excluídos com sucesso`,
        )
      },
      onError: (error) => {
        toast.error(error.message ?? 'Erro ao excluir usuário')
      },
    })
  }

  const selectedNames = selectedIds
    .map((id) => data?.content.find((u) => u.id === id)?.name)
    .filter((n): n is string => !!n)

  const isDeleting = deleteUser.isPending

  return (
    <div className='flex flex-1 flex-col gap-6 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-medium text-foreground'>Usuários</h1>
        <div className='flex items-center gap-2'>
          <Button
            variant='destructive'
            size='sm'
            disabled={selectedIds.length === 0 || isDeleting}
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className='mr-2 h-4 w-4' />
            Excluir
          </Button>
          <Button size='sm' onClick={() => setCreateDialogOpen(true)}>
            <Plus className='mr-2 h-4 w-4' />
            Novo usuário
          </Button>
        </div>
      </div>

      <div className='relative'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        <Input
          placeholder='Buscar por nome, email ou função…'
          className='h-9 pl-9 pr-8'
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value)
            setPage(0)
          }}
        />
        {searchInput && (
          <button
            type='button'
            className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
            onClick={() => {
              setSearchInput('')
              setPage(0)
            }}
            aria-label='Limpar busca'
          >
            <X className='h-4 w-4' />
          </button>
        )}
      </div>

      <UsersTable
        data={data?.content ?? []}
        totalPages={data?.totalPages ?? 0}
        page={page}
        onPageChange={setPage}
        isLoading={isLoading}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        onEdit={setEditingUser}
      />

      <CreateUserDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateUser}
        isPending={createUser.isPending}
      />

      <EditUserDialog
        open={!!editingUser}
        onOpenChange={(open) => {
          if (!open) setEditingUser(null)
        }}
        user={editingUser}
        onSubmit={handleUpdateUser}
        isPending={updateUser.isPending}
      />

      <DeleteUserDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        isPending={isDeleting}
        selectedCount={selectedIds.length}
        selectedNames={selectedNames}
      />
    </div>
  )
}
