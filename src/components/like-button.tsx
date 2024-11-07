'use client'

import { useOptimistic, startTransition } from 'react'
import { ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { likePost } from '@/actions/wellness'
import { cn } from '@/lib/utils'
import { Like } from '@/types'

interface Props {
  postId: string
  likes: Array<Like>
}

export function LikeButton({ postId, likes }: Props) {
  const [optimisiticLikes, setOptimisticLikes] = useOptimistic(
    likes,
    (prevLikes, value: Like) => {
      return [
        ...prevLikes,
        {
          ...value,
          post_id: postId
        }
      ]
    }
  )
  const count = optimisiticLikes.length

  async function handleLike() {
    startTransition(() => {
      setOptimisticLikes({
        post_id: postId,
        created_at: new Date().toISOString(),
        user_id: '123',
        id: Math.random().toString()
      })
    })

    await likePost(postId)
  }

  function LikesLabel({ likes }: { likes: number }) {
    if (likes === 0) {
      return 'Like'
    }
    return likes === 1 ? '1 Like' : `${likes} Likes`
  }

  return (
    <Button
      type='button'
      variant='ghost'
      className={cn('w-full font-medium', {
        'text-indigo-600': ''
      })}
      onClick={handleLike}
    >
      <ThumbsUp size={16} /> <LikesLabel likes={count} />
    </Button>
  )
}
