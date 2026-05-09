/**
 * @file page.tsx
 * @description Página principal del panel de administración (Dashboard).
 * Muestra un resumen del estado del proyecto, incluyendo estadísticas básicas de blog y equipo.
 */

import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'

/**
 * Componente de la página de Dashboard Admin.
 * Es un Server Component que recupera datos directamente de Supabase.
 * 
 * @returns {Promise<JSX.Element>} La vista de bienvenida y estadísticas del panel.
 */
export default async function AdminDashboardPage() {
  // Inicialización del cliente de Supabase (versión servidor)
  const supabase = await createClient()
  
  // Obtención del usuario actual desde la sesión
  const { data: { user } } = await supabase.auth.getUser()

  /**
   * Consultas rápidas para obtener conteos exactos de las tablas principales.
   * Se utiliza { head: true } para que Supabase solo retorne el conteo sin los datos.
   */
  const { count: blogCount } = await supabase.from('blog_posts').select('*', { count: 'exact', head: true })
  const { count: usersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true })

  return (
    <div className="space-y-10">
      {/* Encabezado de Bienvenida Personalizado */}
      <header>
        <p className="text-ipp-coral font-black uppercase tracking-widest text-xs mb-2">Vista General</p>
        <h1 className="text-4xl md:text-5xl font-display font-black text-ipp-plum">
          ¡Hola de nuevo, <span className="text-ipp-sky">{user?.user_metadata.full_name?.split(' ')[0] || 'Admin'}</span>!
        </h1>
        <p className="text-ipp-plum/40 font-semibold mt-2 text-lg">Aquí tienes el estado actual del proyecto.</p>
      </header>

      {/* Grid de Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tarjeta de Historias (Blog) */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-ipp-plum/5 shadow-sm space-y-4">
          <div className="h-12 w-12 bg-ipp-sky/10 rounded-2xl flex items-center justify-center text-ipp-sky">
            <span className="font-black text-xl">{blogCount || 0}</span>
          </div>
          <div>
            <h3 className="font-black text-ipp-plum text-lg">Historias</h3>
            <p className="text-sm text-ipp-plum/40 font-semibold">Entradas publicadas en el blog.</p>
          </div>
        </div>

        {/* Tarjeta de Equipo (Perfiles) */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-ipp-plum/5 shadow-sm space-y-4">
          <div className="h-12 w-12 bg-ipp-plum/10 rounded-2xl flex items-center justify-center text-ipp-plum">
            <span className="font-black text-xl">{usersCount || 0}</span>
          </div>
          <div>
            <h3 className="font-black text-ipp-plum text-lg">Equipo</h3>
            <p className="text-sm text-ipp-plum/40 font-semibold">Integrantes con acceso al panel.</p>
          </div>
        </div>
      </div>

      {/* Banner de Acceso Rápido a Creación de Contenido */}
      <div className="bg-ipp-plum p-10 rounded-[3rem] text-white relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <h2 className="text-3xl font-display font-black mb-4">¿Lista para compartir algo nuevo?</h2>
          <p className="text-ipp-sky font-semibold text-lg mb-8 opacity-80">Empieza a escribir una nueva historia sobre lo que está pasando en el territorio.</p>
          <a href="/admin/blog/new" className="inline-block bg-ipp-coral text-white px-8 py-3 rounded-2xl font-black shadow-xl hover:scale-105 transition-all">
            Redactar Historia
          </a>
        </div>
        
        {/* Marca de agua decorativa */}
        <div className="absolute top-0 right-0 h-full w-1/3 opacity-10 pointer-events-none">
            <Image 
              src="/images/ipp/logo_png3.png" 
              alt="" 
              fill 
              priority 
              className="object-contain translate-x-1/4 translate-y-1/4 scale-150 rotate-12" 
            />
        </div>
      </div>
    </div>
  )
}
