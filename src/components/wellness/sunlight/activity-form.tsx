'use client'

import { useState } from 'react'
import { saveSunlightActivity } from '@/actions/wellness'
import { Button } from '@/components/ui/button'

export function SunlightActivityForm() {
  const [state, setState] = useState({
    current: 0,
    goal: 30
  })

  return (
    <form action={saveSunlightActivity}>
      <div className='flex items-center justify-between'>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() =>
              setState((prev) => ({
                ...prev,
                current: prev.current + 15
              }))
            }
          >
            +15 min
          </Button>

          <Button
            variant='outline'
            size='sm'
            onClick={() =>
              setState((prev) => ({
                ...prev,
                current: prev.current + 30
              }))
            }
          >
            +30 min
          </Button>

          <Button
            variant='outline'
            size='sm'
            onClick={() =>
              setState((prev) => ({
                ...prev,
                current: prev.current + 45
              }))
            }
          >
            +45 min
          </Button>
        </div>

        <Button type='submit' size='sm' disabled={!state.current}>
          Post
        </Button>
      </div>
    </form>
  )
}
