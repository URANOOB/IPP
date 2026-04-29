"use client"

import { LiquidButton } from "@/components/ui/liquid-glass-button"
import Image from "next/image"
import { BookOpen, HandHeart, MapPin, Menu, Sprout, UsersRound, X } from "lucide-react"
import { useState } from "react"

const navItems = [
  { name: "Inicio", href: "#hero" },
  { name: "Quiénes somos", href: "#project" },
  { name: "Experiencias", href: "#experiences" },
  { name: "Metodología", href: "#method" },
]

const mobileNavDetails = [
  {
    icon: Sprout,
    description: "Presentación del proyecto y su propósito.",
  },
  {
    icon: UsersRound,
    description: "Lectura, comunidad y construcción de paz.",
  },
  {
    icon: BookOpen,
    description: "Galerías, relatos y recursos del territorio.",
  },
  {
    icon: HandHeart,
    description: "Ruta pedagógica de cada encuentro.",
  },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault()

    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }

    setIsMenuOpen(false)
  }

  return (
    <header
      id="hero"
      className="relative min-h-screen overflow-hidden bg-[var(--ipp-sky)] text-[var(--ipp-plum)]"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/ipp/butterflies_banner3.png')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[var(--ipp-sky)]/68" aria-hidden="true" />

      <nav
        aria-label="Navegación principal"
        className="relative z-50 mx-auto max-w-4xl px-4 py-3 md:px-10 lg:px-16"
      >
        <div className="relative flex items-center justify-between rounded-[1.35rem] border-1 border-[var(--ipp-white)]/24 bg-[var(--ipp-paper)]/95 px-3 py-3 shadow-[0_8px_20px_rgba(96,48,72,0.08)] backdrop-blur md:px-4">
          <div className="order-2 hidden items-center gap-1 rounded-[1rem] text-[14px] font-black md:flex">
            {navItems.slice(0, 4).map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(event) => handleNavClick(event, item.href)}
                className="rounded-[0.9rem] px-3 py-2 text-[var(--ipp-plum)] transition hover:bg-[var(--ipp-cream)] hover:text-[var(--ipp-coral)]"
              >
                {item.name}
              </a>
            ))}
          </div>

          <a
            href="#hero"
            onClick={(event) => handleNavClick(event, "#hero")}
            className="order-1 inline-flex items-center gap-3 rounded-[1rem] px-2 py-1 transition hover:bg-white/20"
            aria-label="Ir al inicio"
          >
            <Image
              src="/images/ipp/logo_png3.png"
              alt="Logo de Inglés pa' la Paz"
              width={874}
              height={574}
              className="h-10 w-auto object-contain md:h-10"
              priority
            />
          </a>

          <div className="order-3 hidden items-center gap-3 md:flex">
            <a
              href="#join"
              onClick={(event) => handleNavClick(event, "#join")}
              className="inline-flex min-h-10 items-center gap-3 rounded-[1rem] border-1 border-[var(--ipp-plum)] bg-[var(--ipp-coral)] px-5 text-sm font-black text-white shadow-[3px_3px_0_rgba(96,48,72,0.18)] transition hover:-translate-y-0.5 hover:bg-[var(--ipp-plum)]"
            >
              Contáctanos
            </a>
          </div>

          <button
            className="order-3 rounded-[0.9rem] border-2 border-[var(--ipp-plum)]/24 bg-white/70 p-2.5 text-[var(--ipp-plum)] shadow-[3px_3px_0_rgba(96,48,72,0.1)] backdrop-blur md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-header-menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isMenuOpen ? (
          <div
            id="mobile-header-menu"
            className="absolute left-4 right-4 top-full mt-3 overflow-hidden rounded-[1.4rem] border border-[var(--ipp-plum)]/22 bg-[var(--ipp-paper)]/82 p-4 shadow-[0_20px_42px_rgba(96,48,72,0.18)] backdrop-blur-xl md:hidden"
          >
            <p className="px-2 pb-2 text-[0.68rem] font-black uppercase tracking-[0.18em] text-[var(--ipp-coral)]">
              Navegación
            </p>

            <div className="flex flex-col gap-1">
              {navItems.map((item, index) => {
                const detail = mobileNavDetails[index]
                const Icon = detail.icon

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    className="group flex items-start gap-3 rounded-[1rem] px-3 py-3 text-left transition hover:bg-white/58"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--ipp-plum)]/12 bg-white/70 text-[var(--ipp-coral)]">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-base font-black leading-tight text-[var(--ipp-plum)] group-hover:text-[var(--ipp-coral)]">
                        {item.name}
                      </span>
                      <span className="mt-1 block text-sm font-semibold leading-snug text-[var(--ipp-plum)]/64">
                        {detail.description}
                      </span>
                    </span>
                  </a>
                )
              })}

              <a
                href="#join"
                onClick={(event) => handleNavClick(event, "#join")}
                className="mt-2 flex min-h-12 items-center justify-center rounded-[1rem] border border-[var(--ipp-plum)]/26 bg-[var(--ipp-coral)] px-5 text-base font-black text-white shadow-[4px_4px_0_rgba(96,48,72,0.14)] transition hover:brightness-105"
              >
                Contáctanos
              </a>
            </div>
          </div>
        ) : null}
      </nav>

      <div className="relative z-20 mx-auto grid min-h-[calc(100vh-88px)] max-w-6xl items-center gap-12 px-5 pb-16 pt-8 md:grid-cols-[0.95fr_0.85fr] md:px-8">
        <div className="w-full max-w-[350px] min-w-0 sm:max-w-2xl">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--ipp-plum)]/70">
            Proyecto educativo y comunitario en Colombia
          </p>

          <h1 className="font-display text-5xl font-black leading-[0.96] text-[var(--ipp-coral)] sm:text-6xl lg:text-7xl">
            Inglés
            <span className="mt-1 block text-[var(--ipp-plum)]">Pa&apos; la Paz</span>
          </h1>

          <p className="mt-6 max-w-xl break-words text-xl font-semibold leading-relaxed text-[var(--ipp-plum)]/84 md:text-xl">
            Usamos relatos, diálogo y experiencias creativas para que niñas, niños y
            comunidades vivan el inglés como una herramienta cercana para aprender,
            expresarse y construir paz desde su historia y su territorio.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <LiquidButton
              size="xxl"
              className="w-full max-w-full rounded-full bg-[var(--ipp-olive)] px-6 font-black text-white shadow-[6px_6px_0_rgba(96,48,72,0.22)] sm:w-auto sm:px-9"
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
              <BookOpen className="h-5 w-5 text-[var(--ipp-coral)]" aria-hidden="true" />
              <span>Círculos de lectura</span>
            </div>
            <div className="organic-card flex items-center gap-3 bg-white/60 p-4 shadow-[4px_4px_0_rgba(96,48,72,0.08)]">
              <HandHeart className="h-5 w-5 text-[var(--ipp-coral)]" aria-hidden="true" />
              <span>Paz y emociones</span>
            </div>
            <div className="organic-card flex items-center gap-3 bg-white/60 p-4 shadow-[4px_4px_0_rgba(96,48,72,0.08)]">
              <MapPin className="h-5 w-5 text-[var(--ipp-coral)]" aria-hidden="true" />
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
          />
        </div>
      </div>

      <div className="paper-edge absolute bottom-0 left-0 right-0 z-20 h-10 bg-[var(--ipp-paper)]" aria-hidden="true" />
    </header>
  )
}
