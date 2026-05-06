"use client"

import Image from "next/image"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  UserRound,
} from "lucide-react"
import { DynamicIcon } from "@/components/ui/dynamic-icon"
import { integrantes as staticIntegrantes } from "@/lib/data"
import type { Integrante as TeamMember } from "@/types/landing"

interface IntegrantesProps {
  data: TeamMember[]
}

function getRelativePosition(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex

  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total

  return offset
}

const positionMap: Record<number, { x: string; y: number; rotate: number; scale: number; opacity: number }> = {
  [-2]: { x: "-96%", y: 40, rotate: -10, scale: 0.83, opacity: 0.2 },
  [-1]: { x: "-54%", y: 18, rotate: -6, scale: 0.91, opacity: 0.5 },
  [0]: { x: "0%", y: 0, rotate: 0, scale: 1, opacity: 1 },
  [1]: { x: "54%", y: 18, rotate: 6, scale: 0.91, opacity: 0.5 },
  [2]: { x: "96%", y: 40, rotate: 10, scale: 0.83, opacity: 0.2 },
}

export default function Integrantes({ data: initialData }: IntegrantesProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Usar datos pasados o fallback a estáticos si no hay datos
  const data = initialData && initialData.length > 0 ? initialData : staticIntegrantes

  if (!data || data.length === 0) return null

  const activeIntegrante = data[activeIndex]

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + data.length) % data.length)
  }

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % data.length)
  }

  return (
    <section
      id="integrantes"
      aria-labelledby="integrantes-heading"
      className="relative overflow-hidden bg-ipp-mint px-5 py-24 md:px-8"
    >
      <div
        className="paper-edge absolute left-0 right-0 top-0 h-12 rotate-180 bg-ipp-paper"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="section-kicker">Integrantes</p>
          <h2
            id="integrantes-heading"
            className="font-display text-5xl font-black leading-tight text-ipp-coral md:text-7xl"
          >
            Quiénes hacen posible Inglés Pa&apos; la Paz
          </h2>
          <p className="mt-6 text-xl font-semibold leading-relaxed text-ipp-plum/75">
            Un equipo colombiano que une pedagogía, memoria, tecnología, cultura y trabajo comunitario.
          </p>
        </motion.div>

        <div className="rounded-[2.4rem] border border-ipp-plum/10 bg-ipp-paper px-4 py-8 shadow-[16px_18px_0_rgba(96,48,72,0.08)] md:px-8 md:py-10">
          <div
            className="relative mx-auto flex max-w-6xl flex-col items-center gap-8"
            aria-roledescription="carousel"
            aria-label="Carrusel de integrantes"
          >
            <div className="relative h-[430px] w-full overflow-hidden sm:h-[480px] lg:h-[510px]">
              {data.map((integrante, index) => {
                const offset = getRelativePosition(index, activeIndex, data.length)
                const placement = positionMap[offset]

                if (!placement) return null

                const isActive = offset === 0
                const showOnMobile = Math.abs(offset) <= 1

                return (
                  <div
                    key={integrante.id}
                    className={`absolute left-1/2 top-1/2 h-[370px] w-[min(100%,20rem)] -translate-x-1/2 -translate-y-1/2 sm:h-[410px] sm:w-[min(100%,22rem)] lg:h-[440px] lg:w-[min(100%,23rem)] ${
                      showOnMobile ? "block" : "hidden md:block"
                    }`}
                    style={{ zIndex: 30 - Math.abs(offset) }}
                  >
                    <motion.button
                      type="button"
                      initial={false}
                      animate={{
                        x: placement.x,
                        y: placement.y,
                        rotate: placement.rotate,
                        scale: placement.scale,
                        opacity: placement.opacity,
                      }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      onClick={() => setActiveIndex(index)}
                      className="h-full w-full text-left"
                      aria-label={`Ver integrante ${integrante.name}`}
                    >
                      <article
                        className={`relative h-full overflow-hidden rounded-[2rem] border bg-ipp-cream text-ipp-plum transition-all duration-300 ${
                          isActive
                            ? "border-ipp-plum/18 shadow-[18px_20px_0_rgba(96,48,72,0.12)]"
                            : "border-ipp-plum/10 shadow-[10px_12px_0_rgba(96,48,72,0.08)]"
                        }`}
                      >
                        <div className="relative flex h-full flex-col items-center p-5 text-center sm:p-6">
                          <div className="flex w-full justify-center">
                            <div
                              className={`relative h-28 w-28 shrink-0 overflow-hidden rounded-[2rem] border-4 sm:h-32 sm:w-32 ${
                                isActive ? "border-ipp-earth bg-white/12" : "border-ipp-coral/40 bg-white"
                              }`}
                            >
                              {integrante.photo_url ? (
                                <Image
                                  src={integrante.photo_url}
                                  alt={`Foto de ${integrante.name}`}
                                  fill
                                  className="object-cover"
                                  sizes="128px"
                                />
                              ) : (
                                <div
                                  className={`flex h-full w-full items-center justify-center ${
                                    isActive ? "text-ipp-paper" : "text-ipp-plum"
                                  }`}
                                  style={{ backgroundColor: isActive ? integrante.accent_color : integrante.surface_color }}
                                >
                                  <UserRound className="h-12 w-12" aria-hidden="true" />
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mt-7">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-ipp-coral">
                              {integrante.role}
                            </p>
                            <h3 className="mt-3 font-display text-3xl font-black leading-[0.95] sm:text-[2.1rem]">
                              {integrante.name}
                            </h3>
                          </div>

                          <p
                            className={`mt-6 text-base font-semibold leading-relaxed sm:text-[1.05rem] ${
                              isActive ? "text-ipp-plum/82" : "text-ipp-plum/76"
                            }`}
                          >
                            {integrante.focus}
                          </p>

                          <div className="mt-auto" />
                        </div>
                      </article>
                    </motion.button>
                  </div>
                )
              })}
            </div>

              <div className="flex w-full flex-col items-center gap-5 text-center">
                <div className="max-w-2xl">
                  <h3 className="mt-2 font-display text-4xl font-black leading-none text-ipp-plum md:text-5xl">
                    {activeIntegrante.name}
                  </h3>

                  <div className="mt-4 flex items-center justify-center gap-3 text-lg font-semibold text-ipp-plum/72">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-2xl text-ipp-paper shadow-[4px_4px_0_rgba(96,48,72,0.08)]"
                      style={{ backgroundColor: activeIntegrante.accent_color }}
                    >
                      <DynamicIcon name={activeIntegrante.icon_name} className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>{activeIntegrante.role}</span>
                  </div>
                </div>

                {/* Pre-renderizar todos los iconos de los integrantes para evitar retrasos al cambiar */}
                <div className="hidden" aria-hidden="true">
                  {data.map((integrante) => (
                    <DynamicIcon key={`preload-${integrante.id}`} name={integrante.icon_name} />
                  ))}
                </div>

                <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    className="flex min-h-[56px] min-w-[56px] items-center justify-center rounded-[1.2rem] border border-ipp-plum/14 bg-white/75 text-ipp-plum shadow-[8px_8px_0_rgba(96,48,72,0.08)] transition hover:-translate-y-0.5"
                    aria-label="Mostrar integrante anterior"
                  >
                    <ArrowLeft className="h-5 w-5" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={goToNext}
                    className="flex min-h-[56px] min-w-[56px] items-center justify-center rounded-[1.2rem] border border-ipp-plum/14 bg-white/75 text-ipp-plum shadow-[8px_8px_0_rgba(96,48,72,0.08)] transition hover:-translate-y-0.5"
                    aria-label="Mostrar siguiente integrante"
                  >
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="flex max-w-full flex-wrap items-center justify-center gap-2">
                  {data.map((integrante, index) => {
                    const isActive = index === activeIndex

                    return (
                      <button
                        key={`${integrante.id}-dot`}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-3 min-w-[12px] rounded-full transition-all ${
                          isActive
                            ? "w-10 bg-ipp-coral"
                            : "w-3 bg-ipp-plum/20 hover:bg-ipp-plum/35"
                        }`}
                        aria-label={`Ir a ${integrante.name}`}
                        aria-current={isActive ? "true" : undefined}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
