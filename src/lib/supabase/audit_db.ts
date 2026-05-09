/**
 * @file audit_db.ts
 * @description Script de utilidad para auditar el estado de la base de datos de Supabase.
 * Escanea las tablas principales y reporta el conteo de registros y las columnas detectadas.
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Carga de variables de entorno locales
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
/** Se utiliza la Service Role Key para tener acceso total durante la auditoría. */
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Función principal que mapea el estado de las tablas.
 * Itera sobre una lista predefinida de tablas críticas del sistema.
 */
async function mapEverything() {
  console.log('🔍 Auditoría de Base de Datos - Estado Actual\n')

  const tables = [
    'profiles',
    'team_members',
    'blog_posts', // Corregido de 'posts' a 'blog_posts' según esquema actual
    'contact_messages'
  ]

  for (const table of tables) {
    const { data, count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: false })
      .limit(1)

    if (error) {
      console.log(`❌ Tabla ${table}: ${error.message}`)
    } else {
      console.log(`✅ Tabla ${table}: ${count} registros.`)
      if (data && data.length > 0) {
        console.log(`   Columnas detectadas: ${Object.keys(data[0]).join(', ')}`)
      }
    }
  }
}

mapEverything()
