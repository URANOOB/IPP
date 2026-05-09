# Estándares de Código IPP2

## Organización de Archivos
- **Lógica de negocio:** Siempre en `src/features/{feature_name}/actions.ts`.
- **Componentes de UI reutilizables:** En `src/components/ui/`.
- **Componentes específicos de feature:** En `src/features/{feature_name}/components/`.
- **Estilos:** Priorizar Tailwind CSS. Evitar CSS puro a menos que sea estrictamente necesario.
- **Rutas:** En `src/app/`. Usar grupos de rutas `(landing)`, `(admin)` para organización lógica.

## Revisión de Código
- **Unused Code:** Verificar que no haya imports, variables o funciones exportadas que no se utilicen.
- **Duplicación:** Si una lógica se repite en más de dos `actions.ts`, considerar moverla a `src/lib/` o crear un helper.
- **Supabase:** Asegurarse de usar `server.ts` para Server Actions y `client.ts` para componentes de cliente.
- **Types:** Mantener los tipos en `src/types/` si son compartidos o dentro de la feature si son locales.

## Comandos de Verificación
- `npm run lint`: Para errores de sintaxis y reglas de ESLint.
- `npm run build`: Para asegurar que el tipado de TypeScript es correcto y la app es estable.
