'use client'

import { useEffect, useState } from 'react'
import { getLandingContent, updateLandingContent } from '@/features/landing/actions'
import { Button } from '@/components/ui/button'
import { Save, Loader2, ArrowLeft, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'

const DEFAULT_KEYS = [
  { key: 'hero_title', label: 'Título del Hero', placeholder: 'Ej: Inglés Pa\' la Paz' },
  { key: 'hero_subtitle', label: 'Subtítulo del Hero', placeholder: 'Proyecto educativo y comunitario...' },
  { key: 'hero_description', label: 'Descripción Principal', placeholder: 'Usamos relatos, diálogo...' },
  { key: 'info_title', label: 'Título Sección Quiénes Somos', placeholder: 'Inglés para la paz desde...' },
  { key: 'info_description', label: 'Texto Quiénes Somos', placeholder: 'En Inglés Pa\' la Paz creamos...' },
]

export default function LandingEditorPage() {
  const [content, setContent] = useState<Record<string, string>>({})
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchContent = async () => {
      const result = await getLandingContent()
      
      if (result.success) {
        setContent(result.data || {})
      } else {
        console.error(result.error)
      }
    }

    fetchContent()
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    const result = await updateLandingContent(content)

    if (result.success) {
      alert('¡Contenido actualizado!')
    } else {
      console.error(result.error)
      alert('Error al guardar los cambios: ' + result.error)
    }
    setIsSaving(false)
  }

  return (
    <div className="min-h-screen bg-ipp-paper p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <button 
            onClick={() => router.push('/admin')}
            className="flex items-center gap-2 text-ipp-plum font-black hover:text-ipp-coral transition-colors"
          >
            <ArrowLeft size={20} />
            Volver al Panel
          </button>
          
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="rounded-2xl bg-ipp-coral px-8 h-12 font-black text-white shadow-lg hover:scale-105 transition-all gap-2"
          >
            {isSaving ? <Loader2 className="animate-spin h-5 w-5" /> : <Save size={20} />}
            Guardar Cambios
          </Button>
        </header>

        <div className="space-y-8">
          <div className="bg-white p-8 md:p-10 rounded-[3rem] border border-ipp-plum/10 shadow-sm">
            <h2 className="text-2xl font-black text-ipp-plum mb-8 flex items-center gap-3">
              <RefreshCw className="text-ipp-coral" size={24} />
              Textos de la Landing
            </h2>

            <div className="space-y-6">
              {DEFAULT_KEYS.map((item) => (
                <div key={item.key} className="space-y-2">
                  <label className="text-xs font-black text-ipp-plum/40 uppercase tracking-widest px-1">
                    {item.label}
                  </label>
                  {item.key.includes('description') ? (
                    <textarea
                      value={content[item.key] || ''}
                      onChange={(e) => setContent({ ...content, [item.key]: e.target.value })}
                      placeholder={item.placeholder}
                      className="w-full min-h-[120px] bg-ipp-cream/20 border-2 border-ipp-plum/5 rounded-2xl p-4 font-semibold text-ipp-plum focus:border-ipp-coral/30 focus:ring-0 transition-colors"
                    />
                  ) : (
                    <input
                      type="text"
                      value={content[item.key] || ''}
                      onChange={(e) => setContent({ ...content, [item.key]: e.target.value })}
                      placeholder={item.placeholder}
                      className="w-full bg-ipp-cream/20 border-2 border-ipp-plum/5 rounded-2xl p-4 font-bold text-ipp-plum focus:border-ipp-coral/30 focus:ring-0 transition-colors"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
