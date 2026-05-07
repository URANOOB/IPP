# Inglés pa' la Paz (IPP)

¡Bienvenido al proyecto! Esta es la web de **Inglés pa' la Paz**. Aquí mostramos todo lo que hacemos: la metodología, las experiencias con los chicos y quiénes somos. También estamos armando un panel para administrar todo el contenido.

---

## ¿Por dónde empiezo?

Para empezar a programar con nosotros, primero un ojo a estos dos archivos:

1. **[Cómo trabajar en equipo (CONTRIBUTING.md)](CONTRIBUTING.md):** Aquí hay una explicación de cómo usamos Git (para no romper el sitio de producción) y cómo configurar todo.
2. **[Cómo está hecho el código (src/ARCHITECTURE.md)](src/ARCHITECTURE.md):** Un tour rápido por las carpetas del proyecto para saber dónde poner cada cosa.

---

## Para arrancar el proyecto

Es súper fácil:

1. **Clonar el código y pasarse a la rama de desarrollo:**
   ```bash
   git clone https://github.com/URANOOB/IPP.git
   cd IPP
   git checkout develop
   ```

2. **Instalar todo lo necesario:**
   ```bash
   npm install
   ```

3. **Las llaves mágicas (.env.local):**
   Pídeme el archivo `.env.local`. Sin esto no va a funcionar la base de datos ni el chatbot. Este se pone en la carpeta raíz.

4. **¡Para iniciarlo!:**
   ```bash
   npm run dev
   ```
   Abrir [http://localhost:3000](http://localhost:3000) y ahí se debería ver el sitio.

---

## 🛠️ Herramientas que usamos
- **Next.js 15** (Lo último de React).
- **TypeScript** (Para que el código sea más ordenado).
- **Tailwind** (Para los estilos).
- **Supabase** (Nuestra base de datos y usuarios).

---

## 💡 Un par de consejos
- Antes de subir cualquier cambio es importante correr `npm run lint` y `npm run build` para estar seguros de que nada se rompió.
- Si hay algo para mejorar, entonces de una.

Cualquier cosa estoy pendiente!
