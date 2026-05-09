/**
 * @file sitemap.ts
 * @description Generador dinámico del mapa del sitio (Sitemap XML).
 * Ayuda a los motores de búsqueda a indexar correctamente las páginas del proyecto.
 */

import type { MetadataRoute } from "next"

/** URL base del sitio, configurada vía variable de entorno. */
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://inglespalapaz.com").replace(/\/$/, "")

/**
 * Función principal para generar el Sitemap.
 * 
 * TODO: En el futuro, se deben incluir dinámicamente las rutas del Blog (/blog/[slug])
 * realizando una consulta a la base de datos de Supabase.
 * 
 * @returns {MetadataRoute.Sitemap} Lista de URLs con metadatos de rastreo.
 */
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
