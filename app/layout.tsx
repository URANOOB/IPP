import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Ingles pa' la Paz",
  description: "Lectura, territorio y construccion de paz a traves del ingles.",
  generator: 'dev',
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
      <body>{children}</body>
    </html>
  )
}
