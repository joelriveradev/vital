'use client'

import { useState, useEffect, useTransition } from 'react'
import { Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ProgressBar } from '@/components/wellness/progress/bar'
import { ProgressSkeleton } from '@/components/wellness/progress/skeleton'
import { fetchWaterActivity } from '@/actions/wellness'
import { saveWaterActivity } from '@/actions/wellness'
import { Show } from '@/components/show'
import { cn } from '@/lib/utils'

export function WaterActivityCard() {
  const [isPending, startTransition] = useTransition()
  const [selectedOunces, setSelectedOunces] = useState(0)

  const [state, setState] = useState({
    ounces: 0,
    goal: 130
  })

  useEffect(() => {
    startTransition(async () => {
      const { ounces, goal } = await fetchWaterActivity()
      setState({ ounces, goal })
    })
  }, [])

  const handleSelectedWater = (ounces: number) => {
    setSelectedOunces(ounces)
  }

  return (
    <Card className='p-3'>
      <ProgressSkeleton loading={isPending} />

      <Show when={!isPending}>
        <ProgressBar type='water' current={state.ounces} goal={state.goal} />
      </Show>

      <form
        action={async (data: FormData) => {
          startTransition(() => {
            setSelectedOunces(0)
            setState({ ...state, ounces: state.ounces + selectedOunces })
          })

          await saveWaterActivity(data)
        }}
      >
        <input type='hidden' name='type' value='ounces' />

        <div className='flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <Button
              variant='outline'
              type='button'
              size='sm'
              disabled={isPending}
              onClick={() => handleSelectedWater(2)}
              className={cn('disabled:border-neutral-200 transition-all', {
                'border-black': selectedOunces === 2
              })}
            >
              +Cup
            </Button>

            <Button
              variant='outline'
              type='button'
              size='sm'
              disabled={isPending}
              onClick={() => handleSelectedWater(4)}
              className={cn('disabled:border-neutral-200 transition-all', {
                'border-black': selectedOunces === 4
              })}
            >
              +Glass
            </Button>

            <Button
              variant='outline'
              type='button'
              size='sm'
              disabled={isPending}
              onClick={() => handleSelectedWater(8)}
              className={cn('disabled:border-neutral-200 transition-all', {
                'border-black': selectedOunces === 8
              })}
            >
              +Bottle
            </Button>
          </div>

          <Button
            size='sm'
            disabled={selectedOunces === 0 || isPending}
            className='transition-all'
          >
            {isPending ? <Loader className='w-5 h-5 animate-spin' /> : 'Post'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
