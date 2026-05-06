"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react"
import { DynamicIcon } from "@/components/ui/dynamic-icon"
import { methodSteps as staticSteps } from "@/lib/data"
import type { MethodStep } from "@/types/landing"

interface ProcessProps {
  data: MethodStep[]
}

export default function Process({ data: initialData }: ProcessProps) {
  const [activeStep, setActiveStep] = useState(0)

  // Usar datos pasados o fallback a estáticos si no hay datos
  const data = initialData && initialData.length > 0 ? initialData : staticSteps

  if (!data || data.length === 0) return null

  const currentStep = data[activeStep]

  return (
    <section
      id="method"
      aria-labelledby="method-heading"
      className="relative bg-ipp-paper px-5 py-24 md:px-8"
    >
      <div
        className="paper-edge absolute left-0 right-0 top-0 h-12 rotate-180 bg-ipp-mint"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <p className="section-kicker">Metodología</p>

          <h2
            id="method-heading"
            className="font-display text-5xl font-black leading-tight text-ipp-coral md:text-7xl"
          >
            Así vivimos cada encuentro de Inglés pa&apos; la Paz
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-xl font-semibold leading-relaxed text-ipp-plum/75">
            En Inglés Pa&apos; la Paz buscamos enseñar inglés desde la lectura,
            la conversación y la creación de piezas bilingües a partir de experiencias
            reales del territorio y la participación comunitaria.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2.4rem] border border-ipp-plum/10 bg-ipp-paper shadow-[0_24px_55px_rgba(96,48,72,0.12)]"
        >
          <div className="border-b border-ipp-plum/10 bg-ipp-sky px-4 py-4 md:px-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="h-3.5 w-3.5 rounded-full bg-ipp-coral" />
                  <span className="h-3.5 w-3.5 rounded-full bg-ipp-yellow" />
                  <span className="h-3.5 w-3.5 rounded-full bg-ipp-green" />
                </div>

                <div className="flex items-center gap-2">
                  <div className="rounded-2xl border border-ipp-plum/10 bg-ipp-paper px-4 py-2">
                    <span className="text-sm font-black tracking-[0.08em] text-ipp-black">
                      Método
                    </span>
                  </div>

                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-2xl border border-ipp-plum/10 bg-ipp-paper text-lg font-black leading-none text-ipp-coral"
                    aria-hidden="true"
                  >
                    +
                  </div>
                </div>
              </div>

              <div className="flex min-w-0 items-center justify-end lg:flex-1">
                <div className="flex w-full items-center gap-3 rounded-full border border-ipp-plum/10 bg-ipp-paper px-4 py-3 sm:px-5 lg:max-w-[620px]">
                  <div className="flex items-center gap-2 text-ipp-plum/40" aria-hidden="true">
                    <ArrowLeft className="h-4 w-4" />
                    <ArrowRight className="h-4 w-4 opacity-50" />
                  </div>

                  <span className="truncate text-sm font-semibold text-ipp-black">
                    Ingles-Pa&apos;-la-Paz.Metodologia
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <div className="mb-5 rounded-[1.7rem] px-4 py-5 sm:px-5">
              <h3 className="text-4xl font-black leading-tight text-ipp-plum">
                Ruta de cada encuentro
              </h3>

              <p className="mt-2 text-xl font-semibold leading-relaxed text-ipp-plum/65">
                Cada momento del encuentro tiene una intención pedagógica clara y una forma distinta de acercarse al idioma, la emoción y la creación colectiva.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
              <aside
                className="rounded-[1.8rem] border border-ipp-plum/10 bg-ipp-cream p-3"
                role="tablist"
                aria-label="Pasos de la metodología"
              >
                <div className="space-y-2">
                  {data.map((step, index) => {
                    const isActive = index === activeStep

                    return (
                      <button
                        key={step.id}
                        id={`method-tab-${index}`}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`method-panel-${index}`}
                        onClick={() => setActiveStep(index)}
                        className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left border-ipp-plum transition hover:bg-ipp-paper"
                        style={{
                          backgroundColor: isActive
                            ? "var(--ipp-paper)"
                            : "transparent",
                        }}
                      >
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: step.color }}
                        >
                          <DynamicIcon name={step.icon_name} className="h-4 w-4 text-ipp-black" aria-hidden="true" />
                        </span>

                        <span className="min-w-0 flex-1 truncate text-lg font-black text-ipp-plum">
                          {step.title}
                        </span>

                        <span className="text-xs font-black tracking-[0.14em] text-ipp-plum/45">
                          0{index + 1}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </aside>

              <motion.article
                key={currentStep.id}
                id={`method-panel-${activeStep}`}
                role="tabpanel"
                aria-labelledby={`method-tab-${activeStep}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden rounded-[1.8rem] border border-ipp-plum/10 bg-ipp-paper"
              >
                <div
                  className="h-3 w-full"
                  style={{ backgroundColor: currentStep.color }}
                  aria-hidden="true"
                />

                <div className="p-5 md:p-6">
                  <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full"
                      style={{ backgroundColor: currentStep.color }}
                    >
                      <DynamicIcon name={currentStep.icon_name} className="h-5 w-5 text-ipp-black" aria-hidden="true" />
                    </div>

                    <div className="rounded-2xl border border-ipp-plum/10 bg-ipp-cream px-3 py-2 text-right">
                      <span className="block text-[0.65rem] font-black uppercase tracking-[0.2em] text-ipp-plum/50">
                        Paso
                      </span>

                      <span className="block text-lg font-black text-ipp-plum">
                        0{activeStep + 1} / 0{data.length}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-[2rem] font-black leading-none text-ipp-plum md:text-5xl">
                    {currentStep.title}
                  </h3>

                  <p className="mt-5 max-w-[58ch] text-base font-semibold leading-relaxed text-ipp-plum/75 md:text-2xl">
                    {currentStep.summary}
                  </p>

                  <div className="mt-8">
                    <h4 className="text-lg font-black text-ipp-plum md:text-2xl">
                      ¿Qué sucede aquí?
                    </h4>

                    <ul className="mt-3 space-y-2 pl-5 text-sm font-semibold leading-relaxed text-ipp-plum/80 md:text-xl">
                      {currentStep.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-lg font-black text-ipp-plum md:text-2xl">
                      Claves del momento
                    </h4>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {currentStep.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full border border-ipp-plum/10 bg-ipp-cream px-3 py-1.5 text-sm font-semibold text-ipp-plum md:text-lg"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
