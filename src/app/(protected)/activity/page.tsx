'use client'

import { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectLabel,
  SelectGroup
} from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn, formatNumber } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'

export default function ActivityPage() {
  const [activity, setActivity] = useState<string>()

  const [thought, setThought] = useState<string>()

  const [steps, setSteps] = useState({
    current: 0,
    goal: 10000
  })

  const [waterIntake, setWaterIntake] = useState({
    current: 0,
    goal: 100,
    unit: 'ounces'
  })

  const [sunlightData, setSunlightData] = useState({
    current: 0,
    goal: 30
  })

  const MAX_LENGTH = 280

  const handleStepsPost = (e: React.FormEvent<HTMLFormElement>) => {}

  const handleThoughtChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setThought(e.target.value)
  }

  const QuickWaterAdd = () => (
    <div className='flex items-center justify-between'>
      <div className='flex gap-2 items-center'>
        <Button
          variant='outline'
          size='sm'
          onClick={() =>
            setWaterIntake((prev) => ({
              ...prev,
              current: prev.current + 2
            }))
          }
        >
          +Cup
        </Button>

        <Button
          variant='outline'
          size='sm'
          onClick={() =>
            setWaterIntake((prev) => ({
              ...prev,
              current: prev.current + 4
            }))
          }
        >
          +Glass
        </Button>

        <Button
          variant='outline'
          size='sm'
          onClick={() =>
            setWaterIntake((prev) => ({
              ...prev,
              current: prev.current + 8
            }))
          }
        >
          +Bottle
        </Button>
      </div>

      <Button size='sm' disabled={!waterIntake.current}>
        Post
      </Button>
    </div>
  )

  const QuickSunlightAdd = () => (
    <div className='flex items-center justify-between'>
      <div className='flex gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() =>
            setSunlightData((prev) => ({
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
            setSunlightData((prev) => ({
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
            setSunlightData((prev) => ({
              ...prev,
              current: prev.current + 45
            }))
          }
        >
          +45 min
        </Button>
      </div>

      <Button type='submit' size='sm' disabled={!sunlightData.current}>
        Post
      </Button>
    </div>
  )

  const QuickStepsAdd = () => {
    return (
      <div className='flex items-center justify-between'>
        <div className='flex gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setSteps((prev) => ({
                ...prev,
                current: prev.current + 100
              }))
            }}
          >
            +100
          </Button>

          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setSteps((prev) => ({
                ...prev,
                current: prev.current + 250
              }))
            }}
          >
            +250
          </Button>

          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              setSteps((prev) => ({
                ...prev,
                current: prev.current + 1000
              }))
            }}
          >
            +1000
          </Button>
        </div>

        <Button
          className='ml-2 rounded-lg'
          type='submit'
          size='sm'
          disabled={!steps.current}
        >
          Post
        </Button>
      </div>
    )
  }

  function renderThoughtLength() {
    if (thought) {
      return thought.length > MAX_LENGTH
        ? `${MAX_LENGTH - thought.length}`
        : thought.length
    }
    return 0
  }

  function renderActivityForm() {
    switch (activity) {
      case 'steps':
        return (
          <Card className='p-3'>
            <div className='flex items-center justify-between'>
              <div>
                <span className='text-3xl font-bold'>
                  {formatNumber(steps.current)}
                </span>

                <span className='text-neutral-500 ml-2'>
                  / {formatNumber(steps.goal)} steps
                </span>
              </div>
            </div>

            <div className='w-full bg-neutral-100 rounded-full h-2.5 my-5'>
              <div
                className='bg-rose-600 h-2.5 rounded-full transition-all'
                style={{
                  width: `${Math.min((steps.current / steps.goal) * 100, 100)}%`
                }}
              ></div>
            </div>

            <form onSubmit={handleStepsPost}>
              <QuickStepsAdd />
            </form>
          </Card>
        )
      case 'water':
        return (
          <Card className='p-3'>
            <div className='flex items-center justify-between mb-4'>
              <div>
                <span className='text-3xl font-bold'>
                  {waterIntake.current}
                </span>
                <span className='text-neutral-500 ml-2'>
                  / {waterIntake.goal} ounces
                </span>
              </div>
            </div>

            <div className='w-full bg-neutral-100 rounded-full h-2.5 mb-4'>
              <div
                className='bg-cyan-500 h-2.5 rounded-full transition-all'
                style={{
                  width: `${Math.min(
                    (waterIntake.current / waterIntake.goal) * 100,
                    100
                  )}%`
                }}
              ></div>
            </div>

            <QuickWaterAdd />
          </Card>
        )
      case 'sleep':
        return <div></div>
      case 'sunlight':
        return (
          <Card className='p-3'>
            <div className='flex items-center justify-between mb-4'>
              <div>
                <span className='text-3xl font-bold'>
                  {sunlightData.current}
                </span>
                <span className='text-neutral-500 ml-2'>
                  / {sunlightData.goal} minutes
                </span>
              </div>
            </div>

            <div className='w-full bg-neutral-100 rounded-full h-2.5 mb-4'>
              <div
                className='bg-yellow-400 h-2.5 rounded-full transition-all'
                style={{
                  width: `${Math.min(
                    (sunlightData.current / sunlightData.goal) * 100,
                    100
                  )}%`
                }}
              ></div>
            </div>

            <QuickSunlightAdd />
          </Card>
        )

      case 'thought':
        return (
          <Card className='p-3'>
            <Textarea
              placeholder="What's on your mind?"
              className='p-0 border-none shadow-none text-base focus-visible:ring-0'
              onChange={handleThoughtChange}
              value={thought}
              rows={6}
            />

            <div className='flex items-end justify-between pt-3'>
              <span
                className={cn('text-sm text-neutral-500', {
                  'text-red-600': thought && thought.length > MAX_LENGTH
                })}
              >
                {renderThoughtLength()} / 280
              </span>

              <Button
                className=''
                size='sm'
                disabled={!thought || thought?.length > MAX_LENGTH}
              >
                Post
              </Button>
            </div>
          </Card>
        )
    }
  }

  return (
    <div className='min-h-dvh p-5'>
      <header>
        <div className='w-full flex item-center justify-between'>
          <h1 className='font-extrabold text-3xl'>Activity</h1>
        </div>
      </header>

      <main className='mt-10'>
        <h2 className='font-extrabold text-xl mb-4'>New Activity</h2>

        <form>
          <Select value={activity} onValueChange={setActivity}>
            <SelectTrigger className='rounded-lg'>
              <SelectValue
                placeholder='What do you want to share?'
                className='text-neutral-400'
              />
            </SelectTrigger>

            <SelectContent className='rounded-lg'>
              <SelectGroup>
                <SelectLabel>Choose Activity</SelectLabel>
                <SelectItem value='steps'>Steps</SelectItem>
                <SelectItem value='water'>Water</SelectItem>
                <SelectItem value='sunlight'>Sunlight</SelectItem>
                <SelectItem value='thought'>Thought</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </form>

        <div className='mt-5'>{renderActivityForm()}</div>
      </main>
    </div>
  )
}
