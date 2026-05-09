/**
 * @file team-actions.ts
 * @description Acciones de servidor para la gestión del equipo de trabajo (Integrantes).
 * Permite listar, crear, actualizar y eliminar integrantes, además de gestionar su orden de visualización.
 */

'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Integrante } from '@/types/landing'

/**
 * Obtiene la lista de todos los integrantes del equipo para el panel administrativo.
 * 
 * @returns {Promise<{ success: boolean; data?: Integrante[]; error?: string }>} 
 * Lista de integrantes ordenada por su índice de visualización.
 */
export async function getTeamMembersAdmin(): Promise<{ success: boolean; data?: Integrante[]; error?: string }> {
  const supabase = await createClient()
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

/**
 * Crea o actualiza la información de un integrante del equipo.
 * Utiliza la lógica de 'upsert' de Supabase: si el ID existe actualiza, si no, crea uno nuevo.
 * 
 * @param {Partial<Integrante>} member - Objeto con los datos del integrante.
 * @returns {Promise<{ success: boolean; data?: any; error?: string }>} Resultado de la operación y datos guardados.
 */
export async function upsertTeamMember(member: Partial<Integrante>): Promise<{ success: boolean; data?: any; error?: string }> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('team_members')
    .upsert({
      id: member.id || undefined, // Si no hay ID, Supabase genera un UUID automáticamente.
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
    console.error('Error al guardar integrante:', error)
    return { success: false, error: error.message }
  }

  // Se revalidan la landing page y el panel de administración para reflejar los cambios.
  revalidatePath('/')
  revalidatePath('/admin/team')
  return { success: true, data }
}

/**
 * Elimina un integrante del equipo de la base de datos.
 * 
 * @param {string} id - UUID del integrante a eliminar.
 * @returns {Promise<{ success: boolean; error?: string }>} Estado de la eliminación.
 */
export async function deleteTeamMember(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  
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

/**
 * Actualiza el orden de visualización de múltiples integrantes de forma masiva.
 * 
 * @param {{ id: string; order_index: number }[]} items - Lista de pares ID e índice de orden.
 * @returns {Promise<{ success: boolean; error?: string }>} Estado de la actualización masiva.
 */
export async function updateTeamOrder(items: { id: string; order_index: number }[]): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  
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
