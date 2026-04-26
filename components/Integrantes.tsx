"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ClipboardList,
  Code2,
  Handshake,
  Megaphone,
  MonitorCog,
  PenSquare,
  Sparkles,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react"

type Integrante = {
  nombre: string
  rol: string
  foco: string
  icon: LucideIcon
  photo?: string
  accent: string
  surface: string
}

const integrantes: Integrante[] = [
  // Para mostrar una foto, coloca una ruta pública en photo, por ejemplo:
  // photo: "/images/ipp/integrantes/nombre.png". Si queda vacío, se usa el icono.
  {
    nombre: "Vanessa Pe\u00f1a",
    rol: "Líder",
    foco: "Gestiona proyectos y convocatorias enfocadas en la cultura, la memoria y la construcción de paz.",
    icon: Users,
    photo: "",
    accent: "var(--ipp-coral)",
    surface: "rgba(192, 96, 72, 0.12)",
  },
  {
    nombre: "Gimena Sosa",
    rol: "Líder de redes",
    foco: "Diseña e impulsa estrategias de difusión para que la voz del colectivo llegue a más personas.",
    icon: Megaphone,
    photo: "",
    accent: "var(--ipp-water)",
    surface: "rgba(144, 192, 192, 0.24)",
  },
  {
    nombre: "Daniel Bustos",
    rol: "Líder suplente",
    foco: "Acompaña los procesos administrativos y de gestión para sostener el trabajo de la organización.",
    icon: PenSquare,
    photo: "",
    accent: "var(--ipp-yellow)",
    surface: "rgba(255, 200, 74, 0.18)",
  },
  {
    nombre: "Santiago Agudelo",
    rol: "Líder de alianzas",
    foco: "Construye alianzas y convenios con otras agrupaciones para ampliar el impacto comunitario.",
    icon: Handshake,
    photo: "",
    accent: "var(--ipp-green)",
    surface: "rgba(120, 168, 120, 0.2)",
  },
  {
    nombre: "Diego Guerrero",
    rol: "Diseñador",
    foco: "Cuida la imagen del proyecto y traduce la identidad de la iniciativa en piezas visuales claras y cercanas.",
    icon: Sparkles,
    photo: "",
    accent: "var(--ipp-earth)",
    surface: "rgba(255, 240, 192, 0.95)",
  },
  {
    nombre: "Lorena Ayala",
    rol: "Docente",
    foco: "Lidera conversatorios y experiencias pedagogicas con enfoque en paz, memoria y escucha sensible.",
    icon: BookOpen,
    photo: "",
    accent: "var(--ipp-plum)",
    surface: "rgba(96, 48, 72, 0.1)",
  },
  {
    nombre: "Andres Pabon",
    rol: "Docente",
    foco: "Diseña e implementa talleres que conectan el idioma con procesos de expresión y reflexión colectiva.",
    icon: PenSquare,
    photo: "",
    accent: "var(--ipp-coral)",
    surface: "rgba(192, 96, 72, 0.12)",
  },
  {
    nombre: "William Galeano",
    rol: "Ingeniero de software",
    foco: "Desarrolla herramientas web digitales que apoyan el trabajo comunitario del proyecto.",
    icon: Code2,
    photo: "",
    accent: "var(--ipp-yellow)",
    surface: "rgba(255, 200, 74, 0.18)",
  },
  {
    nombre: "Walter Ardila",
    rol: "Ingeniero de tecnologías y de software",
    foco: "Desarrolla herramientas web y garantiza el uso y funcionamiento de los recursos tecnológicos en encuentros, talleres y eventos.",
    icon: MonitorCog,
    photo: "",
    accent: "var(--ipp-water)",
    surface: "rgba(144, 192, 192, 0.24)",
  },
  {
    nombre: "Tatiana Martinez",
    rol: "Administradora",
    foco: "Aporta en la gestión legal y administrativa para que los procesos del colectivo sigan avanzando.",
    icon: ClipboardList,
    photo: "",
    accent: "var(--ipp-green)",
    surface: "rgba(120, 168, 120, 0.2)",
  },
  {
    nombre: "Johan Mellizo",
    rol: "Docente",
    foco: "Diseña clases, conversatorios y planeadores desde una mirada pedagógica situada y participativa.",
    icon: BookOpen,
    photo: "",
    accent: "var(--ipp-plum)",
    surface: "rgba(96, 48, 72, 0.1)",
  },
]

function getRelativePosition(index: number, activeIndex: number, total: number) {
  // Convierte el índice real en una posición circular alrededor de la card activa.
  let offset = index - activeIndex

  if (offset > total / 2) {
    offset -= total
  }

  if (offset < -total / 2) {
    offset += total
  }

  return offset
}

const positionMap: Record<number, { x: string; y: number; rotate: number; scale: number; opacity: number }> = {
  // Solo se muestran las cards cercanas para crear profundidad sin saturar la pantalla.
  [-2]: { x: "-96%", y: 40, rotate: -10, scale: 0.83, opacity: 0.2 },
  [-1]: { x: "-54%", y: 18, rotate: -6, scale: 0.91, opacity: 0.5 },
  [0]: { x: "0%", y: 0, rotate: 0, scale: 1, opacity: 1 },
  [1]: { x: "54%", y: 18, rotate: 6, scale: 0.91, opacity: 0.5 },
  [2]: { x: "96%", y: 40, rotate: 10, scale: 0.83, opacity: 0.2 },
}

export default function Integrantes() {
  const [activeIndex, setActiveIndex] = useState(0)

  const activeIntegrante = integrantes[activeIndex]
  const ActiveIcon = activeIntegrante.icon

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % integrantes.length)
    }, 3000)

    return () => window.clearInterval(interval)
  }, [])

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + integrantes.length) % integrantes.length)
  }

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % integrantes.length)
  }

  return (
    <section className="relative overflow-hidden bg-[var(--ipp-mint)] px-5 py-24 md:px-8">
      <div className="paper-edge absolute left-0 right-0 top-0 h-12 rotate-180 bg-[var(--ipp-paper)]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="section-kicker">Integrantes</p>
          <h2 className="font-display text-5xl font-black leading-tight text-[var(--ipp-coral)] md:text-7xl">
            Profes Pa&apos; la Paz.
          </h2>
          <p className="mt-6 text-xl font-semibold leading-relaxed text-[var(--ipp-plum)]/75">
            Un parche popular de origen colombiano para el mundo.
          </p>
        </motion.div>

        <div className="rounded-[2.4rem] border border-[var(--ipp-plum)]/10 bg-[var(--ipp-paper)] px-4 py-8 shadow-[16px_18px_0_rgba(96,48,72,0.08)] md:px-8 md:py-10">
          <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-8">
            <div className="relative h-[430px] w-full overflow-hidden sm:h-[480px] lg:h-[510px]">

              {integrantes.map((integrante, index) => {
                const offset = getRelativePosition(index, activeIndex, integrantes.length)
                const placement = positionMap[offset]

                if (!placement) {
                  return null
                }

                const isActive = offset === 0
                const showOnMobile = Math.abs(offset) <= 1

                return (
                  <div
                    key={integrante.nombre}
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
                      aria-label={`Ver integrante ${integrante.nombre}`}
                    >
                    <article
                      className={`relative h-full overflow-hidden rounded-[2rem] border bg-[var(--ipp-cream)] text-[var(--ipp-plum)] transition-all duration-300 ${
                        isActive
                          ? "border-[var(--ipp-plum)]/18 shadow-[18px_20px_0_rgba(96,48,72,0.12)]"
                          : "border-[var(--ipp-plum)]/10 shadow-[10px_12px_0_rgba(96,48,72,0.08)]"
                      }`}
                    >

                      <div className="relative flex h-full flex-col items-center p-5 text-center sm:p-6">
                        <div className="flex w-full justify-center">
                          <div
                            className={`relative h-28 w-28 shrink-0 overflow-hidden rounded-[2rem] border-4 sm:h-32 sm:w-32 ${
                              isActive ? "border-[var(--ipp-earth)] bg-white/12" : "border-[var(--ipp-coral)]/40 bg-white"
                            }`}
                          >
                            {integrante.photo ? (
                              // La foto reemplaza el icono solo cuando photo tiene una ruta válida.
                              <Image
                                src={integrante.photo}
                                alt={`Foto de ${integrante.nombre}`}
                                fill
                                className="object-cover"
                                sizes="128px"
                              />
                            ) : (
                              <div
                                className={`flex h-full w-full items-center justify-center ${
                                  isActive ? "text-[var(--ipp-paper)]" : "text-[var(--ipp-plum)]"
                                }`}
                                style={{ backgroundColor: isActive ? integrante.accent : integrante.surface }}
                              >
                                <UserRound className="h-12 w-12" />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-7">
                          <p
                            className={`text-xs font-black uppercase tracking-[0.22em] ${
                              isActive ? "text-[var(--ipp-coral)]" : "text-[var(--ipp-coral)]"
                            }`}
                          >
                            {integrante.rol}
                          </p>
                          <h3 className="mt-3 font-display text-3xl font-black leading-[0.95] sm:text-[2.1rem]">
                            {integrante.nombre}
                          </h3>
                        </div>

                        <p
                          className={`mt-6 text-base font-semibold leading-relaxed sm:text-[1.05rem] ${
                            isActive ? "text-[var(--ipp-plum)]/82" : "text-[var(--ipp-plum)]/76"
                          }`}
                        >
                          &ldquo;{integrante.foco}&rdquo;
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
                <h3 className="mt-2 font-display text-4xl font-black leading-none text-[var(--ipp-plum)] md:text-5xl">
                  {activeIntegrante.nombre}
                </h3>
                <div className="mt-4 flex items-center justify-center gap-3 text-lg font-semibold text-[var(--ipp-plum)]/72">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-[var(--ipp-paper)] shadow-[4px_4px_0_rgba(96,48,72,0.08)]"
                    style={{ backgroundColor: activeIntegrante.accent }}
                  >
                    <ActiveIcon className="h-5 w-5" />
                  </span>
                  <span>{activeIntegrante.rol}</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={goToPrevious}
                    className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-[var(--ipp-plum)]/14 bg-white/75 text-[var(--ipp-plum)] shadow-[8px_8px_0_rgba(96,48,72,0.08)] transition hover:-translate-y-0.5"
                    aria-label="Mostrar integrante anterior"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={goToNext}
                    className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-[var(--ipp-plum)]/14 bg-white/75 text-[var(--ipp-plum)] shadow-[8px_8px_0_rgba(96,48,72,0.08)] transition hover:-translate-y-0.5"
                    aria-label="Mostrar siguiente integrante"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex max-w-full flex-wrap items-center gap-2">
                  {integrantes.map((integrante, index) => {
                    const isActive = index === activeIndex

                    return (
                      <button
                        key={`${integrante.nombre}-dot`}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-3 rounded-full transition-all ${
                          isActive ? "w-10 bg-[var(--ipp-coral)]" : "w-3 bg-[var(--ipp-plum)]/20 hover:bg-[var(--ipp-plum)]/35"
                        }`}
                        aria-label={`Ir a ${integrante.nombre}`}
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
