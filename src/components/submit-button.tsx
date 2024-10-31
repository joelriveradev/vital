'use client'

import { Button } from '@/components/ui/button'
import { type ComponentPropsWithoutRef } from 'react'
import { useFormStatus } from 'react-dom'

interface Props extends ComponentPropsWithoutRef<typeof Button> {
  pendingText?: string
}

export function SubmitButton({
  children,
  pendingText = 'Submitting...',
  ...props
}: Props) {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' aria-disabled={pending} {...props}>
      {pending ? pendingText : children}
    </Button>
  )
}
