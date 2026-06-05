import type { ReactNode } from 'react'

interface LoginLayoutProps {
  children: ReactNode
}

export function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className='flex min-h-dvh'>
      <div className='relative hidden w-[40%] overflow-hidden bg-blue-950 lg:block'>
        <div
          className='absolute inset-0 opacity-20'
          style={{
            backgroundImage: `
              linear-gradient(30deg, #f8fafc 12%, transparent 12.5%, transparent 87%, #f8fafc 87.5%, #f8fafc),
              linear-gradient(150deg, #f8fafc 12%, transparent 12.5%, transparent 87%, #f8fafc 87.5%, #f8fafc),
              linear-gradient(30deg, #f8fafc 12%, transparent 12.5%, transparent 87%, #f8fafc 87.5%, #f8fafc),
              linear-gradient(150deg, #f8fafc 12%, transparent 12.5%, transparent 87%, #f8fafc 87.5%, #f8fafc),
              linear-gradient(60deg, #94a3b8 25%, transparent 25.5%, transparent 75%, #94a3b8 75%, #94a3b8)
            `,
            backgroundSize: '80px 140px',
            backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0',
          }}
        />
        <div className='relative flex h-full flex-col items-center justify-center p-12'>
          <div className='text-center'>
            <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-white/10'>
              <svg
                className='h-8 w-8 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M9 12h6m-3-3v6m-7 4h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                />
              </svg>
            </div>
            <h1 className='mb-2 text-2xl font-semibold text-white'>
              label catalog
            </h1>
            <p className='text-sm text-blue-200/80'>
              Sistema corporativo de gestão
            </p>
          </div>
        </div>
      </div>

      <div className='flex flex-1 items-center justify-center bg-slate-50 p-8'>
        <div className='w-full max-w-sm'>{children}</div>
      </div>
    </div>
  )
}
