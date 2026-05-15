/**
 * @file team/page.tsx
 * @description Panel de gestión del equipo de trabajo.
 * Permite listar los integrantes que aparecen en la landing page, editarlos,
 * eliminarlos y gestionar su orden de visualización.
 */

'use client'

import { useEffect, useState } from 'react'
import { getTeamMembersAdmin, upsertTeamMember, deleteTeamMember } from '@/features/admin/team/actions'
import { Integrante } from '@/types/landing'
import { TeamMemberForm } from '@/features/admin/components/team-member-form'
import { 
  Plus, 
  UserRound, 
  Trash2, 
  Edit3, 
  Loader2, 
  AlertCircle,
  Search,
  ChevronRight
} from 'lucide-react'
import Image from 'next/image'
import { DynamicIcon } from '@/components/ui/dynamic-icon'

/**
 * Componente de la página de gestión de Equipo (Admin).
 * Gestiona el estado de los integrantes, el buscador y la visibilidad del formulario de edición.
 * 
 * @returns {JSX.Element} Vista administrativa del equipo.
 */
export default function TeamManagementPage() {
  const [members, setMembers] = useState<Integrante[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Integrante | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)

  /**
   * Recupera la lista de integrantes del servidor.
   * 
   * @param {boolean} [forceLoading=false] - Indica si se debe mostrar el spinner de carga.
   */
  const fetchMembers = async (forceLoading = false) => {
    if (forceLoading) setIsLoading(true)
    const result = await getTeamMembersAdmin()
    if (result.success) {
      setMembers(result.data || [])
      setError(null)
    } else {
      setError(result.error || 'Error al cargar el equipo')
    }
    setIsLoading(false)
  }

  /** Efecto de carga inicial */
  useEffect(() => {
    const initFetch = async () => {
      await fetchMembers()
    }
    initFetch()
  }, [])

  /** Lógica de filtrado en cliente para búsqueda reactiva */
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  /**
   * Maneja el guardado (creación/actualización) desde el formulario.
   * 
   * @param {Partial<Integrante>} data - Datos del integrante a persistir.
   */
  const handleSave = async (data: Partial<Integrante>) => {
    const result = await upsertTeamMember(data)
    if (result.success) {
      setIsFormOpen(false)
      setEditingMember(undefined)
      fetchMembers() // Recarga los datos tras el éxito
    } else {
      alert('Error al guardar: ' + result.error)
    }
  }

  /**
   * Maneja la eliminación definitiva de un integrante.
   * 
   * @param {string} id - UUID del integrante.
   */
  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar a este integrante?')) return
    
    const result = await deleteTeamMember(id)
    if (result.success) {
      fetchMembers()
    } else {
      alert('Error al eliminar: ' + result.error)
    }
  }

  /** Abre el formulario en modo edición para un miembro específico */
  const handleEdit = (member: Integrante) => {
    setEditingMember(member)
    setIsFormOpen(true)
  }

  // Estado de carga inicial (pantalla completa)
  if (isLoading && members.length === 0) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 text-ipp-coral animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Cabecera del Panel de Equipo */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-ipp-coral font-black uppercase tracking-widest text-xs mb-2">Página de Inicio</p>
          <h1 className="text-4xl md:text-5xl font-display font-black text-ipp-plum">Gestión del Equipo</h1>
          <p className="text-ipp-plum/40 font-semibold mt-2 text-lg">Administra los integrantes que aparecen en el carrusel de la landing.</p>
        </div>

        {!isFormOpen && (
          <button
            onClick={() => {
              setEditingMember(undefined)
              setIsFormOpen(true)
            }}
            className="flex items-center gap-2 bg-ipp-coral text-white px-8 py-4 rounded-3xl font-black shadow-xl hover:scale-105 transition-all self-start"
          >
            <Plus size={20} />
            Añadir Integrante
          </button>
        )}
      </header>

      {/* Manejo de Errores de API */}
      {error && (
        <div className="bg-red-50 border-2 border-red-100 p-6 rounded-[2rem] flex items-center gap-4 text-red-600">
          <AlertCircle />
          <p className="font-bold">{error}</p>
        </div>
      )}

      {/* Vista Condicional: Formulario vs Listado */}
      {isFormOpen ? (
        <TeamMemberForm 
          member={editingMember} 
          onSave={handleSave} 
          onCancel={() => {
            setIsFormOpen(false)
            setEditingMember(undefined)
          }} 
        />
      ) : (
        <div className="space-y-6">
          {/* Barra de Búsqueda */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ipp-plum/20" size={20} />
            <input
              type="text"
              placeholder="Buscar por nombre o cargo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-ipp-plum/5 rounded-2xl py-4 pl-12 pr-4 font-bold text-ipp-plum placeholder:text-ipp-plum/20 focus:ring-2 focus:ring-ipp-coral/20 focus:border-ipp-coral/20 outline-none transition-all shadow-sm"
            />
          </div>

          {/* Listado de Miembros (Tabla Estilizada) */}
          <div className="bg-white rounded-[2.5rem] border border-ipp-plum/5 shadow-sm overflow-hidden">
            <div className="divide-y divide-ipp-plum/5">
              {filteredMembers.map((member) => (
                <div 
                  key={member.id} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-6 hover:bg-ipp-cream/10 transition-colors group"
                >
                  <div className="flex items-center gap-5 min-w-0">
                    {/* Avatar / Foto */}
                    <div className="relative h-16 w-16 rounded-2xl overflow-hidden bg-ipp-paper shrink-0 border-2 border-white shadow-sm">
                      {member.photo_url ? (
                        <Image src={member.photo_url} alt={member.name} fill className="object-cover" />
                      ) : (
                        <div 
                          className="h-full w-full flex items-center justify-center text-white"
                          style={{ backgroundColor: member.accent_color || 'var(--ipp-plum)' }}
                        >
                          <UserRound size={24} />
                        </div>
                      )}
                    </div>

                    {/* Información Principal */}
                    <div className="min-w-0">
                      <h3 className="font-black text-ipp-plum text-lg truncate group-hover:text-ipp-coral transition-colors">{member.name}</h3>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-ipp-coral font-bold text-xs uppercase tracking-wider">{member.role}</span>
                        <span className="h-1 w-1 rounded-full bg-ipp-plum/10" />
                        <div className="flex items-center gap-1.5">
                          <DynamicIcon name={member.icon_name || 'UserRound'} className="h-3 w-3 text-ipp-plum/30" />
                          <span className="text-[10px] font-bold text-ipp-plum/30 uppercase tracking-widest">{member.icon_name}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Acciones de Fila */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 border-t sm:border-t-0 pt-4 sm:pt-0 border-ipp-plum/5">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEdit(member)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-ipp-plum/40 hover:bg-ipp-sky/10 hover:text-ipp-sky transition-all font-bold text-sm"
                      >
                        <Edit3 size={18} />
                        <span className="hidden md:inline">Editar</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(member.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-ipp-plum/40 hover:bg-ipp-coral/10 hover:text-ipp-coral transition-all font-bold text-sm"
                      >
                        <Trash2 size={18} />
                        <span className="hidden md:inline">Eliminar</span>
                      </button>
                    </div>
                    <ChevronRight className="text-ipp-plum/10 hidden sm:block" size={20} />
                  </div>
                </div>
              ))}

              {/* Manejo de Estado Vacío en Búsqueda */}
              {filteredMembers.length === 0 && (
                <div className="p-20 text-center">
                  <Search className="h-12 w-12 text-ipp-plum/10 mx-auto mb-4" />
                  <p className="text-ipp-plum/40 font-bold text-lg">
                    {searchTerm ? `No se encontraron resultados para "${searchTerm}"` : 'No hay integrantes en el equipo aún.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
