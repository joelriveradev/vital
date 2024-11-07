'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { Comment, PostResponse } from '@/types'

export async function revalidate(path: string) {
  revalidatePath(path)
}

export async function fetchWaterActivity() {
  const supabase = createClient(cookies())
  const today = new Date().toISOString().split('T')[0]

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user) {
    const { data, error } = await supabase
      .from('water')
      .select('ounces')
      .eq('user_id', user.id)
      .eq('date', today)

    if (error) {
      console.error(error.message)
    }
    if (data) {
      return {
        ounces: data.reduce((acc, curr) => acc + curr.ounces, 0),
        goal: 130
      }
    }
  }
  return {
    ounces: 0,
    goal: 130
  }
}

export async function fetchSunlightActivity() {
  const supabase = createClient(cookies())
  const today = new Date().toISOString().split('T')[0]

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user) {
    const { data, error } = await supabase
      .from('sunlight')
      .select('minutes')
      .eq('user_id', user.id)
      .eq('date', today)

    if (error) {
      console.error(error.message)
    }
    if (data) {
      return {
        minutes: data.reduce((acc, curr) => acc + curr.minutes, 0),
        goal: 30
      }
    }
  }
  return {
    minutes: 0,
    goal: 30
  }
}

export async function fetchSteps() {
  const supabase = createClient(cookies())
  const today = new Date().toISOString().split('T')[0]

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user) {
    const { data, error } = await supabase
      .from('steps')
      .select('count')
      .eq('user_id', user.id)
      .eq('date', today)

    if (error) {
      console.error(error.message)
    }
    if (data) {
      return {
        count: data.reduce((acc, curr) => acc + curr.count, 0),
        goal: 10000
      }
    }
  }
  return {
    count: 0,
    goal: 10000
  }
}

export async function saveStepsActivity(data: FormData) {
  const client = createClient(cookies())
  const steps = data.get('steps') as string

  try {
    await client.from('steps').insert({
      count: Number(steps),
      date: new Date().toISOString()
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  } finally {
    await revalidate('/activity')
  }
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
