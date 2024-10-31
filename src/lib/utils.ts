import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { redirect } from 'next/navigation'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
