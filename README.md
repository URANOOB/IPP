# Inglés pa' la Paz (IPP)

Bienvenido al proyecto. Esta es la web de **Inglés pa' la Paz**. Aquí mostramos la metodología, las experiencias con los chicos y quiénes somos. También incluye un panel para administrar contenido.

---

## ¿Por dónde empiezo?

Para empezar a programar, revisa estos dos archivos:

1. **[Cómo trabajar en equipo (CONTRIBUTING.md)](CONTRIBUTING.md):** explicación de cómo usamos Git y cómo configurar todo.
2. **[Cómo está hecho el código (src/ARCHITECTURE.md)](src/ARCHITECTURE.md):** tour rápido por las carpetas del proyecto.

---

## Para arrancar el proyecto

1. **Clonar el código y pasar a la rama de desarrollo:**

   ```bash
   git clone https://github.com/URANOOB/IPP.git
   cd IPP
   git checkout develop
   ```

2. **Instalar dependencias con pnpm:**

   ```bash
   pnpm install
   ```

3. **Configurar `.env.local`:**

   Pide el archivo `.env.local`. Sin esto no funcionarán la base de datos ni el chatbot. El archivo debe estar en la raíz del proyecto.

4. **Iniciar desarrollo:**

   ```bash
   pnpm dev
   ```

   Abre [http://localhost:3000](http://localhost:3000).

---

## Herramientas que usamos

- **Next.js 16** con App Router.
- **React 19**.
- **TypeScript**.
- **Tailwind CSS**.
- **Supabase** para base de datos y autenticación.
- **pnpm** como único gestor de paquetes.

---

## Comandos útiles

- Desarrollo: `pnpm dev`
- Linting: `pnpm lint`
- Tests: `pnpm test`
- Build: `pnpm build`

Antes de subir cambios, corre `pnpm lint` y `pnpm build`.
