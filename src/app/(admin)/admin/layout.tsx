/**
 * @file layout.tsx
 * @description Layout principal para la sección de administración.
 * Gestiona la protección de rutas (Auth), la recuperación del rol de usuario y la estructura de navegación lateral.
 */

import { AdminSidebar } from '@/components/layout/admin-sidebar'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Componente Layout de Administración.
 * 
 * Verificaciones de Seguridad:
 * 1. Comprueba si el usuario está autenticado. Si no, redirige a /login.
 * 2. Recupera el rol del perfil del usuario para personalizar la barra lateral.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido de la página administrativa.
 * @returns {Promise<JSX.Element>} Estructura de panel con sidebar y área de contenido.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Inicialización del cliente de Supabase y verificación de sesión
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Protección de ruta: Redirección inmediata si no hay una sesión activa
  if (!user) {
    return redirect('/login')
  }

  /**
   * Obtención del perfil de usuario.
   * Se requiere para determinar los permisos de visualización (ej: Admin vs Editor).
   */
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  return (
    <div className="flex min-h-screen bg-[#f8f9fa]">
      {/* Barra lateral de navegación con filtrado por rol */}
      <AdminSidebar userRole={profile?.role || 'viewer'} />
      
      {/* Área principal de contenido con scroll independiente */}
      <main className="flex-1 h-screen overflow-y-auto">
        <div className="p-10 max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
