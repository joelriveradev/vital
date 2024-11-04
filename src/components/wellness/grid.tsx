import { StepsTile } from './steps/tile'
import { SleepTile } from './sleep-tile'
import { SunshineTile } from './sunlight/tile'
import { WaterTile } from './water/tile'

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
