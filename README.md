# Ingles pa' la Paz

Sitio web de Ingles pa' la Paz: una landing interactiva para presentar el proyecto, sus experiencias, metodologia, integrantes y canales de contacto.

El proyecto esta construido con Next.js, React, Tailwind CSS y algunos componentes UI reutilizables. La pagina principal funciona como una experiencia de una sola pagina, con secciones conectadas por navegacion interna.

## Como correrlo

Requisitos recomendados:

- Node.js 20 o superior
- npm 10 o superior

Instalacion:

```bash
npm install
```

Desarrollo:

```bash
npm run dev
```

Validacion:

```bash
npm run lint
npm run build
```

Produccion local:

```bash
npm run start
```

## 🤝 Contribución y Desarrollo

Para colaborar en este proyecto, por favor lee nuestra [Guía de Contribución](CONTRIBUTING.md) para entender el flujo de trabajo con Git y la gestión de entornos.

**Resumen rápido:**
- Trabaja siempre en ramas `feature/` que salgan de `develop`.
- Nunca hagas push directo a `main`.
- Asegúrate de que `npm run build` pase antes de integrar cambios.

## Estructura

```txt
app/
  api/
    chat/route.ts                  Endpoint interno del chatbot.
    experience-resources/route.ts  Lee imagenes desde public/images/ipp.
  layout.tsx                       Metadata, favicon, SEO base y layout raiz.
  page.tsx                         Orden de las secciones de la landing.
  robots.ts                        Genera /robots.txt.
  sitemap.ts                       Genera /sitemap.xml.

components/
  header.tsx                       Hero, navegacion y menu movil.
  infoipp.tsx                      Seccion "Quienes somos" y principios.
  experiences.tsx                  Experiencias y galeria dinamica.
  process.tsx                      Metodologia paso a paso.
  Integrantes.tsx                  Carrusel de integrantes.
  footer.tsx                       Contacto, marca y logos institucionales.
  chatbot.tsx                      Widget flotante del asistente.
  ui/                              Componentes visuales reutilizables.

public/
  favicon.png                      Icono de la pestana del navegador.
  images/ipp/                      Logos, personajes, fotos y recursos visuales.

styles/
  globals.css                      Hoja global adicional del proyecto.

lib/
  utils.ts                         Utilidades compartidas.
```

## Donde editar contenido

- Textos principales: `components/header.tsx`, `components/infoipp.tsx`, `components/process.tsx` y `components/footer.tsx`.
- Experiencias: constante `experiences` en `components/experiences.tsx`.
- Integrantes: constante `integrantes` en `components/Integrantes.tsx`.
- Fotos de integrantes: llenar el campo `photo` con una ruta publica, por ejemplo:

```ts
photo: "/images/ipp/integrantes/nombre.png"
```

Si `photo` queda vacio, la card muestra el icono por defecto.

## Imagenes y galerias

Las imagenes publicas viven en `public/images/ipp`.

La seccion de experiencias puede cargar imagenes automaticamente desde carpetas especificas:

- `public/images/ipp/Little-reader`
- `public/images/ipp/bridges`
- `public/images/ipp/voices`

El endpoint `app/api/experience-resources/route.ts` solo acepta carpetas con caracteres seguros y solo devuelve archivos de imagen. Esto evita que alguien use la ruta para leer archivos fuera de `public/images/ipp`.

## SEO y favicon

La configuracion SEO base esta en `app/layout.tsx`.

Incluye:

- title y description
- canonical
- Open Graph
- Twitter card
- favicon
- robots
- sitemap

Para despliegues reales, revisa que `NEXT_PUBLIC_SITE_URL` apunte al dominio definitivo. Esa URL se usa para canonical, Open Graph, robots y sitemap.

## Seguridad

El endpoint del chatbot esta protegido con:

- validacion de mensaje
- limite de longitud
- validacion de session id
- rate limit simple por IP
- timeout para evitar requests colgadas
- exigencia de HTTPS en produccion para el webhook externo

El rate limit actual vive en memoria. Sirve como proteccion basica, pero si el sitio recibe trafico real conviene moverlo a Redis, Vercel KV, Upstash o una solucion similar.

## Consideraciones especiales

- Este proyecto usa `npm` y `package-lock.json`. No mezclar con otro gestor de paquetes en el mismo repo.
- `next.config.mjs` tiene `images.unoptimized = true`, util para despliegues donde no se quiere depender del optimizador de imagenes de Next.
- Los textos y estilos estan bastante ligados a la identidad visual del proyecto. Antes de cambiar colores globales, revisar `app/globals.css`.
- Las cards y secciones usan muchas clases Tailwind directamente en los componentes. Es intencional: el sitio es una landing visual, no una app con muchas pantallas repetidas.
- Mantener `npm run lint` y `npm run build` como chequeo antes de publicar cambios.
