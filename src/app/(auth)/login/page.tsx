'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { useState } from 'react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error) {
      console.error('Error logging in with Google:', error)
      alert('Error al iniciar sesión con Google. Inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ipp-paper p-6">
      {/* Fondo decorativo sutil */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] rounded-full bg-ipp-sky/20 blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] rounded-full bg-ipp-coral/10 blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative z-10 border-ipp-plum/10 shadow-xl overflow-hidden rounded-[2.5rem]">
        <div className="h-2 w-full bg-ipp-coral" />
        <CardHeader className="space-y-4 pt-10 pb-6 text-center">
          <div className="flex justify-center">
            <div className="relative h-20 w-20 rounded-2xl bg-white shadow-md p-2 rotate-3 border border-ipp-plum/5">
              <Image
                src="/images/ipp/logo_png3.png"
                alt="Logo IPP"
                fill
                priority
                className="object-contain p-2"
              />
            </div>
          </div>
          <div className="space-y-1">
            <CardTitle className="font-display text-3xl font-black text-ipp-plum">
              Panel Admin
            </CardTitle>
            <CardDescription className="text-ipp-plum/60 font-medium">
              Ingresa para gestionar el contenido de <br />
              <span className="text-ipp-coral">Inglés pa&apos; la Paz</span>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-10 pt-4 flex flex-col gap-6">
          <Button
            variant="outline"
            size="lg"
            className="h-14 rounded-2xl border-ipp-plum/20 bg-white text-ipp-plum font-bold hover:bg-ipp-cream hover:border-ipp-coral/30 hover:text-ipp-coral transition-all duration-300 shadow-sm gap-3"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="h-5 w-5 border-2 border-ipp-coral border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            Continuar con Google
          </Button>
          
          <div className="flex items-center gap-2 text-[0.65rem] font-black uppercase tracking-widest text-ipp-plum/30 justify-center">
            <span className="h-px w-8 bg-ipp-plum/10" />
            Acceso Protegido
            <span className="h-px w-8 bg-ipp-plum/10" />
          </div>
        </CardContent>
      </Card>
      
      <p className="mt-8 text-sm font-semibold text-ipp-plum/40">
        &copy; 2026 Inglés pa&apos; la Paz
      </p>
    </div>
  )
}
