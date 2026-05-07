/**
 * @file server.ts
 * @description Configuración del cliente de Supabase para su uso en el servidor (Server Components y Server Actions).
 * Gestiona automáticamente las cookies para mantener la sesión del usuario.
 */

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Crea una instancia del cliente de Supabase optimizada para el servidor.
 * Esta función es asíncrona ya que necesita acceder a las cookies de la solicitud.
 * 
 * @returns {Promise<ReturnType<typeof createServerClient>>} El cliente de Supabase para el backend.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /**
         * Obtiene todas las cookies disponibles en la solicitud actual.
         */
        getAll() {
          return cookieStore.getAll()
        },
        /**
         * Establece las cookies necesarias para la sesión.
         * En Server Components, este método puede fallar si la respuesta ya se ha empezado a enviar,
         * lo cual es normal y suele gestionarse mediante middleware.
         */
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Este método fue llamado desde un Server Component.
            // Se puede ignorar si se tiene un middleware que refresque las sesiones.
          }
        },
      },
    }
  )
}
