---
name: code-annotation
description: Inserción y actualización de comentarios granulados, JSDoc y documentación técnica en el código. Úsalo para mejorar la legibilidad, explicar lógica compleja o estandarizar la documentación del proyecto IPP2 siguiendo el formato JSDoc en español.
---

# Code Annotation & Documentation

Este skill se encarga de asegurar que el código esté bien documentado y sea fácil de entender para otros desarrolladores.

## Flujo de Trabajo

### 1. Identificación de Brechas
- Busca funciones, componentes o archivos que carezcan de descripción.
- Identifica bloques de lógica densa que no tengan comentarios explicativos.

### 2. Aplicación de JSDoc
Para cada función o archivo importante:
- Añade `@file` y `@description` al inicio del archivo.
- Detalla `@param` y `@returns` con sus respectivos tipos y propósitos.
- Mantén el idioma en **Español** para la documentación técnica.

### 3. Comentarios Granulados
- Inserta comentarios de una sola línea (`//`) justo antes de pasos lógicos críticos.
- Actualiza comentarios existentes que hayan quedado obsoletos tras cambios en el código.
- Asegúrate de que los comentarios expliquen el **"por qué"** de la lógica, no solo el "qué".

## Estándares
Consulta [references/documentation-standards.md](references/documentation-standards.md) para ver ejemplos exactos del formato esperado en el proyecto IPP2.

## Cuándo usarlo
- Al crear nuevas funcionalidades (`features`).
- Durante refactorizaciones para documentar la nueva estructura.
- Cuando el usuario pida "documentar este archivo" o "explicar esta lógica con comentarios".
