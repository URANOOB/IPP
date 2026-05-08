/**
 * @file layout.tsx
 * @description Layout raíz de la aplicación Next.js 15.
 * Este archivo define la estructura base del HTML, incluyendo metadatos globales,
 * configuración de SEO, integración de analíticas y fuentes.
 */

import type { Metadata } from "next"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const defaultSiteUrl = "https://inglespalapaz.com"

/**
 * Obtiene la URL base del sitio de forma segura.
 * 
 * @returns {string} La URL de origen del sitio basada en variables de entorno o un valor por defecto.
 */
function getSiteUrl() {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl

  try {
    return new URL(rawSiteUrl).origin
  } catch {
    return defaultSiteUrl
  }
}

const siteUrl = getSiteUrl()

/**
 * Configuración de metadatos globales para SEO y redes sociales.
 * Define títulos, descripciones, palabras clave y configuración de OpenGraph/Twitter.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Inglés pa' la Paz | Lectura, territorio y construcción de paz en Colombia",
    template: "%s | Inglés pa' la Paz",
  },

  description:
    "Inglés pa' la Paz es un proyecto educativo y comunitario en Colombia que une lectura, territorio y construcción de paz a través del aprendizaje del inglés.",

  keywords: [
    "inglés para la paz",
    "educación para la paz",
    "aprendizaje del inglés",
    "inglés comunitario",
    "lectura y territorio",
    "construcción de paz",
    "proyecto educativo en Colombia",
    "aprendizaje intercultural",
    "impacto social",
    "comunidad y educación"
  ],

  authors: [{ name: "Inglés pa' la Paz" }],
  creator: "Inglés pa' la Paz",
  publisher: "Inglés pa' la Paz",
  category: "education",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      {
        url: "/favicon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/favicon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    shortcut: ["/favicon.png"],
  },

  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: "Inglés pa' la Paz",
    title: "Inglés pa' la Paz | Lectura, territorio y construcción de paz en Colombia",
    description:
      "Proyecto educativo y comunitario en Colombia que une lectura, territorio y construcción de paz a través del aprendizaje del inglés.",
    images: [
      {
        url: "/images/ipp/logo-ingles-pa-la-paz.png",
        width: 874,
        height: 871,
        alt: "Logo de Inglés pa' la Paz",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Inglés pa' la Paz | Lectura, territorio y construcción de paz en Colombia",
    description:
      "Proyecto educativo y comunitario en Colombia que une lectura, territorio y construcción de paz a través del aprendizaje del inglés.",
    images: ["/images/ipp/logo-ingles-pa-la-paz.png"],
    creator: "@inglespalapaz",
  },
}

/**
 * Componente RootLayout que envuelve todas las páginas del sitio.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - El contenido dinámico de las páginas.
 * @returns {JSX.Element} El esquema HTML base de la aplicación.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  /**
   * Genera los datos estructurados JSON-LD para mejorar el SEO y la visibilidad en motores de búsqueda.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Inglés pa' la Paz",
        url: siteUrl,
        logo: `${siteUrl}/images/ipp/logo-ingles-pa-la-paz.png`,
        description:
          "Proyecto educativo y comunitario en Colombia que une lectura, territorio y construcción de paz a través del aprendizaje del inglés.",
      },
      {
        "@type": "WebSite",
        name: "Inglés pa' la Paz",
        url: siteUrl,
        inLanguage: "es-CO",
      },
    ],
  }

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights/>
      </body>
    </html>
  )
}
