import { StepsTile } from '@/components/steps-tile'
import { SleepTile } from '@/components/sleep-tile'
import { SunshineTile } from '@/components/sunshine-tile'
import { WaterTile } from '@/components/water-tile'

export function WellnessGrid() {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <StepsTile />
      <WaterTile />
      <SleepTile />
      <SunshineTile />
    </div>
  )
}
