'use client'

import { startTransition, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { PostLengthIndicator } from '../post-length-indicator'
import { saveThought } from '@/actions/wellness'

export function ThoughtActivityCard() {
  const [thought, setThought] = useState<string>('')

  const MAX_LENGTH = 280

  const handleThoughtChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    startTransition(() => setThought(e.target.value))
  }

  function resetThought() {
    startTransition(() => setThought(''))
  }

  return (
    <Card className='p-3'>
      <form action={saveThought}>
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
            disabled={!thought || thought.length > MAX_LENGTH}
            type='submit'
            onClick={resetThought}
          >
            Post
          </Button>
        </div>
      </form>
    </Card>
  )
}
