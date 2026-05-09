# Estándares de Documentación IPP2

## Bloques JSDoc
Se deben usar para funciones, clases y archivos importantes.

### Formato de Archivo
```typescript
/**
 * @file {nombre_del_archivo}
 * @description {Breve descripción de la responsabilidad del archivo}
 */
```

### Formato de Funciones
```typescript
/**
 * {Descripción de qué hace la función}
 * 
 * @param {{tipo}} {nombre} - {Descripción del parámetro}
 * @returns {{tipo}} {Descripción del valor de retorno}
 */
```

## Comentarios en Línea
- Usar `//` para explicaciones breves de lógica compleja dentro de funciones.
- Evitar comentarios obvios (ej: `i++ // incrementar i`).
- Usar prefijos para tareas pendientes o bugs conocidos.

## Idioma
- Los comentarios y la documentación deben estar en **Español**, manteniendo la consistencia con el resto del proyecto.
