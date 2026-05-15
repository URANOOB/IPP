'use server'

import { requireRole } from '@/features/admin/auth/permissions'
import { createClient } from '@/lib/supabase/server'
import type { Integrante } from '@/types/landing'
import { revalidatePath } from 'next/cache'

export async function getTeamMembersAdmin(): Promise<{ success: boolean; data?: Integrante[]; error?: string }> {
  const supabase = await createClient()
  const permission = await requireRole(supabase, ['admin', 'editor', 'viewer'])
  if (!permission.success) return permission

  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error al obtener integrantes (Admin):', error)
    return { success: false, error: error.message }
  }

  return { success: true, data: data as Integrante[] }
}

export async function upsertTeamMember(member: Partial<Integrante>): Promise<{ success: boolean; data?: unknown; error?: string }> {
  const supabase = await createClient()
  const permission = await requireRole(supabase, ['admin', 'editor'])
  if (!permission.success) return permission

  const { data, error } = await supabase
    .from('team_members')
    .upsert({
      id: member.id || undefined,
      name: member.name,
      email: member.email,
      role: member.role,
      focus: member.focus,
      photo_url: member.photo_url,
      icon_name: member.icon_name,
      accent_color: member.accent_color,
      surface_color: member.surface_color,
      order_index: member.order_index ?? 0,
    })
    .select()
    .single()

  if (error) {
    console.error('Error al guardar integrante:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/team')
  return { success: true, data }
}

export async function deleteTeamMember(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const permission = await requireRole(supabase, ['admin'])
  if (!permission.success) return permission

  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error al eliminar integrante:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/team')
  return { success: true }
}

export async function updateTeamOrder(items: { id: string; order_index: number }[]): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const permission = await requireRole(supabase, ['admin', 'editor'])
  if (!permission.success) return permission

  const { error } = await supabase
    .from('team_members')
    .upsert(items)

  if (error) {
    console.error('Error al actualizar el orden del equipo:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/team')
  return { success: true }
}
