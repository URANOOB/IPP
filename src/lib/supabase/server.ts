/**
 * @file server.ts
 * @description Configuración del cliente de Supabase para su uso en el servidor (Server Components y Server Actions).
 * Gestiona automáticamente las cookies para mantener la sesión del usuario.
 */

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * Crea una instancia del cliente de Supabase optimizada para el servidor.
 * 
 * @returns {Promise<ReturnType<typeof createServerClient>>} El cliente de Supabase configurado.
 */
export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Evitar que el build falle por falta de variables si no se está ejecutando en runtime real.
    // Durante el build (static generation), permitimos un fallback silencioso.
    return createServerClient(
      supabaseUrl || 'http://placeholder',
      supabaseAnonKey || 'placeholder',
      {
        cookies: {
          getAll() { return [] },
          setAll() { }
        }
      }
    )
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
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
         * 
         * @param {Array} cookiesToSet - Lista de cookies a establecer.
         */
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Este método fue llamado desde un Server Component.
          }
        },
      },
    }
  )
}
