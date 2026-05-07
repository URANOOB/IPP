"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Settings, 
  X, 
  Save, 
  Type, 
  Maximize, 
  Palette, 
  Check, 
  Loader2,
  MousePointer2
} from "lucide-react"
import { updateLandingContent } from "@/features/landing/actions"

// Paleta de colores oficiales del proyecto
const PROJECT_COLORS = [
  { name: "Sky", value: "#a8c8d8" },
  { name: "Water", value: "#90c0c0" },
  { name: "Green", value: "#78a878" },
  { name: "Olive", value: "#90a878" },
  { name: "Cream", value: "#fff0c0" },
  { name: "Paper", value: "#fff8e8" },
  { name: "Coral", value: "#c06048" },
  { name: "Plum", value: "#603048" },
  { name: "Earth", value: "#906030" },
  { name: "Yellow", value: "#ffc84a" },
  { name: "Mint", value: "#dcebcf" },
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#000000" },
]

/**
 * Panel de edición centralizado para administradores.
 */
export default function FloatingEditPanel({ isEditable }: { isEditable: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedElement, setSelectedElement] = useState<{
    key: string,
    label: string,
    value: string,
    sizeKey?: string,
    size?: string,
    colorKey?: string,
    color?: string,
    multiline?: boolean
  } | null>(null)
  
  const [currentValue, setCurrentValue] = useState("")
  const [currentSize, setCurrentSize] = useState("")
  const [currentColor, setCurrentColor] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  // Escuchar eventos de selección de elementos desde los componentes
  useEffect(() => {
    const handleElementSelect = (e: any) => {
      const data = e.detail
      setSelectedElement(data)
      setCurrentValue(data.value || "")
      setCurrentSize(data.size || "")
      setCurrentColor(data.color || "")
      setIsOpen(true)
    }

    window.addEventListener('ipp-cms-select', handleElementSelect)
    return () => window.removeEventListener('ipp-cms-select', handleElementSelect)
  }, [])

  if (!isEditable) return null

  const handleSave = async () => {
    if (!selectedElement) return
    
    setIsSaving(true)
    const updates: Record<string, string> = { [selectedElement.key]: currentValue }
    
    if (selectedElement.sizeKey && currentSize) {
      updates[selectedElement.sizeKey] = currentSize.includes('px') ? currentSize : `${currentSize}px`
    }
    
    if (selectedElement.colorKey && currentColor) {
      updates[selectedElement.colorKey] = currentColor
    }

    const result = await updateLandingContent(updates)
    setIsSaving(false)

    if (result.success) {
      setIsOpen(false)
      // Disparar evento de actualización para que los componentes re-rendericen
      window.dispatchEvent(new CustomEvent('ipp-cms-updated', { detail: updates }))
    } else {
      alert("Error al guardar: " + result.error)
    }
  }

  return (
    <>
      {/* Botón flotante para abrir el panel si hay algo seleccionado */}
      <div className="fixed bottom-24 right-6 z-[110]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-4 rounded-full shadow-2xl transition-all duration-300 ${
            isOpen ? "bg-ipp-plum text-white rotate-90" : "bg-ipp-coral text-white hover:scale-110"
          }`}
        >
          {isOpen ? <X size={24} /> : <Settings size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-24 right-6 bottom-40 w-80 z-[105] bg-white/95 backdrop-blur-xl rounded-3xl border border-ipp-plum/10 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-5 border-b border-ipp-plum/5 bg-ipp-plum/5">
              <h3 className="text-sm font-black uppercase tracking-widest text-ipp-plum flex items-center gap-2">
                <Settings size={16} className="text-ipp-coral" />
                Editor de Contenido
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {!selectedElement ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40 py-10">
                  <MousePointer2 size={48} />
                  <p className="text-xs font-bold uppercase leading-tight">
                    Haz clic en cualquier lápiz de la página para editar
                  </p>
                </div>
              ) : (
                <>
                  {/* Etiqueta del elemento */}
                  <div>
                    <label className="text-[10px] font-black uppercase text-ipp-plum/40 mb-1 block">
                      Editando: {selectedElement.label}
                    </label>
                  </div>

                  {/* Campo de Texto */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-ipp-plum/60">
                      <Type size={14} />
                      <span className="text-[11px] font-bold uppercase">Texto</span>
                    </div>
                    {selectedElement.multiline ? (
                      <textarea
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                        className="w-full bg-ipp-paper border border-ipp-plum/10 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-ipp-coral transition-colors h-32 resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)}
                        className="w-full bg-ipp-paper border border-ipp-plum/10 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-ipp-coral transition-colors"
                      />
                    )}
                  </div>

                  {/* Tamaño de Letra */}
                  {selectedElement.sizeKey && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-ipp-plum/60">
                        <Maximize size={14} />
                        <span className="text-[11px] font-bold uppercase">Tamaño</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="8"
                          max="120"
                          value={parseInt(currentSize) || 16}
                          onChange={(e) => setCurrentSize(`${e.target.value}px`)}
                          className="flex-1 accent-ipp-coral"
                        />
                        <span className="text-xs font-black text-ipp-plum w-10">{currentSize}</span>
                      </div>
                    </div>
                  )}

                  {/* Color de Letra */}
                  {selectedElement.colorKey && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-ipp-plum/60">
                        <Palette size={14} />
                        <span className="text-[11px] font-bold uppercase">Color de Marca</span>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-2 pb-2">
                        {PROJECT_COLORS.map((color) => (
                          <button
                            key={color.name}
                            title={color.name}
                            onClick={() => setCurrentColor(color.value)}
                            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                              currentColor === color.value ? "border-ipp-coral scale-110 shadow-md" : "border-transparent"
                            }`}
                            style={{ backgroundColor: color.value }}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-lg border border-ipp-plum/10"
                          style={{ backgroundColor: currentColor }}
                        />
                        <input 
                          type="text" 
                          value={currentColor} 
                          onChange={(e) => setCurrentColor(e.target.value)}
                          placeholder="#hex"
                          className="flex-1 text-xs font-mono bg-ipp-paper border border-ipp-plum/10 rounded-xl px-3 py-2 focus:outline-none focus:border-ipp-coral"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {selectedElement && (
              <div className="p-5 border-t border-ipp-plum/5 flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 px-4 rounded-xl border border-ipp-plum/10 text-xs font-black uppercase text-ipp-plum hover:bg-ipp-plum/5 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 py-3 px-4 rounded-xl bg-ipp-coral text-white text-xs font-black uppercase shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2"
                >
                  {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  Guardar
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
