# Inglés pa' la Paz (IPP)

¡Bienvenido al proyecto! Esta es la web de **Inglés pa' la Paz**. Aquí mostramos todo lo que hacemos: la metodología, las experiencias con los chicos y quiénes somos. También estamos armando un panel para administrar todo el contenido.

---

## 📍 ¿Por dónde empiezo?

Si vas a empezar a programar con nosotros, échale un ojo a estos dos archivos, te van a salvar la vida:

1. **[Cómo trabajar en equipo (CONTRIBUTING.md)](CONTRIBUTING.md):** Aquí te explico cómo usamos Git (para no romper el sitio de producción) y cómo configurar todo en tu compu.
2. **[Cómo está hecho el código (src/ARCHITECTURE.md)](src/ARCHITECTURE.md):** Un tour rápido por las carpetas del proyecto para que sepas dónde poner cada cosa.

---

## 🚀 Para arrancar el proyecto en tu compu

Es súper fácil:

1. **Clona el código y pásate a la rama de desarrollo:**
   ```bash
   git clone https://github.com/URANOOB/IPP.git
   cd IPP
   git checkout develop
   ```

2. **Instala todo lo necesario:**
   ```bash
   npm install
   ```

3. **Las llaves mágicas (.env.local):**
   Pídeme el archivo `.env.local`. Sin esto no va a funcionar la base de datos ni el chatbot. Ponlo en la carpeta raíz.

4. **¡A darle!:**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) y ahí deberías ver el sitio.

---

## 🛠️ Herramientas que usamos
- **Next.js 15** (Lo último de React).
- **TypeScript** (Para que el código sea más ordenado).
- **Tailwind** (Para los estilos).
- **Supabase** (Nuestra base de datos y usuarios).

---

## 💡 Un par de consejos
- Antes de subir cualquier cambio, corre `npm run build` para estar seguros de que nada se rompió.
- Si ves algo que se puede mejorar, ¡hazlo! Pero avísame para estar en la misma página.

¡Cualquier cosa me dices!
