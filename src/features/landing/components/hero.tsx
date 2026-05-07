"use client"

import { useState, useRef, useEffect } from "react"
import { LiquidButton } from "@/components/ui/liquid-glass-button"
import Image from "next/image"
import { BookOpen, HandHeart, MapPin, Edit3, Upload, Loader2 } from "lucide-react"
import { updateLandingContent } from "@/features/landing/actions"
import { createClient } from "@/lib/supabase/client"
import { landingDefaults } from "@/lib/data"
import { landingStyles } from "@/lib/styles"

/**
 * Componente Hero refinado con integración de Panel de Edición Centralizado.
 */
export default function Hero({ 
  dynamicContent = {},
  isEditable = false
}: { 
  dynamicContent?: Record<string, string>,
  isEditable?: boolean
}) {
  // Estado local para reflejar cambios instantáneos sin recargar toda la página
  const [content, setContent] = useState(dynamicContent)

  // Escuchar actualizaciones del panel central
  useEffect(() => {
    const handleUpdate = (e: any) => {
      setContent(prev => ({ ...prev, ...e.detail }))
    }
    window.addEventListener('ipp-cms-updated', handleUpdate)
    return () => window.removeEventListener('ipp-cms-updated', handleUpdate)
  }, [])

  // Atajos para mayor legibilidad
  const d = landingDefaults.hero
  const s = landingStyles.hero

  // Valores dinámicos con fallback
  const heroTitle = content.hero_title || d.title
  const heroTitleSize = content.hero_title_size || s.titleSize
  const heroTitleColor = content.hero_title_color || s.titleColor
  
  const heroSubtitle = content.hero_subtitle || d.subtitle
  const heroSubtitleSize = content.hero_subtitle_size || s.subtitleSize
  const heroSubtitleColor = content.hero_subtitle_color || s.subtitleColor
  
  const heroDescription = content.hero_description || d.description
  const heroDescriptionSize = content.hero_description_size || s.descriptionSize
  const heroDescriptionColor = content.hero_description_color || s.descriptionColor

  const heroButtonText = content.hero_button_text || d.buttonText
  const heroButtonColor = content.hero_button_color || s.buttonColor
  const heroImageUrl = content.hero_image_url || d.imageUrl
  
  const card1Text = content.hero_card1_text || d.card1Text
  const card2Text = content.hero_card2_text || d.card2Text
  const card3Text = content.hero_card3_text || d.card3Text

  // Función para disparar la edición de un elemento
  const triggerEdit = (key: string, label: string, value: string, extras: any = {}) => {
    if (!isEditable) return
    window.dispatchEvent(new CustomEvent('ipp-cms-select', { 
      detail: { key, label, value, ...extras } 
    }))
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-ipp-sky text-ipp-plum pt-24 md:pt-32"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/ipp/butterflies_banner3.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-ipp-sky/68" aria-hidden="true" />

      <div className="relative z-20 mx-auto grid min-h-[calc(100vh-140px)] max-w-6xl items-center gap-12 px-5 pb-16 pt-8 md:grid-cols-[0.95fr_0.85fr] md:px-8">
        <div className="w-full max-w-[350px] min-w-0 sm:max-w-2xl">
          
          {/* Subtítulo */}
          <div className="relative group mb-2">
            <p 
              style={{ fontSize: heroSubtitleSize, color: heroSubtitleColor }}
              className="font-black uppercase tracking-[0.18em]"
            >
              {heroSubtitle}
            </p>
            {isEditable && (
              <button 
                onClick={() => triggerEdit('hero_subtitle', 'Subtítulo', heroSubtitle, { sizeKey: 'hero_subtitle_size', size: heroSubtitleSize, colorKey: 'hero_subtitle_color', color: heroSubtitleColor })}
                className="absolute -top-2 -right-6 p-1 bg-ipp-coral text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 size={12} />
              </button>
            )}
          </div>

          {/* Título */}
          <div className="relative group mb-6">
            <h1 
              style={{ fontSize: heroTitleSize, color: heroTitleColor }}
              className="font-display font-black leading-[0.96]"
            >
              {heroTitle}
            </h1>
            {isEditable && (
              <button 
                onClick={() => triggerEdit('hero_title', 'Título', heroTitle, { sizeKey: 'hero_title_size', size: heroTitleSize, colorKey: 'hero_title_color', color: heroTitleColor })}
                className="absolute top-0 -right-8 p-2 bg-ipp-coral text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 size={16} />
              </button>
            )}
          </div>

          {/* Descripción */}
          <div className="relative group mb-8">
            <p 
              style={{ fontSize: heroDescriptionSize, color: heroDescriptionColor }}
              className="max-w-xl break-words font-semibold leading-relaxed"
            >
              {heroDescription}
            </p>
            {isEditable && (
              <button 
                onClick={() => triggerEdit('hero_description', 'Descripción', heroDescription, { multiline: true, sizeKey: 'hero_description_size', size: heroDescriptionSize, colorKey: 'hero_description_color', color: heroDescriptionColor })}
                className="absolute top-0 -right-6 p-1.5 bg-ipp-coral text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit3 size={14} />
              </button>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <div className="relative group w-full sm:w-auto">
              <LiquidButton
                size="xxl"
                className="w-full max-w-full rounded-full px-6 font-black text-white shadow-[6px_6px_0_rgba(96,48,72,0.22)] sm:w-auto sm:px-9 transition-colors"
                style={{ backgroundColor: heroButtonColor }}
                onClick={() => {
                  const element = document.querySelector("#project")
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                {heroButtonText}
              </LiquidButton>
              {isEditable && (
                <button 
                  onClick={() => triggerEdit('hero_button_text', 'Botón Principal', heroButtonText, { colorKey: 'hero_button_color', color: heroButtonColor })}
                  className="absolute -top-3 -right-3 p-1.5 bg-ipp-coral text-white rounded-full shadow-md z-50 hover:scale-110"
                >
                  <Edit3 size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="mt-10 grid gap-3 text-sm font-bold sm:grid-cols-3">
            {[
              { key: 'hero_card1_text', value: card1Text, icon: BookOpen },
              { key: 'hero_card2_text', value: card2Text, icon: HandHeart },
              { key: 'hero_card3_text', value: card3Text, icon: MapPin },
            ].map((card, i) => (
              <div key={i} className="organic-card flex items-center gap-3 bg-white/60 p-4 shadow-[4px_4px_0_rgba(96,48,72,0.08)] relative group">
                <card.icon className="h-5 w-5 text-ipp-coral" aria-hidden="true" />
                <span>{card.value}</span>
                {isEditable && (
                  <button 
                    onClick={() => triggerEdit(card.key, `Tarjeta ${i+1}`, card.value)}
                    className="absolute -top-2 -right-2 p-1 bg-ipp-coral text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit3 size={10} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[250px] min-w-0">
          <div
            className="absolute inset-x-10 top-12 h-72 rounded-full bg-white/28 blur-3xl"
            aria-hidden="true"
          />
          <div className="absolute bottom-0 left-1/2 z-10 w-[320px] max-w-none -translate-x-1/2 drop-shadow-[8px_8px_0_rgba(96,48,72,0.12)] md:w-[420px] lg:w-[470px] group">
            <Image
              src={heroImageUrl}
              alt=""
              width={874}
              height={574}
              priority
              className="w-full h-auto object-contain"
            />
            {isEditable && (
              <label className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl cursor-pointer">
                <div className="bg-ipp-coral text-white p-4 rounded-full shadow-xl">
                  <Upload size={32} />
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const supabase = createClient()
                    const filePath = `landing/${Math.random()}.${file.name.split('.').pop()}`
                    await supabase.storage.from('media').upload(filePath, file)
                    const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(filePath)
                    await updateLandingContent({ hero_image_url: publicUrl })
                    window.dispatchEvent(new CustomEvent('ipp-cms-updated', { detail: { hero_image_url: publicUrl } }))
                  }}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="paper-edge absolute bottom-0 left-0 right-0 z-20 h-10 bg-ipp-paper" aria-hidden="true" />
    </section>
  )
}
