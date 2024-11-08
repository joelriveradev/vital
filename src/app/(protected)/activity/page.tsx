import { ActivitySelector } from '@/components/activity-selector'
import { ActivityFeed } from '@/components/activity-feed'
import { fetchPosts } from '@/actions/wellness'

export default async function ActivityPage() {
  const { posts } = await fetchPosts()

  return (
    <div className='min-h-dvh p-5 pb-20'>
      <header>
        <div className='w-full flex item-center justify-between'>
          <h1 className='font-extrabold text-3xl'>Activity</h1>
        </div>
      </header>

      <main className='mt-10'>
        <h2 className='font-extrabold text-xl mb-4'>New Activity</h2>
        <ActivitySelector />
        <ActivityFeed posts={posts} />
      </main>
    </div>
  )
}
