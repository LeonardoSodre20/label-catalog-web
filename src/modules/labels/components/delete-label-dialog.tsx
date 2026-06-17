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

interface DeleteLabelDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isPending?: boolean
  labelName?: string
}

export function DeleteLabelDialog({
  open,
  onOpenChange,
  onConfirm,
  isPending = false,
  labelName,
}: DeleteLabelDialogProps) {
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
            Excluir etiqueta
          </DialogTitle>
          <DialogDescription>
            Tem certeza que deseja excluir a etiqueta &ldquo;{labelName}&rdquo;?
            <br />
            Esta ação não pode ser desfeita.
          </DialogDescription>
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
