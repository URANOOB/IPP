"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { CSSProperties } from "react"
import { DynamicIcon } from "@/components/ui/dynamic-icon"
import { principles as staticPrinciples, landingDefaults } from "@/lib/data"
import type { Principle } from "@/types/landing"

interface InfoProps {
  dynamicContent?: Record<string, string>
  principles: Principle[]
}

export default function Info({ dynamicContent = {}, principles: initialPrinciples }: InfoProps) {
  // Usar datos pasados o fallback a estáticos si no hay datos
  const principles = initialPrinciples && initialPrinciples.length > 0 ? initialPrinciples : staticPrinciples

  // Atajos para mayor legibilidad
  const d = landingDefaults.info

  // Valores dinámicos con fallback
  const infoTitle = dynamicContent.info_title || d.title
  const infoDescription = dynamicContent.info_description || d.description

  return (
    <section
      id="project"
      aria-labelledby="project-heading"
      className="relative bg-ipp-paper px-5 py-24 md:px-8"
    >
      <div className="absolute inset-0 bg-paper opacity-0" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-12 md:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] md:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative min-h-[400px] md:min-h-full"
        >
          <Image
            src="/images/ipp/banner-referencia.jpg"
            alt="Banner del proyecto Inglés pa' la Paz con enfoque en lectura, comunidad y territorio"
            fill
            priority
            className="rounded-[2rem] object-cover object-center"
            sizes="(min-width: 768px) 45vw, 100vw"
          />
        </motion.div>

        <div className="flex flex-col justify-center">
          <p className="section-kicker">Quiénes somos</p>

          <h2
            id="project-heading"
            className="font-display text-4xl font-black leading-[0.94] text-ipp-coral md:text-5xl lg:text-6xl"
          >
            {infoTitle}
          </h2>

          <p className="mt-7 max-w-2xl text-lg font-semibold leading-relaxed text-ipp-plum/80 md:text-2xl">
            {infoDescription}
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {principles.map((item, index) => {
              const cardStyle = {
                "--quote-card-surface": item.surface_color,
                "--quote-card-ink": item.ink_color,
                "--quote-card-chip": "rgba(96, 48, 72, 0.11)",
                "--quote-card-glow": "rgba(255, 255, 255, 0.44)",
              } as CSSProperties

              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  viewport={{ once: true, amount: 0.35 }}
                  whileHover={{ y: -8, rotate: index % 2 === 0 ? -1 : 1 }}
                  className="quote-story-card group relative min-h-[280px] overflow-hidden px-6 py-7 md:min-h-[320px] md:px-7 md:py-8"
                  style={cardStyle}
                >
                  <div className="absolute inset-0 opacity-90" aria-hidden="true">
                    <div className="absolute left-[-10%] top-[-18%] h-32 w-32 rounded-full bg-[var(--quote-card-glow)] blur-2xl" />
                    <div className="absolute bottom-[-16%] right-[-10%] h-28 w-28 rounded-full bg-black/5 blur-2xl" />
                  </div>

                  <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center text-[color:var(--quote-card-ink)] transition-transform duration-500 group-hover:scale-105"
                    style={{ opacity: 0.10 }}
                    aria-hidden="true"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 330 307" height="170" width="170">
                      <path fill="currentColor" d="M302.258 176.221C320.678 176.221 329.889 185.432 329.889 203.853V278.764C329.889 297.185 320.678 306.395 302.258 306.395H231.031C212.61 306.395 203.399 297.185 203.399 278.764V203.853C203.399 160.871 207.902 123.415 216.908 91.4858C226.323 59.1472 244.539 30.902 271.556 6.75027C280.562 -1.02739 288.135 -2.05076 294.275 3.68014L321.906 29.4692C328.047 35.2001 326.614 42.1591 317.608 50.3461C303.69 62.6266 292.228 80.4334 283.223 103.766C274.626 126.69 270.328 150.842 270.328 176.221H302.258ZM99.629 176.221C118.05 176.221 127.26 185.432 127.26 203.853V278.764C127.26 297.185 118.05 306.395 99.629 306.395H28.402C9.98126 306.395 0.770874 297.185 0.770874 278.764V203.853C0.770874 160.871 5.27373 123.415 14.2794 91.4858C23.6945 59.1472 41.9106 30.902 68.9277 6.75027C77.9335 -1.02739 85.5064 -2.05076 91.6467 3.68014L119.278 29.4692C125.418 35.2001 123.985 42.1591 114.98 50.3461C101.062 62.6266 89.6 80.4334 80.5942 103.766C71.9979 126.69 67.6997 150.842 67.6997 176.221H99.629Z"></path>
                    </svg>
                  </div>

                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-end gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--quote-card-chip)] text-[color:var(--quote-card-ink)]">
                        <DynamicIcon name={item.icon_name} className="h-5 w-5" aria-hidden="true" />
                      </div>
                    </div>

                    <h3 className="mt-2 max-w-[14ch] font-display text-3xl font-black leading-[0.96] text-[color:var(--quote-card-ink)] md:text-[2.15rem]">
                      {item.title}
                    </h3>

                    <p
                      className="mt-5 font-bold leading-relaxed text-[color:var(--quote-card-ink)] md:text-xl"
                      style={{ opacity: 0.78 }}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
