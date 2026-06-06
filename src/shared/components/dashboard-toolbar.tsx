import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Search, SlidersHorizontal } from 'lucide-react'

export function DashboardToolbar() {
  return (
    <div className='flex items-center gap-3 border-b border-border px-6 py-3'>
      <div className='relative flex-1 max-w-md'>
        <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        <Input placeholder='Pesquisar...' className='pl-9' disabled />
      </div>
      <Button variant='outline' size='sm' disabled className='cursor-pointer'>
        <SlidersHorizontal className='h-4 w-4' />
        Filtrar
      </Button>
    </div>
  )
}
