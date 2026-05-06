'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { ImageIcon, Upload, X, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  onUpload: (url: string) => void
  defaultValue?: string
  label?: string
}

export function ImageUpload({ onUpload, defaultValue, label = "Imagen de portada" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultValue || null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecciona un archivo de imagen válido.')
      return
    }

    setIsUploading(true)

    try {
      // Crear un nombre único para el archivo
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `uploads/${fileName}`

      // Subir a Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('media')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath)

      setPreviewUrl(publicUrl)
      onUpload(publicUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error al subir la imagen. Inténtalo de nuevo.')
    } finally {
      setIsUploading(false)
    }
  }

  const removeImage = () => {
    setPreviewUrl(null)
    onUpload('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4 w-full">
      <label className="block text-sm font-black text-ipp-plum uppercase tracking-wider">
        {label}
      </label>
      
      <div className="relative group">
        {previewUrl ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] border-2 border-ipp-plum/10 bg-white">
            <Image
              src={previewUrl}
              alt="Vista previa"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="rounded-full h-12 w-12"
                onClick={removeImage}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex flex-col items-center justify-center w-full aspect-video rounded-[2rem] border-2 border-dashed border-ipp-plum/20 bg-ipp-cream/30 hover:bg-ipp-cream/50 hover:border-ipp-coral/40 transition-all duration-300"
          >
            {isUploading ? (
              <Loader2 className="h-10 w-10 text-ipp-coral animate-spin" />
            ) : (
              <>
                <div className="p-4 rounded-full bg-white shadow-sm mb-4">
                  <Upload className="h-8 w-8 text-ipp-coral" />
                </div>
                <p className="text-ipp-plum font-bold">Haz clic para subir una imagen</p>
                <p className="text-ipp-plum/40 text-xs font-semibold mt-1">PNG, JPG o WebP hasta 5MB</p>
              </>
            )}
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  )
}
