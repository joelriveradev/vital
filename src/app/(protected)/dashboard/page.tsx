import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getCurrentDate } from '@/lib/utils'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { WellnessGrid } from '@/components/wellness-grid'
import { createClient } from '@/lib/supabase/server'
import { AvatarImage } from '@radix-ui/react-avatar'
import { SignoutButton } from '@/components/signout-button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export default async function DashboardPage() {
  const date = getCurrentDate()

  const supabase = createClient(cookies())
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return redirect('/auth/sign-in')
  }

  return (
    <div className='min-h-dvh p-5'>
      <header>
        <div className='w-full flex item-center justify-between'>
          <h1 className='font-extrabold text-3xl'>Dashboard</h1>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className='w-8 h-8'>
                <AvatarFallback className='dark text-white'>JR</AvatarFallback>
                <AvatarImage src={data.user.user_metadata.avatar_url} />
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>
                {data.user.user_metadata.full_name} <br />
                <span className='font-normal text-neutral-500 text-sm'>
                  {data.user.user_metadata.email}
                </span>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem className='flex items-center justify-between'>
                <SignoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <small className='uppercase text-neutral-600' suppressHydrationWarning>
          {date}
        </small>
      </header>

      <main className='mt-10'>
        <h2 className='font-extrabold text-xl'>Today's Activity</h2>

        <ScrollArea className='mt-3'>
          <WellnessGrid />
        </ScrollArea>
      </main>
    </div>
  )
}
