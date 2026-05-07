/**
 * @file utils.ts
 * @description Utilidades generales para la aplicación.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utilidad para combinar clases de Tailwind CSS de forma segura.
 * Utiliza `clsx` para manejar condicionales y `twMerge` para resolver conflictos de Tailwind.
 * 
 * @param {...ClassValue[]} inputs - Lista de clases, objetos o arreglos de clases a combinar.
 * @returns {string} Una cadena de texto con las clases combinadas y optimizadas.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
