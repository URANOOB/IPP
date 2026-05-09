/**
 * @file team-member-form.tsx
 * @description Formulario para la creación y edición de integrantes del equipo.
 * Permite configurar datos personales, roles, iconos representativos y colores de identidad.
 */

'use client'

import { useState } from 'react'
import { Integrante } from '@/types/landing'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ImageUpload } from './image-upload'
import { 
  Save, 
  X, 
  Loader2, 
} from 'lucide-react'
import { DynamicIcon } from '@/components/ui/dynamic-icon'

/**
 * Propiedades del componente TeamMemberForm.
 */
interface TeamMemberFormProps {
  /** Datos iniciales del integrante (si es edición). */
  member?: Partial<Integrante>
  /** Función asíncrona para guardar los datos. */
  onSave: (data: Partial<Integrante>) => Promise<void>
  /** Callback para cancelar la operación. */
  onCancel: () => void
}

/** Iconos recomendados para representar roles en el equipo. */
const RECOMMENDED_ICONS = [
  'Users', 'Megaphone', 'PenSquare', 'Handshake', 'Sparkles', 
  'BookOpen', 'Code2', 'MonitorCog', 'ClipboardList', 'UserRound',
  'Heart', 'Star', 'MessageCircle', 'Globe', 'Library'
]

/** Colores predefinidos de la marca IPP para la identidad de los integrantes. */
const COMMON_COLORS = [
  { label: 'Coral', value: 'var(--ipp-coral)' },
  { label: 'Sky', value: 'var(--ipp-sky)' },
  { label: 'Yellow', value: 'var(--ipp-yellow)' },
  { label: 'Green', value: 'var(--ipp-green)' },
  { label: 'Earth', value: 'var(--ipp-earth)' },
  { label: 'Plum', value: 'var(--ipp-plum)' },
  { label: 'Mint', value: 'var(--ipp-mint)' },
]

/**
 * Componente que renderiza el formulario de gestión de equipo.
 * Maneja internamente el estado de los campos y la validación básica.
 * 
 * @param {TeamMemberFormProps} props - Propiedades del componente.
 * @returns {JSX.Element} El formulario de administración de integrantes.
 */
export function TeamMemberForm({ member, onSave, onCancel }: TeamMemberFormProps) {
  // Inicialización del estado del formulario con valores por defecto o del miembro a editar
  const [formData, setFormData] = useState<Partial<Integrante>>({
    id: member?.id,
    name: member?.name || '',
    email: member?.email || '',
    role: member?.role || '',
    focus: member?.focus || '',
    icon_name: member?.icon_name || 'UserRound',
    accent_color: member?.accent_color || 'var(--ipp-coral)',
    surface_color: member?.surface_color || 'rgba(192, 96, 72, 0.12)',
    photo_url: member?.photo_url || '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  /**
   * Procesa el envío del formulario.
   * Activa el estado de carga y delega el guardado a la función onSave.
   * 
   * @param {React.FormEvent} e - Evento de envío del formulario.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await onSave(formData)
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-10 rounded-[2.5rem] border border-ipp-plum/10 shadow-xl">
      {/* Cabecera del Formulario */}
      <div className="flex items-center justify-between border-b border-ipp-plum/5 pb-6">
        <h2 className="text-2xl font-black text-ipp-plum">
          {member?.id ? 'Editar Integrante' : 'Nuevo Integrante'}
        </h2>
        <button type="button" onClick={onCancel} className="text-ipp-plum/20 hover:text-ipp-coral transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sección de Datos Personales y Rol */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-ipp-plum/40 uppercase tracking-widest px-1">Nombre Completo</label>
            <Input 
              value={formData.name} 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Vanessa Peña"
              required
              className="rounded-2xl border-2 border-ipp-plum/5 h-12 font-bold focus:border-ipp-coral/30"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-ipp-plum/40 uppercase tracking-widest px-1">Correo Electrónico (Para permisos)</label>
            <Input 
              type="email"
              value={formData.email} 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="ejemplo@correo.com"
              className="rounded-2xl border-2 border-ipp-plum/5 h-12 font-bold focus:border-ipp-coral/30"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-ipp-plum/40 uppercase tracking-widest px-1">Rol / Cargo</label>
            <Input 
              value={formData.role} 
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Ej: Líder de Proyecto"
              required
              className="rounded-2xl border-2 border-ipp-plum/5 h-12 font-bold focus:border-ipp-coral/30"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-ipp-plum/40 uppercase tracking-widest px-1">Enfoque / Descripción corta</label>
            <textarea
              value={formData.focus}
              onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
              placeholder="¿Qué hace esta persona en el proyecto?"
              required
              className="w-full min-h-[100px] bg-white border-2 border-ipp-plum/5 rounded-2xl p-4 font-semibold text-ipp-plum focus:border-ipp-coral/30 focus:ring-0 transition-colors"
            />
          </div>
        </div>

        {/* Sección de Carga de Fotografía */}
        <div className="space-y-6">
          <ImageUpload 
            label="Foto de perfil"
            defaultValue={formData.photo_url || ''}
            onUpload={(url) => setFormData({ ...formData, photo_url: url })}
          />
        </div>
      </div>

      {/* Configuración Visual (Iconos y Colores) */}
      <div className="space-y-6 pt-6 border-t border-ipp-plum/5">
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <label className="text-xs font-black text-ipp-plum/40 uppercase tracking-widest">Seleccionar Icono</label>
            <a 
              href="https://lucide.dev/icons" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-bold text-ipp-coral hover:underline"
            >
              Ver librería de iconos →
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            {RECOMMENDED_ICONS.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setFormData({ ...formData, icon_name: icon })}
                className={`p-3 rounded-xl border-2 transition-all ${
                  formData.icon_name === icon 
                    ? 'border-ipp-coral bg-ipp-coral/10 text-ipp-coral' 
                    : 'border-ipp-plum/5 hover:border-ipp-plum/20 text-ipp-plum/40'
                }`}
              >
                <DynamicIcon name={icon} className="h-5 w-5" />
              </button>
            ))}
            <div className="flex-1 min-w-[150px]">
              <Input 
                value={formData.icon_name} 
                onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                placeholder="O escribe nombre del icono..."
                className="rounded-xl border-2 border-ipp-plum/5 h-11 text-sm font-bold"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-black text-ipp-plum/40 uppercase tracking-widest px-1">Color de Acento (Identidad)</label>
          <div className="flex flex-wrap gap-3">
            {COMMON_COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setFormData({ ...formData, accent_color: color.value })}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all font-bold text-xs ${
                  formData.accent_color === color.value 
                    ? 'border-ipp-plum bg-ipp-plum text-white' 
                    : 'border-ipp-plum/5 hover:border-ipp-plum/20 text-ipp-plum'
                }`}
              >
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color.value }} />
                {color.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Botones de Acción */}
      <div className="flex justify-end gap-4 pt-4">
        <Button 
          type="button" 
          variant="ghost" 
          onClick={onCancel}
          className="rounded-2xl font-black text-ipp-plum/40 hover:text-ipp-plum"
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="rounded-2xl bg-ipp-coral px-10 h-14 font-black text-white shadow-xl hover:scale-105 transition-all gap-2"
        >
          {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : <Save size={20} />}
          {member?.id ? 'Guardar Cambios' : 'Crear Integrante'}
        </Button>
      </div>
    </form>
  )
}
