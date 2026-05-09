/**
 * @file route.ts
 * @description Ruta de la API para obtener recursos de imágenes de forma dinámica.
 * Lee los archivos de una carpeta específica dentro de 'public/images/ipp' y los devuelve como una lista de recursos.
 */

import { promises as fs } from "fs"
import path from "path"
import { NextResponse } from "next/server"

/** Extensiones de imagen permitidas para ser listadas en la galería. */
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"])

/**
 * Valida si el nombre de una carpeta es seguro para evitar ataques de Path Traversal.
 * 
 * @param {string} folder - El nombre de la carpeta a validar.
 * @returns {boolean} True si la carpeta es segura, false de lo contrario.
 */
function isSafeFolder(folder: string) {
  return /^[a-zA-Z0-9/_-]+$/.test(folder) && !folder.includes("..")
}

/**
 * Controlador para solicitudes HTTP GET.
 * Escanea el sistema de archivos local (carpeta public) para listar imágenes.
 * 
 * @param {Request} request - El objeto de la solicitud HTTP.
 * @returns {Promise<NextResponse>} Lista de objetos de recurso con título, tipo y URL.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const folder = searchParams.get("folder")

  // Validación de seguridad del parámetro de carpeta
  if (!folder || !isSafeFolder(folder)) {
    return NextResponse.json({ error: "Carpeta inválida o no proporcionada" }, { status: 400 })
  }

  // Construcción de la ruta absoluta en el servidor
  const absoluteFolder = path.join(process.cwd(), "public", "images", "ipp", folder)

  try {
    /**
     * Lectura del directorio.
     * Se filtran solo archivos con extensiones de imagen válidas.
     */
    const entries = await fs.readdir(absoluteFolder, { withFileTypes: true })

    const resources = entries
      .filter((entry) => entry.isFile())
      .map((entry) => ({
        entry,
        extension: path.extname(entry.name).toLowerCase(),
      }))
      .filter(({ extension }) => IMAGE_EXTENSIONS.has(extension))
      // Ordenación alfanumérica para mantener coherencia visual en las galerías
      .sort((a, b) => a.entry.name.localeCompare(b.entry.name, undefined, { numeric: true }))
      .map(({ entry, extension }) => ({
        title: path.parse(entry.name).name, // Nombre del archivo sin extensión
        type: extension.replace(".", "").toUpperCase(),
        image: `/images/ipp/${folder}/${entry.name}`, // URL relativa para el componente <Image />
      }))

    return NextResponse.json(resources)
  } catch (error) {
    console.error(`Error leyendo carpeta de recursos (${folder}):`, error)
    // En caso de error (ej: carpeta no existe), devolvemos una lista vacía para no romper el cliente
    return NextResponse.json([])
  }
}
