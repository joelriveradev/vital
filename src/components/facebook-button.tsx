import { FacebookIcon } from '@/components/facebook-icon'
import { Button } from '@/components/ui/button'
import { signUpWithFacebook } from '@/actions/supabase'

export function FacebookOauthButton() {
  return (
    <Button
      className='w-full hover:bg-[#0866FF]'
      type='submit'
      onClick={signUpWithFacebook}
    >
      Continue with Facebook
      <FacebookIcon className='ml-1' size='md' />
    </Button>
  )
}
