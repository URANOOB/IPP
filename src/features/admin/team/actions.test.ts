import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getTeamMembersAdmin, upsertTeamMember, deleteTeamMember, updateTeamOrder } from './actions'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Mock de dependencias
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

vi.mock('@/features/admin/auth/permissions', () => ({
  requireRole: vi.fn().mockResolvedValue({ success: true, userId: 'admin-id', role: 'admin' }),
}))

describe('Admin Team Actions', () => {
  const mockSupabase = {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(createClient as any).mockResolvedValue(mockSupabase)
  })

  describe('getTeamMembersAdmin', () => {
    it('debe obtener todos los integrantes ordenados', async () => {
      const mockData = [{ id: '1', name: 'Test' }]
      mockSupabase.order.mockResolvedValue({ data: mockData, error: null })

      const result = await getTeamMembersAdmin()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockData)
      expect(mockSupabase.order).toHaveBeenCalledWith('order_index', { ascending: true })
    })
  })

  describe('upsertTeamMember', () => {
    it('debe crear/actualizar un integrante y revalidar', async () => {
      const member = { name: 'New' }
      mockSupabase.single.mockResolvedValue({ data: { id: '1', ...member }, error: null })

      const result = await upsertTeamMember(member)

      expect(result.success).toBe(true)
      expect(mockSupabase.upsert).toHaveBeenCalled()
      expect(revalidatePath).toHaveBeenCalledWith('/')
      expect(revalidatePath).toHaveBeenCalledWith('/admin/team')
    })
  })

  describe('deleteTeamMember', () => {
    it('debe eliminar un integrante y revalidar', async () => {
      mockSupabase.eq.mockResolvedValue({ error: null })

      const result = await deleteTeamMember('id-1')

      expect(result.success).toBe(true)
      expect(mockSupabase.delete).toHaveBeenCalled()
      expect(revalidatePath).toHaveBeenCalledWith('/')
    })
  })

  describe('updateTeamOrder', () => {
    it('debe actualizar el orden masivamente', async () => {
      const items = [{ id: '1', order_index: 1 }]
      mockSupabase.upsert.mockResolvedValue({ error: null })

      const result = await updateTeamOrder(items)

      expect(result.success).toBe(true)
      expect(mockSupabase.upsert).toHaveBeenCalledWith(items)
    })
  })
})
