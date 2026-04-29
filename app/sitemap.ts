import type { MetadataRoute } from "next"

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://inglespalapaz.com").replace(/\/$/, "")

// Si el sitio sigue siendo una sola landing, basta con incluir la raíz.
// Cuando existan rutas reales como /metodologia, /experiencias o /equipo, se agregan aquí.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date("2026-04-29"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
