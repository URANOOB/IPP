"use client"

import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { navItems } from "@/lib/data"
import Link from "next/link"

/**
 * Header minimalista con lógica de ocultamiento por scroll.
 * IMPORTANTE: Si ves 'data-projection-id' en el Inspect, reinicia el servidor 'npm run dev'.
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const direction = scrollY > lastScrollY ? "down" : "up";

      // Umbral de 80px para empezar a esconder
      if (direction === "down" && scrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = scrollY <= 0 ? 0 : scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav
      id="header-navigation-ipp"
      className={`fixed top-0 left-0 right-0 z-[100] mx-auto max-w-4xl px-4 py-4 transition-transform duration-500 ease-in-out will-change-transform ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="relative flex items-center justify-between rounded-[1.4rem] border border-ipp-white/20 bg-ipp-paper/95 px-4 py-3 shadow-xl backdrop-blur-md">
        {/* Enlaces Desktop */}
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

        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e as any, "#hero")}
          className="order-1 flex items-center"
        >
          <img
            src="/images/ipp/logo_png3.png"
            alt="Logo"
            className="h-12 w-auto object-contain rounded-lg"
          />
        </Link>

        {/* Botón Acción */}
        <div className="order-3 hidden md:block">
          <a
            href="#join"
            onClick={(e) => handleNavClick(e, "#join")}
            className="rounded-xl bg-ipp-coral px-6 py-2.5 text-sm font-black text-white shadow-lg transition hover:scale-105 active:scale-95"
          >
            Contáctanos
          </a>
        </div>

        {/* Botón Móvil */}
        <button
          className="order-3 flex h-10 w-10 items-center justify-center rounded-xl bg-ipp-plum/5 text-ipp-plum md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Menú Móvil Simple */}
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
