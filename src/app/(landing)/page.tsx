/**
 * @file page.tsx
 * @description Página de inicio (Landing Page) del proyecto Inglés pa' la Paz.
 * 
 * Versión Estática: Los datos se cargan desde archivos locales (data.ts, styles.ts)
 * para máxima velocidad y simplicidad, manteniendo dinámicos solo el Equipo y Blog.
 */

import Header from "@/components/layout/header"
import Hero from "@/features/landing/components/hero"
import Footer from "@/components/layout/footer"
import Info from "@/features/landing/components/infoipp"
import Experiences from "@/features/landing/components/experiences"
import Integrantes from "@/features/landing/components/integrantes"
import Process from "@/features/landing/components/process"
import CTA from "@/features/landing/components/cta"
import { getTeamMembers } from "@/features/landing/actions"

export default async function Page() {
  // Solo cargamos el equipo de la DB, lo demás es estático
  const teamResult = await getTeamMembers()
  const team = teamResult.success && teamResult.data ? teamResult.data : []

  return (
    <main className="min-h-screen overflow-hidden bg-ipp-paper text-ipp-plum">
      {/* Navegación principal */}
      <Header />
      
      {/* Sección hero */}
      <Hero />
      
      {/* Información sobre el proyecto */}
      <Info />
      
      {/* Sección de experiencias */}
      <Experiences />
      
      {/* Explicación de la metodología */}
      <Process />
      
      {/* Presentación del equipo (Única sección dinámica) */}
      <Integrantes data={team} />
      
      {/* Llamado a la acción (Nueva sección) */}
      <CTA />

      {/* Pie de página */}
      <Footer />
    </main>
  )
}
