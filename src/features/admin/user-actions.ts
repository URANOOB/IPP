'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Obtiene todos los perfiles con su información básica.
 */
export async function getProfiles(): Promise<{ success: boolean; data?: any[]; error?: string }> {
  const supabase = await createClient()
  
  // Nota: En una implementación real, podríamos querer unir con auth.users si tenemos permisos
  // o simplemente confiar en el campo email si lo añadimos a profiles.
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('full_name', { ascending: true })

  if (error) {
    console.error('Error fetching profiles:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

/**
 * Actualiza el rol de un usuario. Solo accesible por administradores.
 */
export async function updateUserRole(userId: string, role: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  
  // Verificar que el usuario actual es admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { success: false, error: 'No autenticado' }

  const { data: callerProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (callerProfile?.role !== 'admin') {
    return { success: false, error: 'No tienes permisos para realizar esta acción' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId)

  if (error) {
    console.error('Error updating user role:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/users')
  return { success: true }
}

/**
 * Obtiene el perfil del usuario actual.
 */
export async function getCurrentProfile(): Promise<{ success: boolean; data?: any; error?: string }> {
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
    console.error('Error fetching current profile:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}
