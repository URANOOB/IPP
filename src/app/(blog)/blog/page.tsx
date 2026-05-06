/**
 * BLOG INDEX PAGE - Lista todas las historias publicadas.
 * 
 * Obtiene las entradas desde Supabase y las muestra en una cuadrícula
 * con diseño editorial.
 */

import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'

export default async function PublicBlogPage() {
  const supabase = await createClient()

  // Consultamos los posts ordenados por fecha de publicación
  const { data: posts } = await supabase
    .from('blog_posts')
    .select(`
      id, 
      title, 
      slug, 
      excerpt, 
      cover_image, 
      published_at,
      profiles (full_name)
    `)
    .order('published_at', { ascending: false })

  return (
    <main className="min-h-screen bg-ipp-paper text-ipp-plum">
      {/* Componentes de Navegación */}
      <Header />
      
      <section className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
        <header className="mb-20 text-center md:text-left">
          <p className="text-[0.75rem] font-black uppercase tracking-[0.3em] text-ipp-coral mb-4">
            Historias y Relatos
          </p>
          <h1 className="text-6xl md:text-8xl font-display font-black tracking-tight leading-none text-ipp-plum">
            Entradas
          </h1>
          <div className="h-1.5 w-20 bg-ipp-coral mt-8 hidden md:block" />
        </header>

        {/* Listado de Posts con diseño dinámico */}
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4">
            {posts.map((post, index) => {
              // Lógica para variar el tamaño de las tarjetas según su posición
              const isLarge = index % 5 === 0;
              const isMedium = index % 5 === 1 || index % 5 === 2;
              
              return (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  className={`group relative overflow-hidden bg-white rounded-[2rem] border border-ipp-plum/5 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(96,48,72,0.12)] hover:-translate-y-1 ${
                    isLarge ? 'md:col-span-12 aspect-[21/9]' : 
                    isMedium ? 'md:col-span-6 aspect-square' : 
                    'md:col-span-4 aspect-[4/5]'
                  }`}
                >
                  {/* Imagen de Portada */}
                  {post.cover_image ? (
                    <Image 
                      src={post.cover_image} 
                      alt={post.title} 
                      fill 
                      priority={index === 0}
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110" 
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-ipp-sky/20">
                      <Image 
                        src="/images/ipp/logo_png3.png" 
                        alt="IPP" 
                        width={228} 
                        height={150} 
                        priority
                        className="opacity-10" 
                        style={{ height: 'auto' }}
                      />
                    </div>
                  )}
                  
                  {/* Overlay Gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ipp-plum/90 via-ipp-plum/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Información del Post */}
                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                    <div className="space-y-3">
                      <p className="text-[0.6rem] font-black uppercase tracking-[0.25em] text-ipp-black">
                        {new Date(post.published_at).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                      </p>
                      <h2 className={`${isLarge ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'} font-display font-black leading-none text-ipp-black transition-colors duration-500`}>
                        {post.title.toUpperCase()}
                      </h2>
                      {/* Efecto hover: mostrar extracto */}
                      <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-700 ease-in-out">
                        <p className="text-sm md:text-base font-medium text-ipp-black line-clamp-2 pt-2">
                          {post.excerpt || 'Haz clic para ver mas informacion.'}
                        </p>
                        <div className="pt-4">
                          <span className="inline-block border border-ipp-sky/40 bg-ipp-sky/10 backdrop-blur-sm px-6 py-1.5 rounded-full text-[0.6rem] font-black uppercase tracking-[0.2em] text-ipp-black">
                            Mas informacion
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          /* Estado vacío si no hay posts */
          <div className="py-40 text-center bg-white rounded-[3rem] border border-ipp-plum/10">
            <p className="text-xl font-bold tracking-widest text-ipp-plum/30">NUEVAS HISTORIAS PRÓXIMAMENTE</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
