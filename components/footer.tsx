"use client"

import Image from "next/image"
import { Instagram, Mail } from "lucide-react"

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/ingles.pa.lapaz/",
    icon: Instagram,
  },
]

function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M16.62 3c.28 2.38 1.62 3.8 4.02 3.96v3.22a7.14 7.14 0 0 1-4.02-1.23v5.96c0 3.02-2.03 5.09-5.12 5.09-2.8 0-5.14-1.77-5.14-4.72 0-3.34 2.92-5.22 6.15-4.55v3.37c-1.5-.49-2.85.18-2.85 1.5 0 1 .78 1.58 1.75 1.58 1.13 0 1.88-.66 1.88-2.12V3h3.33Z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer
      id="join"
      aria-labelledby="footer-heading"
      className="relative overflow-hidden bg-[var(--ipp-paper)] text-[#321018]"
    >
      <h2 id="footer-heading" className="sr-only">
        Contacto y redes de Inglés pa&apos; la Paz
      </h2>

      <div
        className="paper-edge absolute left-0 right-0 top-0 h-12 rotate-180 bg-[var(--ipp-mint)]"
        aria-hidden="true"
      />

      <div className="mx-auto grid max-w-5xl grid-rows-[auto_auto] px-5 pb-0 pt-20 sm:px-8 md:px-10 md:pt-20">
        <div className="relative z-20 grid gap-6 md:grid-cols-[minmax(15rem,28rem)_1fr] md:items-start md:gap-8">
          <p className="max-w-sm text-xl font-semibold leading-relaxed text-[#321018]/90 md:text-2xl">
            El inglés no es el fin, sino el medio para honrar nuestra identidad.
          </p>

          <div className="flex flex-col items-start gap-4 md:items-end md:text-right">
            <a
              href="mailto:inglespalapaz@gmail.com"
              className="inline-flex items-center gap-2 text-xl font-bold text-[#321018] transition hover:text-[var(--ipp-coral)]"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              inglespalapaz@gmail.com
            </a>

            <div className="flex items-center gap-3 md:justify-end">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Abrir ${name} de Inglés pa' la Paz`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#321018] text-white transition hover:-translate-y-1 hover:bg-[var(--ipp-coral)] focus:outline-none focus:ring-4 focus:ring-[var(--ipp-yellow)]/60"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
              <a
                href="https://www.tiktok.com/@ingles.pa.lapaz"
                target="_blank"
                rel="noreferrer"
                aria-label="Abrir TikTok de Inglés pa' la Paz"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#321018] text-white transition hover:-translate-y-1 hover:bg-[var(--ipp-coral)] focus:outline-none focus:ring-4 focus:ring-[var(--ipp-yellow)]/60"
              >
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

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

          <div className="relative z-10 mb-[-0.01rem] flex min-w-0 flex-col items-end text-right font-sans font-black leading-[0.76] tracking-normal text-[#321018] md:leading-[0.78]">
            <span className="block text-[clamp(5.4rem,23vw,9.8rem)] md:text-[clamp(4.2rem,10.2vw,9.4rem)]">
              Inglés
            </span>
            <span className="block whitespace-nowrap text-[clamp(3.95rem,17.4vw,8.4rem)] md:text-[clamp(2.9rem,6.8vw,7.1rem)]">
              Pa&apos; la Paz
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-30 bg-[#321018] px-5 py-5 text-white sm:px-8">
        <div className="mx-auto grid min-h-[8.5rem] max-w-7xl grid-cols-[1fr_auto] gap-x-4 gap-y-4 text-sm font-bold md:min-h-0 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-6">
          <div className="col-start-1 row-start-1">
            <p>&copy; 2026 Inglés pa&apos; la Paz</p>
          </div>

          <div className="col-start-2 row-start-2 flex flex-col items-end gap-2 self-end justify-self-end md:col-start-2 md:row-start-1 md:self-center md:justify-self-start">
            <Image
              src="/images/ipp/LOGOROJOIDPAC-p-500.png"
              alt="Logo de IDPAC"
              width={500}
              height={109}
              className="h-auto w-40 brightness-0 invert sm:w-48"
            />
            <Image
              src="/images/ipp/logo_png3.png"
              alt=""
              width={874}
              height={574}
              className="h-auto w-28 md:hidden"
            />
          </div>
        </div>
      </div>
    </footer>
  )
}
