import { cn, formatNumber } from '@/lib/utils'

interface Props {
  type: 'steps' | 'water' | 'sunlight' | 'sleep'
  current: number
  goal: number
}

export function ProgressBar({ type, current, goal }: Props) {
  function ActivityLabel() {
    switch (type) {
      case 'steps':
        return 'steps'
      case 'sunlight':
        return 'minutes'
      case 'water':
        return 'ounces'
      case 'sleep':
        return 'hours'
    }
  }
  return (
    <div className='w-full'>
      <div className='flex items-center justify-between'>
        <div>
          <span className='text-lg font-bold'>{formatNumber(current)}</span>

          <span className='text-neutral-500 ml-2'>
            / {formatNumber(goal)} <ActivityLabel />
          </span>
        </div>
      </div>

      <div className='w-full bg-neutral-100 rounded-full h-2.5 my-5 mt-3.5'>
        <div
          className={cn('h-2.5 rounded-full transition-all bg-gradient-to-r', {
            'from-cyan-400 to-cyan-200': type === 'water',
            'from-yellow-400 to-yellow-200': type === 'sunlight',
            'from-rose-600 to-rose-300': type === 'steps',
            'from-indigo-600 to-indigo-300': type === 'sleep'
          })}
          style={{
            width: `${Math.min((current / goal) * 100, 100)}%`
          }}
        ></div>
      </div>
    </div>
  )
}
