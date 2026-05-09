/**
 * @file chatbot.tsx
 * @description Componente de chat inteligente para la landing page.
 * Permite a los usuarios interactuar con un asistente virtual que responde dudas sobre el proyecto.
 * Utiliza ReactMarkdown para renderizar respuestas ricas y Framer Motion para animaciones.
 */

"use client"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Send, X, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

/**
 * Representa la estructura de un mensaje en la conversación.
 */
interface Message {
  /** Rol del emisor: 'user' para el visitante, 'bot' para el sistema. */
  role: "user" | "bot"
  /** Contenido de texto del mensaje (soporta Markdown). */
  content: string
}

/**
 * Genera un ID de sesión único para el rastreo de la conversación en el backend.
 * 
 * @returns {string} Un string único basado en tiempo y aleatoriedad.
 */
const generateSessionId = () => `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

/**
 * Componente de Chatbot flotante.
 * Gestiona el estado de la ventana de chat, el historial de mensajes y la integración con la API de IA.
 * 
 * @returns {JSX.Element} El botón flotante y el modal de chat condicional.
 */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hola. Soy el asistente de Ingles pa' la Paz. Puedo contarte sobre los circulos de lectura, la metodologia o las formas de participar.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  
  /** Referencia para el desplazamiento automático al final del chat. */
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  /** Alterna la visibilidad del chat e inicializa la sesión si es necesario. */
  const toggleChat = () => {
    if (!isOpen && !sessionId) {
      setSessionId(generateSessionId())
    }
    setIsOpen(!isOpen)
  }

  /** Efecto para mantener el scroll en la parte inferior cuando llegan nuevos mensajes. */
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: "smooth",
        })
      }
    }
  }, [messages, isLoading])

  /**
   * Maneja el envío de mensajes del usuario.
   * Realiza una actualización optimista en la UI y luego consulta la API de chat.
   * 
   * @param {FormEvent} e - Evento de envío del formulario.
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Actualización optimista: mostramos el mensaje del usuario inmediatamente.
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Petición a la ruta de API interna que conecta con la lógica de IA (Edge Functions/OpenAI).
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, sessionId: sessionId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "No se pudo obtener una respuesta del servidor.")
      }

      const botMessage: Message = { role: "bot", content: data.reply }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error en Chatbot:", error)
      let message = "Lo siento, hubo un problema. Por favor intenta de nuevo más tarde."
      if (error instanceof Error) {
        message = error.message
      }
      const errorMessage: Message = { role: "bot", content: message }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Botón Flotante y Ventana de Chat */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="w-[calc(100vw-48px)] sm:w-96"
            >
              <Card className="h-[60vh] flex flex-col shadow-2xl border-ipp-plum/10">
                {/* Cabecera del Chat */}
                <CardHeader className="flex flex-row items-center justify-between border-b bg-ipp-cream/50">
                  <CardTitle className="text-lg font-bold flex items-center gap-2 text-ipp-plum">
                    <Bot className="text-ipp-coral" />
                    Asistente IPP
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="hover:bg-ipp-coral/10">
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>

                {/* Área de Mensajes */}
                <CardContent className="flex-grow overflow-hidden p-0">
                  <ScrollArea className="h-full px-4 pt-4" ref={scrollAreaRef}>
                    <div className="space-y-4 pb-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={cn(
                            "flex items-start gap-3",
                            message.role === "user" ? "justify-end" : "justify-start",
                          )}
                        >
                          {message.role === "bot" && (
                            <div className="p-2 bg-ipp-plum text-white rounded-full">
                              <Bot size={16} />
                            </div>
                          )}
                          <div
                            className={cn(
                              "p-3 rounded-2xl max-w-[80%] shadow-sm",
                              message.role === "user" 
                                ? "bg-ipp-plum text-white rounded-tr-none" 
                                : "bg-ipp-paper text-ipp-plum rounded-tl-none border border-ipp-plum/5",
                            )}
                          >
                            <div className="text-sm leading-relaxed prose prose-sm prose-invert max-w-none">
                              {/* Renderizado seguro de Markdown para permitir listas y enlaces */}
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  p: ({ node: _node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                  ol: ({ node: _node, ...props }) => (
                                    <ol className="list-decimal list-inside my-2 space-y-1" {...props} />
                                  ),
                                  ul: ({ node: _node, ...props }) => (
                                    <ul className="list-disc list-inside my-2 space-y-1" {...props} />
                                  ),
                                  a: ({ node: _node, ...props }) => (
                                    <a
                                      className="underline font-bold hover:text-ipp-coral transition-colors"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      {...props}
                                    />
                                  ),
                                }}
                              >
                                {message.content}
                              </ReactMarkdown>
                            </div>
                          </div>
                          {message.role === "user" && (
                            <div className="p-2 bg-ipp-paper rounded-full border border-ipp-plum/5">
                              <User size={16} className="text-ipp-plum" />
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {/* Indicador de carga (Escribiendo...) */}
                      {isLoading && (
                        <div className="flex items-start gap-3 justify-start">
                          <div className="p-2 bg-ipp-plum text-white rounded-full">
                            <Bot size={16} />
                          </div>
                          <div className="p-3 rounded-2xl bg-ipp-paper border border-ipp-plum/5 rounded-tl-none">
                            <div className="flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-ipp-plum/40 animate-bounce [animation-delay:-0.3s]" />
                              <span className="h-2 w-2 rounded-full bg-ipp-plum/40 animate-bounce [animation-delay:-0.15s]" />
                              <span className="h-2 w-2 rounded-full bg-ipp-plum/40 animate-bounce" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Entrada de Texto */}
                <CardFooter className="border-t bg-ipp-paper/30 p-4">
                  <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Pregunta por el proyecto..."
                      disabled={isLoading}
                      className="flex-1 rounded-xl border-ipp-plum/10 focus-visible:ring-ipp-coral bg-white"
                    />
                    <Button 
                      type="submit" 
                      size="icon" 
                      disabled={isLoading}
                      className="rounded-xl bg-ipp-plum hover:bg-ipp-coral transition-colors"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón de apertura con animación de Layout */}
        <motion.div layout>
          <Button
            onClick={toggleChat}
            className="rounded-full w-16 h-16 shadow-2xl bg-ipp-plum hover:bg-ipp-coral transition-all scale-100 hover:scale-105 active:scale-95"
            aria-label="Abrir asistente de chat"
          >
            {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
          </Button>
        </motion.div>
      </div>
    </>
  )
}
