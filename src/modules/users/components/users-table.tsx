import { Button } from '@/shared/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'
import {
  type ColumnDef,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, Pencil, UsersIcon } from 'lucide-react'
import { useMemo } from 'react'
import type { User } from '../types/user-types'

const functionLabels: Record<string, string> = {
  ADMIN: 'Administrador',
  OPERATOR: 'Operador',
}

interface UsersTableProps {
  data: User[]
  totalPages: number
  page: number
  onPageChange: (page: number) => void
  isLoading: boolean
  selectedIds: number[]
  onSelectionChange: (ids: number[]) => void
  onEdit?: (user: User) => void
}

export function UsersTable({
  data,
  totalPages,
  page,
  onPageChange,
  isLoading,
  selectedIds,
  onSelectionChange,
  onEdit,
}: UsersTableProps) {
  const pagination = useMemo(() => ({ pageIndex: page, pageSize: 20 }), [page])

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type='checkbox'
            className='size-4 cursor-pointer'
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            aria-label='Selecionar todos'
          />
        ),
        cell: ({ row }) => (
          <input
            type='checkbox'
            className='size-4 cursor-pointer'
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            aria-label={`Selecionar ${row.original.name}`}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'name',
        header: 'Nome',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'function',
        header: 'Função',
        cell: ({ row }) =>
          functionLabels[row.original.function] ?? row.original.function,
      },
      {
        accessorKey: 'firstAccess',
        header: 'Primeiro acesso',
        cell: ({ row }) => (row.original.firstAccess ? 'Sim' : 'Não'),
      },
      {
        accessorKey: 'createdAt',
        header: 'Criado em',
        cell: ({ row }) =>
          new Date(row.original.createdAt).toLocaleString('pt-BR'),
      },
      {
        id: 'actions',
        header: 'Ações',
        cell: ({ row }) => (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => onEdit?.(row.original)}
            aria-label={`Editar ${row.original.name}`}
          >
            <Pencil className='h-4 w-4' />
          </Button>
        ),
      },
    ],
    [onEdit],
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      rowSelection: Object.fromEntries(selectedIds.map((id) => [id, true])),
    },
    onRowSelectionChange: (updater) => {
      const current = Object.fromEntries(selectedIds.map((id) => [id, true]))
      const next =
        typeof updater === 'function'
          ? updater(current as RowSelectionState)
          : updater
      onSelectionChange(
        Object.entries(next)
          .filter(([, v]) => v)
          .map(([k]) => Number(k)),
      )
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    getRowId: (row) => String(row.id),
  })

  if (isLoading) {
    return (
      <div className='space-y-3'>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={`skeleton-${i}`} className='flex gap-4'>
            <div className='h-5 w-5 animate-pulse rounded bg-muted' />
            <div className='h-5 flex-1 animate-pulse rounded bg-muted' />
            <div className='h-5 flex-1 animate-pulse rounded bg-muted' />
            <div className='h-5 w-24 animate-pulse rounded bg-muted' />
            <div className='h-5 w-20 animate-pulse rounded bg-muted' />
          </div>
        ))}
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16'>
        <UsersIcon className='mb-4 h-12 w-12 text-muted-foreground' />
        <h3 className='mb-1 text-lg font-medium text-foreground'>
          Nenhum usuário encontrado
        </h3>
        <p className='text-sm text-muted-foreground'>
          Clique em "Novo usuário" para cadastrar o primeiro.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className='flex items-center justify-between pt-4'>
          <p className='text-sm text-muted-foreground'>
            Página {page + 1} de {totalPages}
          </p>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              size='sm'
              disabled={page === 0}
              onClick={() => onPageChange(page - 1)}
            >
              <ChevronLeft className='mr-1 h-4 w-4' />
              Anterior
            </Button>
            <Button
              variant='outline'
              size='sm'
              disabled={page >= totalPages - 1}
              onClick={() => onPageChange(page + 1)}
            >
              Próximo
              <ChevronRight className='ml-1 h-4 w-4' />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
