import { FacebookOauthButton } from '@/components/facebook-button'
import { BetaMessage } from '@/components/beta-message'

import Link from 'next/link'

export default async function SignUp() {
  return (
    <div className='pt-32 px-6'>
      <form className='max-w-sm mx-auto mb-8'>
        <h1 className='text-2xl'>
          Sign up to <strong>Vital</strong>
        </h1>

        <p className='text-sm text text-neutral-500'>
          Already have an account?{' '}
          <Link
            className='text-primary font-medium underline'
            href='/auth/sign-in'
          >
            Sign in
          </Link>
        </p>

        <div className='mt-6'>
          <FacebookOauthButton />
        </div>
      </form>

      <BetaMessage />
    </div>
  )
}
