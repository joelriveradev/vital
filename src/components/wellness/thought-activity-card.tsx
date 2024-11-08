'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { PostLengthIndicator } from '@/components/post-length-indicator'
import { saveThought } from '@/actions/wellness'
import { Loader } from 'lucide-react'

export function ThoughtActivityCard() {
  const [thought, setThought] = useState<string>('')
  const [isPending, startTransition] = useTransition()

  const MAX_LENGTH = 280

  const handleThoughtChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setThought(e.target.value)
  }

  return (
    <Card className='p-3'>
      <form
        action={async (data: FormData) => {
          startTransition(() => {
            saveThought(data)
            setThought('')
          })
        }}
      >
        <Textarea
          placeholder="What's on your mind?"
          className='p-0 border-none shadow-none text-base focus-visible:ring-0'
          onChange={handleThoughtChange}
          value={thought}
          rows={6}
          name='thought'
        />

        <div className='flex items-end justify-between pt-3'>
          <PostLengthIndicator len={thought.length} max={MAX_LENGTH} />

          <Button
            size='sm'
            disabled={!thought || thought.length > MAX_LENGTH || isPending}
            type='submit'
          >
            {isPending ? <Loader className='w-5 h-5' /> : 'Post'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
