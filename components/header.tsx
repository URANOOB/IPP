"use client"

import { LiquidButton } from "@/components/ui/liquid-glass-button"
import Image from "next/image"
import { BookOpen, HandHeart, MapPin, Menu, X } from "lucide-react"
import { useState } from "react"

const navItems = [
  { name: "Inicio", href: "#hero" },
  { name: "Quiénes Somos", href: "#project" },
  { name: "Experiencias", href: "#experiences" },
  { name: "Metodología", href: "#method" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Todas las opciones del nav viven en la misma landing; esto evita rutas extra.
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header id="hero" className="relative min-h-screen overflow-hidden bg-[var(--ipp-sky)] text-[var(--ipp-plum)]">
      <div
        // Imagen de fondo del hero. El overlay siguiente baja el contraste para que el texto respire.
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/ipp/butterflies_banner3.png')" }}
      />
      <div className="absolute inset-0 bg-[var(--ipp-sky)]/68" />

      <nav className="relative z-50 mx-auto max-w-7xl px-2 py-2 md:px-16">
        <div className="relative flex items-center justify-between rounded-[3rem] border border-white/70 bg-white/88 px-2 py-4 shadow-[0_18px_40px_rgba(96,48,72,0.12)] backdrop-blur md:px-6">
          <div className="hidden items-center gap-8 text-[16px] font-black md:flex">
            {navItems.slice(0, 3).map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="rounded-full px-4 py-2 transition-colors hover:bg-black/8 hover:text-[var(--ipp-coral)]"
              >
                {item.name}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollToSection("#hero")}
            className="md:absolute md:left-1/2 md:-translate-x-1/2"
            aria-label="Ir al inicio"
          >
            <Image
              src="/images/ipp/logo_png3.png"
              alt="Logo de Ingles pa' la Paz"
              width={874}
              height={574}
              className="h-14 w-auto object-contain md:h-16"
            />
          </button>

          <div className="hidden items-center gap-4 md:flex">
            {navItems.slice(3).map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="rounded-full px-4 py-2 text-[16px] font-black transition-colors hover:bg-black/8 hover:text-[var(--ipp-coral)]"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("#join")}
              className="inline-flex items-center gap-3 rounded-2xl bg-[var(--ipp-coral)] px-5 py-3 text-sm 
              font-black text-white shadow-[0_12px_24px_rgba(120,168,120,0.28)] transition hover:brightness-105"
            >
              Contáctanos
            </button>
          </div>

          <button
            className="rounded-full border border-white/70 bg-white/70 p-3 backdrop-blur md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-header-menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isMenuOpen ? (
          // Menu movil compacto: queda bajo la barra y no deja ver el hero entre las opciones.
          <div
            id="mobile-header-menu"
            className="absolute left-2 right-2 top-full mt-2 overflow-hidden rounded-[2rem] border border-white/80 bg-[#fff8e8] p-3 shadow-[0_22px_48px_rgba(96,48,72,0.22)] md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="flex min-h-12 items-center justify-center rounded-full bg-white px-5 text-base font-black text-[var(--ipp-plum)] shadow-[4px_4px_0_rgba(96,48,72,0.08)] transition hover:bg-[var(--ipp-mint)]"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </nav>

      <div className="relative z-20 mx-auto grid min-h-[calc(100vh-88px)] max-w-6xl items-center gap-12 px-5 pb-16 pt-8 md:grid-cols-[0.95fr_0.85fr] md:px-8">
        <div className="max-w-2xl">

          <h1 className="font-display text-5xl font-black leading-[0.96] text-[var(--ipp-coral)] sm:text-6xl lg:text-7xl">
            Inglés
            <span className="mt-1 block text-[var(--ipp-plum)]">Pa&apos; la Paz</span>
          </h1>

          <p className="mt-6 max-w-xl text-xl font-semibold leading-relaxed text-[var(--ipp-plum)]/84 md:text-xl">
            En Inglés pa&apos; la Paz usamos relatos, diálogo y experiencias creativas para que niñas, niños y comunidades vivan el inglés como una herramienta cercana, no como una barrera escolar.
            Un proceso donde nuestra historia y nuestro territorio también enseñan.
          </p>
          <p className="mt-3 max-w-lg text-base font-semibold leading-relaxed text-[var(--ipp-plum)]/68 md:text-lg">
            Un proyecto donde nuestra historia y nuestro territorio también enseña.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <LiquidButton
              size="xxl"
              className="rounded-full bg-[var(--ipp-olive)] px-9 font-black text-white shadow-[6px_6px_0_rgba(96,48,72,0.22)]"
              onClick={() => scrollToSection("#project")}
            >
              Conoce el proyecto
            </LiquidButton>
          </div>

          <div className="mt-10 grid gap-3 text-sm font-bold sm:grid-cols-3">
            <div className="organic-card flex items-center gap-3 bg-white/60 p-4 shadow-[4px_4px_0_rgba(96,48,72,0.08)]">
              <BookOpen className="h-5 w-5 text-[var(--ipp-coral)]" />
              Círculos de lectura
            </div>
            <div className="organic-card flex items-center gap-3 bg-white/60 p-4 shadow-[4px_4px_0_rgba(96,48,72,0.08)]">
              <HandHeart className="h-5 w-5 text-[var(--ipp-coral)]" />
              Paz y emociones
            </div>
            <div className="organic-card flex items-center gap-3 bg-white/60 p-4 shadow-[4px_4px_0_rgba(96,48,72,0.08)]">
              <MapPin className="h-5 w-5 text-[var(--ipp-coral)]" />
              Comunidad y territorio
            </div>
          </div>
        </div>

        <div className="relative min-h-[250px]">
          <div className="absolute inset-x-10 top-12 h-72 rounded-full bg-white/28 blur-3xl" />
          <Image
            src="/images/ipp/logo_png3.png"
            alt="Elemento visual principal de Ingles pa' la Paz"
            width={874}
            height={574}
            priority
            className="absolute bottom-0 left-1/2 z-10 w-[320px] max-w-none -translate-x-1/2 drop-shadow-[8px_8px_0_rgba(96,48,72,0.12)] md:w-[420px] lg:w-[470px]"
          />
        </div>
      </div>

      <div className="paper-edge absolute bottom-0 left-0 right-0 z-20 h-10 bg-[var(--ipp-paper)]" />
    </header>
  )
}
