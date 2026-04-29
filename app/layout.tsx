import type { Metadata } from "next"
import "./globals.css"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
