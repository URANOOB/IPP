/**
 * @file blog/new/page.tsx
 * @description Editor de nuevas historias para el blog.
 * Permite a los editores redactar contenido, subir imágenes de portada y publicar entradas directamente a Supabase.
 */

'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ImageUpload } from '@/features/admin/components/image-upload'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

/**
 * Componente de la página de creación de Post.
 * 
 * @returns {JSX.Element} Un editor minimalista con previsualización de imagen y campos de texto.
 */
export default function NewPostPage() {
  // --- Estados del Formulario ---
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState('')
  
  const router = useRouter()

  /**
   * Genera una versión amigable para URL (slug) basada en el título.
   * Elimina caracteres especiales y espacios.
   * 
   * @param {string} text - El título de la entrada.
   * @returns {string} El slug generado.
   */
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w ]+/g, '') // Elimina caracteres no alfanuméricos
      .replace(/ +/g, '-')     // Sustituye espacios por guiones
  }

  /**
   * Maneja el guardado de la nueva historia.
   * Obtiene el ID del autor desde la sesión actual y realiza la inserción en la base de datos.
   * 
   * @param {React.FormEvent} e - Evento de envío del formulario.
   */
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return alert('El título es obligatorio')

    setIsLoading(true)
    const supabase = createClient()

    try {
      // Verificación de la identidad del autor
      const { data: { user } } = await supabase.auth.getUser()
      
      // Inserción en la tabla de publicaciones
      const { error } = await supabase.from('blog_posts').insert({
        title,
        slug: generateSlug(title),
        content,
        cover_image: coverImage,
        author_id: user?.id,
        published_at: new Date().toISOString()
      })

      if (error) throw error

      alert('¡Entrada guardada con éxito!')
      router.push('/admin') // Redirección al panel principal tras el éxito
    } catch (error) {
      console.error('Error al guardar post:', error)
      alert('Error al guardar la entrada')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ipp-paper p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Barra de Herramientas Superior */}
        <header className="flex items-center justify-between mb-10">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-ipp-plum font-black hover:text-ipp-coral transition-colors"
          >
            <ArrowLeft size={20} />
            Volver al Panel
          </button>
          
          <Button 
            onClick={handleSave} 
            disabled={isLoading || !title}
            className="rounded-2xl bg-ipp-coral px-8 h-12 font-black text-white shadow-lg hover:scale-105 transition-all gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : <Save size={20} />}
            Guardar Historia
          </Button>
        </header>

        {/* Lienzo del Editor */}
        <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-ipp-plum/10 shadow-sm space-y-8">
          {/* Campo de Título con tipografía de exhibición */}
          <div className="space-y-2">
            <label className="text-sm font-black text-ipp-plum uppercase tracking-wider">Título de la Historia</label>
            <input
              type="text"
              placeholder="Ej: Nuestra visita a la comunidad de..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl md:text-5xl font-display font-black text-ipp-plum placeholder:text-ipp-plum/10 border-none focus:ring-0 p-0"
            />
          </div>

          {/* Componente de Carga de Imagen de Portada */}
          <ImageUpload onUpload={(url) => setCoverImage(url)} />

          {/* Área de Texto Principal */}
          <div className="space-y-2">
            <label className="text-sm font-black text-ipp-plum uppercase tracking-wider">Contenido (Escribe tu historia)</label>
            <textarea
              placeholder="Había una vez..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[400px] text-xl font-medium text-ipp-plum/80 placeholder:text-ipp-plum/10 border-none focus:ring-0 p-0 resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
