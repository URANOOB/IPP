"use client"

export default function Footer() {
  return (
    <footer id="join" className="relative bg-[var(--ipp-plum)] px-5 py-24 text-white md:px-8">
        <div className="paper-edge absolute left-0 right-0 top-0 h-12 rotate-180 bg-[var(--ipp-paper)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 pt-8 md:grid-cols-[1fr_0.8fr] md:items-center">
          <div>
            <p className="section-kicker text-[var(--ipp-yellow)]">Participa</p>
            <h2 className="font-display text-5xl font-black leading-tight md:text-7xl">
              Aprendamos a contar nuestro territorio en ingles.
            </h2>
            <p className="mt-6 max-w-2xl text-xl font-semibold leading-relaxed text-white/78">
              Ideal para bibliotecas, espacios comunitarios, organizaciones juveniles y aliados que quieran activar
              procesos de lectura, paz y bilingüismo situado.
            </p>
          </div>

          <div className="organic-card border border-white/20 bg-white/10 p-7 backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--ipp-yellow)]">Contacto</p>
            <h3 className="mt-4 font-display text-4xl font-black">Ingles pa&apos; la Paz</h3>
            <p className="mt-4 text-white/80">Escribenos para proponer un circulo, una alianza o una muestra final.</p>
            <a
              href="mailto:inglespalapaz@gmail.com" 
              className="mt-7 inline-flex rounded-full bg-[var(--ipp-yellow)] px-7 py-4 font-black text-[var(--ipp-plum)] shadow-[6px_6px_0_rgba(0,0,0,0.18)] transition hover:-translate-y-1"
            >
              inglespalapaz@gmail.com
            </a>
          </div>
        </div>
      </footer>
  )
}
