import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { integrantes } from '../data'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY es requerida para resetear la base de datos.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function resetAndSeed() {
  console.log('🧹 Limpiando base de datos (Equipo)...')

  const tables = [
    { name: 'team_members', pk: 'id' }
  ]

  for (const table of tables) {
    console.log(`   Vaciando tabla "${table.name}"...`)
    const { error } = await supabase.from(table.name).delete().not(table.pk, 'is', null)
    if (error) {
      console.error(`   ⚠️ Error vaciando ${table.name}:`, error.message)
    }
  }

  console.log('\n🚀 Cargando equipo desde data.ts...')

  const teamData = integrantes.map((m, i) => ({
    name: m.name,
    role: m.role,
    focus: m.focus,
    photo_url: m.photo_url || null,
    order_index: i
  }))
  
  await supabase.from('team_members').insert(teamData)
  console.log('  ✅ Integrantes cargados.')

  console.log('\n✨ ¡Base de datos reseteada con éxito!')
}

resetAndSeed().catch(err => {
  console.error('❌ Error fatal:', err)
  process.exit(1)
})
