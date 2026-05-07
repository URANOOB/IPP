/**
 * BACKEND ACTIONS - LANDING
 * 
 * Acciones para gestionar el contenido dinámico de la página de inicio.
 */

'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { 
  principleStyles, 
  methodologyStyles, 
  teamStyles, 
  experienceStyles 
} from '@/lib/styles'
import type { 
  Principle, 
  MethodStep, 
  Integrante, 
  ExperienceItem 
} from '@/types/landing'

interface ContentItem {
  key: string
  content: string
}

/**
 * Obtiene el contenido de texto dinámico (títulos, descripciones).
 */
export async function getLandingContent(): Promise<{ success: boolean; data?: Record<string, string>; error?: string }> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('landing_content').select('*')
  
  if (error) {
    console.error('Error fetching content:', error)
    return { success: false, error: error.message }
  }

  const contentMap = (data || []).reduce((acc: Record<string, string>, item: ContentItem) => {
    acc[item.key] = item.content
    return acc
  }, {})

  return { success: true, data: contentMap }
}

/**
 * Obtiene la lista de integrantes del equipo priorizando los datos de la base de datos.
 */
export async function getTeamMembers(): Promise<{ success: boolean; data?: Integrante[]; error?: string }> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('team_members')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching team:', error)
    return { success: false, error: error.message }
  }

  const members: Integrante[] = (data || []).map(member => {
    // Fallback a estilos locales si no hay datos en la DB para estos campos
    const localStyle = teamStyles[member.name] || {
      icon_name: 'UserRound',
      accent_color: 'var(--ipp-plum)',
      surface_color: 'var(--ipp-cream)'
    }
    
    return {
      id: member.id,
      name: member.name,
      email: member.email,
      role: member.role,
      focus: member.focus,
      photo_url: member.photo_url,
      icon_name: member.icon_name || localStyle.icon_name,
      accent_color: member.accent_color || localStyle.accent_color,
      surface_color: member.surface_color || localStyle.surface_color,
      order_index: member.order_index
    }
  })

  return { success: true, data: members }
}

/**
 * Obtiene los principios del proyecto con estilos EXCLUSIVAMENTE locales.
 */
export async function getPrinciples(): Promise<{ success: boolean; data?: Principle[]; error?: string }> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('principles')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching principles:', error)
    return { success: false, error: error.message }
  }

  const principles: Principle[] = (data || []).map(p => {
    const localStyle = principleStyles[p.title] || {
      icon_name: 'HelpCircle',
      surface_color: 'var(--ipp-mint)',
      ink_color: 'var(--ipp-plum)',
      chip: 'rgba(96, 48, 72, 0.11)',
      glow: 'rgba(255, 255, 255, 0.44)',
    }

    return {
      id: p.id,
      title: p.title,
      description: p.description,
      icon_name: p.icon_name || localStyle.icon_name,
      surface_color: p.surface_color || localStyle.surface_color,
      ink_color: p.ink_color || localStyle.ink_color,
      chip: localStyle.chip || 'rgba(96, 48, 72, 0.11)',
      glow: localStyle.glow || 'rgba(255, 255, 255, 0.44)',
    }
  })

  return { success: true, data: principles }
}

/**
 * Obtiene los pasos de la metodología con estilos EXCLUSIVAMENTE locales.
 */
export async function getMethodology(): Promise<{ success: boolean; data?: MethodStep[]; error?: string }> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('methodology_steps')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching methodology:', error)
    return { success: false, error: error.message }
  }

  const steps: MethodStep[] = (data || []).map(s => {
    const localStyle = methodologyStyles[s.title] || {
      icon_name: 'HelpCircle',
      color: 'var(--ipp-plum)'
    }

    return {
      id: s.id,
      title: s.title,
      summary: s.summary,
      items: s.items,
      keywords: s.keywords,
      icon_name: s.icon_name || localStyle.icon_name,
      color: s.color || localStyle.color,
      order_index: s.order_index
    }
  })

  return { success: true, data: steps }
}

/**
 * Obtiene las experiencias con estilos EXCLUSIVAMENTE locales.
 */
export async function getExperiences(): Promise<{ success: boolean; data?: ExperienceItem[]; error?: string }> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('experiences')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Error fetching experiences:', error)
    return { success: false, error: error.message }
  }

  const experiences: ExperienceItem[] = (data || []).map(e => {
    // Intentar buscar por ID o por nombre de carpeta
    const localStyle = experienceStyles[e.id] || experienceStyles[e.folder] || {
      icon_name: 'BookOpen',
      accent: 'var(--ipp-cream)',
      tint: 'rgba(255, 255, 255, 0.1)'
    }

    return {
      id: e.id,
      title: e.title,
      folder: e.folder,
      eyebrow: e.eyebrow,
      summary: e.summary,
      description: e.description,
      image: e.image,
      resource_folder: e.resource_folder,
      icon_name: e.icon_name || localStyle.icon_name,
      accent: e.accent || localStyle.accent,
      tint: e.tint || localStyle.tint,
      resources: []
    }
  })

  return { success: true, data: experiences }
}

/**
 * Actualiza los textos de la landing.
 */
export async function updateLandingContent(content: Record<string, string>): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  
  const updates = Object.entries(content).map(([key, value]) => ({
    key,
    content: value,
  }))

  const { error } = await supabase.from('landing_content').upsert(updates)

  if (error) {
    console.error('Error updating content:', error)
    return { success: false, error: error.message }
  }

  revalidatePath('/')
  return { success: true }
}
