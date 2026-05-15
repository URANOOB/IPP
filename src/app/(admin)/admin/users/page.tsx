/**
 * @file users/page.tsx
 * @description Panel de gestión de usuarios y roles de acceso.
 * Permite a los administradores visualizar los perfiles registrados y asignar permisos (Admin, Editor, Lector).
 */

'use client'

import { useEffect, useState } from 'react'
import { getProfiles, updateUserRole, getCurrentProfile, type UserProfile } from '@/features/admin/users/actions'
import { getTeamMembersAdmin } from '@/features/admin/team/actions'
import type { Integrante } from '@/types/landing'
import { UserRound, Mail, Loader2, Check, UserCheck, Search, X } from 'lucide-react'
import Image from 'next/image'

/**
 * Componente de la página de Usuarios (Admin).
 * Realiza la orquestación de datos entre perfiles de autenticación e integrantes del equipo.
 * 
 * @returns {JSX.Element} Vista de tabla con gestión de permisos.
 */
export default function UsersPage() {
  // --- Estados de Datos ---
  const [profiles, setProfiles] = useState<UserProfile[]>([])
  const [teamMembers, setTeamMembers] = useState<Integrante[]>([])
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null)
  
  // --- Estados de UI ---
  const [isLoading, setIsLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  /**
   * Carga masiva de datos necesarios para la gestión de usuarios.
   * 
   * @param {boolean} [forceLoading=false] - Indica si se debe mostrar el estado de carga inicial.
   */
  const fetchData = async (forceLoading = false) => {
    if (forceLoading) setIsLoading(true)
    const [profilesRes, teamRes, currentRes] = await Promise.all([
      getProfiles(),
      getTeamMembersAdmin(),
      getCurrentProfile()
    ])

    if (profilesRes.success) setProfiles(profilesRes.data || [])
    if (teamRes.success) setTeamMembers(teamRes.data || [])
    if (currentRes.success) setCurrentUser(currentRes.data ?? null)
    setIsLoading(false)
  }

  /** Inicialización de la página */
  useEffect(() => {
    const initFetch = async () => {
      await fetchData()
    }
    initFetch()
  }, [])

  /**
   * Cambia el rol de acceso de un usuario.
   * Solo los usuarios con rol 'admin' tienen permiso para realizar esta acción.
   * 
   * @param {string} userId - UUID del usuario a modificar.
   * @param {string} newRole - El nuevo identificador de rol.
   */
  const handleRoleChange = async (userId: string, newRole: UserProfile['role']) => {
    if (currentUser?.role !== 'admin') {
      alert('Solo los administradores pueden cambiar roles.')
      return
    }

    setUpdatingId(userId)
    const result = await updateUserRole(userId, newRole)
    if (result.success) {
      // Actualización local para feedback inmediato en la tabla
      setProfiles(profiles.map(p => p.id === userId ? { ...p, role: newRole } : p))
    } else {
      alert('Error al actualizar rol: ' + result.error)
    }
    setUpdatingId(null)
  }

  const isAdmin = currentUser?.role === 'admin'

  /** Filtrado reactivo de perfiles por nombre o correo */
  const filteredProfiles = profiles.filter(profile => {
    const fullName = (profile.full_name || '').toLowerCase()
    const email = (profile.email || '').toLowerCase()
    const search = searchTerm.toLowerCase()
    return fullName.includes(search) || email.includes(search)
  })

  // Pantalla de carga inicial
  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 text-ipp-coral animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {/* Cabecera del Panel de Seguridad */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-ipp-coral font-black uppercase tracking-widest text-xs mb-2">Seguridad y Equipo</p>
          <h1 className="text-4xl md:text-5xl font-display font-black text-ipp-plum">Gestión de Usuarios</h1>
          <p className="text-ipp-plum/40 font-semibold mt-2 text-lg">Controla quiénes tienen acceso al panel de administración.</p>
        </div>

        {/* Buscador de Usuarios */}
        <div className="relative group w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ipp-plum/20 group-focus-within:text-ipp-coral transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-ipp-plum/5 rounded-2xl py-3 pl-12 pr-10 text-ipp-plum font-semibold placeholder:text-ipp-plum/20 focus:outline-none focus:ring-2 focus:ring-ipp-coral/10 focus:border-ipp-coral/20 transition-all shadow-sm"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-ipp-plum/20 hover:text-ipp-plum transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </header>

      {/* Tabla de Usuarios Registrados */}
      <div className="bg-white rounded-[3rem] border border-ipp-plum/5 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-ipp-plum/5 text-ipp-plum/40 text-[0.65rem] font-black uppercase tracking-widest">
              <th className="px-8 py-6">Usuario</th>
              <th className="px-8 py-6">Estado en Equipo</th>
              <th className="px-8 py-6">Rol de Acceso</th>
              <th className="px-8 py-6 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ipp-plum/5">
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((profile) => {
                /**
                 * LÓGICA DE VINCULACIÓN:
                 * Se marca un usuario como "Integrante" si su correo o nombre coincide con 
                 * algún registro en la tabla de 'team_members'.
                 */
                const isTeamMember = teamMembers.some(m => 
                  (m.email && profile.email && m.email.toLowerCase() === profile.email.toLowerCase()) ||
                  (m.name.toLowerCase() === profile.full_name?.toLowerCase())
                )

                return (
                  <tr key={profile.id} className="group hover:bg-ipp-cream/20 transition-colors">
                    {/* Celda de Usuario */}
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden bg-ipp-paper border-2 border-white shadow-sm">
                          {profile.avatar_url ? (
                            <Image src={profile.avatar_url} alt="" fill className="object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-ipp-plum">
                              <UserRound size={20} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-black text-ipp-plum">{profile.full_name || 'Sin nombre'}</p>
                          <p className="text-xs text-ipp-plum/40 font-bold flex items-center gap-1">
                            <Mail size={12} /> {profile.email || 'Email no vinculado'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Indicador de Pertenencia al Equipo */}
                    <td className="px-8 py-6">
                      {isTeamMember ? (
                        <div className="flex items-center gap-2 text-ipp-green font-bold text-xs uppercase tracking-wider">
                          <UserCheck size={14} />
                          Integrante
                        </div>
                      ) : (
                        <span className="text-ipp-plum/20 text-xs font-bold uppercase tracking-wider italic">Externo</span>
                      )}
                    </td>

                    {/* Selector de Roles (Solo editable por Admins) */}
                    <td className="px-8 py-6">
                      <select
                        value={profile.role || 'editor'}
                        onChange={(e) => handleRoleChange(profile.id, e.target.value as UserProfile['role'])}
                        disabled={updatingId === profile.id || !isAdmin}
                        title={!isAdmin ? 'Solo los administradores pueden cambiar roles' : ''}
                        className="bg-ipp-sky/10 text-ipp-sky text-[0.65rem] font-black uppercase tracking-wider px-4 py-1.5 rounded-full border-none focus:ring-2 focus:ring-ipp-sky/20 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="admin">Administrador</option>
                        <option value="editor">Editor</option>
                        <option value="viewer">Lector</option>
                      </select>
                    </td>

                    {/* Columna de Feedback / Guardado */}
                    <td className="px-8 py-6 text-right">
                      {updatingId === profile.id ? (
                        <Loader2 className="h-4 w-4 animate-spin text-ipp-coral ml-auto" />
                      ) : (
                        <span 
                          title={!isAdmin ? 'Sin permisos' : 'Cambio guardado automáticamente'}
                          className={`transition-colors ${isAdmin ? 'text-ipp-plum/10 group-hover:text-ipp-green' : 'text-ipp-plum/5'}`}
                        >
                          <Check size={18} />
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })
            ) : (
              /* Estado sin resultados en la búsqueda */
              <tr>
                <td colSpan={4} className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center gap-3 text-ipp-plum/30">
                    <Search size={40} strokeWidth={1} />
                    <p className="font-bold">No se encontraron usuarios que coincidan con tu búsqueda.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Información Complementaria */}
      <div className="bg-ipp-yellow/10 border-2 border-dashed border-ipp-yellow/30 p-8 rounded-[2.5rem] space-y-4">
        <h3 className="text-ipp-plum font-black text-lg">💡 Notas importantes</h3>
        <ul className="text-ipp-plum/70 font-semibold text-sm space-y-2">
          <li>• Para que un usuario aparezca aquí, debe registrarse primero en la plataforma.</li>
          <li>• Si un usuario es **Integrante** del equipo, se marcará automáticamente si coincide el nombre.</li>
          <li>• Los **Administradores** tienen control total, los **Editores** pueden crear historias y los **Lectores** solo ver el panel.</li>
        </ul>
      </div>
    </div>
  )
}
