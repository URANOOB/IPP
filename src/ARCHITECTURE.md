# Arquitectura del Proyecto IPP (Inglés pa' la Paz)

Este documento detalla la estructura técnica, patrones de diseño y flujo de datos de la aplicación. Está diseñado para que cualquier desarrollador pueda entender cómo está construido el sistema de principio a fin.

---

## 🏗️ Stack Tecnológico

- **Framework Core:** Next.js 15 (App Router).
- **Lenguaje:** TypeScript.
- **Estilos:** Tailwind CSS con variables personalizadas y animaciones (Framer Motion).
- **Base de Datos & Auth:** Supabase (PostgreSQL, Row Level Security, Auth, Storage).
- **Componentes UI:** Patrón de componentes personalizados basados en la estructura de Radix UI / shadcn-ui.

---

## 📂 Estructura de Directorios (Profundidad)

El proyecto sigue una arquitectura **Modular por Características (Feature-Sliced Design)**, donde la lógica se agrupa por el dominio de negocio en lugar de por el tipo de archivo. Todo el código fuente vive dentro de `src/`.

### 1. `src/app` (El Router)
Define las rutas, layouts y endpoints de la aplicación utilizando los Route Groups de Next.js (`(...)`) para organizar la navegación sin afectar las URLs.

- **`(landing)`**: Contiene la página principal `page.tsx` (La vista pública).
- **`(blog)`**: Sistema de artículos. Contiene `blog/page.tsx` (lista) y `blog/[slug]/page.tsx` (detalle).
- **`(admin)`**: Panel de administración protegido. Contiene submódulos:
  - `/admin/blog`: Gestión de artículos (crear/editar).
  - `/admin/team`: Gestión de integrantes.
  - `/admin/users`: Gestión de roles de usuario.
  - `/admin/content`: Gestión de contenido dinámico.
- **`(auth)`**: Rutas de autenticación.
  - `/login`: Vista de inicio de sesión.
  - `/auth/callback`: Ruta de verificación de Supabase Auth.
  - `/auth/signout`: Endpoint para cerrar sesión.
- **`api`**: Endpoints de backend puros.
  - `/api/chat`: Lógica del Chatbot de IA.
  - `/api/experience-resources`: Lector de recursos locales estáticos del proyecto.

### 2. `src/features` (El Corazón de la Lógica)
Aquí reside la lógica de negocio, agrupada por dominio. Las páginas en `src/app` solo "consumen" lo que se exporta desde aquí.

- **`landing/`**:
  - `components/`: `hero.tsx`, `chatbot.tsx`, `infoipp.tsx`, `experiences.tsx`, `process.tsx`, `integrantes.tsx`.
  - `actions.ts`: Server Actions para procesar datos de la landing (ej. formularios de contacto).
- **`admin/`**:
  - `components/`: `admin-sidebar.tsx`, `image-upload.tsx`, `team-member-form.tsx`.
  - `team-actions.ts` / `user-actions.ts`: Mutaciones directas a Supabase para gestionar el equipo y usuarios.
- **`blog/`**:
  - `actions.ts`: Server actions para traer listas de posts o un post individual.

### 3. `src/components` (Componentes Globales)
Elementos compartidos que no pertenecen a una característica específica.

- **`layout/`**: `header.tsx`, `footer.tsx` (usados a nivel global) y `admin-sidebar.tsx`.
- **`ui/`**: Sistema de diseño base. `button.tsx`, `card.tsx`, `input.tsx`, `scroll-area.tsx`, `dynamic-icon.tsx`, `liquid-glass-button.tsx`.

### 4. `src/lib` (Utilidades y Configuración)
- **`supabase/`**: El ecosistema de base de datos.
  - `client.ts`: Cliente para componentes del lado del cliente (Browser).
  - `server.ts`: Cliente para Server Components y Server Actions.
  - `middleware.ts`: Verificación de sesiones en las rutas.
  - Scripts de DB: `seed.ts`, `audit_db.ts`, `reset_db.ts`, `inspect_security.ts` para mantenimiento desde CLI.
- **`utils.ts`**: Funciones auxiliares (ej. concatenación de clases Tailwind con `clsx` y `tailwind-merge`).
- **`styles.ts` / `data.ts`**: Constantes globales, datos estáticos compartidos y configuraciones de diseño.

### 5. `src/types` (Modelos de Datos)
- **`landing.ts`**: Interfaces TypeScript globales, como los tipos de datos para los Integrantes, Experiencias y configuraciones.

---

## 🔒 Autenticación y Seguridad (Supabase)

El sistema utiliza **Supabase Auth** con una estrategia de middleware en Next.js.
1. Cuando un usuario navega a una ruta protegida (ej. `/admin/*`), el archivo `src/middleware.ts` (si estuviera en la raíz) o la validación en el Layout de la ruta intercepta la petición.
2. Utiliza `src/lib/supabase/server.ts` para validar la sesión de la cookie.
3. El panel de administración tiene protección de acceso (Row Level Security en Supabase y validación en Server Actions).

---

## 📡 Flujo de Datos (Data Fetching & Server Actions)

El proyecto abraza el paradigma de Server Components de React 19 / Next 15:
- **Lectura de Datos:** Se realiza directamente en los Server Components (en `src/app/**/*.tsx`) utilizando llamadas asíncronas a funciones dentro de `src/features/**/actions.ts`.
- **Mutaciones:** Se utilizan **Server Actions**. Por ejemplo, para crear un nuevo miembro del equipo, el formulario en el cliente llama a una función asíncrona exportada desde `src/features/admin/team-actions.ts`. Esto elimina la necesidad de crear APIs en `src/app/api` para tareas CRUD básicas.

---

## 🎨 Patrón de Diseño Visual

El diseño se centra en una experiencia "Landing Page" altamente visual:
1. **Tailwind CSS:** Uso extensivo para el posicionamiento y responsive design. Configuración personalizada en `tailwind.config.ts`.
2. **CSS Global (`src/app/globals.css`):** Contiene variables de diseño (`--background`, `--primary`, etc.) que permiten adaptar los componentes de Shadcn al branding de IPP.
3. **Framer Motion:** Utilizado para animaciones fluidas (Scroll reveals, transiciones de botones).

## 🗃️ Manejo de Imágenes y Assets
- Las imágenes del proyecto (logos, personajes, galerías) se almacenan en `public/images/ipp/`.
- El Endpoint `/api/experience-resources/route.ts` actúa como un puente seguro para leer el contenido de las carpetas locales en `public/` y enviarlo dinámicamente a los componentes (como la galería de experiencias), evitando exponer la estructura de directorios del servidor.
