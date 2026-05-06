# Guía de Contribución - IPP

Bienvenido al equipo de desarrollo de **Ingles pa' la Paz**. Para mantener la estabilidad de la aplicación en producción mientras crecemos, seguimos estas reglas.

## 🌿 Estrategia de Ramas

1. **`main`**: Código en producción. Nadie hace push directo aquí.
2. **`develop`**: Rama principal de desarrollo e integración.
3. **`feature/*`**: Ramas para nuevas funcionalidades (ej: `feature/admin-panel`). Se crean desde `develop`.

## 🚀 Flujo de Trabajo Diario

1. **Actualiza tu local**: Antes de empezar, asegúrate de estar en `develop` y tener lo último.
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Crea una rama para tu tarea**:
   ```bash
   git checkout -b feature/mi-nueva-mejora
   ```

3. **Trabaja y haz commits**:
   ```bash
   git add .
   git commit -m "feat: descripción de lo que hiciste"
   ```

4. **Sube tus cambios a la rama de desarrollo**:
   Cuando termines, sube tus avances a `develop`. **IMPORTANTE:** Si estás trabajando con alguien más, lo ideal es hacer un Pull Request. Si tienes permiso directo:
   ```bash
   git checkout develop
   git merge feature/mi-nueva-mejora
   git push origin develop
   ```

## 🛠️ Entornos de Supabase

- **Producción:** Solo se conecta desde la rama `main` en el servidor de despliegue.
- **Desarrollo:** Usa tu propio archivo `.env.local` con las credenciales del proyecto de Supabase destinado a pruebas. **Nunca subas el archivo `.env.local` al repositorio.**

## ✅ Antes de subir cambios

Siempre ejecuta estas validaciones para asegurar que no rompemos nada:
```bash
npm run lint
npm run build
```

Si el `build` falla, no subas los cambios hasta corregirlos.

## 🚀 Paso a Producción (Deploy)

Cuando las funcionalidades en `develop` estén terminadas y probadas, es hora de moverlas a `main`.

### Opción A: Vía GitHub (Recomendado)
1. Ve a [URANOOB/IPP](https://github.com/URANOOB/IPP).
2. Abre un **Pull Request**: `base: main` ← `compare: develop`.
3. Revisa los cambios visualmente.
4. Si todo es correcto, confirma el **Merge**.

### Opción B: Vía Terminal
Solo si tienes total certeza de que el código es estable:
```bash
git checkout main
git pull origin main
git merge develop
git push origin main
git checkout develop
```

---
*Recuerda: `main` es sagrado. Solo llega código que ya funciona perfectamente en `develop`.*
