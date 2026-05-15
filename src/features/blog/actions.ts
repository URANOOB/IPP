'use server'

import { createClient } from '@/lib/supabase/server'
import { listBlogPosts, type PostListItem } from './repository'

export async function getBlogPosts(): Promise<{ success: boolean; data?: PostListItem[]; error?: string }> {
  const supabase = await createClient()
  const { data, error } = await listBlogPosts(supabase)

  if (error) {
    console.error('Error al obtener publicaciones:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data: (data as PostListItem[]) || [] }
}
