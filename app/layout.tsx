import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Info from "@/components/infoipp"
import Experiences from "@/components/experiences"
import Integrantes from "@/components/Integrantes"
import Process from "@/components/process"

export const metadata: Metadata = {
  title: "Inglés pa' la Paz | Educación, territorio y construcción de paz en Colombia",
  description:
    "Conoce Inglés pa' la Paz, un proyecto educativo y comunitario en Colombia que une lectura, territorio y construcción de paz a través del aprendizaje del inglés.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Inglés pa' la Paz | Educación, territorio y construcción de paz en Colombia",
    description:
      "Proyecto educativo y comunitario en Colombia que une lectura, territorio y construcción de paz a través del aprendizaje del inglés.",
    url: "/",
    type: "website",
  },
  twitter: {
    title: "Inglés pa' la Paz | Educación, territorio y construcción de paz en Colombia",
    description:
      "Proyecto educativo y comunitario en Colombia que une lectura, territorio y construcción de paz a través del aprendizaje del inglés.",
  },
}

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--ipp-paper)] text-[var(--ipp-plum)]">
      <Header />

      <section id="informacion-del-proyecto" aria-labelledby="info-heading">
        <Info />
      </section>

      <section id="experiencias" aria-labelledby="experiencias-heading">
        <Experiences />
      </section>

      <section id="metodologia" aria-labelledby="metodologia-heading">
        <Process />
      </section>

      <section id="integrantes" aria-labelledby="integrantes-heading">
        <Integrantes />
      </section>

      <Footer />
    </main>
  )
}
