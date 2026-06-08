import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { Loader2, Trash2 } from 'lucide-react'

interface DeleteUserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isPending?: boolean
  selectedCount: number
  selectedNames?: string[]
}

export function DeleteUserDialog({
  open,
  onOpenChange,
  onConfirm,
  isPending = false,
  selectedCount,
  selectedNames,
}: DeleteUserDialogProps) {
  const handleClose = () => {
    if (!isPending) {
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <Trash2 className='h-5 w-5 text-destructive' />
            Excluir usuário{selectedCount > 1 ? 'es' : ''}
          </DialogTitle>
          <DialogDescription>
            {selectedCount === 1
              ? `Tem certeza que deseja excluir o usuário${selectedNames?.[0] ? ` "${selectedNames[0]}"` : ''}?`
              : `Tem certeza que deseja excluir os ${selectedCount} usuários abaixo?`}
            <br />
            Esta ação não pode ser desfeita.
          </DialogDescription>
          {selectedCount > 1 && selectedNames && selectedNames.length > 0 && (
            <div className='max-h-40 overflow-y-auto rounded-md border p-3 text-sm'>
              <ul className='space-y-1'>
                {selectedNames.map((name) => (
                  <li key={name} className='text-muted-foreground'>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DialogHeader>

        <DialogFooter>
          <Button
            type='button'
            variant='outline'
            onClick={handleClose}
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            type='button'
            variant='destructive'
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Confirmar exclusão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
