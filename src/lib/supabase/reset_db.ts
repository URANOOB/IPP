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

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY es requerida para resetear la base de datos.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function resetAndSeed() {
  console.log('🧹 Limpiando base de datos (Eliminando registros actuales)...')

  const tables = [
    { name: 'principles', pk: 'id' },
    { name: 'methodology_steps', pk: 'id' },
    { name: 'team_members', pk: 'id' },
    { name: 'experiences', pk: 'id' },
    { name: 'landing_content', pk: 'key' }
  ]

  for (const table of tables) {
    console.log(`   Vaciando tabla "${table.name}"...`)
    const { error } = await supabase.from(table.name).delete().not(table.pk, 'is', null)
    if (error) {
      console.error(`   ⚠️ Error vaciando ${table.name}:`, error.message)
    }
  }

  console.log('\n🚀 Iniciando carga limpia de datos...')

  // 1. Principios
  const principlesData = principles.map((p, i) => ({
    title: p.title,
    description: p.description,
    order_index: i
  }))
  await supabase.from('principles').insert(principlesData)
  console.log('  ✅ Principios cargados.')

  // 2. Metodología
  const methodData = methodSteps.map((s, i) => ({
    title: s.title,
    summary: s.summary,
    items: s.items,
    keywords: s.keywords,
    order_index: i
  }))
  await supabase.from('methodology_steps').insert(methodData)
  console.log('  ✅ Metodología cargada.')

  // 3. Integrantes
  const teamData = integrantes.map((m, i) => ({
    name: m.name,
    role: m.role,
    focus: m.focus,
    photo_url: m.photo_url || null,
    order_index: i
  }))
  await supabase.from('team_members').insert(teamData)
  console.log('  ✅ Integrantes cargados.')

  // 4. Experiencias
  const experiencesData = experiences.map((exp) => ({
    id: exp.id,
    title: exp.title,
    folder: exp.folder,
    eyebrow: exp.eyebrow,
    summary: exp.summary,
    description: exp.description,
    image: exp.image,
    resource_folder: exp.resource_folder
  }))
  await supabase.from('experiences').insert(experiencesData)
  console.log('  ✅ Experiencias cargadas.')

  // 5. Contenido Landing
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
  await supabase.from('landing_content').insert(landingContent)
  console.log('  ✅ Contenido de landing cargado.')

  console.log('\n✨ ¡Base de datos reseteada y cargada con éxito!')
}

resetAndSeed().catch(err => {
  console.error('❌ Error fatal:', err)
  process.exit(1)
})
