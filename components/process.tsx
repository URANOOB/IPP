"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  HandHeart,
  Library,
  MessageCircle,
  Palette,
  Presentation,
  type LucideIcon,
} from "lucide-react"

type MethodStep = {
  title: string
  icon: LucideIcon
  color: string
  summary: string
  items: string[]
  keywords: string[]
}

const methodSteps: MethodStep[] = [
  // Esta lista alimenta el menú lateral y el panel de detalle de la metodología.
  {
    title: "Welcome Time",
    icon: HandHeart,
    color: "var(--ipp-yellow)",
    summary:
      "Nos reconocemos como grupo, compartimos nombres y abrimos el encuentro desde la confianza.",
    items: [
      "Damos la bienvenida a quienes participan.",
      "Compartimos nombres y formas de presentarnos.",
      "Reconocemos como llega el grupo al encuentro.",
      "Activamos la escucha y la disposicion para aprender.",
    ],
    keywords: ["Bienvenida", "Confianza", "Escucha", "Participacion"],
  },
  {
    title: "Story Time",
    icon: Library,
    color: "var(--ipp-water)",
    summary:
      "Leemos en inglés con imágenes, preguntas, objetos y sonidos que acompañan la historia.",
    items: [
      "Presentamos el cuento y activamos la curiosidad del grupo.",
      "Exploramos vocabulario clave con apoyos visuales y sonoros.",
      "Hacemos preguntas para conectar la historia con la experiencia propia.",
    ],
    keywords: ["Lectura", "Vocabulario", "Imágenes", "Comprensión"],
  },
  {
    title: "Conversation",
    icon: MessageCircle,
    color: "var(--ipp-green)",
    summary:
      "Hablamos sobre emociones, acciones y experiencias que nacen del cuento y de la vida cotidiana.",
    items: [
      "Abrimos un diálogo breve a partir de lo leído.",
      "Nombramos emociones, acciones y relaciones en inglés y español.",
      "Escuchamos diferentes voces y conectamos ideas del grupo.",
    ],
    keywords: ["Diálogo", "Emociones", "Escucha", "Reflexión"],
  },
  {
    title: "Crafting Time",
    icon: Palette,
    color: "var(--ipp-coral)",
    summary:
      "Transformamos la experiencia en dibujos, mariposas, postales, máscaras, murales u otras piezas colectivas.",
    items: [
      "Convertimos ideas y palabras en una creación visual o manual.",
      "Trabajamos con materiales sencillos y propuestas abiertas.",
      "Relacionamos la expresión artística con el vocabulario del encuentro.",
    ],
    keywords: ["Creación", "Juego", "Expresión", "Imaginación"],
  },
  {
    title: "Show Time",
    icon: Presentation,
    color: "var(--ipp-mint)",
    summary:
      "Socializamos lo creado, compartimos en voz alta y reflexionamos sobre la experiencia vivida.",
    items: [
      "Presentamos las creaciones del grupo.",
      "Compartimos palabras, frases o ideas que quedaron del encuentro.",
      "Cerramos con una breve celebración de lo vivido en comunidad.",
    ],
    keywords: ["Cierre", "Voz", "Comunidad", "Celebración"],
  },
]

export default function Process() {
  const [activeStep, setActiveStep] = useState(0)

  const currentStep = methodSteps[activeStep]
  const CurrentIcon = currentStep.icon

  return (
    <section
      id="method"
      className="relative bg-[var(--ipp-paper)] px-5 py-24 md:px-8"
    >
      <div className="paper-edge absolute left-0 right-0 top-0 h-12 rotate-180 bg-[var(--ipp-mint)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <p className="section-kicker">Metodología</p>

          <h2 className="font-display text-5xl font-black leading-tight text-[var(--ipp-coral)] md:text-7xl">
            Así vivimos cada encuentro.
          </h2>

          <p className="mt-6 text-xl font-semibold leading-relaxed text-[var(--ipp-plum)]/75">
            En Inglés Pa&apos; la Paz buscamos ensenar inglés desde la lectura,
            la conversación y la creación de piezas bilingues desde experiencias
            reales del territorio y la participación comunitaria.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[2.4rem] border border-[var(--ipp-plum)]/10 bg-[var(--ipp-paper)] shadow-[0_24px_55px_rgba(96,48,72,0.12)]"
        >
          <div className="border-b border-[var(--ipp-plum)]/10 bg-[var(--ipp-sky)] px-4 py-4 md:px-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 rounded-full bg-[var(--ipp-coral)]" />
                  <span className="h-3.5 w-3.5 rounded-full bg-[var(--ipp-yellow)]" />
                  <span className="h-3.5 w-3.5 rounded-full bg-[var(--ipp-green)]" />
                </div>

                <div className="flex items-center gap-2">
                  <div className="rounded-2xl border border-[var(--ipp-plum)]/10 bg-[var(--ipp-paper)] px-4 py-2">
                    <span className="text-sm font-black tracking-[0.08em] text-[var(--ipp-black)]">
                      Métodos
                    </span>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-[var(--ipp-plum)]/10 bg-[var(--ipp-paper)] text-lg font-black leading-none text-[var(--ipp-coral)]">
                    +
                  </div>
                </div>
              </div>

              <div className="flex min-w-0 items-center justify-end lg:flex-1">
                <div className="flex w-full items-center gap-3 rounded-full border border-[var(--ipp-plum)]/10 bg-[var(--ipp-paper)] px-4 py-3 sm:px-5 lg:max-w-[620px]">
                  <div className="flex items-center gap-2 text-[var(--ipp-plum)]/40">
                    <ArrowLeft className="h-4 w-4" />
                    <ArrowRight className="h-4 w-4 opacity-50" />
                  </div>

                  <span className="truncate text-sm font-semibold text-[var(--ipp-black)]">
                    Inglés-Pa&apos;LaPaz.Metodología
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-6">
            <div className="mb-5 rounded-[1.7rem] px-4 py-5 sm:px-5">
              <h3 className="text-4xl font-black leading-tight text-[var(--ipp-plum)]">
                Ruta de cada encuentro
              </h3>

              <p className="mt-2 text-xl font-semibold leading-relaxed text-[var(--ipp-plum)]/65">
                Cada paso tiene su propio contenido, y la estructura queda lista
                para completar cada momento con más detalle.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
              <aside className="rounded-[1.8rem] border border-[var(--ipp-plum)]/10 bg-[var(--ipp-cream)] p-3">
                <div className="space-y-2">
                  {methodSteps.map((step, index) => {
                    const Icon = step.icon
                    const isActive = index === activeStep

                    return (
                      // Cada botón cambia el paso activo; el contenido grande se renderiza desde currentStep.
                      <button
                        key={step.title}
                        type="button"
                        onClick={() => setActiveStep(index)}
                        aria-pressed={isActive}
                        className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left border-[var(--ipp-plum)] transition hover:bg-[var(--ipp-paper)]"
                        style={{
                          backgroundColor: isActive
                            ? "var(--ipp-paper)"
                            : "transparent",
                        }}
                      >
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                          style={{
                            backgroundColor: step.color,
                          }}
                        >
                          <Icon className="h-4 w-4 text-[var(--ipp-black)]" />
                        </span>

                        <span className="min-w-0 flex-1 truncate text-lg font-black text-[var(--ipp-plum)]">
                          {step.title}
                        </span>

                        <span className="text-xs font-black tracking-[0.14em] text-[var(--ipp-plum)]/45">
                          0{index + 1}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </aside>

              <motion.article
                key={currentStep.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden rounded-[1.8rem] border border-[var(--ipp-plum)]/10 bg-[var(--ipp-paper)]"
              >
                <div
                  className="h-3 w-full"
                  style={{
                    backgroundColor: currentStep.color,
                  }}
                />

                <div className="p-5 md:p-6">
                  <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: currentStep.color,
                      }}
                    >
                      <CurrentIcon className="h-5 w-5 text-[var(--ipp-black)]" />
                    </div>

                    <div className="rounded-2xl border border-[var(--ipp-plum)]/10 bg-[var(--ipp-cream)] px-3 py-2 text-right">
                      <span className="block text-[0.65rem] font-black uppercase tracking-[0.2em] text-[var(--ipp-plum)]/50">
                        Paso
                      </span>

                      <span className="block text-lg font-black text-[var(--ipp-plum)]">
                        0{activeStep + 1} / 0{methodSteps.length}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-[2rem] font-black leading-none text-[var(--ipp-plum)] md:text-5xl">
                    {currentStep.title}
                  </h3>

                  <p className="mt-5 max-w-[58ch] text-base font-semibold leading-relaxed text-[var(--ipp-plum)]/75 md:text-2xl">
                    {currentStep.summary}
                  </p>

                  <div className="mt-8">
                    <h4 className="text-lg font-black text-[var(--ipp-plum)] md:text-2xl">
                      ¿Qué sucede aqui?
                    </h4>

                    <ul className="mt-3 space-y-2 pl-5 text-sm font-semibold leading-relaxed text-[var(--ipp-plum)]/80 md:text-xl">
                      {currentStep.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <h4 className="text-lg font-black text-[var(--ipp-plum)] md:text-2xl">
                      Claves del momento
                    </h4>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {currentStep.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full border border-[var(--ipp-plum)]/10 bg-[var(--ipp-cream)] px-3 py-1.5 text-sm font-semibold text-[var(--ipp-plum)] md:text-lg"
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
