import { ChevronRight } from 'lucide-react'
import { fetchStepsActivity } from '@/actions/wellness'
import { formatNumber } from '@/lib/utils'

import Link from 'next/link'

export async function StepsTile() {
  const data = await fetchStepsActivity()
  const steps = 'count' in data ? data.count : 0

  return (
    <div className='bg-[#FCFCFC] border border-[#D9D9D9] rounded-2xl p-5'>
      <header className='mb-10'>
        <Link
          href='/steps'
          className='flex items-center font-extrabold text-rose-600 text-xl'
          prefetch
        >
          Steps <ChevronRight className='ml-1' size={20} />
        </Link>
      </header>

      <div className='flex flex-col'>
        <span className='uppercase text-neutral-500 text-xs'>today</span>
        <output className='font-extrabold text-3xl'>
          {formatNumber(steps)}
        </output>
      </div>
    </div>
  )
}
