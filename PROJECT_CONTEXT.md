# Instrucciones del Proyecto IPP2

## Entorno de Desarrollo

- **Sistema Operativo:** Windows.
- **Shell:** PowerShell.
- **Gestor de paquetes:** pnpm.
- **Importante:** Al ejecutar comandos encadenados, evita usar `&&` directamente desde el agente, salvo que se confirme compatibilidad con la versión activa de PowerShell. Preferiblemente ejecuta los comandos de forma secuencial usando `wait_for_previous: true`, porque aparentemente hasta encadenar comandos puede convertirse en una tragedia moderna.

## Arquitectura y Convenciones

- **Framework:** Next.js 16 con App Router.
- **Estructura:** Basada en `features`. Cada funcionalidad debe ubicarse en:

```txt
src/features/{nombre}
```

## Comandos Comunes

- Instalar dependencias: `pnpm install`
- Desarrollo: `pnpm dev`
- Construcción: `pnpm build`
- Linting: `pnpm lint`
- Tests: `pnpm test`

