/**
 * @file cta.tsx
 * @description Componente de Llamada a la Acción (CTA) para la landing page.
 * Incluye un formulario de contacto dinámico con opciones de interés.
 */

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HandHeart, Users, Mail, CheckCircle2, Loader2, type LucideIcon } from "lucide-react"
import { sendContactMessage } from "../actions"

/**
 * Tipo para las opciones de interés del formulario.
 * Basado en los tipos esperados por la Server Action sendContactMessage.
 */
type InterestType = 'donacion' | 'voluntariado' | 'taller' | 'otro'

/**
 * Interfaz para las opciones de interés mostradas en la UI.
 */
interface InterestOption {
  id: InterestType
  title: string
  icon: LucideIcon
  color: string
}

const interestOptions: InterestOption[] = [
  { id: 'donacion', title: "Donar recursos", icon: HandHeart, color: "bg-ipp-coral" },
  { id: 'voluntariado', title: "Ser voluntario", icon: Users, color: "bg-ipp-water" },
  { id: 'taller', title: "Solicitar taller", icon: Mail, color: "bg-ipp-green" },
]

/**
 * Componente principal de CTA (Call to Action).
 * Permite a los usuarios enviar mensajes de interés al equipo de IPP.
 * 
 * @returns {JSX.Element} La sección de contacto con formulario reactivo.
 */
export default function CTA() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [selectedType, setSelectedType] = useState<InterestType | null>(null)
  const [error, setError] = useState<string | null>(null)

  /**
   * Maneja el envío del formulario de contacto.
   * Valida la selección y llama a la Server Action correspondiente.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - Evento de envío del formulario.
   */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    
    // Validación de seguridad para asegurar que el tipo está seleccionado
    if (!selectedType) {
      setError("Por favor selecciona una opción de interés antes de enviar.")
      setLoading(false)
      return
    }

    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      type: selectedType,
      message: formData.get('message') as string,
    }

    // Ejecución de la acción del servidor para persistir el mensaje
    const result = await sendContactMessage(data)
    
    setLoading(false)
    if (result.success) {
      setSent(true)
    } else {
      setError("Hubo un error al enviar el mensaje. Por favor intenta de nuevo.")
    }
  }

  // Vista de confirmación tras el envío exitoso
  if (sent) {
    return (
      <section 
        id="join" 
        className="relative bg-ipp-cream py-24 md:py-32"
        aria-labelledby="cta-heading"
      >
        <div
          className="paper-edge absolute left-0 right-0 top-0 h-12 rotate-180 bg-ipp-mint"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-3xl px-6 text-center pt-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-ipp-green text-white shadow-xl">
              <CheckCircle2 size={48} />
            </div>
            <h2 id="cta-heading" className="font-display text-4xl font-black text-ipp-plum md:text-5xl">
              ¡Gracias por escribirnos!
            </h2>
            <p className="mt-6 text-xl font-medium text-ipp-plum/80">
              Hemos recibido tu mensaje. El equipo de Inglés Pa&apos; la Paz se pondrá en contacto contigo muy pronto para seguir construyendo juntos.
            </p>
            <Button 
              onClick={() => {
                setSent(false)
                setSelectedType(null)
              }} 
              className="mt-10 bg-ipp-plum text-white hover:bg-white hover:text-ipp-plum px-8 py-6 text-lg rounded-2xl transition-all"
            >
              Enviar otro mensaje
            </Button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section 
      id="join" 
      className="relative bg-ipp-cream py-24 md:py-32"
      aria-labelledby="cta-heading"
    >
      <div
        className="paper-edge absolute left-0 right-0 top-0 h-12 rotate-180 bg-ipp-mint"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-12 pt-10">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          
          {/* INFORMACIÓN Y SELECTOR DE OPCIONES DE INTERÉS */}
          <div>
            <h2 id="cta-heading" className="font-display text-6xl font-black text-ipp-coral md:text-7xl">
              Sé parte del cambio
            </h2>
            <p className="mt-6 text-lg font-medium text-ipp-plum/80 md:text-xl leading-relaxed">
              Tu apoyo nos permite seguir cruzando fronteras simbólicas y construyendo paz desde el territorio. Elige cómo te gustaría sumarte:
            </p>

            <div className="mt-12 space-y-4">
              {interestOptions.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.2 + (index * 0.1) }
                  }}
                  // Animación sutil de rebote para guiar la atención del usuario
                  animate={{ 
                    y: [0, -8, 0],
                    transition: { 
                      duration: 0.6, 
                      delay: 1.5 + (index * 0.1),
                      repeat: 1,
                      repeatDelay: 3
                    }
                  }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedType(option.id)}
                  className={`flex w-full items-center gap-6 rounded-[2rem] p-6 text-left transition-all ${
                    selectedType === option.id 
                      ? 'bg-white shadow-xl shadow-ipp-plum/5 ring-4 ring-ipp-yellow' 
                      : 'bg-white/25 hover:bg-white/40 text-ipp-plum'
                  }`}
                >
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${option.color} text-white shadow-lg`}>
                    <option.icon size={28} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-black text-ipp-plum">
                      {option.title}
                    </h3>
                    <p className="text-sm font-semibold text-ipp-plum/60">
                      {selectedType === option.id ? 'Seleccionado' : 'Haz clic para seleccionar'}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* FORMULARIO: Visible siempre en desktop, pero condicional en móvil tras elegir una opción */}
          <div className={selectedType ? 'block' : 'hidden lg:block'}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[3rem] bg-white p-8 md:p-12 shadow-2xl shadow-ipp-plum/5"
            >
              <div className="mb-8 flex items-center gap-4">
                <div className={`h-1 w-12 rounded-full ${interestOptions.find(o => o.id === selectedType)?.color || 'bg-ipp-plum'}`} />
                <p className="text-xs font-black uppercase tracking-[0.2em] text-ipp-plum/40">
                  Formulario de {selectedType || 'contacto'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest text-ipp-plum/40 ml-2">Nombre completo</label>
                  <Input
                    name="name"
                    required
                    placeholder="Tu nombre aquí..."
                    className="h-14 rounded-2xl border-ipp-paper bg-ipp-paper/50 px-6 font-semibold focus:ring-ipp-coral placeholder:text-ipp-plum/40"
                  />
                  </div>

                  <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest text-ipp-plum/40 ml-2">Correo electrónico</label>
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="tu@correo.com"
                    className="h-14 rounded-2xl border-ipp-paper bg-ipp-paper/50 px-6 font-semibold focus:ring-ipp-coral placeholder:text-ipp-plum/40"
                  />
                  </div>

                  <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest text-ipp-plum/40 ml-2">¿Cómo te gustaría que colaboráramos?</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Cuéntanos un poco más sobre tu interés..."
                    className="w-full rounded-2xl border-none bg-ipp-paper/50 p-6 font-semibold text-ipp-plum focus:ring-2 focus:ring-ipp-coral outline-none placeholder:text-ipp-plum/40"
                  />
                  </div>
                {error && <p className="text-sm font-bold text-ipp-coral">{error}</p>}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-ipp-plum py-8 text-lg font-bold text-white transition-all hover:bg-ipp-coral disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Enviar mensaje"
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
