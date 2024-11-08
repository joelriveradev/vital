'use client'

import { useState, useEffect, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ProgressSkeleton } from '@/components/wellness/progress/skeleton'
import { fetchSteps, saveStepsActivity } from '@/actions/wellness'
import { Show } from '@/components/show'
import { cn } from '@/lib/utils'
import { ProgressBar } from '@/components/wellness/progress/bar'
import { Loader } from 'lucide-react'

interface State {
  count: number
  goal: number
}

export function StepsActivityCard() {
  const [state, setState] = useState<State>({ count: 0, goal: 10000 })
  const [isPending, startTransition] = useTransition()
  const [selectedSteps, setSelectedSteps] = useState(0)
  const [fetched, setFetched] = useState(false)

  const handleStepsClick = (value: number) => {
    startTransition(() => setSelectedSteps(value))
  }

  useEffect(() => {
    startTransition(async () => {
      const { count } = await fetchSteps()
      setState({ ...state, count })

      if (!fetched) {
        setFetched(true)
      }
    })
  }, [])

  return (
    <Card className='p-3'>
      <ProgressSkeleton loading={!fetched || (fetched && isPending)} />

      <Show when={!isPending && fetched}>
        <ProgressBar type='steps' current={state.count} goal={state.goal} />
      </Show>

      <form
        action={async (data: FormData) => {
          const steps = data.get('steps')

          startTransition(() => {
            setSelectedSteps(0)

            setState({
              ...state,
              count: state.count + Number(steps)
            })
          })
          await saveStepsActivity(data)
        }}
      >
        <input type='hidden' name='steps' value={selectedSteps} />

        <div className='flex items-center justify-between'>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => handleStepsClick(100)}
              type='button'
              disabled={isPending}
              className={cn('disabled:border-neutral-200 transition-all', {
                'border-black': selectedSteps === 100
              })}
            >
              +100
            </Button>

            <Button
              variant='outline'
              size='sm'
              onClick={() => handleStepsClick(250)}
              type='button'
              disabled={isPending}
              className={cn('disabled:border-neutral-200 transition-all', {
                'border-black': selectedSteps === 250
              })}
            >
              +250
            </Button>

            <Button
              variant='outline'
              size='sm'
              onClick={() => handleStepsClick(1000)}
              type='button'
              disabled={isPending}
              className={cn('disabled:border-neutral-200 transition-all', {
                'border-black': selectedSteps === 1000
              })}
            >
              +1000
            </Button>
          </div>

          <Button
            className='ml-2 rounded-lg'
            size='sm'
            disabled={selectedSteps === 0 || isPending}
          >
            {isPending ? <Loader className='w-5 h-5 animate-spin' /> : 'Post'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
