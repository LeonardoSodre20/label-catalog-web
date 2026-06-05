import { UsersIcon } from 'lucide-react'

export function UsersModule() {
  return (
    <div className='flex min-h-dvh'>
      <aside className='hidden w-64 flex-col border-r border-border bg-sidebar p-6 lg:flex'>
        <div className='mb-8 flex items-center gap-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary-foreground/10'>
            <UsersIcon className='h-4 w-4 text-primary-foreground' />
          </div>
          <span className='text-sm font-semibold text-primary-foreground'>
            label catalog
          </span>
        </div>

        <nav className='flex flex-col gap-1'>
          <a
            href='/users'
            className='rounded-md bg-primary-foreground/10 px-3 py-2 text-sm font-medium text-primary-foreground'
          >
            Usuários
          </a>
        </nav>
      </aside>

      <main className='flex flex-1 flex-col bg-background'>
        <header className='flex h-14 items-center border-b border-border px-6'>
          <h1 className='text-lg font-semibold text-foreground'>Usuários</h1>
        </header>

        <div className='flex flex-1 items-center justify-center p-8'>
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
      </main>
    </div>
  )
}
