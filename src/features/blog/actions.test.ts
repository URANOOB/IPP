import { createClient } from '@/lib/supabase/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getBlogPosts } from './actions'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

describe('Blog Actions', () => {
  const mockSupabase = {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
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
})
