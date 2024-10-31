import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'Vital',
  description: 'An AI-powered social wellness platform.'
}

interface Props {
  children: React.ReactNode
}

const inter = Inter({ weight: 'variable' })

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang='en'>
      <body className={cn('antialiased relative', inter.className)}>
        <div className='w-full max-w-md mx-auto'>{children}</div>
      </body>
    </html>
  )
}
