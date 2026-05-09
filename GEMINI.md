# Instrucciones del Proyecto IPP2

## Entorno de Desarrollo
- **Sistema Operativo:** Windows.
- **Shell:** PowerShell.
- **Importante:** Al ejecutar comandos encadenados, evita el uso de `&&` si se lanzan directamente desde el agente a menos que se asegure compatibilidad con la versión de PowerShell activa, o ejecuta los comandos de forma secuencial utilizando el parámetro `wait_for_previous: true`.

## Arquitectura y Convenciones
- **Framework:** Next.js 16 (App Router).
- **Estructura:** Basada en `features`. Cada funcionalidad debe residir en `src/features/{nombre}`.
- **Documentación:** JSDoc en español (ver skill `code-annotation`).
- **Calidad:** Revisión obligatoria con `npm run lint` y `npm run build` antes de finalizar tareas.

## Comandos Comunes
- Instalar dependencias: `npm install`
- Desarrollo: `npm run dev`
- Construcción: `npm run build`
- Linting: `npm run lint`
- Tests: `npm run test`
