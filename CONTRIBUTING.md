# Guía para el equipo (IPP)

## Las ramas (Git)

Aquí solo nos importan dos ramas principales:

1. **`main`**: Esta es la que está en producción (lo que la gente ve en internet). **No tocar esta rama directamente** a menos que ya estemos listos para lanzar algo nuevo.
2. **`develop`**: Aquí es donde sucede la magia. **Todo lo que hace se sube aquí**. 

**¿Cómo trabajar?**
- Siempre asegurarse de estar en `develop` antes de empezar: `git checkout develop`.
- Los cambios, commits se suben con: `git push origin develop`.
- Cuando creamos que lo que está en `develop` ya está de 10, lo pasamos a `main` juntos.

## Base de Datos y Secretos

Estamos usando Supabase. 
- **Regla de oro:** No usar las claves de producción para hacer pruebas. 
- Se requiere archivo `.env.local` con las claves de **Desarrollo**, este lo tengo y lo paso en cualquier momento.
- Nunca, por nada del mundo subir ese archivo `.env.local` al GitHub.

## Antes de subir algo

Para evitar que el código se rompa en el servidor, se debe correr estos dos comandos en la terminal:
```bash
npm run lint
npm run build
npm fund
```
Si sale algún error en rojo, arreglarlo antes de subirlo. Si el `build` pasa, estamos melos.

## ¿Cómo lo mando a producción?

Cuando ya probamos todo en `develop` y funciona bien:
1. Me avisa o se abre un "Pull Request" en GitHub de `develop` hacia `main`.
2. Le echamos un último ojo y le damos al botón de Merge.
3. ¡Y listo! El sitio se actualiza solo.
