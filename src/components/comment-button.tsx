'use client'

import { useTransition, useState, useActionState } from 'react'
import { Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { postComment } from '@/actions/wellness'
import { PostLengthIndicator } from '@/components/post-length-indicator'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogHeader
} from '@/components/ui/dialog'

import { MessageSquare } from 'lucide-react'
import { type Comment } from '@/types'

interface Props {
  author: string
  comments: Array<Comment>
  postId: string
}

export function CommentButton({ comments, postId, author }: Props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [comment, setComment] = useState<string>('')
  const [_, startTransition] = useTransition()

  const [newComments, setNewComments, pending] = useActionState(
    postComment,
    comments
  )

  function CommentsLabel({ comments }: { comments: number }) {
    if (comments === 0) {
      return 'Comment'
    }
    return comments === 1 ? '1 Comment' : `${comments} Comments`
  }

  function handleCommentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    startTransition(() => setComment(e.target.value))
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button
          type='button'
          variant='ghost'
          className='w-full font-medium hover:bg-gray-50 active:bg-gray-100'
        >
          <MessageSquare size={16} className='mr-1' />{' '}
          <CommentsLabel comments={newComments.length} />
        </Button>
      </DialogTrigger>

      <DialogContent className='!rounded-2xl pt-3'>
        <DialogHeader>
          <DialogTitle className='text-left ml-2.5 font-semibold'>
            Comment on {author}'s post
          </DialogTitle>
        </DialogHeader>

        <form action={setNewComments}>
          <div className='w-full p-3 border rounded-2xl'>
            <input type='hidden' name='post_id' value={postId} />

            <Textarea
              placeholder='What are your thoughts?'
              className='text-base border-0 p-0 shadow-none focus-visible:ring-0 resize-none'
              rows={6}
              name='comment'
              onChange={handleCommentChange}
              required
            />

            <div className='w-full flex items-end justify-between pt-3'>
              <PostLengthIndicator len={comment.length} max={280} />

              <Button
                type='submit'
                size='sm'
                className='mt-3'
                disabled={!comment || pending}
                onClick={async () => {
                  startTransition(() => {
                    setComment('')
                    setModalOpen(false)
                  })
                }}
              >
                {pending ? (
                  <Loader
                    size={16}
                    className='text-current animate-spin'
                    aria-label='loading...'
                  />
                ) : (
                  'Post'
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
