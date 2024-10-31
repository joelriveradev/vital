'use client'

import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { routes } from '@/lib/nav'
import { cn } from '@/lib/utils'

import Link from 'next/link'

export function Nav() {
  const currentPath = usePathname()

  return (
    <nav className='fixed w-full max-w-md left-1/2 -translate-x-1/2 flex items-center justify-between gap-x-3 bottom-0 p-5 py-0 border-t bg-white dark:bg-black backdrop-blur-md'>
      {routes.map(({ path, label, icon: Icon }) => {
        return (
          <Link href={path} prefetch key={path} className=''>
            <Button
              type='button'
              variant='ghost'
              className={cn(
                'flex flex-col items-center opacity-40 transition-opacity h-12 py-8',
                {
                  'opacity-100': currentPath === path
                }
              )}
            >
              <Icon />
              <span className='text-xs font-semibold'>{label}</span>
            </Button>
          </Link>
        )
      })}
    </nav>
  )
}
