'use server'

import { requireRole } from '@/features/admin/auth/permissions'
import { listBlogPosts, type PostListItem } from '@/features/blog/repository'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export interface CreateBlogPostInput {
  title: string
  content: string
  coverImage?: string
}

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export async function getBlogPostsAdmin(): Promise<{ success: boolean; data?: PostListItem[]; error?: string }> {
  const supabase = await createClient()
  const permission = await requireRole(supabase, ['admin', 'editor', 'viewer'])
  if (!permission.success) return permission

  const { data, error } = await listBlogPosts(supabase)

  if (error) {
    console.error('Error al obtener publicaciones:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data: (data as PostListItem[]) || [] }
}

export async function createBlogPost(input: CreateBlogPostInput): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const permission = await requireRole(supabase, ['admin', 'editor'])
  if (!permission.success) return permission

  const title = input.title.trim()
  const content = input.content.trim()

  if (!title) {
    return { success: false, error: 'El título es obligatorio' }
  }

  const { error } = await supabase.from('blog_posts').insert({
    title,
    slug: generateSlug(title),
    content,
    cover_image: input.coverImage || null,
    author_id: permission.userId,
    published_at: new Date().toISOString(),
  })

  if (error) {
    console.error('Error al guardar publicación:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  return { success: true }
}

export async function deleteBlogPost(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const permission = await requireRole(supabase, ['admin', 'editor'])
  if (!permission.success) return permission

  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error al eliminar publicación:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  return { success: true }
}
