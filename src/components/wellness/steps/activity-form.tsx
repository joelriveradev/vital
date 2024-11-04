'use client'

import { useState, startTransition, useOptimistic } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { saveStepsActivity } from '@/actions/wellness'
import { formatNumber } from '@/lib/utils'

interface Props {
  count: number
  goal: number
}

export function StepsActivityForm({ count, goal }: Props) {
  const [selectedSteps, setSelectedSteps] = useState(0)

  const [optimistic, setOptimistic] = useOptimistic(
    { count, goal },
    (prev, value: number) => ({
      ...prev,
      count: prev.count + value
    })
  )

  const handleStepsClick = (value: number) => {
    startTransition(() => {
      setSelectedSteps(value)
    })
  }

  function resetSteps() {
    startTransition(() => {
      setSelectedSteps(0)
    })
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <div>
          <span className='text-3xl font-bold'>
            {formatNumber(optimistic.count)}
          </span>

          <span className='text-neutral-500 ml-2'>
            / {formatNumber(optimistic.goal)} steps
          </span>
        </div>
      </div>

      <div className='w-full bg-neutral-100 rounded-full h-2.5 my-5'>
        <div
          className='bg-rose-600 h-2.5 rounded-full transition-all'
          style={{
            width: `${Math.min(
              (optimistic.count / optimistic.goal) * 100,
              100
            )}%`
          }}
        ></div>
      </div>

      <form
        action={async function (data: FormData) {
          //optimistically update the count
          //immediately after the user submits the form
          const steps = data.get('steps') as string
          setOptimistic(parseInt(steps))

          //save the activity to the database
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
              className={cn({
                'bg-rose-600 text-white': selectedSteps === 100
              })}
            >
              +100
            </Button>

            <Button
              variant='outline'
              size='sm'
              onClick={() => handleStepsClick(250)}
              type='button'
              className={cn({
                'bg-rose-600 text-white': selectedSteps === 250
              })}
            >
              +250
            </Button>

            <Button
              variant='outline'
              size='sm'
              onClick={() => handleStepsClick(1000)}
              type='button'
              className={cn({
                'bg-rose-600 text-white': selectedSteps === 1000
              })}
            >
              +1000
            </Button>
          </div>

          <Button
            className='ml-2 rounded-lg'
            size='sm'
            disabled={selectedSteps === 0}
            onClick={resetSteps}
          >
            Post
          </Button>
        </div>
      </form>
    </>
  )
}
