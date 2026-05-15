'use server'

import { requireRole } from '@/features/admin/auth/permissions'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

interface ContactMessage {
  id: string
  full_name: string
  email: string
  interest_type: string
  message: string
  is_read: boolean
  created_at: string
}

export async function getContactMessages(): Promise<{ success: boolean; data?: ContactMessage[]; error?: string }> {
  const supabase = await createClient()
  const permission = await requireRole(supabase, ['admin', 'editor', 'viewer'])
  if (!permission.success) return permission

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

export async function toggleMessageReadStatus(id: string, currentStatus: boolean): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const permission = await requireRole(supabase, ['admin', 'editor'])
  if (!permission.success) return permission

  const { error } = await supabase
    .from('contact_messages')
    .update({ is_read: !currentStatus })
    .eq('id', id)

  if (error) {
    console.error('Error al actualizar estado del mensaje:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/messages')
  return { success: true }
}

export async function deleteMessage(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  const permission = await requireRole(supabase, ['admin'])
  if (!permission.success) return permission

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
