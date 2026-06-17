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
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, Pencil, Tags, Trash2 } from 'lucide-react'
import { useMemo } from 'react'
import type { LabelResponse } from '../types/label-types'

const sectorLabels: Record<string, string> = {
  PRODUCAO: 'Produção',
  MONTAGEM: 'Montagem',
  EXPEDICAO: 'Expedição',
  ALMOXARIFADO: 'Almoxarifado',
  QUALIDADE: 'Qualidade',
  MANUTENCAO: 'Manutenção',
}

interface LabelsTableProps {
  data: LabelResponse[]
  totalPages: number
  page: number
  onPageChange: (page: number) => void
  isLoading: boolean
  onEdit?: (label: LabelResponse) => void
  onDelete?: (label: LabelResponse) => void
}

export function LabelsTable({
  data,
  totalPages,
  page,
  onPageChange,
  isLoading,
  onEdit,
  onDelete,
}: LabelsTableProps) {
  const pagination = useMemo(() => ({ pageIndex: page, pageSize: 20 }), [page])

  const columns = useMemo<ColumnDef<LabelResponse>[]>(
    () => [
      {
        accessorKey: 'codeRef',
        header: 'Código',
      },
      {
        accessorKey: 'name',
        header: 'Nome',
      },
      {
        accessorKey: 'typeName',
        header: 'Tipo',
      },
      {
        accessorKey: 'sector',
        header: 'Setor',
        cell: ({ row }) =>
          sectorLabels[row.original.sector ?? ''] ?? row.original.sector,
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
          <div className='flex gap-1'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => onEdit?.(row.original)}
              aria-label={`Editar ${row.original.name}`}
            >
              <Pencil className='h-4 w-4' />
            </Button>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => onDelete?.(row.original)}
              aria-label={`Excluir ${row.original.name}`}
            >
              <Trash2 className='h-4 w-4 text-destructive' />
            </Button>
          </div>
        ),
      },
    ],
    [onEdit, onDelete],
  )

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
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
            <div className='h-5 w-24 animate-pulse rounded bg-muted' />
            <div className='h-5 flex-1 animate-pulse rounded bg-muted' />
            <div className='h-5 w-20 animate-pulse rounded bg-muted' />
            <div className='h-5 w-24 animate-pulse rounded bg-muted' />
            <div className='h-5 w-24 animate-pulse rounded bg-muted' />
          </div>
        ))}
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16'>
        <Tags className='mb-4 h-12 w-12 text-muted-foreground' />
        <h3 className='mb-1 text-lg font-medium text-foreground'>
          Nenhuma etiqueta encontrada
        </h3>
        <p className='text-sm text-muted-foreground'>
          Clique em &ldquo;Criar etiqueta&rdquo; para cadastrar a primeira.
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
              <TableRow key={row.id}>
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
