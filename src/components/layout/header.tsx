"use client"

import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { navItems } from "@/lib/data"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const { scrollY } = useScroll()

  // Lógica para mostrar/ocultar según dirección de scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setIsVisible(false) // Scrolleando hacia abajo
    } else {
      setIsVisible(true) // Scrolleando hacia arriba
    }
  })

  // Bloquear el scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#")) {
      return
    }

    event.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      aria-label="Navegación principal"
      className="fixed top-0 left-0 right-0 z-[100] mx-auto max-w-4xl px-4 py-3 md:px-10 lg:px-16"
    >
      <div className="relative flex items-center justify-between rounded-[1.35rem] border-1 border-ipp-white/24 bg-ipp-paper/95 px-3 py-3 shadow-[0_8px_20px_rgba(96,48,72,0.08)] backdrop-blur md:px-4">
        <div className="order-2 hidden items-center gap-1 rounded-[1rem] text-[14px] font-black md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(event) => handleNavClick(event, item.href)}
              className="rounded-[0.9rem] px-3 py-2 text-ipp-plum transition hover:bg-ipp-cream hover:text-ipp-coral"
            >
              {item.name}
            </a>
          ))}
        </div>

        <Link
          href="/"
          onClick={(event) => handleNavClick(event as any, "#hero")}
          className="order-1 inline-flex items-center gap-3 rounded-[1rem] px-2 py-1 transition hover:bg-white/20"
          aria-label="Ir al inicio"
        >
          <Image
            src="/images/ipp/logo_png3.png"
            alt="Logo de Inglés pa' la Paz"
            width={874}
            height={574}
            className="h-10 w-auto object-contain"
            priority
            style={{ height: 'auto' }}
          />
        </Link>

        <div className="order-3 hidden items-center gap-3 md:flex">
          <a
            href="#join"
            onClick={(event) => handleNavClick(event, "#join")}
            className="inline-flex min-h-10 items-center gap-3 rounded-[1rem] border-1 border-ipp-plum bg-ipp-coral px-5 text-sm font-black text-white shadow-[3px_3px_0_rgba(96,48,72,0.18)] transition hover:-translate-y-0.5 hover:bg-ipp-plum"
          >
            Contáctanos
          </a>
        </div>

        <button
          className="order-3 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[0.9rem] border-2 border-ipp-plum/24 bg-white/70 p-2 text-ipp-plum shadow-[3px_3px_0_rgba(96,48,72,0.1)] backdrop-blur md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-header-menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-header-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-4 right-4 top-full mt-3 max-h-[calc(100vh-100px)] overflow-y-auto rounded-[1.4rem] border border-ipp-plum/22 bg-ipp-paper/82 p-4 shadow-[0_20px_42px_rgba(96,48,72,0.18)] backdrop-blur-xl md:hidden"
          >
            <p className="px-2 pb-2 text-[0.68rem] font-black uppercase tracking-[0.18em] text-ipp-coral">
              Navegación
            </p>

            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    className="group flex items-start gap-3 rounded-[1rem] px-3 py-3 text-left transition hover:bg-white/58"
                  >
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ipp-plum/12 bg-white/70 text-ipp-coral">
                      {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                    </span>
                    <span>
                      <span className="block text-base font-black leading-tight text-ipp-plum group-hover:text-ipp-coral">
                        {item.name}
                      </span>
                      <span className="mt-1 block text-sm font-semibold leading-snug text-ipp-plum/64">
                        {item.description}
                      </span>
                    </span>
                  </a>
                )
              })}

              <a
                href="#join"
                onClick={(event) => handleNavClick(event, "#join")}
                className="mt-2 flex min-h-12 items-center justify-center rounded-[1rem] border border-ipp-plum/26 bg-ipp-coral px-5 text-base font-black text-white shadow-[4px_4px_0_rgba(96,48,72,0.14)] transition hover:brightness-105"
              >
                Contáctanos
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
