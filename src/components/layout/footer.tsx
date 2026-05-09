/**
 * @file footer.tsx
 * @description Componente de pie de página (Footer).
 * Contiene información de contacto, redes sociales y logotipos institucionales.
 */

"use client"

import Image from "next/image"
import { Mail } from "lucide-react"
import { socialLinks, contactInfo } from "@/lib/data"

/**
 * Icono personalizado de TikTok.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.className] - Clases de CSS adicionales.
 */
function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M16.62 3c.28 2.38 1.62 3.8 4.02 3.96v3.22a7.14 7.14 0 0 1-4.02-1.23v5.96c0 3.02-2.03 5.09-5.12 5.09-2.8 0-5.14-1.77-5.14-4.72 0-3.34 2.92-5.22 6.15-4.55v3.37c-1.5-.49-2.85.18-2.85 1.5 0 1 .78 1.58 1.75 1.58 1.13 0 1.88-.66 1.88-2.12V3h3.33Z" />
    </svg>
  )
}

/**
 * Componente Footer.
 * 
 * Muestra el manifiesto del proyecto, enlaces a redes sociales y créditos institucionales.
 * Utiliza un diseño de varias capas con efectos de borde de papel.
 * 
 * @returns {JSX.Element} El pie de página completo.
 */
export default function Footer() {
  return (
    <footer
      id="join"
      aria-labelledby="footer-heading"
      className="relative overflow-hidden bg-ipp-paper text-[#321018]"
    >
      <h2 id="footer-heading" className="sr-only">
        Contacto y redes de Inglés pa&apos; la Paz
      </h2>

      {/* Efecto decorativo de borde de papel superior */}
      <div
        className="paper-edge absolute left-0 right-0 top-0 h-12 rotate-180 bg-ipp-cream"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-5xl grid-rows-[auto_auto] px-5 pb-0 pt-20 sm:px-8 md:px-10 md:pt-20">
        <div className="relative z-20 grid gap-6 md:grid-cols-[minmax(15rem,28rem)_1fr] md:items-start md:gap-8">
          <p className="max-w-sm text-xl font-semibold leading-relaxed text-[#321018]/90 md:text-2xl">
            El inglés no es el fin, sino el medio para honrar nuestra identidad.
          </p>

          {/* Información de Contacto y Redes */}
          <div className="flex flex-col items-start gap-4 md:items-end md:text-right">
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center gap-2 text-xl font-bold text-[#321018] transition hover:text-ipp-coral"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              {contactInfo.email}
            </a>

            <div className="flex items-center gap-3 md:justify-end">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Abrir ${name} de Inglés pa' la Paz`}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#321018] text-white transition hover:-translate-y-1 hover:bg-ipp-coral focus:outline-none focus:ring-4 focus:ring-ipp-yellow/60"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
              <a
                href={contactInfo.tiktok}
                target="_blank"
                rel="noreferrer"
                aria-label="Abrir TikTok de Inglés pa' la Paz"
                className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#321018] text-white transition hover:-translate-y-1 hover:bg-ipp-coral focus:outline-none focus:ring-4 focus:ring-ipp-yellow/60"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Branding Gigante (Tipografía Decorativa) */}
        <div className="relative z-10 mt-1 grid grid-cols-1 items-end gap-2 md:mt-[-1.5rem] md:grid-cols-[minmax(12rem,22rem)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[minmax(14rem,27rem)_minmax(0,1fr)] lg:gap-10">
          <div className="relative hidden h-[10.5rem] w-full overflow-hidden sm:h-[13rem] md:block md:h-[18rem]">
            <div className="pointer-events-none absolute bottom-[-4.1rem] left-1/2 h-[17rem] w-[17rem] -translate-x-1/2 sm:h-[20rem] sm:w-[20rem] md:bottom-[-5.6rem] md:left-0 md:h-[24rem] md:w-[24rem] md:translate-x-0">
              <Image
                src="/images/ipp/logo_png3.png"
                alt=""
                fill
                sizes="(min-width: 768px) 24rem, 21rem"
                className="object-contain object-bottom"
              />
            </div>
          </div>

          <div className="relative z-10 flex min-w-0 flex-col items-end text-right font-sans font-black tracking-normal text-[#321018]">
            <span className="block leading-[0.9] text-[clamp(5.4rem,23vw,9.8rem)] md:leading-[1.08] md:text-[clamp(4.2rem,10.2vw,9.4rem)]">
              Inglés
            </span>
            <span className="-mb-[0.3rem] block whitespace-nowrap leading-[0.78] text-[clamp(3.95rem,17.4vw,8.4rem)] md:-mt-[0.06em] md:-mb-[0.3rem] md:leading-[0.72] md:text-[clamp(2.9rem,6.8vw,7.1rem)]">
              Pa&apos; la Paz
            </span>
          </div>
        </div>
      </div>

      {/* Barra de Créditos e Instituciones */}
      <div className="relative z-30 border-t border-white/10 bg-[#321018] px-5 py-4 text-white sm:px-8 md:py-7">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm font-bold sm:text-base md:flex-row md:items-center md:justify-between md:gap-10">
          <p className="leading-none tracking-[0.01em] md:text-lg">&copy; 2026 Inglés pa&apos; la Paz</p>

          <div className="flex w-full items-end justify-between gap-6 md:w-auto md:justify-end md:gap-8">
            <Image
              src="/images/ipp/LOGOROJOIDPAC-p-500.png"
              alt="Logo de IDPAC"
              width={500}
              height={109}
              className="h-auto w-28 brightness-0 invert sm:w-44 md:w-56"
              style={{ height: 'auto' }}
            />
            <Image
              src="/images/ipp/logo_png3.png"
              alt=""
              width={874}
              height={574}
              className="h-auto w-20 sm:w-32 md:hidden"
              style={{ height: 'auto' }}
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
