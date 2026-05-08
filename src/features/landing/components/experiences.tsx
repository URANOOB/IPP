"use client"

import Image from "next/image"
import { useEffect, useMemo, useState, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  ImageIcon,
  X,
} from "lucide-react"
import { DynamicIcon } from "@/components/ui/dynamic-icon"
import { experiences, landingDefaults } from "@/lib/data"
import { experienceStyles } from "@/lib/styles"
import type { ExperienceResource, ExperienceItem } from "@/types/landing"

/**
 * @section COMPONENTE DE CARGA (Skeleton)
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
 * @section COMPONENTE EXPERIENCIAS
 */
export default function Experiences() {
  const experiencesList = experiences as ExperienceItem[]
  const d = landingDefaults.experiences
  
  const defaultExperience = experiencesList.find(e => e.id === "bridges-memory") || experiencesList[0]
  
  const [activeId, setActiveId] = useState(defaultExperience.id)
  const [expandedId, setExpandedId] = useState<string | null>(defaultExperience.id)
  const [selectedResourceTitle, setSelectedResourceTitle] = useState("")
  const [autoResourcesById, setAutoResourcesById] = useState<Record<string, ExperienceResource[]>>({})
  const [isApiLoading, setIsApiLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const activeExperience = experiencesList.find((item) => item.id === activeId) ?? experiencesList[0]
  const activeStyles = experienceStyles[activeExperience.id] || experienceStyles["little-readers"]
  
  const activeResources = useMemo(
    () => autoResourcesById[activeExperience.id] ?? (activeExperience.resources || []),
    [autoResourcesById, activeExperience.id, activeExperience.resources]
  )

  const selectedIndex = useMemo(() => {
    const idx = activeResources.findIndex(r => r.title === selectedResourceTitle)
    return idx === -1 ? 0 : idx
  }, [activeResources, selectedResourceTitle])

  const selectedResource = activeResources[selectedIndex] || activeResources[0]

  // Navegación del carrusel/modal
  const goToNext = useCallback(() => {
    const nextIdx = (selectedIndex + 1) % activeResources.length
    setSelectedResourceTitle(activeResources[nextIdx].title)
  }, [selectedIndex, activeResources])

  const goToPrev = useCallback(() => {
    const prevIdx = (selectedIndex - 1 + activeResources.length) % activeResources.length
    setSelectedResourceTitle(activeResources[prevIdx].title)
  }, [selectedIndex, activeResources])

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

  // Sincronizar el recurso seleccionado cuando cambia la experiencia activa
  const [prevActiveId, setPrevActiveId] = useState(activeId)
  if (activeId !== prevActiveId) {
    setPrevActiveId(activeId)
    setSelectedResourceTitle(activeResources[0]?.title ?? "")
  }

  // Carga de imágenes
  useEffect(() => {
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
        if (!response.ok) throw new Error("Error")
        const resources = (await response.json()) as ExperienceResource[]

        if (!isCancelled && resources.length > 0) {
          setAutoResourcesById((current) => ({ ...current, [activeExperience.id]: resources }))
        }
      } catch (err) {
        console.error("Experiences API Error:", err)
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

        <div className="grid items-stretch gap-6 xl:grid-cols-[260px_minmax(0,0.9fr)_minmax(0,1.15fr)]">
          
          {/* COLUMNA 1: Selector de Carpetas */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <article className="rounded-[2rem] border border-white/70 bg-white/55 p-5 shadow-[14px_16px_0_rgba(96,48,72,0.08)] backdrop-blur">
              <p className="max-w-[14ch] font-display text-4xl font-black leading-[1.05] text-ipp-plum md:text-[2.5rem]">
                {d.subtitle}
              </p>
            </article>

            <article className="flex flex-col rounded-[2rem] border border-white/70 bg-white/45 p-4 shadow-[14px_16px_0_rgba(96,48,72,0.08)] backdrop-blur xl:mt-1">
              <div className="mb-5 flex items-center justify-between px-3 pt-2">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-ipp-coral">Carpetas</p>
                <FolderOpen className="h-5 w-5 text-ipp-plum/52" />
              </div>

              <div className="space-y-4" role="tablist">
                {experiencesList.map((item) => {
                  const isActive = item.id === activeId
                  const s = experienceStyles[item.id] || experienceStyles["little-readers"]
                  
                  return (
                    <button
                      key={item.id}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => { setActiveId(item.id); setExpandedId(item.id) }}
                      className={`flex min-h-[48px] w-full items-center justify-between rounded-[1.45rem] px-2 py-2 text-left transition ${
                        isActive ? "bg-ipp-paper shadow-[0_8px_18px_rgba(96,48,72,0.08)]" : "bg-transparent hover:bg-white/45"
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-1">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: s.accent }}>
                          <DynamicIcon name={s.icon_name} className="h-5 w-5 text-ipp-plum" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-base font-black text-ipp-plum">{item.folder}</p>
                          <p className="truncate text-sm font-semibold text-ipp-plum/68">{item.eyebrow}</p>
                        </div>
                      </div>
                      <ArrowUpRight className={`h-4 w-4 shrink-0 ${isActive ? "text-ipp-coral" : "text-ipp-plum/38"}`} />
                    </button>
                  )
                })}
              </div>
            </article>
          </motion.div>

          {/* COLUMNA 2: Lista de Imágenes - REDISEÑO DE CABECERA */}
          <motion.article className="flex h-full flex-col rounded-[2rem] border border-white/70 bg-white/50 p-4 shadow-[14px_16px_0_rgba(96,48,72,0.08)] backdrop-blur xl:p-5">
            <div className="flex flex-1 flex-col space-y-3">
              <motion.div className="flex flex-1 flex-col overflow-hidden rounded-[1.5rem] border border-ipp-coral/30 bg-ipp-paper shadow-[0_14px_28px_rgba(96,48,72,0.08)]">
                <div
                  onClick={() => {
                    if (window.innerWidth < 1280) {
                      setExpandedId((current) => (current === activeExperience.id ? null : activeExperience.id))
                    }
                  }}
                  className="w-full px-5 py-6 text-left transition xl:cursor-default"
                >
                  <div className="flex flex-col gap-4">
                    {/* Fila Superior: Badge y Chevron (Mobile) */}
                    <div className="flex items-center justify-between">
                      <div 
                        className="inline-flex items-center gap-2 rounded-full border border-ipp-plum/5 bg-white/80 px-3 py-1 text-[0.62rem] font-black uppercase tracking-[0.2em] text-ipp-plum/50 shadow-sm backdrop-blur"
                      >
                        <span className="h-1 w-1 rounded-full bg-ipp-coral" />
                        <span>{activeResources.length} IMÁGENES DISPONIBLES</span>
                      </div>
                      
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-ipp-coral/12 bg-white/72 text-ipp-plum/60 xl:hidden">
                        <ChevronDown className={`h-4 w-4 transition-transform ${expandedId === activeExperience.id ? "rotate-180" : ""}`} />
                      </div>
                    </div>

                    {/* Título Principal */}
                    <div className="min-w-0">
                      <h3 className="font-display text-[2rem] font-black leading-[0.95] text-ipp-plum sm:text-[2.2rem] lg:text-[2.4rem]">
                        {activeExperience.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {expandedId === activeExperience.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="flex-1 overflow-hidden border-t border-ipp-coral/18 bg-white/32"
                    >
                      {isApiLoading ? <ResourceSkeleton /> : (
                        <div className="h-full max-h-[380px] xl:max-h-[460px] space-y-2 overflow-y-auto p-4 pr-2">
                          {activeResources.map((resource) => (
                            <button
                              key={`${activeExperience.id}-${resource.title}`}
                              type="button"
                              onClick={() => {
                                setSelectedResourceTitle(resource.title)
                                if (window.innerWidth < 1280) setIsModalOpen(true)
                              }}
                              className={`flex min-h-[48px] w-full items-center gap-4 rounded-[1.2rem] border p-3 text-left transition ${
                                selectedResource?.title === resource.title ? "border-ipp-coral/24 bg-ipp-paper shadow-[0_10px_20px_rgba(96,48,72,0.05)]" : "border-transparent bg-transparent hover:bg-white/48"
                              }`}
                            >
                              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[1rem] border border-white/70 bg-white/80">
                                <Image src={resource.image} alt={resource.title} fill className="object-cover" sizes="64px" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-lg font-semibold text-ipp-plum">{resource.title}</p>
                                <p className="mt-1 text-[0.68rem] font-black uppercase tracking-[0.2em] text-ipp-plum/48">{resource.type}</p>
                              </div>
                              <ImageIcon className="h-4 w-4 shrink-0 text-ipp-coral/72" />
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </motion.article>

          {/* COLUMNA 3: Previsualización Desktop */}
          <motion.article 
            className="hidden h-full flex-col rounded-[2rem] border border-white/70 bg-white/55 p-5 shadow-[14px_16px_0_rgba(96,48,72,0.08)] backdrop-blur xl:flex sm:p-6 lg:p-7 transition-colors duration-500"
          >
            <div className="relative mx-auto flex w-full max-w-[560px] flex-1 items-center justify-center">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] drop-shadow-[12px_14px_0_rgba(96,48,72,0.08)]">
                <Image
                  src={selectedResource?.image ?? activeExperience.image}
                  alt={selectedResource?.title ?? activeExperience.title}
                  fill
                  priority
                  className="rounded-[2.5rem] object-contain p-1 sm:p-2"
                  sizes="(min-width: 1280px) 36vw, 100vw"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-ipp-coral">{activeExperience.eyebrow}</p>
                <h3 className="font-display text-[2.5rem] font-black leading-[0.9] text-ipp-plum lg:text-[2.8rem]">{activeExperience.title}</h3>
              </div>
              <p className="mt-5 text-base font-semibold leading-relaxed text-ipp-plum/76">{activeExperience.summary}</p>
            </div>
          </motion.article>

        </div>
      </div>

      {/* LIGHTBOX MODAL (Móvil / Tablet) - Color Sincronizado */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.button
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute right-6 top-6 z-[120] flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70 active:scale-95"
              onClick={(e) => { e.stopPropagation(); setIsModalOpen(false) }}
            >
              <X size={28} />
            </motion.button>

            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="relative flex h-full max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-[3rem] shadow-2xl transition-colors duration-500"
              style={{ backgroundColor: activeStyles.accent }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* ÁREA DE IMAGEN (Superior) */}
              <div className="relative flex-1 bg-black/5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedResource.image}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="relative h-full w-full p-6 cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={(_e, info) => {
                      if (info.offset.x > 80) goToPrev()
                      else if (info.offset.x < -80) goToNext()
                    }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-2xl">
                      <Image
                        src={selectedResource.image}
                        alt={selectedResource.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>

                <button
                  onClick={(e) => { e.stopPropagation(); goToPrev() }}
                  className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 active:scale-90"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goToNext() }}
                  className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50 active:scale-90"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* ÁREA DE TEXTO (Sincronizada con el color de la experiencia) */}
              <div className="p-8 text-center sm:p-10">
                <div className="mb-4 flex flex-col items-center justify-center gap-2">
                  <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-ipp-coral/80">{activeExperience.eyebrow}</p>
                  <div className="h-px w-6 bg-ipp-plum/10" />
                </div>
                
                <h3 className="font-display text-4xl font-black leading-tight text-ipp-plum md:text-5xl">
                  {activeExperience.title.toUpperCase()}
                </h3>
                
                <p className="mt-4 text-base font-bold leading-relaxed text-ipp-plum/70 line-clamp-3 md:text-lg">
                  {activeExperience.summary}
                </p>

                <div className="mt-8 flex items-center justify-center gap-4">
                  <div className="h-px w-8 bg-ipp-plum/10" />
                  <div className="inline-flex items-center gap-2 rounded-full bg-ipp-plum/5 border border-ipp-plum/10 px-4 py-1.5 text-[0.65rem] font-black uppercase tracking-[0.2em] text-ipp-plum/40">
                    {selectedIndex + 1} DE {activeResources.length}
                  </div>
                  <div className="h-px w-8 bg-ipp-plum/10" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
