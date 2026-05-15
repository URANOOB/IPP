/**
 * @file admin-sidebar.tsx
 * @description Componente de barra lateral (Sidebar) para el panel de administración.
 * Gestiona la navegación interna del dashboard y filtra accesos según el rol del usuario.
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  LogOut,
  Shield,
  ChevronRight,
  Mail
} from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

/** Definición de los elementos del menú administrativo. */
const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Mensajes', href: '/admin/messages', icon: Mail },
  { name: 'Historias (Blog)', href: '/admin/blog', icon: BookOpen },
  { name: 'Equipo', href: '/admin/team', icon: Users },
  { name: 'Usuarios', href: '/admin/users', icon: Shield },
]

/**
 * Componente AdminSidebar.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.userRole='viewer'] - El rol del usuario actual para control de acceso.
 * @returns {JSX.Element} La barra lateral de navegación administrativa.
 */
export function AdminSidebar({ userRole = 'viewer' }: { userRole?: string }) {
  const pathname = usePathname()

  // Lógica de filtrado de ítems del menú basada en permisos de rol
  const visibleMenuItems = menuItems.filter(item => {
    // Solo los administradores pueden ver la gestión de usuarios
    if (item.href === '/admin/users' && userRole !== 'admin') return false
    return true
  })

  return (
    <aside className="w-72 bg-ipp-plum min-h-screen flex flex-col sticky top-0 border-r border-white/5 shadow-2xl">
      {/* Cabecera del Sidebar: Logo e Identificación */}
      <div className="p-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl shadow-inner">
            <Image 
              src="/images/ipp/logo_png3.png" 
              alt="Logo Administrativo IPP" 
              width={48} 
              height={32} 
              priority
              style={{ width: '48px', height: 'auto' }}
            />
          </div>
          <span className="text-white font-display font-black text-xl tracking-tight">ADMIN IPP</span>
        </div>
      </div>

      {/* Menú de Navegación Principal */}
      <nav className="flex-1 p-6 space-y-2">
        <p className="text-white/30 text-[0.65rem] font-black uppercase tracking-[0.2em] px-4 mb-4">Menú Principal</p>
        {visibleMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300",
                isActive 
                  ? "bg-ipp-coral text-white shadow-lg shadow-ipp-coral/20" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={cn(isActive ? "text-white" : "text-ipp-sky")} />
                <span className="font-bold text-sm">{item.name}</span>
              </div>
              {isActive && <ChevronRight size={16} className="text-white/50" />}
            </Link>
          )
        })}
      </nav>

      {/* Pie del Sidebar: Acción de Cierre de Sesión */}
      <div className="p-6 border-t border-white/5 bg-black/5">
        <form action="/auth/signout" method="post">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-white/40 hover:bg-red-500/10 hover:text-red-400 transition-all font-bold text-sm">
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </form>
      </div>
    </aside>
  )
}
