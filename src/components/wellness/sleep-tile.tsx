import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function SleepTile() {
  return (
    <div className='bg-[#FCFCFC] border border-[#D9D9D9] rounded-2xl p-5'>
      <header className='mb-10'>
        <Link
          href='/sleep'
          className='flex items-center font-extrabold text-purple-600 text-xl'
          prefetch
        >
          Sleep <ChevronRight className='ml-1' size={20} />
        </Link>
      </header>

      <div className='flex flex-col'>
        <span className='uppercase text-neutral-500 text-xs'>average</span>

        <output className='font-extrabold text-3xl'>
          6.7 <span className='text-lg'>hrs</span>
        </output>
      </div>
    </div>
  )
}
