/**
 * @file message-actions.ts
 * @description Acciones de servidor para la gestión de mensajes de contacto en el panel de administración.
 * Permite listar, actualizar el estado de lectura y eliminar mensajes.
 */

'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Representa la estructura de un mensaje de contacto en la base de datos.
 */
interface ContactMessage {
  id: string
  full_name: string
  email: string
  interest_type: string
  message: string
  is_read: boolean
  created_at: string
}

/**
 * Obtiene la lista completa de mensajes de contacto registrados.
 * Los mensajes se devuelven ordenados por fecha de creación (más recientes primero).
 * 
 * @returns {Promise<{ success: boolean; data?: ContactMessage[]; error?: string }>} 
 * Resultado de la consulta con la lista de mensajes o el error correspondiente.
 */
export async function getContactMessages(): Promise<{ success: boolean; data?: ContactMessage[]; error?: string }> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error al obtener mensajes:', error)
    return { success: false, error: error.message }
  }

  return { success: true, data: data as ContactMessage[] }
}

/**
 * Cambia el estado de lectura de un mensaje específico.
 * Invierte el valor actual de 'is_read' y revalida la ruta de administración.
 * 
 * @param {string} id - UUID del mensaje a actualizar.
 * @param {boolean} currentStatus - El estado de lectura actual del mensaje.
 * @returns {Promise<{ success: boolean; error?: string }>} Estado de la actualización.
 */
export async function toggleMessageReadStatus(id: string, currentStatus: boolean): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('contact_messages')
    .update({ is_read: !currentStatus })
    .eq('id', id)

  if (error) {
    console.error('Error al actualizar estado del mensaje:', error)
    return { success: false, error: error.message }
  }

  // Revalidación de la ruta para asegurar que el panel refleje el cambio de estado.
  revalidatePath('/admin/messages')
  return { success: true }
}

/**
 * Elimina permanentemente un mensaje de contacto de la base de datos.
 * 
 * @param {string} id - UUID del mensaje que se desea eliminar.
 * @returns {Promise<{ success: boolean; error?: string }>} Estado de la eliminación.
 */
export async function deleteMessage(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('contact_messages')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error al eliminar mensaje:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/messages')
  return { success: true }
}
