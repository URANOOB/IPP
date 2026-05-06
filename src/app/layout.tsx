/**
 * ROOT LAYOUT - El archivo principal de la estructura HTML.
 * 
 * Este componente envuelve a todas las páginas de la aplicación.
 * Define el idioma, los metadatos globales (SEO), fuentes y scripts base.
 */

import type { Metadata } from "next"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"

const defaultSiteUrl = "https://inglespalapaz.com"

/**
 * Determina la URL base del sitio para metadatos y SEO.
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
 * CONFIGURACIÓN DE SEO (Metadatos Globales)
 * Aquí se definen los títulos, descripciones y cómo aparecerá el sitio en redes sociales.
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  /**
   * JSON-LD: Datos estructurados para que Google entienda mejor de qué trata la organización.
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
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* 'children' representa el contenido de la página actual */}
        {children}
        
        {/* Vercel Analytics para métricas de tráfico */}
        <Analytics />
      </body>
    </html>
  )
}
