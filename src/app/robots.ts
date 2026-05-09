/**
 * @file robots.ts
 * @description Generador dinámico del archivo robots.txt para buscadores.
 * Define las reglas de rastreo y la ubicación del mapa del sitio (Sitemap).
 */

import type { MetadataRoute } from "next"

/** URL base del sitio, configurada vía variable de entorno para flexibilidad multi-entorno. */
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://inglespalapaz.com").replace(/\/$/, "")

/**
 * Función principal para generar la configuración de Robots.
 * Google y otros rastreadores consumen esta ruta virtual.
 * 
 * @returns {MetadataRoute.Robots} Configuración de reglas para rastreadores.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*", // Reglas aplicables a todos los rastreadores
        allow: "/",     // Permite el rastreo de todo el sitio público
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
