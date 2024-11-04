'use server'
import { Card } from '@/components/ui/card'
import { fetchWaterActivity } from '@/actions/wellness'
import { WaterActivityForm } from './activity-form'

export async function WaterActivityCard() {
  const { ounces, goal } = await fetchWaterActivity()

  return (
    <Card className='p-3'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <span className='text-3xl font-bold'>{ounces}</span>
          <span className='text-neutral-500 ml-2'>/ {goal} ounces</span>
        </div>
      </div>

      <div className='w-full bg-neutral-100 rounded-full h-2.5 mb-4'>
        <div
          className='bg-cyan-500 h-2.5 rounded-full transition-all'
          style={{
            width: `${Math.min((ounces / goal) * 100, 100)}%`
          }}
        ></div>
      </div>

      <WaterActivityForm />
    </Card>
  )
}
