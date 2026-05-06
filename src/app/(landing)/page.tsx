/**
 * LANDING PAGE - La página de inicio del sitio.
 * 
 * Esta es una Server Component que obtiene el contenido dinámico desde Supabase
 * y lo inyecta en los componentes de la interfaz.
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

  // Extraemos los datos o usamos arrays vacíos como fallback
  const content = contentResult.success && contentResult.data ? contentResult.data : {}
  const team = teamResult.success && teamResult.data ? teamResult.data : []
  const principles = principlesResult.success && principlesResult.data ? principlesResult.data : []
  const methodology = methodologyResult.success && methodologyResult.data ? methodologyResult.data : []
  const experiences = experiencesResult.success && experiencesResult.data ? experiencesResult.data : []

  return (
    <main className="min-h-screen overflow-hidden bg-ipp-paper text-ipp-plum">
      {/* Componentes de la interfaz con datos dinámicos */}
      <Header />
      
      <Hero dynamicContent={content} />
      
      <Info dynamicContent={content} principles={principles} />
      <Experiences data={experiences} />
      <Process data={methodology} />
      <Integrantes data={team} />
      <Footer />
    </main>
  )
}
