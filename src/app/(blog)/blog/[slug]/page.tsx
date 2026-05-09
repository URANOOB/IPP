/**
 * @file [slug]/page.tsx
 * @description Detalle de una publicación del Blog.
 * Renderiza el contenido de una historia utilizando Markdown y un diseño editorial inmersivo.
 */

import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { ArrowLeft, Share2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/**
 * Componente de la página de detalle de Post.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {Promise<{ slug: string }>} props.params - Parámetros de la ruta (slug del post).
 * @returns {Promise<JSX.Element>} La vista detallada de la historia.
 */
export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Desestructuración de parámetros asíncronos en Next.js 15+
  const { slug } = await params
  const supabase = await createClient()

  /**
   * Consulta del post por slug.
   * Incluye la relación con 'profiles' para obtener datos del autor.
   */
  const { data: post } = await supabase
    .from('blog_posts')
    .select(`
      *,
      profiles (full_name, avatar_url)
    `)
    .eq('slug', slug)
    .single()

  // Manejo de error 404 si el post no existe en la base de datos
  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-ipp-paper text-ipp-plum">
      <Header />

      {/* Hero Inmersivo - Identidad Visual IPP */}
      <div className="relative h-[85vh] w-full overflow-hidden">
        {post.cover_image ? (
          <Image 
            src={post.cover_image} 
            alt={post.title} 
            fill 
            className="object-cover"
            priority 
          />
        ) : (
          <div className="bg-ipp-sky/20 h-full w-full" />
        )}
        
        {/* Overlay con degradado para suavizar la transición al contenido y mejorar legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-ipp-paper via-ipp-plum/20 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-20 max-w-5xl mx-auto w-full">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-ipp-coral px-4 py-1 rounded-full text-[0.65rem] font-black uppercase tracking-[0.3em] text-white">
               Bitácora
            </div>
            <h1 className="text-5xl md:text-8xl font-display font-black text-ipp-plum leading-[0.9] tracking-tighter">
              {post.title.toUpperCase()}
            </h1>
            
            {/* Metadatos del Post (Autor y Fecha) */}
            <div className="flex items-center gap-8 pt-8 border-t border-ipp-plum/10">
              <div className="flex flex-col">
                <span className="text-[0.6rem] font-black uppercase tracking-widest text-ipp-plum/40 mb-1">Autor</span>
                <span className="text-sm font-bold text-ipp-plum uppercase tracking-wider">{post.profiles?.full_name || 'Equipo IPP'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[0.6rem] font-black uppercase tracking-widest text-ipp-plum/40 mb-1">Publicado</span>
                <span className="text-sm font-bold text-ipp-plum uppercase tracking-wider">
                  {new Date(post.published_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Editorial con Estilos Personalizados para Markdown */}
      <article className="max-w-4xl mx-auto px-6 py-24">
        <div className="prose prose-xl prose-ipp max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]} 
            components={{
              // Estilo personalizado para párrafos (incluyendo letra capitular)
              p: ({node: _node, ...props}) => <p className="text-xl md:text-2xl font-medium leading-relaxed text-ipp-plum/80 mb-10 first-letter:text-6xl first-letter:font-black first-letter:text-ipp-coral first-letter:mr-3 first-letter:float-left first-letter:leading-none" {...props} />,
              // Títulos con identidad visual (bordes coral)
              h2: ({node: _node, ...props}) => <h2 className="text-3xl md:text-5xl font-display font-black text-ipp-plum mt-20 mb-8 tracking-tight border-b-4 border-ipp-coral w-fit" {...props} />,
              h3: ({node: _node, ...props}) => <h3 className="text-2xl md:text-3xl font-display font-black text-ipp-plum mt-12 mb-6" {...props} />,
              // Listas con marcadores laterales sky
              ul: ({node: _node, ...props}) => <ul className="space-y-4 mb-12 border-l-2 border-ipp-sky/40 pl-8 text-lg font-semibold text-ipp-plum/70" {...props} />,
              // Citas destacadas con diseño de burbuja
              blockquote: ({node: _node, ...props}) => (
                <blockquote className="relative my-20 p-12 bg-ipp-cream/30 rounded-[3rem] text-center border-2 border-ipp-plum/5" {...props}>
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-ipp-paper px-4 text-5xl text-ipp-coral font-display">“</span>
                  <p className="text-3xl md:text-4xl font-display font-black text-ipp-plum italic leading-tight mb-0" />
                </blockquote>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Navegación y Acciones al Final del Artículo */}
        <div className="mt-32 pt-12 border-t border-ipp-plum/10 flex flex-col md:flex-row items-center justify-between gap-12">
          <Link href="/blog" className="group flex items-center gap-4 text-sm font-black uppercase tracking-widest text-ipp-coral">
            <div className="h-12 w-12 rounded-2xl bg-white border border-ipp-plum/10 flex items-center justify-center transition-all group-hover:bg-ipp-coral group-hover:text-white shadow-sm">
              <ArrowLeft size={20} />
            </div>
            Ver todas las historias
          </Link>
          
          <div className="flex items-center gap-6">
            <span className="text-[0.6rem] font-black uppercase tracking-widest text-ipp-plum/40">Compartir</span>
            <button className="h-12 w-12 rounded-2xl bg-white border border-ipp-plum/10 flex items-center justify-center text-ipp-plum hover:bg-ipp-sky hover:text-white transition-all shadow-sm">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
