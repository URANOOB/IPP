/**
 * @file image-upload.tsx
 * @description Componente de carga de imágenes para el panel de administración.
 * Permite seleccionar archivos, subirlos a Supabase Storage y previsualizarlos.
 */

'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Upload, X, Loader2 } from 'lucide-react'
import Image from 'next/image'

/**
 * Propiedades del componente ImageUpload.
 */
interface ImageUploadProps {
  /** Callback ejecutado cuando la imagen se sube con éxito, devuelve la URL pública. */
  onUpload: (url: string) => void
  /** URL de la imagen cargada por defecto (para edición). */
  defaultValue?: string
  /** Etiqueta descriptiva del campo. */
  label?: string
}

/**
 * Componente que gestiona la carga de archivos multimedia a Supabase.
 * 
 * @param {ImageUploadProps} props - Propiedades del componente.
 * @returns {JSX.Element} Un selector de archivos con previsualización y estado de carga.
 */
export function ImageUpload({ onUpload, defaultValue, label = "Imagen de portada" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultValue || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  /**
   * Maneja la selección y subida del archivo.
   * Valida que sea una imagen y genera un nombre único antes de subirlo al bucket 'media'.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - Evento de cambio del input file.
   */
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validación básica del tipo MIME
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecciona un archivo de imagen válido.')
      return
    }

    setIsUploading(true)
    const supabase = createClient()

    try {
      // Generación de un nombre de archivo único para evitar colisiones en Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `uploads/${fileName}`

      // Proceso de subida al bucket configurado en Supabase
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // Obtención de la URL de acceso público
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath)

      setPreviewUrl(publicUrl)
      onUpload(publicUrl)
    } catch (error) {
      console.error('Error al subir imagen:', error)
      alert('Error al subir la imagen. Inténtalo de nuevo.')
    } finally {
      setIsUploading(false)
    }
  }

  /** Limpia la imagen seleccionada y resetea el input. */
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
          /* Vista de previsualización de la imagen cargada */
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
          /* Zona de carga (Dropzone/Click) */
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
