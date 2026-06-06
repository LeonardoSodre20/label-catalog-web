import { UsersIcon } from 'lucide-react'

export function UsersModule() {
  return (
    <div className='flex flex-1 items-center justify-center'>
      <div className='text-center'>
        <UsersIcon className='mx-auto mb-4 h-12 w-12 text-muted-foreground' />
        <h2 className='mb-1 text-lg font-medium text-foreground'>
          Módulo em desenvolvimento
        </h2>
        <p className='text-sm text-muted-foreground'>
          Gerencie usuários, permissões e acesso ao sistema.
        </p>
      </div>
    </div>
  )
}
