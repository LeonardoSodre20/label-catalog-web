import { useRef } from 'react'
import { toast } from 'sonner'

import { Button } from '@/shared/components/ui/button'
import { Label } from '@/shared/components/ui/label'
import { ImagePlus, X } from 'lucide-react'

interface ImageUploadProps {
  preview: string | null
  onFileSelect: (file: File | null) => void
}

const ACCEPTED_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024

export function ImageUpload({ preview, onFileSelect }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error('Formato de imagem inválido. Aceito: PNG, JPG, WEBP')
      return
    }

    if (file.size > MAX_SIZE) {
      toast.error('Imagem deve ter no máximo 5MB')
      return
    }

    onFileSelect(file)
  }

  const handleRemove = () => {
    onFileSelect(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className='space-y-2'>
      <Label>Imagem da peça</Label>

      {preview ? (
        <div className='relative aspect-video w-full overflow-hidden rounded-md border'>
          <img
            src={preview}
            alt='Preview da peça'
            className='h-full w-full object-contain p-2'
          />
          <Button
            type='button'
            variant='ghost'
            size='icon-xs'
            className='absolute right-2 top-2'
            onClick={handleRemove}
            aria-label='Remover imagem'
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
      ) : (
        <button
          type='button'
          onClick={() => inputRef.current?.click()}
          className='flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed text-muted-foreground transition-colors hover:border-primary hover:text-primary'
        >
          <ImagePlus className='h-8 w-8' />
          <span className='text-sm font-medium'>Clique para fazer upload</span>
          <span className='text-xs'>PNG, JPG ou WEBP — até 5MB</span>
        </button>
      )}

      <input
        ref={inputRef}
        type='file'
        accept='.png,.jpg,.jpeg,.webp'
        className='hidden'
        onChange={handleFileChange}
      />
    </div>
  )
}
