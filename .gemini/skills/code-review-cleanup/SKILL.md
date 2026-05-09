---
name: code-review-cleanup
description: Revisión de código, detección de duplicados y código no usado en el proyecto IPP2. Úsalo cuando necesites optimizar el código, limpiar archivos o asegurar que se cumplen los estándares de arquitectura (Next.js, Supabase, Features).
---

# Code Review & Cleanup

Este skill ayuda a mantener la base de código limpia, eficiente y siguiendo los estándares del proyecto IPP2.

## Flujo de Trabajo

### 1. Análisis Estático y Build
Antes de cualquier cambio, verifica el estado actual:
- Ejecuta `npm run lint` para identificar problemas de estilo y errores comunes.
- Ejecuta `npm run build` para validar el tipado de TypeScript.

### 2. Detección de Código no Usado
- **Componentes:** Busca componentes en `src/components` o `src/features` que no tengan imports entrantes.
- **Acciones:** Revisa `actions.ts` para funciones exportadas que no se llamen desde ningún lado.
- **Imports:** ESLint suele detectar esto, pero revisa manualmente en archivos grandes.

### 3. Detección de Código Duplicado
- **Lógica de Supabase:** Si ves el mismo patrón de consulta en múltiples `actions.ts`, propón extraerlo.
- **Componentes UI:** Si se están recreando estilos de botones o inputs manualmente, sugiere usar los componentes de `src/components/ui/`.

### 4. Validación de Arquitectura
Consulta [references/standards.md](references/standards.md) para asegurar que:
- La lógica está en la carpeta `features` correcta.
- Los componentes están bien ubicados.
- Se siguen las reglas de Git y Supabase definidas en `CONTRIBUTING.md`.

## Herramientas Útiles
- Utiliza `grep_search` para buscar duplicados de cadenas de texto o lógica específica.
- Utiliza `glob` para listar archivos y encontrar posibles redundancias por nombre.
