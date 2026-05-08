/**
 * BACKEND ACTIONS - LANDING
 * 
 * Acciones para gestionar el contenido dinámico de la página de inicio.
 * En esta versión estática, solo mantenemos la lógica del equipo de trabajo.
 */

'use server'

import { createClient } from '@/lib/supabase/server'
import { teamStyles } from '@/lib/styles'
import type { Integrante } from '@/types/landing'

/**
 * Obtiene la lista de integrantes del equipo desde la base de datos.
 * (Mantenemos esta función dinámica según lo solicitado).
 */
export async function getTeamMembers(): Promise<{ success: boolean; data?: Integrante[]; error?: string }> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching team:', error)
    return { success: false, error: error.message }
  }

  const members: Integrante[] = (data || []).map(member => {
    // Usar estilos locales basados en el nombre
    const localStyle = teamStyles[member.name] || {
      icon_name: 'UserRound',
      accent_color: 'var(--ipp-plum)',
      surface_color: 'var(--ipp-cream)'
    }
    
    return {
      id: member.id,
      name: member.name,
      email: member.email,
      role: member.role,
      focus: member.focus,
      photo_url: member.photo_url,
      icon_name: localStyle.icon_name,
      accent_color: localStyle.accent_color,
      surface_color: localStyle.surface_color,
      order_index: member.order_index
    }
  })

  return { success: true, data: members }
}
