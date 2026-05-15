import type { createClient } from '@/lib/supabase/server'

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>

export interface PostListItem {
  id: string
  title: string
  slug: string
  published_at: string
  cover_image: string | null
}

export async function listBlogPosts(supabase: SupabaseServerClient) {
  return supabase
    .from('blog_posts')
    .select('id, title, slug, published_at, cover_image')
    .order('created_at', { ascending: false })
}
