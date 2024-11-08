'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Comment, PostResponse } from '@/types'

export async function revalidate(path: string) {
  revalidatePath(path)
}

export async function fetchWaterActivity(): Promise<
  { ounces: number; goal: number } | { error: string }
> {
  const supabase = createClient(cookies())
  const startOfDay = new Date()
  const endOfDay = new Date()

  startOfDay.setHours(0, 0, 0, 0)
  endOfDay.setHours(23, 59, 59, 999)

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'User not found' }
  }

  const { data, error } = await supabase
    .from('water')
    .select('ounces')
    .eq('user_id', user.id)
    .gte('date', startOfDay.toISOString())
    .lt('date', endOfDay.toISOString())

  if (error) {
    console.error(error.message)
  }

  return {
    ounces: data?.reduce((acc, curr) => acc + curr.ounces, 0) ?? 0,
    goal: 130
  }
}

export async function fetchSunlightActivity(): Promise<
  { minutes: number; goal: number } | { error: string }
> {
  const supabase = createClient(cookies())
  const startOfDay = new Date()
  const endOfDay = new Date()

  startOfDay.setHours(0, 0, 0, 0)
  endOfDay.setHours(23, 59, 59, 999)

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user)
    return {
      error: 'User not found'
    }

  const { data, error } = await supabase
    .from('sunlight')
    .select('minutes')
    .eq('user_id', user.id)
    .gte('date', startOfDay.toISOString())
    .lt('date', endOfDay.toISOString())

  if (error) {
    console.error(error.message)
  }

  return {
    minutes: data?.reduce((acc, curr) => acc + curr.minutes, 0) ?? 0,
    goal: 30
  }
}

export async function fetchStepsActivity(): Promise<
  { count: number; goal: number } | { error: string }
> {
  const supabase = createClient(cookies())
  const startOfDay = new Date()
  const endOfDay = new Date()

  startOfDay.setHours(0, 0, 0, 0)
  endOfDay.setHours(23, 59, 59, 999)

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      error: 'User not found'
    }
  }

  const { data, error } = await supabase
    .from('steps')
    .select('count')
    .eq('user_id', user.id)
    .gte('date', startOfDay.toISOString())
    .lte('date', endOfDay.toISOString())

  if (error) {
    console.error(error.message)
  }

  return {
    count: data?.reduce((acc, curr) => acc + curr.count, 0) ?? 0,
    goal: 10000
  }
}

export async function saveStepsActivity(data: FormData) {
  const supabase = createClient(cookies())
  const steps = data.get('steps') as string
  const today = new Date()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) return

  const { error } = await supabase.from('steps').insert({
    user_id: user.id,
    count: Number(steps),
    date: today.toISOString()
  })

  if (error) {
    console.error(error.message)
  }

  await revalidate('/activity')
}

export async function saveThought(data: FormData) {
  const thought = data.get('thought') as string
  const supabase = createClient(cookies())

  const {
    data: { user }
  } = await supabase.auth.getUser()

  await supabase.from('posts').insert({
    content: thought,
    type: 'thought',
    name: user?.user_metadata.full_name,
    avatar_url: user?.user_metadata.avatar_url
  })
  await revalidate('/activity')
}

export async function likePost(id: string) {
  const supabase = createClient(cookies())

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user) {
    const { error } = await supabase.from('likes').insert({
      post_id: id,
      user_id: user.id
    })

    if (error) {
      console.error(error.message)
    }
    await revalidate('/activity')
  }
}

export async function postComment(state: Array<Comment>, data: FormData) {
  const supabase = createClient(cookies())
  const comment = data.get('comment') as string
  const postId = data.get('post_id') as string

  const {
    error,
    data: { user }
  } = await supabase.auth.getUser()

  if (user) {
    const { data: comments } = await supabase
      .from('comments')
      .insert({
        post_id: postId,
        user_id: user.id,
        content: comment,
        name: user.user_metadata.full_name,
        avatar_url: user.user_metadata.avatar_url
      })
      .select('*')

    await revalidate('/activity')

    if (error) {
      console.error(error.message)
    }

    return state.concat(comments ?? [])
  }
  return state
}

export async function fetchPosts(): Promise<{ posts: Array<PostResponse> }> {
  const supabase = createClient(cookies())

  const { data: posts, error } = await supabase
    .from('posts')
    .select(`*, likes(user_id), comments(*)`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error.message)
  }

  return {
    posts: posts as PostResponse[]
  }
}

export async function saveWaterActivity(form: FormData) {
  const client = createClient(cookies())
}

export async function saveSunlightActivity(form: FormData) {
  const client = createClient(cookies())
}

export async function saveSleepActivity(form: FormData) {
  const client = createClient(cookies())
}

export async function save(form: FormData) {
  const client = createClient(cookies())
}
