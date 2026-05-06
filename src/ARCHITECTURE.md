# ¿Cómo está armado este proyecto? (Arquitectura)

¡Hola! Te cuento rápido cómo está organizado el código para que no te pierdas. Todo lo importante está dentro de la carpeta `src/`.

## 🏗️ Lo básico
- **Next.js 15:** Es el motor de todo.
- **Tailwind:** Para que el sitio se vea bien sin sufrir con CSS puro.
- **Supabase:** Ahí guardamos los datos y manejamos quién entra y quién no.

## 📂 ¿Qué hay en cada carpeta?

### 1. `src/app` (Las Rutas)
Aquí es donde Next.js arma las páginas. Vas a ver carpetas con paréntesis como `(landing)` o `(admin)`. Eso solo es para organizar, no afecta la URL. 
- Lo que ve todo el mundo está en `(landing)`.
- El panel para nosotros está en `(admin)`.
- Si necesitas crear un endpoint (tipo API), están en la carpeta `api`.

### 2. `src/features` (Donde vive la lógica)
Esta es la parte más importante. En lugar de tener archivos regados, agrupamos todo por "qué hace". 
- Si vas a tocar algo de la página principal, busca en `landing`.
- Si vas a meterle mano al panel, busca en `admin`.
- Dentro vas a ver archivos `actions.ts`. Esos son los que hablan con la base de datos de Supabase.

### 3. `src/components` (Cosas que se repiten)
Aquí guardamos los botones, inputs y el diseño del Header/Footer. Si vas a crear un botón que se use en varios lados, ponlo en `ui/`.

### 4. `src/lib` (Configuraciones)
Aquí está la conexión a Supabase (`supabase/`) y algunas funciones de ayuda en `utils.ts`.

## 🎨 El diseño
Casi todo lo visual lo controlamos desde `src/app/globals.css`. Ahí están los colores principales. Si quieres animar algo, usa **Framer Motion**, que ya está instalado.

## 🖼️ Imágenes
Las fotos y logos están en `public/images/ipp/`. Tenemos un truquito en `/api/experience-resources` para leer las carpetas de fotos automáticamente, así que no te asustes si ves ese código raro.

¡Y ya está! No es tan complicado una vez que le coges el tiro.
