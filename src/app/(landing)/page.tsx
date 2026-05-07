/**
 * @file page.tsx
 * @description Página de inicio (Landing Page) del proyecto Inglés pa' la Paz.
 * 
 * Este componente es un Server Component de Next.js que se encarga de:
 * 1. Obtener datos dinámicos desde Supabase (contenido, equipo, principios, metodología y experiencias).
 * 2. Orquestar la visualización de las diferentes secciones de la landing page.
 * 3. Proveer fallbacks seguros en caso de que la carga de datos falle.
 */

import Header from "@/components/layout/header"
import Hero from "@/features/landing/components/hero"
import Footer from "@/components/layout/footer"
import Info from "@/features/landing/components/infoipp"
import Experiences from "@/features/landing/components/experiences"
import Integrantes from "@/features/landing/components/integrantes"
import Process from "@/features/landing/components/process"
import { 
  getLandingContent, 
  getTeamMembers, 
  getPrinciples, 
  getMethodology,
  getExperiences
} from "@/features/landing/actions"

/**
 * Componente principal de la Landing Page.
 * Utiliza Promise.all para realizar múltiples consultas a la base de datos en paralelo,
 * optimizando el tiempo de carga del lado del servidor.
 * 
 * @returns {Promise<JSX.Element>} La página de inicio renderizada con datos dinámicos.
 */
export default async function Page() {
  // Obtenemos todos los datos dinámicos en paralelo para mayor velocidad
  const [
    contentResult, 
    teamResult, 
    principlesResult, 
    methodologyResult,
    experiencesResult
  ] = await Promise.all([
    getLandingContent(),
    getTeamMembers(),
    getPrinciples(),
    getMethodology(),
    getExperiences()
  ])

  // Extraemos los datos o usamos arrays/objetos vacíos como fallback si la consulta falla
  const content = contentResult.success && contentResult.data ? contentResult.data : {}
  const team = teamResult.success && teamResult.data ? teamResult.data : []
  const principles = principlesResult.success && principlesResult.data ? principlesResult.data : []
  const methodology = methodologyResult.success && methodologyResult.data ? methodologyResult.data : []
  const experiences = experiencesResult.success && experiencesResult.data ? experiencesResult.data : []

  return (
    <main className="min-h-screen overflow-hidden bg-ipp-paper text-ipp-plum">
      {/* Navegación principal */}
      <Header />
      
      {/* Sección hero con mensaje principal */}
      <Hero dynamicContent={content} />
      
      {/* Información sobre el proyecto y sus principios */}
      <Info dynamicContent={content} principles={principles} />
      
      {/* Sección de experiencias destacadas */}
      <Experiences data={experiences} />
      
      {/* Explicación de la metodología o proceso */}
      <Process data={methodology} />
      
      {/* Presentación del equipo de trabajo */}
      <Integrantes data={team} />
      
      {/* Pie de página con enlaces y contacto */}
      <Footer />
    </main>
  )
}
