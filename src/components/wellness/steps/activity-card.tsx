import { Card } from '@/components/ui/card'
import { fetchSteps } from '@/actions/wellness'
import { StepsActivityForm } from './activity-form'

export async function StepsActivityCard() {
  const { count, goal } = await fetchSteps()

  return (
    <Card className='p-3'>
      <StepsActivityForm count={count} goal={goal} />
    </Card>
  )
}
