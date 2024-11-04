'use server'

import { Card } from '@/components/ui/card'
import { fetchSunlightActivity } from '@/actions/wellness'
import { SunlightActivityForm } from './activity-form'

export async function SunlightActivityCard() {
  const { minutes, goal } = await fetchSunlightActivity()

  return (
    <Card className='p-3'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <span className='text-3xl font-bold'>{minutes}</span>
          <span className='text-neutral-500 ml-2'>/ {goal} minutes</span>
        </div>
      </div>

      <div className='w-full bg-neutral-100 rounded-full h-2.5 mb-4'>
        <div
          className='bg-yellow-400 h-2.5 rounded-full transition-all'
          style={{
            width: `${Math.min((minutes / goal) * 100, 100)}%`
          }}
        ></div>
      </div>

      <SunlightActivityForm />
    </Card>
  )
}
