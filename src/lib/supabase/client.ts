/**
 * @file client.ts
 * @description Configuración del cliente de Supabase para su uso en el navegador (Client Components).
 */

import { createBrowserClient } from '@supabase/ssr'

/**
 * Crea una instancia del cliente de Supabase optimizada para el navegador.
 * Utiliza las variables de entorno públicas para la autenticación y conexión.
 * 
 * @returns {ReturnType<typeof createBrowserClient>} El cliente de Supabase para el frontend.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Durante el build de Next.js (prerendering), estas variables pueden no estar presentes.
    // Retornamos un objeto que imite la interfaz o simplemente dejamos que falle en runtime
    // pero evitamos el crash inmediato si no se usa.
    if (typeof window === 'undefined') {
      return {} as ReturnType<typeof createBrowserClient>
    }
    throw new Error('Las variables de entorno de Supabase son obligatorias en el cliente.')
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
