import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getProfiles, updateUserRole, getCurrentProfile } from './user-actions'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Mock de dependencias
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('Admin User Actions', () => {
  const mockSupabase = {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockReturnThis(),
    auth: {
      getUser: vi.fn(),
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(createClient as any).mockResolvedValue(mockSupabase)
    
    // Configuración base de encadenamiento
    mockSupabase.from.mockReturnValue(mockSupabase)
    mockSupabase.select.mockReturnValue(mockSupabase)
    mockSupabase.update.mockReturnValue(mockSupabase)
    mockSupabase.order.mockReturnValue(mockSupabase)
    mockSupabase.eq.mockReturnValue(mockSupabase)
    mockSupabase.single.mockReturnValue(mockSupabase)
  })

  describe('getProfiles', () => {
    it('debe retornar todos los perfiles', async () => {
      const mockProfiles = [{ id: '1', full_name: 'Admin' }]
      // .from().select().order() -> order es el último
      mockSupabase.order.mockResolvedValue({ data: mockProfiles, error: null })

      const result = await getProfiles()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockProfiles)
    })
  })

  describe('updateUserRole', () => {
    it('debe actualizar el rol si el que llama es admin', async () => {
      // 1. Auth mock
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'admin-id' } }, error: null })
      
      // 2. Mock para caller profile: .from().select().eq().single()
      mockSupabase.eq.mockReturnValueOnce(mockSupabase) // primer eq retorna mock para single
      mockSupabase.single.mockResolvedValueOnce({ data: { role: 'admin' }, error: null })
      
      // 3. Mock para actualización: .from().update().eq()
      mockSupabase.eq.mockResolvedValueOnce({ error: null }) // segundo eq retorna resultado

      const result = await updateUserRole('user-id', 'editor')

      expect(result.success).toBe(true)
      expect(mockSupabase.update).toHaveBeenCalledWith({ role: 'editor' })
      expect(revalidatePath).toHaveBeenCalledWith('/admin/users')
    })

    it('debe fallar si el que llama no es admin', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'non-admin-id' } }, error: null })
      
      // .from().select().eq().single()
      mockSupabase.eq.mockReturnValueOnce(mockSupabase)
      mockSupabase.single.mockResolvedValueOnce({ data: { role: 'editor' }, error: null })

      const result = await updateUserRole('user-id', 'admin')

      expect(result.success).toBe(false)
      expect(result.error).toContain('No tienes permisos')
    })
  })

  describe('getCurrentProfile', () => {
    it('debe retornar el perfil del usuario autenticado', async () => {
      mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'id-123' } }, error: null })
      
      // .from().select().eq().single()
      mockSupabase.eq.mockReturnValueOnce(mockSupabase)
      mockSupabase.single.mockResolvedValueOnce({ data: { id: 'id-123', full_name: 'Test' }, error: null })

      const result = await getCurrentProfile()

      expect(result.success).toBe(true)
      expect(result.data!.id).toBe('id-123')
    })
  })
})
