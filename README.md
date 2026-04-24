# IPP

Sitio web del proyecto "Ingles pa' la Paz", construido con Next.js, React, Tailwind CSS y una API interna para conectar el chatbot con `n8n`.

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Instalacion

```bash
npm install
```

## Variables de entorno

Crea un archivo `.env.local` con:

```env
N8N_WEBHOOK_URL=https://tu-instancia-n8n/webhook/...
```

La ruta `app/api/chat/route.ts` usa esa variable para reenviar mensajes del chatbot al flujo externo.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Estructura

- `app/`: layout global, pagina principal y route handler del chatbot
- `components/`: secciones visuales de la landing y componentes UI reutilizables
- `public/images/ipp/`: imagenes del proyecto
- `lib/`: utilidades compartidas

## Notas

- La pagina principal renderiza todas las secciones visibles de la landing desde `app/page.tsx`.
- El proyecto ahora usa ESLint CLI con configuracion `next/core-web-vitals` para que la validacion de lint vuelva a ejecutarse en build.
- Si `npm run build` sigue fallando, el siguiente punto a revisar es la ruta `app/api/chat/route.ts`, que no fue modificada en este ajuste.
