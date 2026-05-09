/**
 * @file user-actions.ts
 * @description Acciones de servidor para la gestión de usuarios y perfiles administrativos.
 * Incluye funciones para listar perfiles, actualizar roles y obtener información del usuario actual.
 */

'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Representa la estructura de un perfil de usuario en el sistema.
 */
interface UserProfile {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: 'admin' | 'editor' | 'viewer'
  updated_at: string
}

/**
 * Obtiene todos los perfiles de usuario registrados en la base de datos.
 * Los resultados se ordenan alfabéticamente por el nombre completo.
 * 
 * @returns {Promise<{ success: boolean; data?: UserProfile[]; error?: string }>} 
 * Lista de perfiles o información del error.
 */
export async function getProfiles(): Promise<{ success: boolean; data?: UserProfile[]; error?: string }> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('full_name', { ascending: true })

  if (error) {
    console.error('Error al obtener perfiles:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data: data as UserProfile[] }
}

/**
 * Actualiza el rol jerárquico de un usuario específico.
 * Esta acción requiere que el usuario que la ejecuta tenga el rol de 'admin'.
 * 
 * @param {string} userId - UUID del usuario cuyo rol se desea cambiar.
 * @param {string} role - El nuevo rol asignado ('admin', 'editor', etc.).
 * @returns {Promise<{ success: boolean; error?: string }>} Estado de la actualización de permisos.
 */
export async function updateUserRole(userId: string, role: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  
  // Verificación de autenticación
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'No autenticado' }

  // Verificación de permisos de administrador para el ejecutor
  const { data: callerProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (callerProfile?.role !== 'admin') {
    return { success: false, error: 'No tienes permisos para realizar esta acción' }
  }

  // Actualización del rol en la tabla de perfiles
  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId)

  if (error) {
    console.error('Error al actualizar el rol del usuario:', error)
    return { success: false, error: error.message }
  }

  // Revalida la ruta de gestión de usuarios para mostrar el nuevo rol inmediatamente.
  revalidatePath('/admin/users')
  return { success: true }
}

/**
 * Recupera el perfil completo del usuario que está autenticado en la sesión actual.
 * 
 * @returns {Promise<{ success: boolean; data?: UserProfile; error?: string }>} 
 * Los datos del perfil del usuario actual o un mensaje de error si no está autenticado.
 */
export async function getCurrentProfile(): Promise<{ success: boolean; data?: UserProfile; error?: string }> {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return { success: false, error: 'No autenticado' }
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) {
    console.error('Error al obtener el perfil actual:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data: data as UserProfile }
}
