"use client"

import { LiquidButton } from "@/components/ui/liquid-glass-button"
import Image from "next/image"
import { landingDefaults } from "@/lib/data"
import { landingStyles } from "@/lib/styles"
import { DynamicIcon } from "@/components/ui/dynamic-icon"

/**
 * @section COMPONENTE HERO (ESTÁTICO)
 * 
 * Los datos se editan en:
 * - Textos: @/lib/data.ts -> landingDefaults.hero
 * - Estilos: @/lib/styles.ts -> landingStyles.hero
 */
export default function Hero() {
  const d = landingDefaults.hero
  const s = landingStyles.hero

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-ipp-sky text-ipp-plum pt-24 md:pt-32"
    >
      {/* Fondo con imagen configurable desde data.ts */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${d.bgImage}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-ipp-sky/68" aria-hidden="true" />

      <div className="relative z-20 mx-auto grid min-h-[calc(100vh-140px)] max-w-6xl items-center gap-12 px-5 pb-16 pt-8 md:grid-cols-[0.95fr_0.85fr] md:px-8">
        <div className="w-full max-w-[350px] min-w-0 sm:max-w-2xl">
          
          <div className="mb-2">
            <p 
              style={{ fontSize: s.subtitleSize, color: s.subtitleColor }}
              className="font-black uppercase tracking-[0.18em]"
            >
              {d.subtitle}
            </p>
          </div>

          <div className="mb-6">
            <h1 
              style={{ fontSize: s.titleSize, color: s.titleColor }}
              className="font-display font-black leading-[0.96]"
            >
              {d.title}
            </h1>
          </div>

          <div className="mb-8">
            <p 
              style={{ fontSize: s.descriptionSize, color: s.descriptionColor }}
              className="max-w-xl break-words font-semibold leading-relaxed"
            >
              {d.description}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <div className="w-full sm:w-auto">
              <LiquidButton
                size="xxl"
                className="w-full max-w-full rounded-full px-6 font-black text-white sm:w-auto sm:px-9 transition-colors"
                style={{ 
                  backgroundColor: s.buttonColor,
                  boxShadow: s.buttonShadow
                }}
                onClick={() => {
                  const element = document.querySelector("#project")
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                {d.buttonText}
              </LiquidButton>
            </div>
          </div>

          {/* Tarjetas informativas dinámicas desde data.ts */}
          <div className="mt-10 grid gap-3 text-sm font-bold sm:grid-cols-3">
            {d.cards.map((card, i) => (
              <div 
                key={i} 
                className="organic-card flex items-center gap-3 bg-white/60 p-4"
                style={{ boxShadow: s.cardShadow }}
              >
                <DynamicIcon name={card.icon} className="h-5 w-5 text-ipp-coral" aria-hidden="true" />
                <span>{card.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[250px] min-w-0">
          <div
            className="absolute inset-x-10 top-12 h-72 rounded-full bg-white/28 blur-3xl"
            aria-hidden="true"
          />
          <div 
            className="absolute bottom-0 left-1/2 z-10 w-[320px] max-w-none -translate-x-1/2 md:w-[420px] lg:w-[470px]"
            style={{ filter: s.logoShadow }}
          >
            <Image
              src={d.imageUrl}
              alt=""
              width={874}
              height={574}
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>

      <div className="paper-edge absolute bottom-0 left-0 right-0 z-20 h-10 bg-ipp-paper" aria-hidden="true" />
    </section>
  )
}
