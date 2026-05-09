import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getBlogPosts, deleteBlogPost } from './actions'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Mock de dependencias
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('Blog Actions', () => {
  const mockSupabase = {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    ;(createClient as any).mockResolvedValue(mockSupabase)
  })

  describe('getBlogPosts', () => {
    it('debe retornar lista de posts exitosamente', async () => {
      const mockPosts = [{ id: '1', title: 'Post 1' }]
      mockSupabase.order.mockResolvedValue({ data: mockPosts, error: null })

      const result = await getBlogPosts()

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockPosts)
      expect(mockSupabase.from).toHaveBeenCalledWith('blog_posts')
      expect(mockSupabase.select).toHaveBeenCalledWith('id, title, slug, published_at, cover_image')
    })

    it('debe retornar error si falla Supabase', async () => {
      mockSupabase.order.mockResolvedValue({ data: null, error: { message: 'DB Error' } })

      const result = await getBlogPosts()

      expect(result.success).toBe(false)
      expect(result.error).toBe('DB Error')
    })
  })

  describe('deleteBlogPost', () => {
    it('debe eliminar el post y revalidar rutas', async () => {
      mockSupabase.eq.mockResolvedValue({ error: null })

      const result = await deleteBlogPost('test-id')

      expect(result.success).toBe(true)
      expect(mockSupabase.from).toHaveBeenCalledWith('blog_posts')
      expect(mockSupabase.delete).toHaveBeenCalled()
      expect(mockSupabase.eq).toHaveBeenCalledWith('id', 'test-id')
      expect(revalidatePath).toHaveBeenCalledWith('/admin/blog')
      expect(revalidatePath).toHaveBeenCalledWith('/blog')
    })

    it('debe retornar error si falla el borrado', async () => {
      mockSupabase.eq.mockResolvedValue({ error: { message: 'Delete Error' } })

      const result = await deleteBlogPost('test-id')

      expect(result.success).toBe(false)
      expect(result.error).toBe('Delete Error')
      expect(revalidatePath).not.toHaveBeenCalled()
    })
  })
})
