/**
 * @file actions.ts
 * @description Acciones de servidor (Server Actions) para el sistema de Blog.
 * Gestiona la lectura y eliminación de publicaciones conectándose a Supabase.
 */

'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Representa la estructura simplificada de una publicación para listados.
 */
interface PostListItem {
  id: string
  title: string
  slug: string
  published_at: string
  cover_image: string | null
}

/**
 * Obtiene la lista de publicaciones del blog desde la base de datos de Supabase.
 * Ordena las publicaciones por fecha de creación de forma descendente.
 * 
 * @returns {Promise<{ success: boolean; data?: PostListItem[]; error?: string }>} 
 * Objeto con los datos de las publicaciones o información del error.
 */
export async function getBlogPosts(): Promise<{ success: boolean; data?: PostListItem[]; error?: string }> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, published_at, cover_image')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error al obtener publicaciones:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data: (data as PostListItem[]) || [] }
}

/**
 * Elimina una publicación específica de la base de datos por su ID único.
 * Tras la eliminación exitosa, revalida las rutas de administración y visualización pública.
 * 
 * @param {string} id - El UUID de la publicación que se desea eliminar.
 * @returns {Promise<{ success: boolean; error?: string }>} Estado de la operación de borrado.
 */
export async function deleteBlogPost(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error al eliminar publicación:', error)
    return { success: false, error: error.message }
  }

  // Se limpian las rutas cacheadas por Next.js para asegurar que el contenido esté actualizado.
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  
  return { success: true }
}
