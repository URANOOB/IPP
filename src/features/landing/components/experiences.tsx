/**
 * @file experiences.tsx
 * @description Componente de galería inmersiva que muestra las experiencias del proyecto IPP.
 * Utiliza un layout Bento Grid en escritorio y una lista colapsable en dispositivos móviles.
 * Soporta la carga dinámica de recursos (imágenes) desde carpetas específicas de Supabase/Storage.
 */

"use client"

import Image from "next/image"
import { useEffect, useMemo, useState, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ImageIcon,
  X,
} from "lucide-react"
import { DynamicIcon } from "@/components/ui/dynamic-icon"
import { experiences, landingDefaults } from "@/lib/data"
import { experienceStyles } from "@/lib/styles"
import type { ExperienceResource, ExperienceItem } from "@/types/landing"

/**
 * Componente visual de carga (Skeleton) para las imágenes de la galería.
 * Se muestra mientras se resuelve la petición a la API de recursos.
 * 
 * @returns {JSX.Element} Un conjunto de elementos con efecto de pulso.
 */
function ResourceSkeleton() {
  return (
    <div className="space-y-2 p-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-4 rounded-[1.2rem] border border-transparent bg-white/30 p-3 animate-pulse">
          <div className="h-16 w-16 shrink-0 rounded-[1rem] bg-ipp-plum/10" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-ipp-plum/10" />
            <div className="h-3 w-1/4 rounded bg-ipp-plum/10" />
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Componente principal de la sección de Experiencias.
 * Gestiona la visualización de proyectos, carga dinámica de imágenes y visualización en Lightbox.
 * 
 * Características:
 * - Layout adaptativo (Bento Grid vs Lista).
 * - Carga diferida de recursos desde el servidor.
 * - Navegación por teclado y gestos táctiles.
 * 
 * @returns {JSX.Element} La sección completa de experiencias interactivas.
 */
export default function Experiences() {
  // Configuración de datos base
  const experiencesList = experiences as ExperienceItem[]
  const d = landingDefaults.experiences
  
  // Establecer experiencia inicial (prioridad a 'bridges-memory')
  const defaultExperience = experiencesList.find(e => e.id === "bridges-memory") || experiencesList[0]
  
  // --- Estados de Control ---
  const [activeId, setActiveId] = useState(defaultExperience.id)
  const [selectedResourceTitle, setSelectedResourceTitle] = useState("")
  const [autoResourcesById, setAutoResourcesById] = useState<Record<string, ExperienceResource[]>>({})
  const [isApiLoading, setIsApiLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFolderSelectorOpen, setIsFolderSelectorOpen] = useState(false)

  // Memoización de la experiencia activa y sus estilos específicos
  const activeExperience = experiencesList.find((item) => item.id === activeId) ?? experiencesList[0]
  const activeStyles = experienceStyles[activeExperience.id] || experienceStyles["little-readers"]
  
  // Unión de recursos estáticos y cargados dinámicamente vía API
  const activeResources = useMemo(
    () => autoResourcesById[activeExperience.id] ?? (activeExperience.resources || []),
    [autoResourcesById, activeExperience.id, activeExperience.resources]
  )

  // Control del índice seleccionado para la navegación del visor
  const selectedIndex = useMemo(() => {
    const idx = activeResources.findIndex(r => r.title === selectedResourceTitle)
    return idx === -1 ? 0 : idx
  }, [activeResources, selectedResourceTitle])

  const selectedResource = activeResources[selectedIndex] || activeResources[0]

  /** Navega al siguiente recurso de la galería actual */
  const goToNext = useCallback(() => {
    if (activeResources.length === 0) return
    const nextIdx = (selectedIndex + 1) % activeResources.length
    setSelectedResourceTitle(activeResources[nextIdx].title)
  }, [selectedIndex, activeResources])

  /** Navega al recurso anterior de la galería actual */
  const goToPrev = useCallback(() => {
    if (activeResources.length === 0) return
    const prevIdx = (selectedIndex - 1 + activeResources.length) % activeResources.length
    setSelectedResourceTitle(activeResources[prevIdx].title)
  }, [selectedIndex, activeResources])

  // --- Manejo de Eventos de Teclado (Accesibilidad) ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "ArrowLeft") goToPrev()
      if (e.key === "Escape") setIsModalOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen, goToNext, goToPrev])

  // Reset del recurso seleccionado al cambiar de carpeta de experiencia
  const [prevActiveId, setPrevActiveId] = useState(activeId)
  if (activeId !== prevActiveId) {
    setPrevActiveId(activeId)
    setSelectedResourceTitle(activeResources[0]?.title ?? "")
  }

  // --- Carga Dinámica de Recursos ---
  useEffect(() => {
    // Si la carpeta no está definida o ya fue cargada, omitimos la petición
    if (!activeExperience.resource_folder || autoResourcesById[activeExperience.id]) return

    let isCancelled = false
    const timeoutId = setTimeout(() => {
      if (!isCancelled) setIsApiLoading(true)
    }, 0)

    const loadResources = async () => {
      try {
        const response = await fetch(
          `/api/experience-resources?folder=${encodeURIComponent(activeExperience.resource_folder ?? "")}`
        )
        if (!response.ok) throw new Error("API Error")
        const resources = (await response.json()) as ExperienceResource[]

        if (!isCancelled && resources.length > 0) {
          setAutoResourcesById((current) => ({ ...current, [activeExperience.id]: resources }))
        }
      } catch (err) {
        console.error("Error al cargar recursos de experiencia:", err)
      } finally {
        if (!isCancelled) setIsApiLoading(false)
      }
    }

    loadResources()
    return () => { isCancelled = true; clearTimeout(timeoutId) }
  }, [activeExperience.id, activeExperience.resource_folder, autoResourcesById])

  return (
    <section 
      id="experiences" 
      aria-labelledby="experiences-heading" 
      className="relative overflow-hidden bg-ipp-mint px-5 py-24 md:px-8"
    >
      <div className="paper-edge absolute left-0 right-0 top-0 h-12 rotate-180 bg-ipp-paper" aria-hidden="true" />
      
      <div className="relative mx-auto max-w-7xl pt-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="section-kicker">Experiencias</p>
          <h2 id="experiences-heading" className="font-display text-5xl font-black leading-tight text-ipp-plum md:text-7xl">
            {d.title}
          </h2>
        </div>

        {/* --- VISTA MÓVIL Y TABLET --- */}
        <div className="grid items-stretch gap-6 xl:hidden">
          <div className="flex flex-col gap-4">
            <div className="space-y-3">
              {experiencesList.map((item) => {
                const isActive = item.id === activeId
                const s = experienceStyles[item.id] || experienceStyles["little-readers"]
                
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className={`flex w-full items-center justify-between rounded-[1.45rem] p-2 transition ${
                      isActive ? "bg-ipp-paper shadow-lg" : "bg-white/40"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: s.accent }}>
                        <DynamicIcon name={s.icon_name} className="h-5 w-5 text-ipp-plum" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-black text-ipp-plum">{item.folder}</p>
                        <p className="text-[0.7rem] font-semibold text-ipp-plum/60">{item.eyebrow}</p>
                      </div>
                    </div>
                    <ArrowUpRight className={`h-4 w-4 ${isActive ? "text-ipp-coral" : "text-ipp-plum/30"}`} />
                  </button>
                )
              })}
            </div>
          </div>

          <article className="rounded-[2rem] border border-white/70 bg-white/50 p-4 shadow-[14px_16px_0_rgba(96,48,72,0.08)] backdrop-blur">
            <div className="mb-4 flex items-center justify-between px-2">
               <h3 className="font-display text-2xl font-black text-ipp-plum">{activeExperience.title}</h3>
               <span className="rounded-full bg-ipp-coral/10 px-3 py-1 text-[0.6rem] font-black text-ipp-coral">
                 {activeResources.length} FOTOS
               </span>
            </div>
            {isApiLoading ? <ResourceSkeleton /> : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin">
                {activeResources.map((res) => (
                  <button
                    key={res.title}
                    onClick={() => { setSelectedResourceTitle(res.title); setIsModalOpen(true) }}
                    className="group relative aspect-square overflow-hidden rounded-2xl border border-white/60 bg-white/80"
                  >
                    <Image src={res.image} alt={res.title} fill className="object-cover transition group-hover:scale-105" sizes="200px" />
                  </button>
                ))}
              </div>
            )}
          </article>
        </div>

        {/* --- VISTA BENTO (ESCRITORIO) --- */}
        <div className="hidden xl:grid grid-cols-[1fr_380px] gap-8 items-stretch max-w-[1240px] mx-auto">
          
          {/* Visor Principal y Miniaturas */}
          <div className="flex flex-col gap-6 min-w-0 h-full">
            <motion.div 
              layoutId="viewer"
              className="relative w-full flex-1 min-h-[460px] overflow-hidden rounded-[3rem] border-[8px] border-white/90 bg-white/45 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur flex items-center justify-center group"
            >
              <AnimatePresence mode="wait">
                {selectedResource ? (
                  <motion.div
                    key={selectedResource.image}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={selectedResource.image}
                      alt={selectedResource.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(min-width: 1280px) 800px, 100vw"
                    />
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center gap-4 text-ipp-plum/30">
                    <ImageIcon className="h-20 w-20" strokeWidth={1} />
                    <p className="font-display text-2xl font-black italic">Selecciona una imagen</p>
                  </div>
                )}
              </AnimatePresence>

              {/* Botones de navegación (solo visibles en hover) */}
              <div className="absolute inset-x-8 top-1/2 z-10 flex -translate-y-1/2 justify-between opacity-0 transition-opacity group-hover:opacity-100">
                <button onClick={goToPrev} className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-xl transition hover:scale-110">
                  <ChevronLeft size={32} />
                </button>
                <button onClick={goToNext} className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-xl transition hover:scale-110">
                  <ChevronRight size={32} />
                </button>
              </div>
            </motion.div>

            {/* Carrusel horizontal de miniaturas */}
            <div className="flex gap-5 overflow-x-auto pb-6 pt-2 px-2 scrollbar-thin">
              <AnimatePresence mode="popLayout">
                {activeResources.map((res, idx) => {
                  const isSelected = selectedResource?.title === res.title
                  return (
                    <motion.button
                      key={res.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => setSelectedResourceTitle(res.title)}
                      className={`relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 transition-all ${
                        isSelected ? "border-ipp-coral scale-110 shadow-lg" : "border-white/60 bg-white/40 hover:grayscale-0"
                      }`}
                      style={{ backgroundColor: isSelected ? activeStyles.tint : 'transparent' }}
                    >
                      <Image src={res.image} alt={res.title} fill className="object-cover" sizes="100px" />
                    </motion.button>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Columna de Información (Bento Cards) */}
          <div className="flex flex-col gap-6">
            
            {/* Selector de Experiencia */}
            <div className="relative z-20">
              <button 
                onClick={() => setIsFolderSelectorOpen(!isFolderSelectorOpen)}
                className="group w-full rounded-[1.8rem] border border-white/70 bg-white/70 p-5 text-left shadow-[10px_12px_0_rgba(96,48,72,0.05)] transition hover:bg-white/90"
              >
                <p className="mb-3 text-[0.65rem] font-black uppercase tracking-[0.3em] text-ipp-plum/40">Proyecto</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: activeStyles.accent }}>
                      <DynamicIcon name={activeStyles.icon_name} className="h-6 w-6 text-ipp-plum" />
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-black text-ipp-plum">{activeExperience.folder}</h4>
                      <p className="text-[0.75rem] font-bold text-ipp-plum/50">{activeExperience.eyebrow}</p>
                    </div>
                  </div>
                  <ChevronsUpDown className={`h-4 w-4 text-ipp-plum/50 transition-transform ${isFolderSelectorOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              <AnimatePresence>
                {isFolderSelectorOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute inset-x-0 top-full mt-3 overflow-hidden rounded-[1.8rem] border border-white/80 bg-white/95 p-2 shadow-2xl backdrop-blur-xl"
                  >
                    {experiencesList.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => { setActiveId(item.id); setIsFolderSelectorOpen(false) }}
                        className={`flex w-full items-center gap-3 rounded-2xl p-3 transition ${
                          activeId === item.id ? "bg-ipp-plum/5 text-ipp-plum" : "hover:bg-ipp-plum/5 text-ipp-plum/60"
                        }`}
                      >
                        <DynamicIcon name={experienceStyles[item.id].icon_name} className="h-4 w-4" />
                        <span className="text-sm font-black">{item.folder}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resumen de la Experiencia */}
            <article className="flex-1 flex flex-col rounded-[2.2rem] border border-white/70 bg-white/60 p-7 shadow-[10px_12px_0_rgba(96,48,72,0.05)]">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="inline-block rounded-full bg-ipp-mint px-4 py-1 text-[0.65rem] font-black uppercase tracking-[0.2em] text-ipp-plum/60">
                  {activeExperience.eyebrow}
                </div>
                <div className="shrink-0 rounded-full bg-ipp-plum/5 px-3 py-1 text-[0.8rem] font-black text-ipp-plum">
                  {selectedIndex + 1} / {activeResources.length}
                </div>
              </div>

              <h3 className="font-display text-[2.4rem] font-black leading-none text-ipp-plum">
                {activeExperience.title}
              </h3>
              <div className="flex-1 flex items-center">
                <p className="mt-6 text-2xl font-bold leading-relaxed text-ipp-plum/65">
                  {activeExperience.summary}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* MODAL LIGHTBOX (Pantalla completa para móviles/interacción) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm xl:hidden"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.button
              className="absolute right-6 top-6 z-[120] flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={28} />
            </motion.button>

            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="relative flex h-full max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-[3rem] shadow-2xl"
              style={{ backgroundColor: activeStyles.accent }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedResource.image}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="relative h-full w-full p-6"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_e, info) => {
                      if (info.offset.x > 80) goToPrev()
                      else if (info.offset.x < -80) goToNext()
                    }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[2.5rem]">
                      <Image src={selectedResource.image} alt={selectedResource.title} fill className="object-cover" priority />
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                <button onClick={goToPrev} className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/30 text-white backdrop-blur-sm">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/30 text-white backdrop-blur-sm">
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="p-8 text-center">
                <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-ipp-coral/80">{activeExperience.eyebrow}</p>
                <h3 className="mt-2 font-display text-4xl font-black text-ipp-plum">{activeExperience.title.toUpperCase()}</h3>
                <p className="mt-4 text-base font-bold text-ipp-plum/70">{activeExperience.summary}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
