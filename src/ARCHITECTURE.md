# Arquitectura del Proyecto IPP (Moderna y Modular)

Este proyecto utiliza **Next.js 15** con una arquitectura **Modular por Características (Features)** dentro de una carpeta `src/`. Esta estructura separa las responsabilidades de configuración, lógica y visualización.

## 📂 Estructura de Directorios

### 1. El Núcleo (`/src`)
Todo el código fuente reside aquí para separar la lógica de los archivos de configuración de la raíz.

### 2. Módulos por Características (`/src/features`)
Cada carpeta dentro de `features` representa un dominio de la aplicación y contiene su propia lógica y componentes:
- **`actions.ts`**: Server Actions específicas del módulo (Backend).
- **`/components`**: Componentes visuales que solo pertenecen a esta característica.

### 3. Componentes Globales (`/src/components`)
- **`/ui`**: Componentes básicos (botones, inputs) de Shadcn/Custom.
- **`/layout`**: Componentes de estructura global (Header, Footer, Sidebar).

### 4. Rutas y Páginas (`/src/app`)
Directorio de rutas de Next.js. Las páginas son "delgadas"; solo importan componentes de `features` y manejan el layout de la ruta.

## 🚀 Beneficios
- **Escalabilidad**: Añadir una nueva función es tan simple como crear una nueva carpeta en `features`.
- **Mantenibilidad**: Es fácil encontrar dónde está la lógica de una parte específica de la app.
- **Limpia**: La raíz del proyecto solo contiene configuraciones globales.
