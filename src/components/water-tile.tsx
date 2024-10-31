import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function WaterTile() {
  return (
    <div className='bg-[#FCFCFC] border border-[#D9D9D9] rounded-2xl p-5'>
      <header className='mb-10'>
        <Link
          href='/water'
          className='flex items-center font-extrabold text-cyan-500 text-xl'
          prefetch
        >
          Water <ChevronRight className='ml-1' size={20} />
        </Link>
      </header>

      <div className='flex flex-col'>
        <span className='uppercase text-neutral-500 text-xs'>today</span>

        <output className='font-extrabold text-3xl'>
          100 <span className='text-lg'>oz</span>
        </output>
      </div>
    </div>
  )
}
