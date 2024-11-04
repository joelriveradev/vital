'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { saveWaterActivity } from '@/actions/wellness'

export function WaterActivityForm() {
  const [state, setState] = useState({
    ounces: 0,
    goal: 130
  })

  return (
    <form action={saveWaterActivity}>
      <input type='hidden' name='type' value='ounces' />

      <div className='flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <Button
            variant='outline'
            size='sm'
            onClick={() =>
              setState((prev) => ({
                ...prev,
                ounces: prev.ounces + 2
              }))
            }
          >
            +Cup
          </Button>

          <Button
            variant='outline'
            size='sm'
            onClick={() =>
              setState((prev) => ({
                ...prev,
                ounces: prev.ounces + 4
              }))
            }
          >
            +Glass
          </Button>

          <Button
            variant='outline'
            size='sm'
            onClick={() =>
              setState((prev) => ({
                ...prev,
                ounces: prev.ounces + 8
              }))
            }
          >
            +Bottle
          </Button>
        </div>

        <Button size='sm' disabled={!state.ounces}>
          Post
        </Button>
      </div>
    </form>
  )
}
