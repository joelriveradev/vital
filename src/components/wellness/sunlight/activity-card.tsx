'use client'

import { useState, useEffect, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ProgressBar } from '@/components/wellness/progress/bar'
import { ProgressSkeleton } from '@/components/wellness/progress/skeleton'
import { fetchSunlightActivity, saveSunlightActivity } from '@/actions/wellness'
import { Show } from '@/components/show'
import { Loader } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SunlightActivityCard() {
  const [isPending, startTransition] = useTransition()
  const [selectedMinutes, setSelectedMinutes] = useState(0)

  const [state, setState] = useState({
    minutes: 0,
    goal: 30
  })

  useEffect(() => {
    startTransition(async () => {
      const data = await fetchSunlightActivity()

      if ('error' in data) {
        console.error(data.error)
      }
      if ('minutes' in data) {
        setState({ ...data })
      }
    })
  }, [])

  const handleMinutesClick = (value: number) => {
    setSelectedMinutes(value)
  }

  return (
    <Card className='p-3'>
      <ProgressSkeleton loading={isPending} />

      <Show when={!isPending}>
        <ProgressBar
          type='sunlight'
          current={state.minutes}
          goal={state.goal}
        />
      </Show>

      <form
        action={async (data: FormData) => {
          startTransition(() => {
            setState({ ...state, minutes: state.minutes + selectedMinutes })
            setSelectedMinutes(0)
          })
          await saveSunlightActivity(data)
        }}
      >
        <input type='hidden' name='minutes' value={selectedMinutes} />

        <div className='flex items-center justify-between'>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              type='button'
              size='sm'
              onClick={() => handleMinutesClick(15)}
              disabled={isPending}
              className={cn('disabled:border-neutral-200 transition-all', {
                'border-black': selectedMinutes === 15
              })}
            >
              +15 min
            </Button>

            <Button
              variant='outline'
              type='button'
              size='sm'
              onClick={() => handleMinutesClick(30)}
              disabled={isPending}
              className={cn('disabled:border-neutral-200 transition-all', {
                'border-black': selectedMinutes === 30
              })}
            >
              +30 min
            </Button>

            <Button
              variant='outline'
              type='button'
              size='sm'
              onClick={() => handleMinutesClick(45)}
              disabled={isPending}
              className={cn('disabled:border-neutral-200 transition-all', {
                'border-black': selectedMinutes === 45
              })}
            >
              +45 min
            </Button>
          </div>

          <Button
            type='submit'
            size='sm'
            disabled={selectedMinutes === 0 || isPending}
          >
            {isPending ? <Loader className='w-5 h-5 animate-spin' /> : 'Post'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
