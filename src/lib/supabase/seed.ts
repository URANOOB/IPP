import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { integrantes } from '../data'

// Cargar variables de entorno
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
// Priorizar SERVICE_ROLE_KEY para saltar RLS en modo seeding
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Faltan variables de entorno de Supabase (URL o KEY).')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seed() {
  console.log('🚀 Iniciando carga de datos a Supabase...')

  // Cargar Integrantes (Única sección dinámica de la landing)
  console.log('👥 Cargando integrantes...')
  const teamData = integrantes.map((m, i) => ({
    name: m.name,
    role: m.role,
    focus: m.focus,
    photo_url: m.photo_url || null,
    order_index: i
  }))
  
  const { error: tError } = await supabase.from('team_members').upsert(teamData)
  if (tError) console.error('  ⚠️ Error integrantes:', tError.message)
  else console.log('  ✅ Integrantes cargados.')

  console.log('\n✨ Proceso de carga finalizado.')
}

seed().catch(err => {
  console.error('❌ Error fatal en el proceso de carga:', err)
  process.exit(1)
})
