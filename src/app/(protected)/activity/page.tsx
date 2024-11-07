import { ActivitySelector } from '@/components/activity-selector'
import { StepsActivityCard } from '@/components/wellness/steps/activity-card'
import { SunlightActivityCard } from '@/components/wellness/sunlight/activity-card'
import { WaterActivityCard } from '@/components/wellness/water/activity-card'
import { ThoughtActivityCard } from '@/components/wellness/thought-activity-card'
import { ActivityFeed } from '@/components/activity-feed'
import { fetchPosts } from '@/actions/wellness'

interface Props {
  searchParams: Promise<{ activity: string }>
}

export default async function ActivityPage({ searchParams }: Props) {
  const { activity } = await searchParams
  const { posts } = await fetchPosts()

  function ActivityCard() {
    switch (activity) {
      case 'steps':
        return <StepsActivityCard />
      case 'sunlight':
        return <SunlightActivityCard />
      case 'water':
        return <WaterActivityCard />
      case 'thought':
        return <ThoughtActivityCard />
      default:
        return null
    }
  }

  return (
    <div className='min-h-dvh p-5 pb-20'>
      <header>
        <div className='w-full flex item-center justify-between'>
          <h1 className='font-extrabold text-3xl'>Activity</h1>
        </div>
      </header>

      <main className='mt-10'>
        <h2 className='font-extrabold text-xl mb-4'>New Activity</h2>
        <ActivitySelector defaultActivity={activity} />

        <div className='mt-3'>
          <ActivityCard />
        </div>

        <ActivityFeed posts={posts} />
      </main>
    </div>
  )
}
