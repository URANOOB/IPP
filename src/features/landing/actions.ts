/**
 * @file actions.ts
 * @description Acciones de servidor (Server Actions) para la landing page.
 * Gestiona la obtención de integrantes del equipo y el envío de mensajes de contacto.
 */

'use server'

import { createClient } from '@/lib/supabase/server'
import { teamStyles } from '@/lib/styles'
import type { Integrante } from '@/types/landing'

/**
 * Obtiene la lista de integrantes del equipo desde la base de datos de Supabase.
 * Mapea los estilos visuales (colores e iconos) basados en el nombre del integrante
 * utilizando la configuración local de 'lib/styles'.
 * 
 * @returns {Promise<{ success: boolean; data?: Integrante[]; error?: string }>} 
 * Un objeto indicando el éxito de la operación, los datos de los integrantes mapeados o el error ocurrido.
 */
export async function getTeamMembers(): Promise<{ success: boolean; data?: Integrante[]; error?: string }> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error al obtener el equipo:', error)
    return { success: false, error: error.message }
  }

  // Mapeo de datos dinámicos con estilos locales predefinidos
  const members: Integrante[] = (data || []).map(member => {
    // Buscar estilo personalizado por nombre o asignar fallback
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

/**
 * Interfaz para los datos del formulario de contacto.
 */
interface ContactFormData {
  /** Nombre completo del remitente */
  name: string
  /** Correo electrónico de contacto */
  email: string
  /** Tipo de interés o categoría de la consulta */
  type: 'donacion' | 'voluntariado' | 'taller' | 'otro'
  /** Mensaje o detalles de la solicitud */
  message: string
}

/**
 * Guarda un nuevo mensaje de contacto en la tabla 'contact_messages' de Supabase.
 * 
 * @param {ContactFormData} formData - Los datos capturados desde el formulario de la UI.
 * @returns {Promise<{ success: boolean; error?: string }>} Estado de la inserción.
 */
export async function sendContactMessage(formData: ContactFormData): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('contact_messages')
    .insert([
      {
        full_name: formData.name,
        email: formData.email,
        interest_type: formData.type,
        message: formData.message,
      }
    ])

  if (error) {
    console.error('Error al guardar el mensaje de contacto:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
