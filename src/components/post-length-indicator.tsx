import { cn } from '@/lib/utils'

interface Props {
  len: number
  max: number
}

export function PostLengthIndicator({ len = 0, max = 150 }: Props) {
  function renderThoughtLength() {
    return len > max ? `${max - len}` : len
  }

  return (
    <span
      className={cn('text-sm text-neutral-500', {
        'text-red-600': len > max
      })}
    >
      {renderThoughtLength()} / {max}
    </span>
  )
}
