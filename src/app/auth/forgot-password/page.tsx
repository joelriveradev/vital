import { forgotPasswordAction } from '@/actions/supabase'
import { FormMessage, Message } from '@/components/form-message'
import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BetaMessage } from '@/components/beta-message'

import Link from 'next/link'

interface Props {
  searchParams: Promise<Message>
}

export default async function ForgotPassword(props: Props) {
  const searchParams = await props.searchParams

  return (
    <div className='w-full pt-32 px-6'>
      <form className='flex flex-col max-w-sm mx-auto mb-10'>
        <div>
          <h1 className='text-2xl font-medium'>Reset Password</h1>

          <p className='text-sm text-secondary-foreground'>
            Already have an account?{' '}
            <Link className='text-primary underline' href='/auth/sign-in'>
              Sign in
            </Link>
          </p>
        </div>

        <div className='flex flex-col gap-2 [&>input]:mb-3 mt-8'>
          <Label htmlFor='email'>Email</Label>
          <Input name='email' placeholder='you@example.com' required />
          <SubmitButton formAction={forgotPasswordAction}>
            Reset Password
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>

      <BetaMessage />
    </div>
  )
}
