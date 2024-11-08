import { Skeleton } from '@/components/ui/skeleton'
import { Show } from '@/components/show'

interface Props {
  loading: boolean
}

export function ProgressSkeleton({ loading }: Props) {
  return (
    <Show when={loading}>
      <div className='w-full'>
        <Skeleton className='w-[100px] h-3.5 rounded-full mt-2 mb-5' />
        <Skeleton className='w-full h-2.5  rounded-full mb-5' />
      </div>
    </Show>
  )
}
