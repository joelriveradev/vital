'use client'

import { useRouter } from 'next/navigation'

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectLabel,
  SelectGroup
} from '@/components/ui/select'

interface Props {
  defaultActivity?: string
}

export function ActivitySelector({ defaultActivity }: Props) {
  const router = useRouter()

  function handleChange(activity: string) {
    router.push(`/activity?activity=${activity}`)
  }

  return (
    <Select defaultValue={defaultActivity} onValueChange={handleChange}>
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
  )
}
