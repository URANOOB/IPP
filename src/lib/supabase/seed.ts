import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import { 
  principles, 
  methodSteps, 
  integrantes, 
  experiences,
  contactInfo,
  socialLinks
} from '../data'

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

  // 1. Cargar Principios
  console.log('📖 Cargando principios...')
  const principlesData = principles.map((p, i) => ({
    title: p.title,
    description: p.description,
    order_index: i
  }))
  
  const { error: pError } = await supabase.from('principles').upsert(principlesData)
  if (pError) console.error('  ⚠️ Error principios:', pError.message)
  else console.log('  ✅ Principios cargados.')

  // 2. Cargar Metodología
  console.log('🛤️ Cargando metodología...')
  const methodData = methodSteps.map((s, i) => ({
    title: s.title,
    summary: s.summary,
    items: s.items,
    keywords: s.keywords,
    order_index: i
  }))
  
  const { error: mError } = await supabase.from('methodology_steps').upsert(methodData)
  if (mError) console.error('  ⚠️ Error metodología:', mError.message)
  else console.log('  ✅ Metodología cargada.')

  // 3. Cargar Integrantes
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

  // 4. Experiencias
  console.log('🌟 Cargando experiencias...')
  const experiencesData = experiences.map((exp) => ({
    id: exp.id,
    title: exp.title,
    folder: exp.folder,
    eyebrow: exp.eyebrow,
    summary: exp.summary,
    description: exp.description,
    image: exp.image,
    icon_name: exp.icon_name,
    resource_folder: exp.resource_folder
  }))

  const { error: eError } = await supabase.from('experiences').upsert(experiencesData)
  if (eError) console.error('  ⚠️ Error experiencias:', eError.message)
  else console.log('  ✅ Experiencias cargadas.')

  // 5. Contenido de la Landing y Contacto
  console.log('🏠 Cargando contenido de la landing y contacto...')
  const landingContent = [
    { key: 'hero_title', content: 'Inglés Pa\' la Paz' },
    { key: 'hero_subtitle', content: 'Proyecto educativo y comunitario que construye puentes a través del idioma.' },
    { key: 'hero_description', content: 'Usamos relatos, diálogo y creación colectiva para que el inglés sea una herramienta de expresión en el territorio.' },
    { key: 'info_title', content: 'Inglés para la paz desde la lectura, la conversación y el territorio.' },
    { key: 'info_description', content: 'En Inglés Pa\' la Paz creamos experiencias de aprendizaje donde el inglés emerge desde la lectura, la conversación y la creación colectiva.' },
    { key: 'contact_email', content: contactInfo.email },
    { key: 'contact_tiktok', content: contactInfo.tiktok },
    { key: 'social_instagram', content: socialLinks.find(l => l.name === 'Instagram')?.href || '' },
  ]
  
  const { error: lError } = await supabase.from('landing_content').upsert(landingContent)
  if (lError) console.error('  ⚠️ Error contenido landing:', lError.message)
  else console.log('  ✅ Contenido de landing cargado.')

  console.log('\n✨ Proceso de carga finalizado.')
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log('💡 Nota: Si viste errores de RLS, asegúrate de añadir SUPABASE_SERVICE_ROLE_KEY a .env.local o desactivar RLS temporalmente.')
  }
}

seed().catch(err => {
  console.error('❌ Error fatal en el proceso de carga:', err)
  process.exit(1)
})
