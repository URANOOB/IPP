/**
 * @file reset_db.ts
 * @description Script de limpieza y carga inicial de la base de datos.
 * ATENCIÓN: Este script elimina todos los registros de la tabla 'team_members' 
 * antes de recargarlos desde el archivo 'data.ts'.
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { integrantes } from '../data'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Verificación estricta de credenciales administrativas
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY es requerida para resetear la base de datos.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

/**
 * Vacía las tablas configuradas y realiza el seeding inicial.
 */
async function resetAndSeed() {
  console.log('🧹 Limpiando base de datos (Equipo)...')

  const tables = [
    { name: 'team_members', pk: 'id' }
  ]

  for (const table of tables) {
    console.log(`   Vaciando tabla "${table.name}"...`)
    // Borrado masivo (filtro: id no es nulo)
    const { error } = await supabase.from(table.name).delete().not(table.pk, 'is', null)
    if (error) {
      console.error(`   ⚠️ Error vaciando ${table.name}:`, error.message)
    }
  }

  console.log('\n🚀 Cargando equipo desde data.ts...')

  /** Mapeo de datos locales al esquema de la base de datos. */
  const teamData = integrantes.map((m, i) => ({
    name: m.name,
    role: m.role,
    focus: m.focus,
    photo_url: m.photo_url || null,
    order_index: i
  }))
  
  const { error: iError } = await supabase.from('team_members').insert(teamData)
  
  if (iError) {
    console.error('  ❌ Error cargando integrantes:', iError.message)
  } else {
    console.log('  ✅ Integrantes cargados con éxito.')
  }

  console.log('\n✨ ¡Proceso de reseteo completado!')
}

// Ejecución controlada con manejo de errores fatales
resetAndSeed().catch(err => {
  console.error('❌ Error fatal en el reset:', err)
  process.exit(1)
})
