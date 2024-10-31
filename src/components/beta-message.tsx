import { Info } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function BetaMessage({ className }: Props) {
  return (
    <Card
      className={cn('w-full, flex gap-2 max-w-md p-3 bg-zinc-50', className)}
    >
      <Info size={18} className='mr-2 shrink-0 mt-1 text-zinc-500' />

      <p className='text-zinc-600 text-sm'>
        <strong>Note:</strong> Vital is currently a proof of concept. Not all
        features have been implemented, and you may encounter bugs.
      </p>
    </Card>
  )
}
