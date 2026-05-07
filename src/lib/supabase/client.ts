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
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
