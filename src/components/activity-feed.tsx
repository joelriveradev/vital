import { ScrollArea } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'
import { PostResponse } from '@/types'
import { getRelativeTime } from '@/lib/utils'
import { LikeButton } from './like-button'
import { CommentButton } from './comment-button'
import { Show } from './show'

interface Props {
  posts: Array<PostResponse>
}

export async function ActivityFeed({ posts }: Props) {
  return (
    <ScrollArea className='mt-10'>
      {posts.map((post) => {
        const {
          id,
          created_at,
          name,
          avatar_url,
          type,
          content,
          likes,
          comments
        } = post

        const time = getRelativeTime(new Date(created_at))

        return (
          <Card key={id} className='mb-3 p-3'>
            <div className='flex items-start gap-2 mb-4'>
              <img
                src={avatar_url as string}
                alt={name as string}
                className='w-9 h-9 rounded-full'
              />

              <div className='flex flex-col'>
                <span className='ml-1 text-sm'>
                  <strong>{name}</strong>{' '}
                  {`posted ${
                    type === 'thought' ? 'a thought' : 'an achievement'
                  }`}
                </span>

                <time className='ml-1 text-neutral-500 text-xs'>{time}</time>
              </div>
            </div>

            <p>{content}</p>

            <div className='w-full grid grid-cols-2 gap-0 border-y py-1 mt-3'>
              <div className='w-full border-r pr-1.5 justify-self-start'>
                <LikeButton postId={id} likes={likes} />
              </div>

              <div className='w-full flex items-center pl-1.5'>
                <CommentButton
                  comments={comments}
                  postId={id}
                  author={name?.split(' ')[0] as string}
                />
              </div>
            </div>

            <Show when={comments.length > 0}>
              <div className='mt-3'>
                {comments.map(
                  ({ id, name, avatar_url, content, created_at }) => {
                    const time = getRelativeTime(new Date(created_at))

                    return (
                      <Card
                        key={id}
                        className='p-3 bg-gray-50 border-gray-200 mb-3 last:mb-0 shadow-none'
                      >
                        <div className='flex items-center mb-1'>
                          <img
                            src={avatar_url as string}
                            className='w-5 h-5 rounded-full mr-2'
                          />

                          <p className='font-semibold text-sm'>{name}</p>

                          <span className='mx-1.5 w-1 h-1 rounded-full bg-gray-300' />

                          <time className=' text-gray-500 text-xs'>{time}</time>
                        </div>

                        <p className='text-sm'>{content}</p>
                      </Card>
                    )
                  }
                )}
              </div>
            </Show>
          </Card>
        )
      })}
    </ScrollArea>
  )
}
