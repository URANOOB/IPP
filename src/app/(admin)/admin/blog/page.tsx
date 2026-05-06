'use client'

import { useEffect, useState } from 'react'
import { getBlogPosts, deleteBlogPost } from '@/features/blog/actions'
import { Button } from '@/components/ui/button'
import { Plus, Trash2, Edit3, Loader2, ExternalLink } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Post {
  id: string
  title: string
  slug: string
  published_at: string
  cover_image: string | null
}

export default function BlogListPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      const result = await getBlogPosts()
      
      if (result.success) {
        setPosts(result.data || [])
      } else {
        console.error(result.error)
      }
      setIsLoading(false)
    }

    fetchPosts()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta historia?')) return

    const result = await deleteBlogPost(id)

    if (!result.success) {
      alert('Error al eliminar: ' + result.error)
    } else {
      setPosts(posts.filter((post) => post.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-ipp-paper p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="font-display text-5xl font-black text-ipp-plum">Mis Historias</h1>
            <p className="text-ipp-plum/60 font-bold mt-2">Gestiona el contenido que compartes con la comunidad.</p>
          </div>
          
          <Button 
            onClick={() => router.push('/admin/blog/new')}
            className="rounded-2xl bg-ipp-coral h-14 px-8 font-black text-white shadow-lg hover:scale-105 transition-all gap-2"
          >
            <Plus size={20} />
            Nueva Historia
          </Button>
        </header>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-12 w-12 text-ipp-coral animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white p-20 rounded-[3rem] border border-ipp-plum/10 text-center">
            <p className="text-2xl font-bold text-ipp-plum/30">Aún no has escrito ninguna historia.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white p-4 md:p-6 rounded-[2.5rem] border border-ipp-plum/10 shadow-sm flex flex-col md:flex-row items-center gap-6 group hover:shadow-md transition-shadow"
              >
                <div className="relative h-32 w-full md:w-48 shrink-0 rounded-2xl overflow-hidden bg-ipp-cream/30">
                  {post.cover_image ? (
                    <Image src={post.cover_image} alt={post.title} fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-ipp-plum/20">
                      <Plus size={32} />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 text-center md:text-left">
                  <h3 className="text-2xl font-black text-ipp-plum truncate">{post.title}</h3>
                  <p className="text-ipp-plum/40 font-semibold text-sm mt-1">
                    Publicado el {new Date(post.published_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-xl border-ipp-plum/10 text-ipp-plum hover:bg-ipp-sky hover:border-ipp-sky transition-colors"
                    onClick={() => router.push(`/blog/${post.slug}`)}
                    title="Ver públicamente"
                  >
                    <ExternalLink size={20} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-xl border-ipp-plum/10 text-ipp-plum hover:bg-ipp-yellow hover:border-ipp-yellow transition-colors"
                    title="Editar"
                  >
                    <Edit3 size={20} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-xl border-ipp-plum/10 text-ipp-plum hover:bg-red-100 hover:border-red-100 hover:text-red-600 transition-colors"
                    onClick={() => handleDelete(post.id)}
                    title="Eliminar"
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
