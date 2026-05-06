# Ingles pa' la Paz (IPP)

Bienvenido al repositorio oficial del proyecto **Ingles pa' la Paz**. Este proyecto es una plataforma web construida con **Next.js 15 (App Router)** que sirve como una landing page interactiva para presentar la metodología, experiencias, integrantes y canales de contacto del proyecto, además de sentar las bases para un sistema de administración interno.

---

## 🗺️ Mapa de Documentación (¡Léeme primero!)

Para mantener el proyecto organizado, hemos dividido la documentación según tus necesidades:

1. **[Guía de Contribución (CONTRIBUTING.md)](CONTRIBUTING.md):** 
   - *¿Eres nuevo en el equipo?* Lee esto primero. Contiene las reglas de oro sobre cómo usar Git, cómo crear ramas (nunca tocar `main`), cómo manejar los entornos de base de datos (Supabase) y cómo pasar a producción de forma segura.
2. **[Arquitectura del Proyecto (src/ARCHITECTURE.md)](src/ARCHITECTURE.md):** 
   - *¿Quieres saber cómo funciona el código por dentro?* Esta es la biblia técnica. Explica la estructura de carpetas (`src/features`, `src/app`, etc.), el flujo de Server Actions, y la estrategia de autenticación.

---

## 🚀 Cómo correr el proyecto localmente

### Requisitos recomendados
- **Node.js** 20 o superior
- **npm** 10 o superior
- **Git**

### Instalación y Configuración

1. **Clona el repositorio y entra a la rama de desarrollo:**
   ```bash
   git clone https://github.com/URANOOB/IPP.git
   cd IPP
   git checkout develop
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Variables de Entorno (.env.local):**
   Solicita al líder del proyecto el archivo `.env.local` con las credenciales del **entorno de desarrollo** de Supabase y cualquier otra API Key (ej. OpenAI para el chatbot). Ubícalo en la raíz del proyecto. **Nunca subas este archivo a GitHub.**

4. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   El sitio estará disponible en [http://localhost:3000](http://localhost:3000).

---

## ✅ Comandos Útiles

- `npm run dev`: Inicia el modo de desarrollo con Turbopack.
- `npm run build`: Construye la aplicación para producción. **(Obligatorio ejecutar esto antes de hacer un Pull Request para asegurar que no hay errores).**
- `npm run lint`: Revisa el código en busca de errores de sintaxis y buenas prácticas.
- `npm run db:seed`: (Opcional) Ejecuta el script para poblar la base de datos de desarrollo de Supabase con datos iniciales (requiere configuración previa).

---

## 🛠️ Tecnologías Principales

- **Framework:** Next.js 15 (React 19)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes:** Shadcn UI (Custom) + Framer Motion
- **Backend & Auth:** Supabase (PostgreSQL)

---

## 🔒 Seguridad y Buenas Prácticas

- **API Routes Seguras:** Endpoints como el del Chatbot (`/api/chat`) tienen protección básica (Rate limiting, validación de inputs) configurada.
- **Acceso a Archivos:** El endpoint `/api/experience-resources` está estrictamente tipado para evitar lectura de archivos fuera de la carpeta `public/images/ipp`.
- Si descubres una vulnerabilidad, por favor no la publiques en un issue abierto. Repórtala directamente a los administradores del repositorio.