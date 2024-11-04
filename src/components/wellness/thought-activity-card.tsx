'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

export function ThoughtActivityCard() {
  const [thought, setThought] = useState<string>()

  const MAX_LENGTH = 280

  const handleThoughtChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setThought(e.target.value)
  }

  function renderThoughtLength() {
    if (thought) {
      return thought.length > MAX_LENGTH
        ? `${MAX_LENGTH - thought.length}`
        : thought.length
    }
    return 0
  }

  return (
    <Card className='p-3'>
      <form>
        <Textarea
          placeholder="What's on your mind?"
          className='p-0 border-none shadow-none text-base focus-visible:ring-0'
          onChange={handleThoughtChange}
          value={thought}
          rows={6}
        />

        <div className='flex items-end justify-between pt-3'>
          <span
            className={cn('text-sm text-neutral-500', {
              'text-red-600': thought && thought.length > MAX_LENGTH
            })}
          >
            {renderThoughtLength()} / {MAX_LENGTH}
          </span>

          <Button
            size='sm'
            disabled={!thought || thought?.length > MAX_LENGTH}
            type='submit'
          >
            Post
          </Button>
        </div>
      </form>
    </Card>
  )
}
