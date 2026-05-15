import { requireRole } from '@/features/admin/auth/permissions'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getCurrentProfile, getProfiles, updateUserRole } from './actions'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

vi.mock('@/features/admin/auth/permissions', () => ({
  requireRole: vi.fn().mockResolvedValue({ success: true, userId: 'admin-id', role: 'admin' }),
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
    ;(requireRole as any).mockResolvedValue({ success: true, userId: 'admin-id', role: 'admin' })
    mockSupabase.from.mockReturnValue(mockSupabase)
    mockSupabase.select.mockReturnValue(mockSupabase)
    mockSupabase.update.mockReturnValue(mockSupabase)
    mockSupabase.order.mockReturnValue(mockSupabase)
    mockSupabase.eq.mockReturnValue(mockSupabase)
    mockSupabase.single.mockReturnValue(mockSupabase)
  })

  it('debe retornar todos los perfiles si el usuario es admin', async () => {
    const mockProfiles = [{ id: '1', full_name: 'Admin' }]
    mockSupabase.order.mockResolvedValue({ data: mockProfiles, error: null })

    const result = await getProfiles()

    expect(result.success).toBe(true)
    expect(result.data).toEqual(mockProfiles)
    expect(requireRole).toHaveBeenCalledWith(mockSupabase, ['admin'])
  })

  it('debe actualizar el rol si el que llama es admin', async () => {
    mockSupabase.eq.mockResolvedValueOnce({ error: null })

    const result = await updateUserRole('user-id', 'editor')

    expect(result.success).toBe(true)
    expect(mockSupabase.update).toHaveBeenCalledWith({ role: 'editor' })
    expect(revalidatePath).toHaveBeenCalledWith('/admin/users')
  })

  it('debe fallar si el que llama no es admin', async () => {
    ;(requireRole as any).mockResolvedValueOnce({ success: false, error: 'No tienes permisos para realizar esta acción' })

    const result = await updateUserRole('user-id', 'admin')

    expect(result.success).toBe(false)
    expect(result.error).toContain('No tienes permisos')
  })

  it('debe retornar el perfil del usuario autenticado', async () => {
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'id-123' } }, error: null })
    mockSupabase.eq.mockReturnValueOnce(mockSupabase)
    mockSupabase.single.mockResolvedValueOnce({ data: { id: 'id-123', full_name: 'Test' }, error: null })

    const result = await getCurrentProfile()

    expect(result.success).toBe(true)
    expect(result.data!.id).toBe('id-123')
  })
})
