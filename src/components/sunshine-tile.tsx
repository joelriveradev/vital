import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function SunshineTile() {
  return (
    <div className='bg-[#FCFCFC] border border-[#D9D9D9] rounded-2xl p-5'>
      <header className='mb-10'>
        <Link
          href='/sunshine'
          className='flex items-center font-extrabold text-yellow-500 text-xl'
          prefetch
        >
          Sunshine <ChevronRight className='ml-1' size={20} />
        </Link>
      </header>

      <div className='flex flex-col'>
        <span className='uppercase text-neutral-500 text-xs'>today</span>

        <output className='font-extrabold text-3xl'>
          22 <span className='text-lg'>min</span>
        </output>
      </div>
    </div>
  )
}
