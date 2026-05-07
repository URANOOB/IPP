'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Settings, 
  Users, 
  LogOut,
  Shield,
  ChevronRight
} from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Historias (Blog)', href: '/admin/blog', icon: BookOpen },
  { name: 'Equipo', href: '/admin/team', icon: Users },
  { name: 'Calendario', href: '/admin/events', icon: Calendar },
  { name: 'Contenido Web', href: '/admin/content', icon: Settings },
  { name: 'Usuarios', href: '/admin/users', icon: Shield },
]

export function AdminSidebar({ userRole = 'viewer' }: { userRole?: string }) {
  const pathname = usePathname()

  // Filtrar ítems del menú según el rol
  const visibleMenuItems = menuItems.filter(item => {
    if (item.href === '/admin/users' && userRole !== 'admin') return false
    return true
  })

  return (
    <aside className="w-72 bg-ipp-plum min-h-screen flex flex-col sticky top-0">
      {/* Header del Sidebar */}
      <div className="p-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="bg-white p-2 rounded-xl">
            <Image 
              src="/images/ipp/logo_png3.png" 
              alt="Logo" 
              width={48} 
              height={32} 
              priority
              style={{ height: 'auto' }}
            />
          </div>
          <span className="text-white font-display font-black text-xl tracking-tight">ADMIN IPP</span>
        </div>
      </div>

      {/* Menú de Navegación */}
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

      {/* Footer del Sidebar (Sign Out) */}
      <div className="p-6 border-t border-white/5">
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
