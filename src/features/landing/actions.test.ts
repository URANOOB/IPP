import { describe, it, expect, vi, beforeEach } from 'vitest'
import { sendContactMessage, getTeamMembers } from './actions'
import { createClient } from '@/lib/supabase/server'

// Mock de Supabase Server Client
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

describe('Landing Actions', () => {
  const mockSupabase = {
    from: vi.fn().mockReturnThis(),
    insert: vi.fn(),
    select: vi.fn().mockReturnThis(),
    order: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(createClient as any).mockResolvedValue(mockSupabase)
  })

  describe('sendContactMessage', () => {
    const validFormData = {
      name: 'Test User',
      email: 'test@example.com',
      type: 'taller' as const,
      message: 'Hello world',
    }

    it('debe guardar el mensaje exitosamente', async () => {
      mockSupabase.insert.mockResolvedValue({ error: null })

      const result = await sendContactMessage(validFormData)

      expect(result.success).toBe(true)
      expect(mockSupabase.from).toHaveBeenCalledWith('contact_messages')
      expect(mockSupabase.insert).toHaveBeenCalledWith([
        {
          full_name: validFormData.name,
          email: validFormData.email,
          interest_type: validFormData.type,
          message: validFormData.message,
        },
      ])
    })

    it('debe retornar error si falla la inserción en Supabase', async () => {
      mockSupabase.insert.mockResolvedValue({ error: { message: 'DB Error' } })

      const result = await sendContactMessage(validFormData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('DB Error')
    })
  })

  describe('getTeamMembers', () => {
    it('debe retornar la lista de integrantes mapeada', async () => {
      const mockData = [
        {
          id: '1',
          name: 'Juan Pérez',
          email: 'juan@example.com',
          role: 'Coordinador',
          focus: 'Paz',
          photo_url: 'url',
          order_index: 0,
        },
      ]
      mockSupabase.order.mockResolvedValue({ data: mockData, error: null })

      const result = await getTeamMembers()

      expect(result.success).toBe(true)
      expect(result.data).toHaveLength(1)
      expect(result.data![0].name).toBe('Juan Pérez')
      // Verificar que se asignó un estilo por defecto si no existe en teamStyles
      expect(result.data![0].accent_color).toBe('var(--ipp-plum)')
    })

    it('debe retornar error si falla la consulta', async () => {
      mockSupabase.order.mockResolvedValue({ data: null, error: { message: 'Fetch Error' } })

      const result = await getTeamMembers()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Fetch Error')
    })
  })
})
