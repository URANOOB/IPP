'use server'

import { requireRole } from '@/features/admin/auth/permissions'
import type { AdminRole } from '@/features/admin/auth/permissions'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export interface UserProfile {
  id: string
  full_name: string | null
  avatar_url: string | null
  email?: string | null
  role: AdminRole
  updated_at: string
}

export async function getProfiles(): Promise<{ success: boolean; data?: UserProfile[]; error?: string }> {
  const supabase = await createClient()
  const permission = await requireRole(supabase, ['admin'])
  if (!permission.success) return permission

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

export async function updateUserRole(userId: string, role: AdminRole): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const permission = await requireRole(supabase, ['admin'])
  if (!permission.success) return permission

  const { error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId)

  if (error) {
    console.error('Error al actualizar el rol del usuario:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/users')
  return { success: true }
}

export async function getCurrentProfile(): Promise<{ success: boolean; data?: UserProfile; error?: string }> {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

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
