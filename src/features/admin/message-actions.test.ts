import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getContactMessages, toggleMessageReadStatus, deleteMessage } from './message-actions'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Mock de dependencias
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('Admin Message Actions', () => {
  const mockSupabase = {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(createClient as any).mockResolvedValue(mockSupabase)
  })

  describe('getContactMessages', () => {
    it('debe obtener todos los mensajes exitosamente', async () => {
      const mockMessages = [{ id: '1', full_name: 'Test' }]
      mockSupabase.order.mockResolvedValue({ data: mockMessages, error: null })

      const result = await getContactMessages()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockMessages)
      expect(mockSupabase.from).toHaveBeenCalledWith('contact_messages')
      expect(mockSupabase.select).toHaveBeenCalledWith('*')
    })

    it('debe manejar errores de Supabase', async () => {
      mockSupabase.order.mockResolvedValue({ data: null, error: { message: 'Fetch Error' } })

      const result = await getContactMessages()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Fetch Error')
    })
  })

  describe('toggleMessageReadStatus', () => {
    it('debe cambiar el estado de lectura y revalidar', async () => {
      mockSupabase.eq.mockResolvedValue({ error: null })

      const result = await toggleMessageReadStatus('msg-1', false)

      expect(result.success).toBe(true)
      expect(mockSupabase.update).toHaveBeenCalledWith({ is_read: true })
      expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'msg-1')
      expect(revalidatePath).toHaveBeenCalledWith('/admin/messages')
    })
  })

  describe('deleteMessage', () => {
    it('debe eliminar el mensaje y revalidar', async () => {
      mockSupabase.eq.mockResolvedValue({ error: null })

      const result = await deleteMessage('msg-1')

      expect(result.success).toBe(true)
      expect(mockSupabase.delete).toHaveBeenCalled()
      expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'msg-1')
      expect(revalidatePath).toHaveBeenCalledWith('/admin/messages')
    })
  })
})
