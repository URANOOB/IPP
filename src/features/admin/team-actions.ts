'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Integrante } from '@/types/landing'

/**
 * Obtiene todos los integrantes del equipo para el panel de administración.
 */
export async function getTeamMembersAdmin(): Promise<{ success: boolean; data?: Integrante[]; error?: string }> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching team members:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data: data as Integrante[] }
}

/**
 * Crea o actualiza un integrante del equipo.
 */
export async function upsertTeamMember(member: Partial<Integrante>): Promise<{ success: boolean; data?: any; error?: string }> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('team_members')
    .upsert({
      id: member.id || undefined, // Supabase generará uno si es nuevo
      name: member.name,
      email: member.email,
      role: member.role,
      focus: member.focus,
      photo_url: member.photo_url,
      icon_name: member.icon_name,
      accent_color: member.accent_color,
      surface_color: member.surface_color,
      order_index: member.order_index ?? 0
    })
    .select()
    .single()

  if (error) {
    console.error('Error upserting team member:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/team')
  return { success: true, data }
}

/**
 * Elimina un integrante del equipo.
 */
export async function deleteTeamMember(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting team member:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/team')
  return { success: true }
}

/**
 * Actualiza el orden de los integrantes.
 */
export async function updateTeamOrder(items: { id: string; order_index: number }[]): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('team_members')
    .upsert(items)

  if (error) {
    console.error('Error updating team order:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/team')
  return { success: true }
}
