'use client'

import { redirect } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function SignoutButton() {
  const supabase = createClient()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()

    return error
      ? console.error(`${error.code}: ${error.message}`)
      : redirect('/auth/sign-in')
  }

  return (
    <div
      onClick={handleSignOut}
      className='w-full p-0 flex item-center justify-between text-neutral-500 hover:text-neutral-900'
      role='button'
      aria-label='Sign out of your account'
    >
      Sign Out <LogOut size={18} />
    </div>
  )
}
