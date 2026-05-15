/**
 * @file messages/page.tsx
 * @description Panel de gestión de mensajes de contacto.
 * Permite a los administradores leer, marcar como gestionados y eliminar las solicitudes recibidas.
 */

import { getContactMessages, toggleMessageReadStatus, deleteMessage } from '@/features/admin/messages/actions'
import { Mail, Calendar, User, Tag, Trash2, CheckCircle2, Circle } from 'lucide-react'

/**
 * Componente de la página de Mensajes (Admin).
 * Recupera los mensajes del servidor y los lista con un diseño de tarjetas informativas.
 * 
 * @returns {Promise<JSX.Element>} La vista de administración de mensajes.
 */
export default async function AdminMessagesPage() {
  const result = await getContactMessages()
  const messages = result.success ? result.data : []

  return (
    <div className="space-y-10">
      {/* Encabezado del Panel de Mensajes */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-ipp-coral font-black uppercase tracking-widest text-xs mb-2">Comunidad</p>
          <h1 className="text-4xl md:text-5xl font-display font-black text-ipp-plum">
            Mensajes de <span className="text-ipp-sky">Contacto</span>
          </h1>
          <p className="text-ipp-plum/40 font-semibold mt-2 text-lg">
            Gestiona las consultas y solicitudes recibidas desde la landing page.
          </p>
        </div>
        
        {/* Contador de mensajes */}
        <div className="bg-white px-6 py-3 rounded-2xl border border-ipp-plum/5 shadow-sm">
          <span className="text-ipp-plum/40 font-black text-xs uppercase tracking-widest block mb-1">Total</span>
          <span className="text-2xl font-black text-ipp-plum">{messages?.length || 0}</span>
        </div>
      </header>

      <div className="grid gap-6">
        {messages && messages.length > 0 ? (
          messages.map((msg) => (
            <div 
              key={msg.id}
              className={`bg-white rounded-[2.5rem] border transition-all duration-300 overflow-hidden ${
                msg.is_read ? 'border-ipp-plum/5 opacity-70' : 'border-ipp-sky/20 shadow-xl shadow-ipp-sky/5'
              }`}
            >
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row gap-8">
                  
                  {/* COLUMNA 1: Información del Remitente */}
                  <div className="md:w-1/3 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-ipp-plum/5 rounded-xl flex items-center justify-center text-ipp-plum">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-[0.65rem] font-black uppercase tracking-tighter text-ipp-plum/40">Nombre</p>
                        <p className="font-bold text-ipp-plum">{msg.full_name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-ipp-plum/5 rounded-xl flex items-center justify-center text-ipp-plum">
                        <Mail size={20} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[0.65rem] font-black uppercase tracking-tighter text-ipp-plum/40">Correo</p>
                        <p className="font-bold text-ipp-plum truncate">{msg.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-ipp-plum/5 rounded-xl flex items-center justify-center text-ipp-plum">
                        <Tag size={20} />
                      </div>
                      <div>
                        <p className="text-[0.65rem] font-black uppercase tracking-tighter text-ipp-plum/40">Interés</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-[0.65rem] font-black uppercase tracking-widest mt-1 ${
                          msg.interest_type === 'donacion' ? 'bg-ipp-coral/10 text-ipp-coral' :
                          msg.interest_type === 'voluntariado' ? 'bg-ipp-water/10 text-ipp-water' :
                          msg.interest_type === 'taller' ? 'bg-ipp-green/10 text-ipp-green' :
                          'bg-ipp-plum/10 text-ipp-plum'
                        }`}>
                          {msg.interest_type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* COLUMNA 2: Contenido del Mensaje y Acciones */}
                  <div className="md:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-2 text-ipp-plum/40">
                            <Calendar size={14} />
                            <span className="text-xs font-bold uppercase tracking-widest">
                              {new Date(msg.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                         </div>
                         {!msg.is_read && (
                           <span className="h-2 w-2 rounded-full bg-ipp-sky animate-pulse" />
                         )}
                      </div>
                      <p className="text-ipp-plum/80 font-medium leading-relaxed italic">
                        &quot;{msg.message}&quot;
                      </p>
                    </div>

                    {/* Barra de Acciones del Mensaje */}
                    <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-ipp-plum/5">
                      {/* Acción: Marcar como leído/pendiente */}
                      <form action={async () => {
                        'use server'
                        await toggleMessageReadStatus(msg.id, msg.is_read)
                      }}>
                        <button className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                          msg.is_read 
                            ? 'text-ipp-plum/40 hover:bg-ipp-plum/5' 
                            : 'bg-ipp-sky text-white shadow-lg shadow-ipp-sky/20 hover:scale-105'
                        }`}>
                          {msg.is_read ? <Circle size={14} /> : <CheckCircle2 size={14} />}
                          {msg.is_read ? 'Marcar como pendiente' : 'Marcar como leído'}
                        </button>
                      </form>

                      {/* Acción: Eliminar mensaje */}
                      <form action={async () => {
                        'use server'
                        await deleteMessage(msg.id)
                      }}>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 font-bold text-xs transition-all">
                          <Trash2 size={14} />
                          Eliminar
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* Estado Vacío */
          <div className="bg-white rounded-[3rem] p-20 text-center border border-ipp-plum/5">
            <div className="h-20 w-20 bg-ipp-plum/5 rounded-3xl flex items-center justify-center text-ipp-plum/20 mx-auto mb-6">
              <Mail size={40} />
            </div>
            <h3 className="text-2xl font-display font-black text-ipp-plum">No hay mensajes aún</h3>
            <p className="text-ipp-plum/40 font-semibold mt-2">Cuando alguien te escriba desde la landing page, aparecerá aquí.</p>
          </div>
        )}
      </div>
    </div>
  )
}
