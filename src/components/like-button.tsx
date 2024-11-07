'use client'

import {
  useOptimistic,
  startTransition,
  useEffect,
  useState,
  useId
} from 'react'

import { ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { likePost } from '@/actions/wellness'
import { cn } from '@/lib/utils'
import { Like } from '@/types'

interface Props {
  postId: string
  likes: Array<Like>
}

export function LikeButton({ postId, likes }: Props) {
  const supabase = createClient()
  const optimisticId = useId()

  const [userId, setUserId] = useState<string>('')
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

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        console.error('Error fetching user:', error.message)
      }

      if (data?.user) {
        startTransition(() => setUserId(data.user.id))
      }
    }

    getUser()
  }, [])

  const count = optimisiticLikes.length

  async function handleLike() {
    startTransition(() => {
      setOptimisticLikes({
        id: optimisticId,
        post_id: postId,
        created_at: new Date().toISOString(),
        user_id: userId
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
      className='w-full font-medium hover:bg-gray-50 transition-all'
      onClick={handleLike}
    >
      <ThumbsUp
        size={16}
        className={cn({
          'text-blue-600': likes.some(({ user_id }) => user_id === userId)
        })}
      />{' '}
      <LikesLabel likes={count} />
    </Button>
  )
}
