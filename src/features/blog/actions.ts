/**
 * BACKEND ACTIONS - BLOG
 * 
 * Este archivo contiene las Server Actions encargadas de la lógica de negocio
 * para el blog. Al usar 'use server', estas funciones se ejecutan exclusivamente
 * en el servidor, protegiendo las credenciales y mejorando la seguridad.
 */

'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Obtiene la lista de publicaciones del blog desde la base de datos.
 * @returns Un objeto con el estado de la operación y los datos.
 */
export async function getBlogPosts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, published_at, cover_image')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data: data || [] }
}

/**
 * Elimina una publicación específica y revalida las rutas afectadas.
 * @param id UUID de la publicación a eliminar.
 */
export async function deleteBlogPost(id: string) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting post:', error)
    return { success: false, error: error.message }
  }

  // Limpiamos la caché de Next.js para que los cambios se vean reflejados inmediatamente
  revalidatePath('/admin/blog')
  revalidatePath('/blog')
  return { success: true }
}
