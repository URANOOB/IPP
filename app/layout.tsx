import type { Metadata } from "next"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"

const defaultSiteUrl = "https://inglespalapaz.com"

function getSiteUrl() {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl

  try {
    return new URL(rawSiteUrl).origin
  } catch {
    return defaultSiteUrl
  }
}

const siteUrl = getSiteUrl()

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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
