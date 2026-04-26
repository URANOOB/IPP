import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://inglespalapaz.com/"),
  title: {
    default: "Ingles pa' la Paz",
    template: "%s | Ingles pa' la Paz",
  },
  description: "Lectura, territorio y construccion de paz a traves del ingles.",
  keywords: [
    "Ingles",
    "learning",
    "education",
    "peace",
    "territorio",
    "Colombia",
    "Free english",
    "Paz",
    "Aprendizaje"
  ],
  authors: [{ name: "Ingles pa' la Paz" }],
  creator: "Ingles pa' la Paz",
  publisher: "Ingles pa' la Paz",
  robots: {
    index: true,
    follow: true,
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
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: "Ingles pa' la Paz",
    title: "Ingles pa' la Paz",
    description: "Lectura, territorio y construccion de paz a traves del ingles.",
    images: [
      {
        url: "/images/ipp/logo-ingles-pa-la-paz.png",
        width: 874,
        height: 871,
        alt: "Logo de Ingles pa' la Paz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ingles pa' la Paz",
    description: "Lectura, territorio y construccion de paz a traves del ingles.",
    images: ["/images/ipp/logo-ingles-pa-la-paz.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <style>{`
html {
  font-family: "Trebuchet MS", "Arial Rounded MT Bold", system-ui, sans-serif;
  --font-sans: "Trebuchet MS", "Arial Rounded MT Bold", system-ui, sans-serif;
  --font-mono: "Fira Code", Consolas, monospace;
}
        `}</style>
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
