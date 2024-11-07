import type { Tables } from '@/lib/supabase/types'

export type Like = Tables<'likes'>
export type Comment = Tables<'comments'>
export type Post = Tables<'posts'>
export type Step = Tables<'steps'>
export type Sunlight = Tables<'sunlight'>
export type Water = Tables<'water'>
export type Sleep = Tables<'sleep'>

export interface PostResponse extends Post {
  likes: Array<Like>
  comments: Array<Comment>
}
