/**
 * @file seed.ts
 * @description Script de carga de datos iniciales (Seeding) sin borrado previo.
 * Utiliza la lógica de 'upsert' para actualizar registros existentes o crear nuevos
 * basándose en la lista de integrantes definida en el código fuente.
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { integrantes } from '../data'

// Inicialización de variables de entorno
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
/** Se prioriza la SERVICE_ROLE_KEY para asegurar permisos de escritura totales. */
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Credenciales de Supabase no detectadas en .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Procesa la carga de datos del equipo.
 * Convierte los objetos de 'data.ts' al formato relacional de Supabase.
 */
async function seed() {
  console.log('🚀 Iniciando carga incremental de datos...')

  console.log('👥 Procesando integrantes del equipo...')
  
  const teamData = integrantes.map((m, i) => ({
    name: m.name,
    role: m.role,
    focus: m.focus,
    photo_url: m.photo_url || null,
    order_index: i
  }))
  
  /**
   * Carga mediante UPSERT.
   * Si el nombre ya existe (asumiendo restricción única o lógica de match), se actualiza.
   */
  const { error: tError } = await supabase.from('team_members').upsert(teamData, { onConflict: 'name' })
  
  if (tError) {
    console.error('  ⚠️ Error al procesar integrantes:', tError.message)
  } else {
    console.log('  ✅ Sincronización de integrantes completada.')
  }

  console.log('\n✨ Proceso de carga finalizado con éxito.')
}

// Punto de entrada del script
seed().catch(err => {
  console.error('❌ Error crítico en el proceso de seeding:', err)
  process.exit(1)
})
