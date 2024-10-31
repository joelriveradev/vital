import { ChartSpline, Zap, Users, Gem } from 'lucide-react'

// All icons are the same type
type LucideIcon = typeof ChartSpline

interface Route {
  path: string
  label: string
  icon: LucideIcon
}

export const routes: Route[] = [
  { path: '/dashboard', label: 'Dash', icon: ChartSpline },
  { path: '/activity', label: 'Activity', icon: Zap },
  { path: '/community', label: 'Community', icon: Users },
  { path: '/rewards', label: 'Rewards', icon: Gem }
]
