"use client"

import { LiquidButton } from "@/components/ui/liquid-glass-button"
import Image from "next/image"
import { BookOpen, HandHeart, MapPin } from "lucide-react"

export default function Hero({ dynamicContent = {} }: { dynamicContent?: Record<string, string> }) {
  // Valores dinámicos con fallback
  const heroTitle = dynamicContent.hero_title || "Inglés Pa' la Paz"
  const heroSubtitle = dynamicContent.hero_subtitle || "Proyecto educativo y comunitario en Colombia"
  const heroDescription = dynamicContent.hero_description || "Usamos relatos, diálogo y experiencias creativas para que niñas, niños y comunidades vivan el inglés como una herramienta cercana para aprender, expresarse y construir paz desde su historia y su territorio."

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
          <p className="text-sm font-black uppercase tracking-[0.18em] text-ipp-plum/70">
            {heroSubtitle}
          </p>

          <h1 className="font-display text-5xl font-black leading-[0.96] text-ipp-coral sm:text-6xl lg:text-7xl">
            {heroTitle.split(' ').slice(0, -2).join(' ') || heroTitle.split(' ')[0]}
            <span className="mt-1 block text-ipp-plum">
              {heroTitle.split(' ').slice(-2).join(' ') || ""}
            </span>
          </h1>

          <p className="mt-6 max-w-xl break-words text-xl font-semibold leading-relaxed text-ipp-plum/84 md:text-xl">
            {heroDescription}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <LiquidButton
              size="xxl"
              className="w-full max-w-full rounded-full bg-ipp-olive px-6 font-black text-white shadow-[6px_6px_0_rgba(96,48,72,0.22)] sm:w-auto sm:px-9"
              onClick={() => {
                const element = document.querySelector("#project")
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              Conoce el proyecto
            </LiquidButton>
          </div>

          <div className="mt-10 grid gap-3 text-sm font-bold sm:grid-cols-3">
            <div className="organic-card flex items-center gap-3 bg-white/60 p-4 shadow-[4px_4px_0_rgba(96,48,72,0.08)]">
              <BookOpen className="h-5 w-5 text-ipp-coral" aria-hidden="true" />
              <span>Círculos de lectura</span>
            </div>
            <div className="organic-card flex items-center gap-3 bg-white/60 p-4 shadow-[4px_4px_0_rgba(96,48,72,0.08)]">
              <HandHeart className="h-5 w-5 text-ipp-coral" aria-hidden="true" />
              <span>Paz y emociones</span>
            </div>
            <div className="organic-card flex items-center gap-3 bg-white/60 p-4 shadow-[4px_4px_0_rgba(96,48,72,0.08)]">
              <MapPin className="h-5 w-5 text-ipp-coral" aria-hidden="true" />
              <span>Comunidad y territorio</span>
            </div>
          </div>
        </div>

        <div className="relative min-h-[250px] min-w-0">
          <div
            className="absolute inset-x-10 top-12 h-72 rounded-full bg-white/28 blur-3xl"
            aria-hidden="true"
          />
          <Image
            src="/images/ipp/logo_png3.png"
            alt=""
            width={874}
            height={574}
            priority
            className="absolute bottom-0 left-1/2 z-10 w-[320px] max-w-none -translate-x-1/2 drop-shadow-[8px_8px_0_rgba(96,48,72,0.12)] md:w-[420px] lg:w-[470px]"
            style={{ height: 'auto' }}
          />
        </div>
      </div>

      <div className="paper-edge absolute bottom-0 left-0 right-0 z-20 h-10 bg-ipp-paper" aria-hidden="true" />
    </section>
  )
}
