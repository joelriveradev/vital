import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { redirect } from 'next/navigation'

type TimeUnit = {
  value: number
  unit: Intl.RelativeTimeFormatUnit
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getRelativeTime(date: Date, locale?: string): string {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInSecs = Math.floor(diffInMs / 1000)

  // Handle "just now" case
  if (diffInSecs < 5) {
    return 'Just now'
  }

  // Calculate the appropriate time unit
  const getTimeUnit = (seconds: number): TimeUnit => {
    const minute = 60
    const hour = minute * 60
    const day = hour * 24
    const week = day * 7
    const month = day * 30
    const year = day * 365

    if (seconds < minute) {
      return { value: seconds, unit: 'second' }
    } else if (seconds < hour) {
      return { value: Math.floor(seconds / minute), unit: 'minute' }
    } else if (seconds < day) {
      return { value: Math.floor(seconds / hour), unit: 'hour' }
    } else if (seconds < week) {
      return { value: Math.floor(seconds / day), unit: 'day' }
    } else if (seconds < month) {
      return { value: Math.floor(seconds / week), unit: 'week' }
    } else if (seconds < year) {
      return { value: Math.floor(seconds / month), unit: 'month' }
    } else {
      return { value: Math.floor(seconds / year), unit: 'year' }
    }
  }

  const timeUnit = getTimeUnit(diffInSecs)

  try {
    // Try to use Intl.RelativeTimeFormat if available
    const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'always' })
    return formatter.format(-timeUnit.value, timeUnit.unit)
  } catch (error) {
    // Fallback for older browsers
    return `${timeUnit.value} ${timeUnit.unit}${
      timeUnit.value === 1 ? '' : 's'
    } ago`
  }
}

export function getCurrentDate() {
  // we want to return the current date
  // in the format of THURSDAY, OCT 24

  const date = new Date()

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

export function formatNumber(num: number): string {
  if (num >= 5000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  } else {
    return new Intl.NumberFormat('en-US', {}).format(num)
  }
}

export function encodedRedirect(
  type: 'error' | 'success',
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`)
}
