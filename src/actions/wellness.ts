'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

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
      count: steps,
      date: new Date().toISOString()
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
  } finally {
    revalidatePath('/activity')
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
