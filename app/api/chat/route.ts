import { NextResponse } from "next/server"
import { headers } from "next/headers"

const MAX_MESSAGE_LENGTH = 1200
const REQUEST_TIMEOUT_MS = 15000
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 12
const SESSION_ID_PATTERN = /^session_\d{10,20}_[a-z0-9]{4,24}$/

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function getClientIp(requestHeaders: Headers) {
  const forwardedFor = requestHeaders.get("x-forwarded-for")
  return forwardedFor?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown"
}

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

export async function POST(req: Request) {
  try {
    const requestHeaders = await headers()
    const clientIp = getClientIp(requestHeaders)

    if (isRateLimited(clientIp)) {
      return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 })
    }

    const payload = await req.json().catch(() => null)
    const message = typeof payload?.message === "string" ? payload.message.trim() : ""
    const sessionId = typeof payload?.sessionId === "string" ? payload.sessionId : null

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 })
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json({ error: "Message is too long." }, { status: 413 })
    }

    if (sessionId && !SESSION_ID_PATTERN.test(sessionId)) {
      return NextResponse.json({ error: "Invalid session." }, { status: 400 })
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL
    if (!webhookUrl) {
      return NextResponse.json({ error: "N8N_WEBHOOK_URL is not configured." }, { status: 500 })
    }

    const parsedWebhookUrl = new URL(webhookUrl)
    if (parsedWebhookUrl.protocol !== "https:" && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Chatbot webhook must use HTTPS in production." }, { status: 500 })
    }

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
          { error: "The chatbot workflow appears to be inactive. Please activate the workflow in your n8n editor." },
          { status: 404 },
        )
      }
      return NextResponse.json({ error: "Failed to get response from chatbot." }, { status: response.status })
    }

    const data = await response.json()

    const botResponse = data?.output

    if (!botResponse) {
      console.error("n8n response did not contain an 'output' field.")
      return NextResponse.json(
        { error: "Received an unexpected response format from the chatbot. Check the n8n execution logs for details." },
        { status: 500 },
      )
    }

    return NextResponse.json({ reply: botResponse })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 })
  }
}
