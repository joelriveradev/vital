'use client'

import { useState } from 'react'

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectLabel,
  SelectGroup
} from '@/components/ui/select'

import { StepsActivityCard } from './wellness/steps/activity-card'
import { WaterActivityCard } from './wellness/water/activity-card'
import { SunlightActivityCard } from './wellness/sunlight/activity-card'
import { ThoughtActivityCard } from './wellness/thought-activity-card'

export function ActivitySelector() {
  const [activity, setActivity] = useState<string>()

  function handleChange(activity: string) {
    setActivity(activity)
  }

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
        return undefined
    }
  }

  return (
    <div>
      <Select onValueChange={handleChange}>
        <SelectTrigger className='rounded-lg'>
          <SelectValue
            placeholder='What do you want to share?'
            className='text-neutral-400'
          />
        </SelectTrigger>

        <SelectContent className='rounded-lg'>
          <SelectGroup>
            <SelectLabel>Choose Activity</SelectLabel>
            <SelectItem value='steps'>Steps</SelectItem>
            <SelectItem value='water'>Water</SelectItem>
            <SelectItem value='sunlight'>Sunlight</SelectItem>
            <SelectItem value='thought'>Thought</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className='mt-3'>
        <ActivityCard />
      </div>
    </div>
  )
}
