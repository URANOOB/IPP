import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

async function mapEverything() {
  console.log('🔍 Auditoría de Base de Datos - Estado Actual\n')

  const tables = [
    'principles',
    'methodology_steps',
    'team_members',
    'experiences',
    'landing_content'
  ]

  for (const table of tables) {
    const { data, error, count } = await supabase.from(table).select('*', { count: 'exact' })
    
    if (error) {
      console.error(`❌ Tabla ${table}: ${error.message}`)
    } else {
      console.log(`✅ Tabla ${table}: ${count} registros.`)
      if (data && data.length > 0) {
        console.log(`   Columnas detectadas: ${Object.keys(data[0]).join(', ')}`)
      }
    }
  }
}

mapEverything()
