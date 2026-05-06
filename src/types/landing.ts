import { LucideIcon } from "lucide-react"

export type NavItem = {
  name: string
  href: string
  description?: string
  icon?: LucideIcon
}

export type Principle = {
  id: string
  title: string
  description: string
  icon_name: string
  surface_color: string
  ink_color: string
  // Props calculadas para el UI
  chip?: string
  glow?: string
}

export type ExperienceResource = {
  title: string
  type: string
  image: string
}

export type ExperienceItem = {
  id: string
  title: string
  folder: string
  eyebrow: string
  summary: string
  description: string
  image: string
  icon_name: string
  accent: string
  tint: string
  resource_folder: string
  resources?: ExperienceResource[]
}

export type MethodStep = {
  id: string
  title: string
  icon_name: string
  color: string
  summary: string
  items: string[]
  keywords: string[]
  order_index?: number
}

export type Integrante = {
  id: string
  name: string
  email?: string
  role: string
  focus: string
  icon_name: string
  photo_url: string | null
  accent_color: string
  surface_color: string
  order_index?: number
}
