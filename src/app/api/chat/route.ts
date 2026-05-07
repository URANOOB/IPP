/**
 * @file route.ts
 * @description Ruta de la API para el chatbot de Inglés pa' la Paz.
 * 
 * Este archivo maneja las solicitudes POST enviadas por el componente del chat en el frontend.
 * Actúa como un puente (proxy) entre la aplicación Next.js y un webhook externo (n8n).
 * Incluye validaciones de seguridad, control de frecuencia (rate limiting) y manejo de errores.
 */

import { NextResponse } from "next/server"
import { headers } from "next/headers"

const MAX_MESSAGE_LENGTH = 1200
const REQUEST_TIMEOUT_MS = 15000
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 12
const SESSION_ID_PATTERN = /^session_\d{10,20}_[a-z0-9]{4,24}$/

/**
 * Almacén en memoria para el control de frecuencia (Rate Limiting).
 * Mapea las IPs de los clientes con su contador de solicitudes y el tiempo de reinicio.
 * Nota: En un entorno de producción con múltiples servidores, se recomienda usar Redis.
 */
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

/**
 * Extrae la dirección IP real del cliente a partir de los encabezados de la solicitud.
 * 
 * @param {Headers} requestHeaders - Los encabezados de la solicitud HTTP.
 * @returns {string} La dirección IP detectada o "unknown" si no se encuentra.
 */
function getClientIp(requestHeaders: Headers) {
  const forwardedFor = requestHeaders.get("x-forwarded-for")
  return forwardedFor?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown"
}

/**
 * Verifica si un cliente ha excedido el límite de solicitudes permitidas.
 * 
 * @param {string} clientIp - La IP del cliente a verificar.
 * @returns {boolean} True si el cliente ha excedido el límite, false de lo contrario.
 */
function isRateLimited(clientIp: string) {
  const now = Date.now()
  const current = rateLimitStore.get(clientIp)

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(clientIp, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  current.count += 1
  return current.count > RATE_LIMIT_MAX_REQUESTS
}

/**
 * Controlador para las solicitudes HTTP POST.
 * Procesa el mensaje del usuario, valida el formato y se comunica con el webhook de n8n.
 * 
 * @param {Request} req - El objeto de la solicitud HTTP.
 * @returns {Promise<NextResponse>} Una respuesta JSON con la respuesta del chatbot o un error.
 */
export async function POST(req: Request) {
  try {
    // El chatbot es público, así que validamos antes de hablar con el webhook externo.
    const requestHeaders = await headers()
    const clientIp = getClientIp(requestHeaders)

    if (isRateLimited(clientIp)) {
      return NextResponse.json({ error: "Demasiadas solicitudes. Por favor, intenta de nuevo en un minuto." }, { status: 429 })
    }

    const payload = await req.json().catch(() => null)
    const message = typeof payload?.message === "string" ? payload.message.trim() : ""
    const sessionId = typeof payload?.sessionId === "string" ? payload.sessionId : null

    // Validaciones de entrada
    if (!message) {
      return NextResponse.json({ error: "El mensaje es obligatorio." }, { status: 400 })
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: "El mensaje es demasiado largo." }, { status: 413 })
    }

    if (sessionId && !SESSION_ID_PATTERN.test(sessionId)) {
      return NextResponse.json({ error: "Sesión inválida." }, { status: 400 })
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (!webhookUrl) {
      return NextResponse.json({ error: "El webhook del chatbot no está configurado." }, { status: 500 })
    }

    // Seguridad: Evita enviar mensajes a un webhook sin cifrado en producción.
    const parsedWebhookUrl = new URL(webhookUrl)
    if (parsedWebhookUrl.protocol !== "https:" && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "El webhook del chatbot debe usar HTTPS en producción." }, { status: 500 })
    }

    // AbortController evita que una ejecución lenta del webhook deje la solicitud colgada.
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

    let response: Response
    try {
      response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatInput: message, sessionId: sessionId }),
        signal: controller.signal,
      })
    } finally {
      clearTimeout(timeout)
    }

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "El flujo de trabajo del chatbot parece estar inactivo." },
          { status: 404 },
        )
      }
      return NextResponse.json({ error: "Error al obtener respuesta del chatbot." }, { status: response.status })
    }

    const data = await response.json()
    const botResponse = data?.output

    if (!botResponse) {
      console.error("La respuesta de n8n no contiene el campo 'output'.")
      return NextResponse.json(
        { error: "Formato de respuesta inesperado por parte del chatbot." },
        { status: 500 },
      )
    }

    return NextResponse.json({ reply: botResponse })
  } catch (error) {
    console.error("Error en la API de Chat:", error)
    return NextResponse.json({ error: "Ocurrió un error interno en el servidor." }, { status: 500 })
  }
}
