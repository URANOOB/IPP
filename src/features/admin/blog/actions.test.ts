import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createBlogPost, deleteBlogPost, getBlogPostsAdmin } from './actions'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

vi.mock('@/features/admin/auth/permissions', () => ({
  requireRole: vi.fn().mockResolvedValue({ success: true, userId: 'admin-id', role: 'admin' }),
}))

describe('Admin Blog Actions', () => {
  const mockSupabase = {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    insert: vi.fn(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(createClient as any).mockResolvedValue(mockSupabase)
    mockSupabase.auth.getUser.mockResolvedValue({ data: { user: { id: 'admin-id' } }, error: null })
    mockSupabase.single.mockResolvedValue({ data: { role: 'admin' }, error: null })
  })

  it('debe listar posts para usuarios con rol permitido', async () => {
    const mockPosts = [{ id: '1', title: 'Post 1' }]
    mockSupabase.order.mockResolvedValue({ data: mockPosts, error: null })

    const result = await getBlogPostsAdmin()

    expect(result.success).toBe(true)
    expect(result.data).toEqual(mockPosts)
  })

  it('debe crear un post y revalidar rutas', async () => {
    mockSupabase.insert.mockResolvedValue({ error: null })

    const result = await createBlogPost({ title: 'Título de prueba', content: 'Contenido' })

    expect(result.success).toBe(true)
    expect(mockSupabase.insert).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Título de prueba',
      slug: 'titulo-de-prueba',
      author_id: 'admin-id',
    }))
    expect(revalidatePath).toHaveBeenCalledWith('/admin/blog')
    expect(revalidatePath).toHaveBeenCalledWith('/blog')
  })

  it('debe eliminar un post y revalidar rutas', async () => {
    mockSupabase.eq.mockResolvedValue({ error: null })

    const result = await deleteBlogPost('test-id')

    expect(result.success).toBe(true)
    expect(mockSupabase.delete).toHaveBeenCalled()
    expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'test-id')
  })
})
