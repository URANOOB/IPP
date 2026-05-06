# Guía para el equipo (IPP)

¡Qué onda! Si estás leyendo esto es porque vas a meterle mano al código de **Inglés pa' la Paz**. Para que no nos hagamos bolas y no rompamos lo que ya está en vivo, vamos a seguir estas reglas súper simples.

## 🌿 Las ramas (Git)

Aquí solo nos importan dos ramas principales:

1. **`main`**: Esta es la que está en producción (lo que la gente ve en internet). **No toques esta rama directamente** a menos que ya estemos listos para lanzar algo nuevo.
2. **`develop`**: Aquí es donde sucede la magia. **Todo lo que hagas, súbelo aquí**. 

**¿Cómo trabajar?**
- Siempre asegúrate de estar en `develop` antes de empezar: `git checkout develop`.
- Haz tus cambios, tus commits, y súbelos: `git push origin develop`.
- Cuando creamos que lo que está en `develop` ya está de 10, lo pasamos a `main` juntos.

## 🔑 Base de Datos y Secretos

Estamos usando Supabase. 
- **Regla de oro:** No uses las claves de producción para hacer pruebas. 
- Pídeme el archivo `.env.local` con las claves de **Desarrollo**.
- Nunca, por nada del mundo, subas ese archivo `.env.local` al GitHub.

## ✅ Antes de subir algo

Para evitar que el código se rompa en el servidor, corre estos dos comandos en tu terminal:
```bash
npm run lint
npm run build
```
Si te sale algún error en rojo, arréglalo antes de subirlo. Si el `build` pasa, estamos melos.

## 🚀 ¿Cómo lo mando a producción?

Cuando ya probamos todo en `develop` y funciona bien:
1. Me avisas o abres un "Pull Request" en GitHub de `develop` hacia `main`.
2. Le echamos un último ojo y le damos al botón de Merge.
3. ¡Y listo! El sitio se actualiza solo.

¡Dale con toda! Cualquier duda, me pegas un grito.
