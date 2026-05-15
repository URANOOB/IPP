# ¿Cómo está armado este proyecto? (Arquitectura)

Todo lo importante está dentro de la carpeta `src/`.

## Lo básico

- **Next.js 16:** motor principal de la aplicación.
- **App Router:** rutas y layouts viven en `src/app`.
- **Tailwind CSS:** estilos de la interfaz.
- **Supabase:** base de datos, autenticación y sesiones.
- **pnpm:** único gestor de paquetes del proyecto.

## ¿Qué hay en cada carpeta?

### 1. `src/app` (Rutas)

Aquí Next.js arma las páginas. Las carpetas con paréntesis, como `(landing)` o `(admin)`, sirven para organizar y no afectan la URL.

- Lo público está en `(landing)`.
- El panel administrativo está en `(admin)`.
- Los endpoints están en `api`.

### 2. `src/features` (Lógica por funcionalidad)

La lógica se agrupa por dominio o funcionalidad.

- Cambios de la página principal: `src/features/landing`.
- Cambios del panel: `src/features/admin`.
- Cambios del blog: `src/features/blog`.
- Los archivos `actions.ts` suelen contener Server Actions que hablan con Supabase.

El panel administrativo se divide por dominio:

```txt
src/features/admin/
  auth/
    permissions.ts
  blog/
    actions.ts
    actions.test.ts
  messages/
    actions.ts
    actions.test.ts
  team/
    actions.ts
    actions.test.ts
  users/
    actions.ts
    actions.test.ts
  components/
```

Las Server Actions administrativas deben validar permisos con `requireRole` aunque la ruta ya esté protegida por el layout de `/admin`.

### 3. `src/components` (Componentes compartidos)

Aquí viven componentes reutilizables, como botones, inputs, header, footer y navegación.

- Componentes base de UI: `src/components/ui`.
- Componentes de layout: `src/components/layout`.

### 4. `src/lib` (Configuración y utilidades)

Aquí está la conexión a Supabase (`src/lib/supabase`) y funciones auxiliares como `utils.ts`.

## Diseño

La base visual está en `src/app/globals.css` y `tailwind.config.ts`. Para animaciones, el proyecto ya incluye Framer Motion.

## Imágenes

Las fotos y logos están en `public/images/ipp/`. El endpoint `/api/experience-resources` lee carpetas de fotos automáticamente.
