"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Info from "@/components/infoipp"
import Experiences from "@/components/experiences"
import Integrantes from "@/components/Integrantes"
import Process from "@/components/process"

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--ipp-paper)] text-[var(--ipp-plum)]">
      {/* Orden de lectura de la landing: presentación, proyecto, experiencias, método, equipo y contacto. */}
      <Header />
      <Info />
      <Experiences />
      <Process />
      <Integrantes />
      <Footer />
    </main>
  )
}
