"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowUpRight,
  ChevronDown,
  FolderOpen,
  ImageIcon,
  type LucideIcon,
} from "lucide-react"
import { DynamicIcon } from "@/components/ui/dynamic-icon"
import { experiences as staticExperiences } from "@/lib/data"
import type { ExperienceResource, ExperienceItem } from "@/types/landing"

// Componente para el estado de carga (Skeleton)
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

interface ExperiencesProps {
  data: ExperienceItem[]
}

export default function Experiences({ data: initialData }: ExperiencesProps) {
  // Usar datos pasados o fallback a estáticos si no hay datos
  const experiencesList = initialData && initialData.length > 0 ? initialData : staticExperiences
  
  const [activeId, setActiveId] = useState(experiencesList[0].id)
  const [expandedId, setExpandedId] = useState<string | null>(experiencesList[0].id)
  const [selectedResourceTitle, setSelectedResourceTitle] = useState(
    experiencesList[0].resources?.[0]?.title ?? ""
  )
  const [autoResourcesById, setAutoResourcesById] = useState<Record<string, ExperienceResource[]>>({})
  const [isApiLoading, setIsApiLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const activeExperience = experiencesList.find((item) => item.id === activeId) ?? experiencesList[0]
  // Manejo seguro del icono usando el nombre del icono dinámico
  const ActiveIcon = ({ className, ...props }: any) => (
    <DynamicIcon name={activeExperience.icon_name} className={className} {...props} />
  )

  const activeResources = useMemo(
    () => autoResourcesById[activeExperience.id] ?? (activeExperience.resources || []),
    [autoResourcesById, activeExperience.id, activeExperience.resources]
  )
  const selectedResource =
    activeResources.find((resource) => resource.title === selectedResourceTitle) ?? activeResources[0]

  useEffect(() => {
    if (!activeExperience.resource_folder || autoResourcesById[activeExperience.id]) {
      setIsApiLoading(false)
      return
    }

    let isCancelled = false
    setIsApiLoading(true)
    setApiError(null)

    const loadResources = async () => {
      try {
        const response = await fetch(
          `/api/experience-resources?folder=${encodeURIComponent(activeExperience.resource_folder ?? "")}`
        )

        if (!response.ok) {
          throw new Error("No se pudieron cargar los recursos de esta experiencia.")
        }

        const resources = (await response.json()) as ExperienceResource[]

        if (!isCancelled) {
          if (resources.length > 0) {
            setAutoResourcesById((current) => ({
              ...current,
              [activeExperience.id]: resources,
            }))
          }
        }
      } catch (err) {
        if (!isCancelled) {
          setApiError(err instanceof Error ? err.message : "Error al cargar recursos")
        }
      } finally {
        if (!isCancelled) {
          setIsApiLoading(false)
        }
      }
    }

    loadResources()

    return () => {
      isCancelled = true
    }
  }, [activeExperience.id, activeExperience.resource_folder, autoResourcesById])

  useEffect(() => {
    setSelectedResourceTitle(activeResources[0]?.title ?? "")
  }, [activeExperience.id, activeResources])

  const getResourcesForExperience = (experience: ExperienceItem) =>
    autoResourcesById[experience.id] ?? (experience.resources || [])

  return (
    <section
      id="experiences"
      aria-labelledby="experiences-heading"
      className="relative overflow-hidden bg-ipp-mint px-5 py-24 md:px-8"
    >
      <div className="paper-edge absolute left-0 right-0 top-0 h-12 rotate-180 bg-ipp-paper" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.42),transparent_32%),linear-gradient(180deg,rgba(255,248,232,0.28),rgba(220,235,207,0.6))]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl pt-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="section-kicker">Experiencias</p>
          <h2
            id="experiences-heading"
            className="font-display text-5xl font-black leading-tight text-ipp-plum md:text-7xl"
          >
            Así se vive el inglés cuando nace desde el territorio
          </h2>
        </div>

        <div className="grid items-stretch gap-6 xl:grid-cols-[260px_minmax(0,0.9fr)_minmax(0,1.15fr)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
            className="flex h-full flex-col gap-6"
          >
            <article className="rounded-[2rem] border border-white/70 bg-white/55 p-5 shadow-[14px_16px_0_rgba(96,48,72,0.08)] backdrop-blur">
              <p className="max-w-[14ch] font-display text-4xl font-black leading-[1.05] text-ipp-plum md:text-[2.5rem]">
                Explora nuestras experiencias
              </p>
            </article>

            <article className="rounded-[2rem] border border-white/70 bg-white/45 p-4 shadow-[14px_16px_0_rgba(96,48,72,0.08)] backdrop-blur xl:mt-1">
              <div className="mb-5 flex items-center justify-between px-3 pt-2">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-ipp-coral">
                  Carpetas
                </p>
                <FolderOpen className="h-5 w-5 text-ipp-plum/52" aria-hidden="true" />
              </div>

              <div className="space-y-4" role="tablist" aria-label="Experiencias del proyecto">
                {experiencesList.map((item) => {
                  const isActive = item.id === activeId

                  return (
                    <button
                      key={item.id}
                      id={`experience-tab-${item.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`experience-panel-${item.id}`}
                      onClick={() => {
                        setActiveId(item.id)
                        setExpandedId(item.id)
                      }}
                      className={`flex min-h-[48px] w-full items-center justify-between rounded-[1.45rem] px-2 py-2 text-left transition ${
                        isActive
                          ? "bg-ipp-paper shadow-[0_8px_18px_rgba(96,48,72,0.08)]"
                          : "bg-transparent hover:bg-white/45"
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-1">
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
                          style={{ backgroundColor: item.accent }}
                        >
                          <DynamicIcon name={item.icon_name} className="h-5 w-5 text-ipp-plum" aria-hidden="true" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-base font-black text-ipp-plum">{item.folder}</p>
                          <p className="truncate text-sm font-semibold text-ipp-plum/68">{item.eyebrow}</p>
                        </div>
                      </div>

                      <ArrowUpRight
                        className={`h-4 w-4 shrink-0 ${isActive ? "text-ipp-coral" : "text-ipp-plum/38"}`}
                        aria-hidden="true"
                      />
                    </button>
                  )
                })}
              </div>
            </article>
          </motion.div>

          <motion.article
            id={`experience-panel-${activeExperience.id}`}
            role="tabpanel"
            aria-labelledby={`experience-tab-${activeExperience.id}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            viewport={{ once: true }}
            className="h-full rounded-[2rem] border border-white/70 bg-white/50 p-3 shadow-[14px_16px_0_rgba(96,48,72,0.08)] backdrop-blur"
          >
            <div className="space-y-3">
              {[activeExperience].map((item) => {
                const isExpanded = expandedId === item.id
                const itemResources = getResourcesForExperience(item)

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="overflow-hidden rounded-[1.65rem] border border-ipp-coral/30 bg-ipp-paper shadow-[0_14px_28px_rgba(96,48,72,0.08)]"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedId((current) => (current === item.id ? null : item.id))}
                      className="w-full px-4 pb-5 pt-4 text-left transition hover:bg-white/20 sm:px-5 sm:pb-6 sm:pt-5"
                    >
                      <div className="flex justify-end gap-2">
                        <div className="flex items-center gap-2 rounded-full border border-ipp-coral/14 bg-white/84 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.22em] text-ipp-plum/72 shadow-[0_8px_16px_rgba(96,48,72,0.06)] backdrop-blur">
                          <DynamicIcon name={item.icon_name} className="h-3.5 w-3.5 text-ipp-plum/68" aria-hidden="true" />
                          <span>
                            {itemResources.length} {itemResources.length === 1 ? "imagen" : "imágenes"}
                          </span>
                        </div>

                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-ipp-coral/12 bg-white/72 text-ipp-plum/60 shadow-[0_8px_16px_rgba(96,48,72,0.05)]">
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      <div className="mt-5 flex flex-col gap-4 sm:mt-6 sm:grid sm:grid-cols-[64px_minmax(0,1fr)] sm:items-start sm:gap-x-5 lg:flex lg:flex-row lg:items-start">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[1rem] bg-ipp-paper">
                          <Image src={item.image} alt={item.title} fill className="object-contain p-2" sizes="64px" />
                        </div>

                        <div className="min-w-0 w-full">
                          <p className="max-w-none font-display text-[1.85rem] font-black leading-[1.02] text-ipp-plum sm:text-[2.05rem] lg:text-[2.15rem]">
                            {item.title}
                          </p>
                          <p className="mt-3 max-w-none text-[1rem] font-semibold leading-relaxed text-ipp-plum/72 lg:max-w-2xl">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeOut" }}
                          className="overflow-hidden border-t border-ipp-coral/18 bg-white/32"
                        >
                          {isApiLoading ? (
                            <ResourceSkeleton />
                          ) : apiError ? (
                            <div className="p-6 text-center text-sm font-semibold text-ipp-plum/60">
                              {apiError}
                            </div>
                          ) : (
                            <div className="max-h-[272px] space-y-2 overflow-y-auto p-4 pr-2 md:max-h-[364px]">
                              {itemResources.map((resource) => (
                                <button
                                  key={`${item.id}-${resource.title}`}
                                  type="button"
                                  onClick={() => setSelectedResourceTitle(resource.title)}
                                  className={`flex min-h-[48px] w-full items-center gap-4 rounded-[1.2rem] border p-3 text-left transition ${
                                    selectedResource?.title === resource.title
                                      ? "border-ipp-coral/24 bg-ipp-paper shadow-[0_10px_20px_rgba(96,48,72,0.05)]"
                                      : "border-transparent bg-transparent hover:bg-white/48"
                                  }`}
                                >
                                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[1rem] border border-white/70 bg-white/80">
                                    <Image
                                      src={resource.image}
                                      alt={resource.title}
                                      fill
                                      className="object-cover"
                                      sizes="64px"
                                    />
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-lg font-semibold text-ipp-plum">
                                      {resource.title}
                                    </p>
                                    <p className="mt-1 text-[0.68rem] font-black uppercase tracking-[0.2em] text-ipp-plum/48">
                                      {resource.type}
                                    </p>
                                  </div>

                                  <ImageIcon className="h-4 w-4 shrink-0 text-ipp-coral/72" aria-hidden="true" />
                                </button>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            viewport={{ once: true }}
            className="flex h-full flex-col rounded-[2rem] border border-white/70 bg-white/50 p-5 shadow-[14px_16px_0_rgba(96,48,72,0.08)] backdrop-blur sm:p-6 lg:p-7"
          >
            <div className="relative mx-auto flex w-full max-w-[560px] flex-1 items-center justify-center">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] drop-shadow-[12px_14px_0_rgba(96,48,72,0.08)]">
                <Image
                  src={selectedResource?.image ?? activeExperience.image}
                  alt={selectedResource?.title ?? activeExperience.title}
                  fill
                  priority
                  className="rounded-[2.5rem] object-contain p-1 sm:p-2"
                  sizes="(min-width: 1280px) 36vw, (min-width: 640px) 60vw, 100vw"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: activeExperience.accent }}
                >
                  <ActiveIcon className="h-5 w-5 text-ipp-plum" aria-hidden="true" />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-ipp-coral">
                    {activeExperience.eyebrow}
                  </p>
                  <h3 className="mt-1 font-display text-[2rem] font-black leading-[0.98] text-ipp-plum lg:text-[2.3rem]">
                    {activeExperience.title}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-base font-semibold leading-relaxed text-ipp-plum/76">
                {activeExperience.summary}
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}

