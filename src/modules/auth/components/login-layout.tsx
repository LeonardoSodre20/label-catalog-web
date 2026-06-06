import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface LoginLayoutProps {
  children: ReactNode
}

export function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <div className='flex min-h-dvh'>
      <div className='relative hidden w-[40%] bg-primary lg:flex lg:flex-col lg:items-center lg:justify-center'>
        <div className='flex flex-col items-center justify-center p-12 text-center'>
          <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-foreground/10'>
            <svg
              className='h-8 w-8 text-primary-foreground'
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
          <h1 className='mb-2 text-2xl font-semibold text-primary-foreground'>
            label catalog
          </h1>
          <p className='text-sm text-primary-foreground/70'>
            Sistema corporativo de gestão
          </p>
        </div>
      </div>

      <div className='flex flex-1 items-center justify-center bg-background p-8'>
        <motion.div
          className='w-full max-w-sm'
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] as const }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
