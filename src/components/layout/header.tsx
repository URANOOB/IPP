"use client"

import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { navItems } from "@/lib/data"
import Link from "next/link"

/**
 * @file header.tsx
 * @description Componente de navegación principal (Header) del proyecto Inglés pa' la Paz.
 * 
 * Características principales:
 * 1. Diseño minimalista y flotante con efecto backdrop-blur.
 * 2. Lógica de ocultamiento inteligente al hacer scroll hacia abajo.
 * 3. Navegación suave (smooth scroll) para enlaces internos.
 * 4. Diseño responsivo con menú móvil tipo "hamburguesa".
 */

/**
 * Componente Header.
 * 
 * IMPORTANTE: Si ves 'data-projection-id' en el Inspector al depurar, 
 * es un artefacto de Framer Motion; reiniciar el servidor de desarrollo suele limpiarlo.
 */
export default function Header() {
  // Estado para controlar la apertura/cierre del menú en dispositivos móviles
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Estado para controlar la visibilidad del header basado en la dirección del scroll
  const [isVisible, setIsVisible] = useState(true)

  /**
   * Efecto para manejar el comportamiento del scroll.
   * Oculta el header cuando el usuario baja y lo muestra cuando sube.
   */
  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const direction = scrollY > lastScrollY ? "down" : "up";

      // Umbral de 80px para evitar que el header desaparezca inmediatamente al iniciar el scroll
      if (direction === "down" && scrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      // Actualizamos la última posición de scroll para la siguiente comparación
      lastScrollY = scrollY <= 0 ? 0 : scrollY;
    };

    // Añadimos el listener con 'passive: true' para mejorar el rendimiento del scroll
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Limpieza del listener al desmontar el componente
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Manejador de clics para la navegación.
   * Implementa scroll suave para anclas (#) y cierra el menú móvil.
   * 
   * @param event - El evento de clic de React
   * @param href - El destino del enlace
   */
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Si no es un enlace interno, permitimos el comportamiento por defecto
    if (!href.startsWith("#")) return;
    
    event.preventDefault();
    const element = document.querySelector(href);
    
    if (element) {
      // Navegación suave nativa del navegador
      element.scrollIntoView({ behavior: "smooth" });
    }
    
    // Cerramos el menú móvil tras la selección
    setIsMenuOpen(false);
  };

  return (
    <nav
      id="header-navigation-ipp"
      aria-label="Navegación principal"
      className={`fixed top-0 left-0 right-0 z-[100] mx-auto max-w-4xl px-4 py-4 transition-transform duration-500 ease-in-out will-change-transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Contenedor principal de la barra de navegación */}
      <div className="relative flex items-center justify-between rounded-[1.4rem] border border-ipp-white/20 bg-ipp-paper/95 px-4 py-3 shadow-xl backdrop-blur-md">
        
        {/* Navegación Desktop: Centrada (order-2) */}
        <div className="order-2 hidden items-center gap-1 text-sm font-black md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="rounded-xl px-4 py-2 text-ipp-plum transition hover:bg-ipp-coral hover:text-white"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Logo: Alineado a la izquierda (order-1) */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="order-1 flex items-center"
          aria-label="Ir al inicio"
        >
          <Image
            src="/images/ipp/logo_png3.png"
            alt="Logo Inglés pa' la Paz"
            width={120}
            height={48}
            className="h-12 w-auto object-contain rounded-lg"
            style={{ width: 'auto' }}
          />
        </Link>

        {/* Botón de Acción Principal (Desktop) */}
        <div className="order-3 hidden md:block">
          <a
            href="#join"
            onClick={(e) => handleNavClick(e, "#join")}
            className="rounded-xl bg-ipp-coral px-6 py-2.5 text-sm font-black text-white shadow-lg transition hover:scale-105 active:scale-95"
          >
            Contáctanos
          </a>
        </div>

        {/* Botón Hamburguesa (Móvil) */}
        <button
          className="order-3 flex h-10 w-10 items-center justify-center rounded-xl bg-ipp-plum/5 text-ipp-plum md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menú Móvil Desplegable */}
      {isMenuOpen && (
        <div className="absolute left-4 right-4 top-full mt-3 rounded-2xl border border-ipp-plum/10 bg-ipp-paper p-4 shadow-2xl md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="rounded-xl px-4 py-3 font-bold text-ipp-plum hover:bg-ipp-plum/5"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

